import NeighborhoodGuide from "@/components/seo/NeighborhoodGuide";
import type { Metadata } from "next";
import { REALSCOUT_SEARCH_URL } from "@/lib/realscout";

export const metadata: Metadata = {
  title: "Club Madeira Homes | Madeira Canyon Homes | Henderson NV",
  description:
    "Club Madeira (The Club at Madeira Canyon) homes for sale in Henderson. Madeira Canyon Homes buyers — resort clubhouse, valley views, ~$900K–$1.3M+. Dr. Jan Duffy (702) 500-1942.",
  keywords: [
    "Madeira Canyon Homes",
    "Club Madeira HOA",
    "Club Madeira Henderson",
    "Club at Madeira Canyon",
    "Club Madeira homes for sale",
    "Madeira Canyon | Homes by Dr Jan Duffy",
  ],
  alternates: { canonical: "https://www.madeiracanyonhomes.com/neighborhoods/club-madeira" },
  openGraph: {
    title: "Club Madeira Homes | Madeira Canyon Homes",
    description:
      "Buy or sell inside Club Madeira / The Club at Madeira Canyon with Dr. Jan Duffy.",
    url: "https://www.madeiracanyonhomes.com/neighborhoods/club-madeira",
  },
};

export default function ClubMadeiraPage() {
  return (
    <NeighborhoodGuide
      name="Club Madeira"
      slug="club-madeira"
      h1="Club Madeira Homes for Sale (Madeira Canyon Homes)"
      intro="The Club at Madeira Canyon — often searched as Club Madeira or Madeira Canyon Homes — is the guard-gated resort village inside Madeira Canyon. Browse homes for sale, then work with Dr. Jan Duffy on HOA rules, pricing, and offers."
      description="Club Madeira Henderson real estate guide covering The Club at Madeira Canyon, amenities, pricing, and HOA questions for Madeira Canyon Homes searches."
      containedIn="Henderson"
      latitude={35.927504}
      longitude={-115.090006}
      stats={[
        { label: "Typical price band", value: "$900K–$1.3M+" },
        { label: "Homes in Club", value: "~546" },
        { label: "Access", value: "Guard-gated" },
        { label: "Parent community", value: "Madeira Canyon" },
      ]}
      highlights={[
        "Focus: Madeira Canyon Homes and Club Madeira",
        "Resort clubhouse with elevated valley and Strip night views",
        "Pool, fitness, and resident gathering spaces",
        "Roaming security / gated entry for the Club village",
        "Larger lots and upgraded outdoor living vs many Anthem peers",
        "Office nearby at Suite A, 2721 Bonaparte Ln, Henderson, NV 89044",
      ]}
      sections={[
        {
          title: "Club Madeira HOA vs Madeira Canyon Homes",
          body: "The Club Madeira HOA has a community information site for covenants and amenity rules. Madeira Canyon Homes (MadeiraCanyonHomes.com) is Dr. Jan Duffy — Berkshire Hathaway HomeServices Nevada Properties — for buying and selling. Looking for homes? Use Search Homes for Sale on this site, or call Dr. Jan.",
        },
        {
          title: "What buyers pay for inside The Club",
          body: "Public listing ranges for Club at Madeira commonly fall between about $900,000 and $1.3 million, with premium view lots and remodeled homes trading higher. Buyers typically weigh clubhouse access, gate convenience, and elevation against HOA dues and any age or occupancy rules that apply to the specific parcel. Always confirm current HOA documents before you buy.",
        },
        {
          title: "How we find Club Madeira homes",
          body: "Start with the home search on this site for Club Madeira, Videiras, and nearby Madeira Canyon streets. Dr. Jan Duffy then compares price per square foot, days on market, and view corridors. Call (702) 500-1942 to get alerts that match your bed/bath and garage needs.",
        },
      ]}
      faqs={[
        {
          question: "What is Club Madeira in Henderson?",
          answer:
            "Club Madeira is The Club at Madeira Canyon, a guard-gated village of roughly 546 homes inside the Madeira Canyon master plan in Henderson, NV 89044. Residents use a resort-style clubhouse and pool with notable valley views.",
        },
        {
          question: "Where should I search for Club Madeira homes?",
          answer:
            "Use Search Homes for Sale on Madeira Canyon Homes (MadeiraCanyonHomes.com), or call Dr. Jan Duffy. The Club Madeira HOA site is for community rules — not for buying or selling a house.",
        },
        {
          question: "Is the Club Madeira HOA website a real estate brokerage site?",
          answer:
            "No. That site is for the Club Madeira community/HOA. Search homes for sale on Madeira Canyon Homes, then contact Dr. Jan Duffy for help buying or selling.",
        },
        {
          question: "How much do Club Madeira homes cost?",
          answer:
            "As of 2026 market summaries, Club Madeira homes commonly list or sell between about $900,000 and $1.3 million+, depending on square footage, remodeling, and Strip or canyon views. Ask Dr. Jan for a current price opinion before you list or buy.",
        },
        {
          question: "Can Dr. Jan Duffy list my Club Madeira home?",
          answer:
            "Yes. Call (702) 500-1942 or email DrDuffy@MadeiraCanyonHomes.com. Office hours and NAP: Suite A, 2721 Bonaparte Ln, Henderson, NV 89044. License S.0197614.LLC.",
        },
      ]}
      relatedLinks={[
        { href: REALSCOUT_SEARCH_URL, label: "Search Club Madeira homes for sale" },
        { href: "/neighborhoods/madeira-canyon", label: "Madeira Canyon overview" },
        { href: "/guides/club-madeira-hoa", label: "HOA & dues FAQ" },
        { href: "/guides/selling-madeira-canyon", label: "Selling guide" },
        { href: "/compare/madeira-canyon-vs-anthem", label: "vs Anthem" },
        { href: "/home-valuation", label: "What’s my home worth?" },
      ]}
      quote="Club Madeira searches often start with Madeira Canyon Homes. I help buyers find the right home for sale, then explain HOA rules and amenity access in plain English before they write an offer."
    />
  );
}
