# FUB Email Lead Parser (Cloudflare Email Worker)

Reusable Cloudflare Email Worker that parses inbound lead-notification emails and sends them to Follow Up Boss via **`POST /v1/events`** — the only FUB-sanctioned lead-intake endpoint.

> **Do not** post new leads to `/v1/people`. That skips FUB’s contact dedupe + action-plan triggers and can create duplicates. See [FUB Lead Provider Integration Guide](https://docs.followupboss.com/docs/lead-provider-integration-guide) (verified 2026-07-19).

## What this is (and isn’t)

| Platform feature | Already exists? | This Worker |
| --- | --- | --- |
| RealScout ↔ FUB native sync | YES | Does **not** replace it. Use native for RealScout app activity. |
| FUB action plans / automations | YES | Triggers them correctly via `/v1/events` |
| Parsing *email* alerts that never hit a webhook | NO | **This** — email → structured lead → FUB |

Use this when a vendor (or your own contact form) only emails you a lead alert and has no webhook into FUB.

## Prerequisites

1. Domain on Cloudflare with **Email Routing** enabled  
2. A Follow Up Boss API key (Admin → API)  
3. Node 18+ and `wrangler` (`npm i` in this folder, or use the repo root)

## Quick deploy

```bash
cd workers/email-lead-parser
npm install

# Optional but recommended — Message-ID de-dupe on Worker retries
npx wrangler kv namespace create LEAD_DEDUPE
# Paste the id into wrangler.toml under [[kv_namespaces]]

npx wrangler secret put FUB_API_KEY
# Edit wrangler.toml [vars]: FALLBACK_INBOX, ALLOWED_SENDER_DOMAINS, LEAD_SOURCE_LABEL

npx wrangler deploy
```

Then in the Cloudflare dashboard:

1. **Email** → **Email Routing** → **Routing rules**
2. Create a rule for the address that receives lead alerts (e.g. `leads@yourdomain.com`)
3. Action: **Send to a Worker** → select `fub-email-lead-parser`

## Single-contact go-live test (required)

Before pointing production traffic at this Worker, send **exactly one** test lead email and confirm in FUB:

1. The correct contact was created **or** matched (no duplicate)
2. The expected action plan / automation fired
3. Source / type look right (`General Inquiry`, `Property Inquiry`, etc.)

If anything fails, fix parsers / vars and re-test with a fresh contact — do not flip production MX rules until this passes.

## Configuration

| Binding / var | Required | Purpose |
| --- | --- | --- |
| `FUB_API_KEY` (secret) | YES | HTTP Basic auth username for `api.followupboss.com` |
| `ALLOWED_SENDER_DOMAINS` | recommended | Comma-separated envelope MAIL FROM domains |
| `LEAD_SOURCE_LABEL` | optional | Default `source` field on the FUB event |
| `FALLBACK_INBOX` | recommended | Forward unparseable / errored mail to a human |
| `LEAD_DEDUPE` (KV) | recommended | Skip re-posts when Cloudflare retries the Worker |

Sender allow-listing uses the **envelope** `message.from` domain (SPF/DKIM/DMARC already checked by Cloudflare), not the display `From:` header.

## Source parsers

| Envelope domain | Parser | Default FUB `type` |
| --- | --- | --- |
| `*.realscout.com` | `realscoutParser` | Property Inquiry if address/MLS found |
| `*.homebot.ai`, `mail.homebot.ai` | `homebotParser` | Seller Inquiry |
| `*.callaction.co` | `callactionParser` | General Inquiry |
| `*.kvcore.com` | `kvcoreParser` | Inferred from subject/body |
| anything else on the allow-list | `genericContactFormParser` | Inferred (`Seller` / `Property` / `Registration` / `General`) |

Add a site-specific parser in `parsers.js` and register it on `SOURCE_PARSERS` when a vendor’s email shape is consistent.

## Local testing

```bash
# Unit tests for field extraction / parsers (no Cloudflare account needed)
npm test
# or from repo root:
npm run test:email-lead-parser

# Simulate inbound mail with wrangler (see Cloudflare Email routing local dev):
# https://developers.cloudflare.com/email-service/local-development/routing/
npx wrangler dev
```

## Failure modes

| Condition | Behavior |
| --- | --- |
| Message > 25 MiB | `setReject("Message too large")` |
| High spam score header | `setReject("Message appears to be spam")` |
| Sender not allow-listed | `setReject(...)` |
| Duplicate `Message-ID` in KV | Log + skip FUB post |
| No email/phone extracted | Forward to `FALLBACK_INBOX` (if set) |
| Unexpected exception | Forward to `FALLBACK_INBOX`, else reject |
| FUB returns `204` | Treated as success (archived lead flow per FUB docs) |

## Copying to another domain

This folder is self-contained. Copy `workers/email-lead-parser/` into the target repo (or deploy from here with a different `name` in `wrangler.toml`), set secrets/vars for that brand, and point that domain’s Email Routing rule at the Worker.
