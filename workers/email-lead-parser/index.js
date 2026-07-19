/**
 * FUB Email Lead Parser — Cloudflare Email Worker (reusable template)
 * ---------------------------------------------------------------------
 * Purpose: parse inbound lead-notification emails (contact-form
 * submissions, RealScout/Homebot/CallAction/kvCORE alerts, etc.) and
 * send the lead to Follow Up Boss via POST /v1/events — the only
 * FUB-sanctioned endpoint for sending new leads (per FUB's own Lead
 * Provider Integration Guide, docs.followupboss.com/docs/lead-provider-
 * integration-guide). /v1/events is what triggers FUB's contact
 * dedupe logic AND action plans/automations for Registration, Seller
 * Inquiry, Property Inquiry, and General Inquiry types — posting to
 * /v1/people directly is explicitly the wrong endpoint and can create
 * duplicate contacts.
 *
 * BEFORE GOING LIVE ON A DOMAIN: send exactly one test email through
 * this Worker and confirm in FUB that (a) the right contact was
 * created/matched, (b) the right action plan fired, and (c) no
 * duplicate was created. This matches the single-contact-test rule in
 * the fub-write-guardrails skill for any FUB write that can trigger an
 * action plan.
 *
 * DEPLOYMENT NOTE: the Cloudflare MCP tools connected to this session
 * are READ-ONLY for Workers (list / get / get-code) — there is no
 * create-or-deploy tool available here. Deploy this with `wrangler
 * deploy` from a terminal (see README.md), or paste it into the
 * Cloudflare dashboard's Quick Edit editor for a new Worker.
 */

import { resolveSourceParser } from "./parsers.js";

const DEFAULT_ALLOWED_SENDER_DOMAINS = [
  "realscout.com",
  "homebot.ai",
  "mail.homebot.ai",
  "callaction.co",
  "kvcore.com",
  // Add each site's own form-notification domain here, or override per
  // Worker with the ALLOWED_SENDER_DOMAINS var in wrangler.toml.
];

const MAX_INBOUND_BYTES = 25 * 1024 * 1024; // Cloudflare's documented inbound message size limit
const SPAM_SCORE_REJECT_THRESHOLD = 5; // matches Cloudflare's own spam-filtering example

export default {
  async email(message, env, ctx) {
    try {
      await handleEmail(message, env, ctx);
    } catch (err) {
      console.error("Email Worker processing failed:", err);
      // Never silently drop a lead on an unexpected error — forward it to
      // a human inbox instead of losing it.
      if (env.FALLBACK_INBOX) {
        try {
          await message.forward(env.FALLBACK_INBOX);
          return;
        } catch (fwdErr) {
          console.error("Fallback forward also failed:", fwdErr);
        }
      }
      message.setReject("Internal processing error");
    }
  },
};

async function handleEmail(message, env, ctx) {
  // 1. Size guard (defense in depth — Cloudflare already enforces this at SMTP receipt)
  if (message.rawSize > MAX_INBOUND_BYTES) {
    message.setReject("Message too large");
    return;
  }

  // 2. Spam-score guard (Cloudflare's own spam filter header)
  const spamScore = parseFloat(message.headers.get("x-cf-spamh-score") || "0");
  if (spamScore >= SPAM_SCORE_REJECT_THRESHOLD) {
    message.setReject("Message appears to be spam");
    return;
  }

  // 3. Sender allow-list, checked against the envelope MAIL FROM domain
  //    (message.from) — NOT the display "From" header, since the envelope
  //    address is what Cloudflare already authenticated via SPF/DKIM/DMARC
  //    before this Worker ever ran.
  const allowedDomains = (env.ALLOWED_SENDER_DOMAINS || DEFAULT_ALLOWED_SENDER_DOMAINS.join(","))
    .split(",")
    .map((d) => d.trim().toLowerCase())
    .filter(Boolean);
  const senderDomain = (message.from.split("@")[1] || "").toLowerCase();
  const isAllowed = allowedDomains.some((d) => senderDomain === d || senderDomain.endsWith(`.${d}`));
  if (!isAllowed) {
    message.setReject(`Sender domain ${senderDomain} is not on the allow-list`);
    return;
  }

  // 4. De-dupe on Message-ID via KV, if a LEAD_DEDUPE binding is configured.
  //    Cloudflare can retry a Worker on transient failure, which would
  //    otherwise risk double-posting the same lead to FUB.
  const messageId = message.headers.get("Message-ID") || "";
  if (env.LEAD_DEDUPE && messageId) {
    const seen = await env.LEAD_DEDUPE.get(messageId);
    if (seen) {
      console.log(`Duplicate delivery of ${messageId}; skipping FUB post.`);
      return;
    }
  }

  // 5. Parse the raw MIME body with postal-mime.
  const raw = await streamToArrayBuffer(message.raw);
  const { default: PostalMime } = await import("postal-mime");
  const parser = new PostalMime();
  const parsedEmail = await parser.parse(raw);

  // 6. Pick a source-specific parser (falls back to a generic
  //    "Name / Email / Phone / Message" contact-form parser).
  //    Match parent domains too (e.g. alerts.realscout.com → realscout.com).
  const parserFn = resolveSourceParser(senderDomain);
  const lead = parserFn(parsedEmail, message);

  if (!lead || (!lead.email && !lead.phone)) {
    console.warn("Could not extract a usable email or phone; forwarding to fallback inbox.");
    if (env.FALLBACK_INBOX) await message.forward(env.FALLBACK_INBOX);
    return;
  }

  // 7. POST to FUB /v1/events — the sanctioned lead-intake endpoint.
  await postLeadToFUB(lead, env);

  // 8. Mark as processed (7-day TTL comfortably covers Cloudflare's retry window)
  if (env.LEAD_DEDUPE && messageId) {
    await env.LEAD_DEDUPE.put(messageId, "1", { expirationTtl: 60 * 60 * 24 * 7 });
  }
}

async function postLeadToFUB(lead, env) {
  if (!env.FUB_API_KEY) {
    throw new Error("FUB_API_KEY secret is not configured for this Worker (wrangler secret put FUB_API_KEY)");
  }

  const body = {
    source: lead.source || env.LEAD_SOURCE_LABEL || "Email Lead Worker",
    system: "Cloudflare Email Worker",
    // FUB only fires action plans/automations for these four types:
    // Registration | Seller Inquiry | Property Inquiry | General Inquiry
    // (plus Visited Open House for action plans only — see FUB docs).
    type: lead.type || "General Inquiry",
    message: lead.message || "",
    person: {
      firstName: lead.firstName || "",
      lastName: lead.lastName || "",
      emails: lead.email ? [{ value: lead.email }] : [],
      phones: lead.phone ? [{ value: lead.phone }] : [],
    },
  };

  if (lead.property) body.property = lead.property; // { street, city, state, code, mlsNumber, price, ... }

  const resp = await fetch("https://api.followupboss.com/v1/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // FUB API auth: HTTP Basic with the API key as the username and an
      // empty password (per docs.followupboss.com/reference).
      Authorization: `Basic ${btoa(`${env.FUB_API_KEY}:`)}`,
    },
    body: JSON.stringify(body),
  });

  // A 204 with no body means the lead flow for this source was archived —
  // that's a valid, non-error outcome per FUB's docs, not a failure.
  if (!resp.ok && resp.status !== 204) {
    const text = await resp.text().catch(() => "");
    throw new Error(`FUB /v1/events returned ${resp.status}: ${text}`);
  }
}

async function streamToArrayBuffer(stream) {
  const reader = stream.getReader();
  const chunks = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    total += value.length;
  }
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.length;
  }
  return merged.buffer;
}
