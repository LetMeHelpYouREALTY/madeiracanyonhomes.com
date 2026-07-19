import NeighborhoodGuide from "@/components/seo/NeighborhoodGuide";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Club Madeira Homes | clubmadeirahoa.com | Henderson NV",
  description:
    "Club Madeira (The Club at Madeira Canyon) homes for sale in Henderson. clubmadeirahoa.com community buyers — resort clubhouse, valley views, ~$900K–$1.3M+. Dr. Jan Duffy (702) 500-1942.",
  keywords: [
    "clubmadeirahoa.com",
    "Club Madeira HOA",
    "Club Madeira Henderson",
    "Club at Madeira Canyon",
    "Club Madeira homes for sale",
    "Madeira Canyon | Homes by Dr Jan Duffy",
  ],
  alternates: { canonical: "https://madeiracanyonhomes.com/neighborhoods/club-madeira" },
  openGraph: {
    title: "Club Madeira Homes | clubmadeirahoa.com",
    description:
      "Buy or sell inside Club Madeira / The Club at Madeira Canyon with Dr. Jan Duffy.",
    url: "https://madeiracanyonhomes.com/neighborhoods/club-madeira",
  },
};

export default function ClubMadeiraPage() {
  return (
    <NeighborhoodGuide
      name="Club Madeira"
      slug="club-madeira"
      h1="Club Madeira Homes for Sale (clubmadeirahoa.com)"
      intro="The Club at Madeira Canyon — often searched as Club Madeira or clubmadeirahoa.com — is the guard-gated resort village inside Madeira Canyon. Dr. Jan Duffy helps buyers and sellers navigate inventory, HOA rules, and view premiums."
      description="Club Madeira Henderson real estate guide covering The Club at Madeira Canyon, amenities, pricing, and HOA questions for clubmadeirahoa.com searches."
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
        "Primary SEO keyword: clubmadeirahoa.com (community/HOA site)",
        "Resort clubhouse with elevated valley and Strip night views",
        "Pool, fitness, and resident gathering spaces",
        "Roaming security / gated entry for the Club village",
        "Larger lots and upgraded outdoor living vs many Anthem peers",
        "Office nearby at Suite A, 2721 Bonaparte Ln, Henderson, NV 89044",
      ]}
      sections={[
        {
          title: "clubmadeirahoa.com vs MadeiraCanyonHomes.com",
          body: "clubmadeirahoa.com is the Club Madeira community and HOA information site. MadeiraCanyonHomes.com is Madeira Canyon | Homes by Dr Jan Duffy — a Berkshire Hathaway HomeServices Nevada Properties site for buying and selling homes in Club Madeira and the wider Madeira Canyon area. Use the HOA site for covenants and amenity rules; use this site for MLS search, pricing strategy, and representation.",
        },
        {
          title: "What buyers pay for inside The Club",
          body: "Public listing ranges for Club at Madeira commonly fall between about $900,000 and $1.3 million, with premium view lots and remodeled homes trading higher. Buyers typically weigh clubhouse access, gate convenience, and elevation against HOA dues and any age or occupancy rules that apply to the specific parcel. Always confirm current HOA documents before escrow.",
        },
        {
          title: "How we search Club Madeira inventory",
          body: "Dr. Jan Duffy filters RealScout and MLS for Club Madeira, Videiras, and adjacent Madeira Canyon streets, then compares price per square foot, days on market, and view corridors. Call (702) 500-1942 to set alerts for new Club Madeira listings that match your bed/bath and garage criteria.",
        },
      ]}
      faqs={[
        {
          question: "What is Club Madeira in Henderson?",
          answer:
            "Club Madeira is The Club at Madeira Canyon, a guard-gated village of roughly 546 homes inside the Madeira Canyon master plan in Henderson, NV 89044. Residents use a resort-style clubhouse and pool with notable valley views.",
        },
        {
          question: "Is clubmadeirahoa.com a real estate brokerage site?",
          answer:
            "No. clubmadeirahoa.com is associated with the Club Madeira community/HOA. For buying or selling representation, contact Dr. Jan Duffy at MadeiraCanyonHomes.com — Berkshire Hathaway HomeServices Nevada Properties.",
        },
        {
          question: "How much do Club Madeira homes cost?",
          answer:
            "As of 2026 market summaries, Club Madeira homes commonly list or sell between about $900,000 and $1.3 million+, depending on square footage, remodeling, and Strip or canyon views. Ask for a current CMA before pricing a listing.",
        },
        {
          question: "Can Dr. Jan Duffy list my Club Madeira home?",
          answer:
            "Yes. Call (702) 500-1942 or email DrDuffy@MadeiraCanyonHomes.com. Office hours and NAP: Suite A, 2721 Bonaparte Ln, Henderson, NV 89044. License S.0197614.LLC.",
        },
      ]}
      relatedLinks={[
        { href: "/neighborhoods/madeira-canyon", label: "Madeira Canyon overview" },
        { href: "/guides/club-madeira-hoa", label: "HOA & dues FAQ" },
        { href: "/guides/selling-madeira-canyon", label: "Selling guide" },
        { href: "/compare/madeira-canyon-vs-anthem", label: "vs Anthem" },
        { href: "/home-valuation", label: "Home valuation" },
      ]}
      quote="Club Madeira searches often start at clubmadeirahoa.com. I translate HOA rules and amenity access into a clear offer strategy so buyers know exactly what they are paying for beyond the gate."
    />
  );
}
