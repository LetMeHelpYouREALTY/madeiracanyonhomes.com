import { describe, expect, it } from "vitest";
import {
  callactionParser,
  extractLabeledFields,
  genericContactFormParser,
  homebotParser,
  inferInquiryType,
  kvcoreParser,
  normalizeEmail,
  normalizePhone,
  realscoutParser,
  resolveSourceParser,
  splitName,
  stripHtml,
} from "./parsers.js";

describe("resolveSourceParser", () => {
  it("matches exact domains and parent domains", () => {
    expect(resolveSourceParser("realscout.com").name).toBe("realscoutParser");
    expect(resolveSourceParser("alerts.realscout.com").name).toBe("realscoutParser");
    expect(resolveSourceParser("mail.homebot.ai").name).toBe("homebotParser");
    expect(resolveSourceParser("notify.callaction.co").name).toBe("callactionParser");
    expect(resolveSourceParser("app.kvcore.com").name).toBe("kvcoreParser");
  });

  it("falls back to the generic contact-form parser", () => {
    expect(resolveSourceParser("forms.heyberkshire.com").name).toBe(
      "genericContactFormParser",
    );
  });
});

describe("field helpers", () => {
  it("splits names", () => {
    expect(splitName("Jane Doe")).toEqual({ firstName: "Jane", lastName: "Doe" });
    expect(splitName("Madonna")).toEqual({ firstName: "Madonna", lastName: "" });
  });

  it("normalizes email and phone", () => {
    expect(normalizeEmail("Email: Jane.Doe@Example.COM")).toBe("jane.doe@example.com");
    expect(normalizePhone("(702) 222-1964")).toBe("7022221964");
    expect(normalizePhone("123")).toBe("");
  });

  it("strips HTML into readable text", () => {
    const text = stripHtml("<p>Name: Jane</p><br>Email: jane@example.com");
    expect(text).toContain("Name: Jane");
    expect(text).toContain("Email: jane@example.com");
  });

  it("extracts labeled fields from plain text", () => {
    const fields = extractLabeledFields(
      ["Name: Jane Doe", "Email: jane@example.com", "Phone: 702-555-0100", "Message: Looking in Summerlin"].join(
        "\n",
      ),
    );
    expect(fields.name).toBe("Jane Doe");
    expect(fields.email).toBe("jane@example.com");
    expect(fields.phone).toBe("702-555-0100");
    expect(fields.message).toBe("Looking in Summerlin");
  });

  it("infers FUB inquiry types from subject/body", () => {
    expect(inferInquiryType("Home valuation request", "")).toBe("Seller Inquiry");
    expect(inferInquiryType("Showing request", "MLS# 1234567")).toBe("Property Inquiry");
    expect(inferInquiryType("New registration", "")).toBe("Registration");
    expect(inferInquiryType("Hello", "Just saying hi")).toBe("General Inquiry");
  });
});

describe("genericContactFormParser", () => {
  it("parses a typical contact-form notification", () => {
    const lead = genericContactFormParser({
      subject: "New contact form submission",
      text: [
        "Name: Alex Rivera",
        "Email: alex@example.com",
        "Phone: (702) 555-0199",
        "Message: Interested in touring a condo near Downtown Summerlin.",
      ].join("\n"),
    });

    expect(lead).toMatchObject({
      firstName: "Alex",
      lastName: "Rivera",
      email: "alex@example.com",
      phone: "7025550199",
      source: "Website Contact Form",
      type: "Property Inquiry",
    });
    expect(lead.message).toContain("Downtown Summerlin");
  });

  it("returns null when neither email nor phone is present", () => {
    expect(
      genericContactFormParser({
        text: "Name: Nobody\nMessage: no contact info",
      }),
    ).toBeNull();
  });
});

describe("vendor parsers", () => {
  it("realscoutParser extracts property inquiry fields", () => {
    const lead = realscoutParser({
      subject: "New RealScout lead",
      text: [
        "Name: Sam Buyer",
        "Email: sam@example.com",
        "Phone: 702-555-0111",
        "Address: 123 Main St",
        "City: Las Vegas",
        "State: NV",
        "Zip: 89135",
        "MLS: 2554321",
        "Price: $1,250,000",
        "Message: Can we tour this week?",
      ].join("\n"),
    });

    expect(lead).toMatchObject({
      firstName: "Sam",
      lastName: "Buyer",
      email: "sam@example.com",
      source: "RealScout",
      type: "Property Inquiry",
      property: {
        street: "123 Main St",
        city: "Las Vegas",
        state: "NV",
        code: "89135",
        mlsNumber: "2554321",
        price: 1250000,
      },
    });
  });

  it("homebotParser defaults to Seller Inquiry", () => {
    const lead = homebotParser({
      subject: "Homebot engagement",
      text: "Name: Pat Owner\nEmail: pat@example.com\nPhone: 7025550122",
    });
    expect(lead).toMatchObject({
      firstName: "Pat",
      lastName: "Owner",
      source: "Homebot",
      type: "Seller Inquiry",
    });
  });

  it("callactionParser captures caller phone", () => {
    const lead = callactionParser({
      subject: "Missed call lead",
      text: "Name: Chris Caller\nCaller ID: 702-555-0133\nEmail: chris@example.com",
    });
    expect(lead).toMatchObject({
      firstName: "Chris",
      lastName: "Caller",
      phone: "7025550133",
      source: "CallAction",
      type: "General Inquiry",
    });
  });

  it("kvcoreParser infers seller inquiry from subject", () => {
    const lead = kvcoreParser({
      subject: "Seller lead — home value",
      text: "Lead: Morgan Seller\nEmail: morgan@example.com",
    });
    expect(lead).toMatchObject({
      firstName: "Morgan",
      lastName: "Seller",
      source: "kvCORE",
      type: "Seller Inquiry",
    });
  });
});
