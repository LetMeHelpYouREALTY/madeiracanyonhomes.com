import CompareGuide from "@/components/seo/CompareGuide";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Madeira Canyon vs Anthem | Henderson Area Comparison",
  description:
    "Madeira Canyon vs Anthem Highlands: naming, gates, Club Madeira, parks. Clear comparison for Henderson buyers. Dr. Jan Duffy (702) 500-1942.",
  alternates: {
    canonical: "https://www.madeiracanyonhomes.com/compare/madeira-canyon-vs-anthem",
  },
};

export default function MadeiraVsAnthemPage() {
  return (
    <CompareGuide
      title="Madeira Canyon vs Anthem"
      path="/compare/madeira-canyon-vs-anthem"
      h1="Madeira Canyon vs Anthem: What’s the Difference?"
      intro="Anthem is the broader Henderson corridor. Madeira Canyon is a specific village (with Club Madeira and Videiras inside it). This page stops the naming confusion before you tour the wrong HOA."
      description="Comparison explaining Madeira Canyon versus the broader Anthem Highlands area in Henderson, NV."
      leftName="Madeira Canyon"
      rightName="Anthem (broader)"
      rows={[
        {
          factor: "What it is",
          left: "Named master-plan village in Anthem Highlands / 89044",
          right: "Larger map label covering multiple villages and HOAs",
        },
        {
          factor: "Search intent",
          left: "Madeira Canyon homes, Club Madeira, clubmadeirahoa.com",
          right: "Anthem Henderson, Anthem Country Club, Anthem parks",
        },
        {
          factor: "Pricing",
          left: "Median near $745K; Club Madeira higher",
          right: "Wide band depending on which Anthem village you mean",
        },
        {
          factor: "Amenity focus",
          left: "Madeira Canyon Park + Club Madeira clubhouse",
          right: "Shared Anthem parks/recreation plus village-specific clubs",
        },
        {
          factor: "When to use the term",
          left: "When you want this village or Club Madeira specifically",
          right: "When you are still exploring the whole corridor",
        },
      ]}
      sections={[
        {
          title: "Why AI and Google mix these terms",
          body: "Listings, HOA sites, and relocators use “Anthem” loosely. Structured pages like this one—and Place schema on the Madeira Canyon URL—help answer engines cite the village correctly. Always confirm the HOA name on the listing paperwork.",
        },
        {
          title: "Practical buying tip",
          body: "If a buyer says Anthem but wants clubmadeirahoa.com amenities, start in Club Madeira. If they want golf-club living, we may tour Anthem Country Club instead. One phone screen at (702) 500-1942 saves a wasted tour day.",
        },
      ]}
      faqs={[
        {
          question: "Is Madeira Canyon inside Anthem?",
          answer:
            "Yes. Madeira Canyon sits in the Anthem Highlands area of Henderson. Club Madeira is a gated village within Madeira Canyon.",
        },
        {
          question: "Should my search say Anthem or Madeira Canyon?",
          answer:
            "Use Madeira Canyon or Club Madeira when that is the target. Use Anthem when you want a wider net across multiple HOAs.",
        },
        {
          question: "Where is your office?",
          answer:
            "Suite A, 2721 Bonaparte Ln, Henderson, NV 89044 — in the Madeira Canyon / Anthem area. Madeira Canyon | Homes by Dr Jan Duffy.",
        },
      ]}
      relatedLinks={[
        { href: "/neighborhoods/madeira-canyon", label: "Madeira Canyon" },
        { href: "/neighborhoods/anthem", label: "Anthem guide" },
        { href: "/neighborhoods/club-madeira", label: "Club Madeira" },
        { href: "/guides/club-madeira-hoa", label: "HOA FAQ" },
      ]}
    />
  );
}
