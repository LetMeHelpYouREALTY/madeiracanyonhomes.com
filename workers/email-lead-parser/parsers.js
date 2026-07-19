/**
 * Source-specific lead extractors for inbound notification emails.
 *
 * Each parser receives:
 *   - parsedEmail: postal-mime parse result ({ subject, text, html, from, ... })
 *   - message: Cloudflare ForwardableEmailMessage (envelope from/to, headers)
 *
 * and returns a lead object shaped for FUB POST /v1/events:
 *   {
 *     firstName?, lastName?, email?, phone?,
 *     message?, source?, type?,
 *     property?: { street?, city?, state?, code?, mlsNumber?, price?, ... }
 *   }
 *
 * Return null (or an object without email AND phone) to signal "could not parse".
 */

/** @typedef {{ firstName?: string, lastName?: string, email?: string, phone?: string, message?: string, source?: string, type?: string, property?: Record<string, unknown> }} Lead */

/**
 * Domain → parser map. Keys are matched exactly first, then as a parent
 * domain of the envelope sender (see resolveSourceParser).
 */
export const SOURCE_PARSERS = {
  "realscout.com": realscoutParser,
  "homebot.ai": homebotParser,
  "mail.homebot.ai": homebotParser,
  "callaction.co": callactionParser,
  "kvcore.com": kvcoreParser,
};

/**
 * Resolve a parser for an envelope sender domain, including subdomains
 * (e.g. alerts.realscout.com → realscout.com parser).
 *
 * @param {string} senderDomain
 * @returns {(parsedEmail: unknown, message: unknown) => Lead | null}
 */
export function resolveSourceParser(senderDomain) {
  const domain = (senderDomain || "").toLowerCase();
  if (SOURCE_PARSERS[domain]) return SOURCE_PARSERS[domain];

  let bestKey = "";
  for (const key of Object.keys(SOURCE_PARSERS)) {
    if (domain.endsWith(`.${key}`) && key.length > bestKey.length) {
      bestKey = key;
    }
  }
  return bestKey ? SOURCE_PARSERS[bestKey] : genericContactFormParser;
}

/**
 * Generic "Name / Email / Phone / Message" contact-form notification parser.
 * Works for most site form → email plugins (WP forms, Netlify, custom SMTP).
 *
 * @param {{ subject?: string, text?: string, html?: string }} parsedEmail
 * @returns {Lead | null}
 */
export function genericContactFormParser(parsedEmail) {
  const body = emailBodyText(parsedEmail);
  const fields = extractLabeledFields(body);

  const fullName = fields.name || fields.fullname || fields.full_name || "";
  const { firstName, lastName } = splitName(fullName);
  const email = normalizeEmail(fields.email || fields.e_mail || firstEmailIn(body));
  const phone = normalizePhone(fields.phone || fields.telephone || fields.mobile || firstPhoneIn(body));
  const message =
    fields.message ||
    fields.comments ||
    fields.inquiry ||
    fields.notes ||
    truncate(body, 2000);

  if (!email && !phone) return null;

  return {
    firstName,
    lastName,
    email: email || undefined,
    phone: phone || undefined,
    message: message || undefined,
    source: "Website Contact Form",
    type: inferInquiryType(parsedEmail?.subject || "", message || ""),
  };
}

/** @param {{ subject?: string, text?: string, html?: string }} parsedEmail */
export function realscoutParser(parsedEmail) {
  const body = emailBodyText(parsedEmail);
  const fields = extractLabeledFields(body);
  const fullName = fields.name || fields.client || fields.lead || "";
  const { firstName, lastName } = splitName(fullName);
  const email = normalizeEmail(fields.email || firstEmailIn(body));
  const phone = normalizePhone(fields.phone || firstPhoneIn(body));
  const property = extractProperty(fields, body);
  const message =
    fields.message ||
    fields.comments ||
    parsedEmail.subject ||
    "RealScout lead notification";

  if (!email && !phone) return null;

  return {
    firstName,
    lastName,
    email: email || undefined,
    phone: phone || undefined,
    message,
    source: "RealScout",
    type: property ? "Property Inquiry" : "General Inquiry",
    property: property || undefined,
  };
}

/** @param {{ subject?: string, text?: string, html?: string }} parsedEmail */
export function homebotParser(parsedEmail) {
  const body = emailBodyText(parsedEmail);
  const fields = extractLabeledFields(body);
  const fullName = fields.name || fields.homeowner || fields.client || "";
  const { firstName, lastName } = splitName(fullName);
  const email = normalizeEmail(fields.email || firstEmailIn(body));
  const phone = normalizePhone(fields.phone || firstPhoneIn(body));
  const property = extractProperty(fields, body);

  if (!email && !phone) return null;

  return {
    firstName,
    lastName,
    email: email || undefined,
    phone: phone || undefined,
    message: fields.message || parsedEmail.subject || "Homebot lead notification",
    source: "Homebot",
    // Homebot is typically homeowner / seller-side engagement
    type: "Seller Inquiry",
    property: property || undefined,
  };
}

/** @param {{ subject?: string, text?: string, html?: string }} parsedEmail */
export function callactionParser(parsedEmail) {
  const body = emailBodyText(parsedEmail);
  const fields = extractLabeledFields(body);
  const fullName = fields.name || fields.caller || fields.lead || "";
  const { firstName, lastName } = splitName(fullName);
  const email = normalizeEmail(fields.email || firstEmailIn(body));
  const phone = normalizePhone(fields.phone || fields.caller_id || firstPhoneIn(body));

  if (!email && !phone) return null;

  return {
    firstName,
    lastName,
    email: email || undefined,
    phone: phone || undefined,
    message: fields.message || parsedEmail.subject || "CallAction lead notification",
    source: "CallAction",
    type: "General Inquiry",
  };
}

