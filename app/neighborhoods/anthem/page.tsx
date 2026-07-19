import NeighborhoodGuide from "@/components/seo/NeighborhoodGuide";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anthem Highlands Homes for Sale | Henderson NV | Dr Jan Duffy",
  description:
    "Anthem Highlands and Anthem Country Club homes in Henderson. Compare Madeira Canyon, Anthem parks, and golf-adjacent living with Dr. Jan Duffy. Call (702) 500-1942.",
  keywords: [
    "Anthem Highlands homes",
    "Anthem Henderson NV",
    "Anthem Country Club real estate",
    "Madeira Canyon Anthem",
    "Henderson Anthem realtor",
  ],
  alternates: { canonical: "https://www.madeiracanyonhomes.com/neighborhoods/anthem" },
};

export default function AnthemPage() {
  return (
    <NeighborhoodGuide
      name="Anthem"
      slug="anthem"
      h1="Anthem Highlands Homes for Sale in Henderson"
      intro="Anthem is the larger Henderson corridor that includes Madeira Canyon, Club Madeira, parks, and golf-adjacent villages. Dr. Jan Duffy helps you pick the right Anthem pocket for square footage, HOA level, and commute."
      description="Anthem Highlands Henderson real estate guide with Madeira Canyon context, amenities, and FAQs."
      containedIn="Henderson"
      latitude={35.96}
      longitude={-115.08}
      stats={[
        { label: "Area focus", value: "89044 / 89052" },
        { label: "Madeira median", value: "~$745K" },
        { label: "Lifestyle", value: "Parks + trails" },
        { label: "Nearby hubs", value: "St. Rose / 215" },
      ]}
      highlights={[
        "Master-planned Anthem parks and recreation centers",
        "Madeira Canyon and Club Madeira within the Anthem Highlands area",
        "Access toward St. Rose Parkway and I-215",
        "Mix of gated and non-gated villages",
        "Proximity to Sun City Anthem for 55+ comparisons",
        "Strong relocator interest from California and the Midwest",
      ]}
      sections={[
        {
          title: "Anthem vs Madeira Canyon naming",
          body: "Buyers often say “Anthem” when they mean Anthem Highlands, Anthem Country Club, or Madeira Canyon specifically. Madeira Canyon is a named village inside this corridor. If you need Club Madeira amenities or Videiras gates, we narrow MLS searches past the broad Anthem label so you are not touring the wrong HOA.",
        },
        {
          title: "Who typically tours Anthem",
          body: "Relocators wanting Henderson schools by name (confirm CCSD/feeder maps for the exact address), outdoor buyers using Black Mountain trails, and move-up sellers leaving older Green Valley stock. Commute to the Las Vegas medical and Strip employment corridors is commonly 20–35 minutes.",
        },
        {
          title: "How we compare Anthem villages",
          body: "We line up HOA dues, gate status, lot size, HVAC age, and pool costs next to recent solds. Call (702) 500-1942 for a side-by-side of Anthem Highlands vs Club Madeira vs Inspirada before you write an offer.",
        },
      ]}
      faqs={[
        {
          question: "Is Madeira Canyon part of Anthem?",
          answer:
            "Yes. Madeira Canyon sits in the Anthem Highlands area of Henderson. Club Madeira and Videiras are villages within that Madeira Canyon / Anthem context, each with its own gate and amenity rules.",
        },
        {
          question: "What should I budget for Anthem-area homes?",
          answer:
            "Budgets vary widely by village. Madeira Canyon’s recent median sale sits near $745K, while Club Madeira often runs $900K–$1.3M+. Non-gated Anthem streets can price lower depending on square footage and condition.",
        },
        {
          question: "How do I choose between Anthem and Inspirada?",
          answer:
            "Anthem/Madeira leans elevated terrain, established landscaping, and Club Madeira amenities. Inspirada leans newer construction and resort-pool master planning. Use our comparison page or call Dr. Jan Duffy for a property-level walkthrough.",
        },
        {
          question: "Where is your Anthem-area office?",
          answer:
            "Madeira Canyon | Homes by Dr Jan Duffy is at Suite A, 2721 Bonaparte Ln, Henderson, NV 89044. Phone (702) 500-1942. License S.0197614.LLC, Berkshire Hathaway HomeServices Nevada Properties.",
        },
      ]}
      relatedLinks={[
        { href: "/neighborhoods/madeira-canyon", label: "Madeira Canyon" },
        { href: "/neighborhoods/club-madeira", label: "Club Madeira" },
        { href: "/compare/madeira-canyon-vs-anthem", label: "Madeira vs Anthem" },
        { href: "/55-plus-communities/sun-city-anthem", label: "Sun City Anthem" },
        { href: "/neighborhoods/henderson", label: "Henderson overview" },
      ]}
      quote="Anthem is a map label; Madeira Canyon and Club Madeira are the product. I keep buyers from mixing HOAs so the first tour day is already filtered."
    />
  );
}