/** @param {{ subject?: string, text?: string, html?: string }} parsedEmail */
export function kvcoreParser(parsedEmail) {
  const body = emailBodyText(parsedEmail);
  const fields = extractLabeledFields(body);
  const fullName = fields.name || fields.lead || fields.contact || "";
  const { firstName, lastName } = splitName(fullName);
  const email = normalizeEmail(fields.email || firstEmailIn(body));
  const phone = normalizePhone(fields.phone || firstPhoneIn(body));
  const property = extractProperty(fields, body);
  const subject = parsedEmail.subject || "";

  if (!email && !phone) return null;

  return {
    firstName,
    lastName,
    email: email || undefined,
    phone: phone || undefined,
    message: fields.message || subject || "kvCORE lead notification",
    source: "kvCORE",
    type: inferInquiryType(subject, fields.message || ""),
    property: property || undefined,
  };
}

// ---------------------------------------------------------------------------
// Shared helpers (exported for unit tests)
// ---------------------------------------------------------------------------

/** @param {{ text?: string, html?: string }} parsedEmail */
export function emailBodyText(parsedEmail) {
  if (parsedEmail?.text?.trim()) return parsedEmail.text;
  if (parsedEmail?.html) return stripHtml(parsedEmail.html);
  return "";
}

/** @param {string} html */
export function stripHtml(html) {
  return String(html)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<\/tr>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

/**
 * Pull "Label: value" pairs from a plain-text email body.
 * Labels are normalized to lowercase snake-ish keys.
 *
 * @param {string} body
 * @returns {Record<string, string>}
 */
export function extractLabeledFields(body) {
  /** @type {Record<string, string>} */
  const fields = {};
  const lines = String(body || "").split(/\r?\n/);

  for (const line of lines) {
    const match = line.match(/^\s*([A-Za-z][A-Za-z0-9 /_-]{0,40})\s*[:：]\s*(.+?)\s*$/);
    if (!match) continue;
    const key = normalizeLabel(match[1]);
    const value = match[2].trim();
    if (key && value && !fields[key]) fields[key] = value;
  }

  // Also support "Label\nvalue" two-line patterns common in HTML→text dumps
  for (let i = 0; i < lines.length - 1; i++) {
    const labelOnly = lines[i].match(/^\s*([A-Za-z][A-Za-z0-9 /_-]{0,40})\s*[:：]?\s*$/);
    if (!labelOnly) continue;
    const next = lines[i + 1]?.trim();
    if (!next || next.includes(":")) continue;
    const key = normalizeLabel(labelOnly[1]);
    if (key && !fields[key]) fields[key] = next;
  }

  return fields;
}

/** @param {string} label */
export function normalizeLabel(label) {
  return String(label)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

/** @param {string} fullName */
export function splitName(fullName) {
  const parts = String(fullName || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

/** @param {string | undefined} value */
export function normalizeEmail(value) {
  if (!value) return "";
  const match = String(value).match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match ? match[0].toLowerCase() : "";
}

/** @param {string | undefined} value */
export function normalizePhone(value) {
  if (!value) return "";
  const digits = String(value).replace(/[^\d+]/g, "");
  // Keep if it looks like a real phone (7+ digits, allowing leading +)
  const digitCount = digits.replace(/\D/g, "").length;
  return digitCount >= 7 ? digits : "";
}

/** @param {string} body */
export function firstEmailIn(body) {
  const match = String(body).match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match ? match[0] : "";
}

/** @param {string} body */
export function firstPhoneIn(body) {
  const match = String(body).match(
    /(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}\b/,
  );
  return match ? match[0] : "";
}

/**
 * @param {Record<string, string>} fields
 * @param {string} body
 */
export function extractProperty(fields, body) {
  const street = fields.address || fields.street || fields.property_address || fields.property || "";
  const city = fields.city || "";
  const state = fields.state || "";
  const code = fields.zip || fields.zip_code || fields.postal_code || fields.code || "";
  const mlsNumber = fields.mls || fields.mls_number || fields.mlsnumber || "";
  const priceRaw = fields.price || fields.list_price || "";
  const priceDigits = priceRaw.replace(/[^\d]/g, "");
  const price = priceDigits ? Number(priceDigits) : undefined;

  if (!street && !mlsNumber && !city) {
    // Last-ditch: look for an MLS# token in the body
    const mlsMatch = String(body).match(/\bMLS[#:\s]+([A-Z0-9-]+)/i);
    if (!mlsMatch) return null;
    return { mlsNumber: mlsMatch[1] };
  }

  /** @type {Record<string, unknown>} */
  const property = {};
  if (street) property.street = street;
  if (city) property.city = city;
  if (state) property.state = state;
  if (code) property.code = code;
  if (mlsNumber) property.mlsNumber = mlsNumber;
  if (price) property.price = price;
  return property;
}

/** @param {string} subject @param {string} message */
export function inferInquiryType(subject, message) {
  const haystack = `${subject} ${message}`.toLowerCase();
  if (/\b(sell|seller|listing|home value|valuation|what.?s my (home|house) worth)\b/.test(haystack)) {
    return "Seller Inquiry";
  }
  if (/\b(mls|property|listing|showing|tour(?:ing|s)?|home for sale|beds?|baths?)\b/.test(haystack)) {
    return "Property Inquiry";
  }
  if (/\b(register|registration|sign.?up|create account)\b/.test(haystack)) {
    return "Registration";
  }
  return "General Inquiry";
}

/** @param {string} text @param {number} max */
export function truncate(text, max) {
  const s = String(text || "").trim();
  if (s.length <= max) return s;
  return `${s.slice(0, max - 1)}…`;
}
