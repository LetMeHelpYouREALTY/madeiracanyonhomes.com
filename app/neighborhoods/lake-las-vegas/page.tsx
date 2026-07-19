import NeighborhoodGuide from "@/components/seo/NeighborhoodGuide";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lake Las Vegas Homes for Sale | Henderson NV | Dr Jan Duffy",
  description:
    "Lake Las Vegas waterfront and golf community homes in Henderson. Compare with Madeira Canyon and Club Madeira. Dr. Jan Duffy, BHHS Nevada Properties. (702) 500-1942.",
  keywords: [
    "Lake Las Vegas homes for sale",
    "Lake Las Vegas Henderson",
    "waterfront homes Henderson NV",
    "Lake Las Vegas realtor",
  ],
  alternates: { canonical: "https://madeiracanyonhomes.com/neighborhoods/lake-las-vegas" },
};

export default function LakeLasVegasPage() {
  return (
    <NeighborhoodGuide
      name="Lake Las Vegas"
      slug="lake-las-vegas"
      h1="Lake Las Vegas Homes for Sale in Henderson"
      intro="Lake Las Vegas offers marina, golf, and resort-village living east of the Anthem / Madeira Canyon corridor. Dr. Jan Duffy helps buyers compare lake premiums with Club Madeira view premiums."
      description="Lake Las Vegas Henderson real estate guide with lifestyle notes, FAQs, and Madeira Canyon comparisons."
      containedIn="Henderson"
      latitude={36.106}
      longitude={-114.928}
      stats={[
        { label: "Lifestyle", value: "Lake + golf" },
        { label: "Home mix", value: "Condos–estates" },
        { label: "Vs Madeira", value: "Water vs views" },
        { label: "City", value: "Henderson" },
      ]}
      highlights={[
        "Private lake, marina, and shoreline paths",
        "Golf courses and resort villages",
        "Condo through custom estate inventory",
        "Event and dining destinations inside the community",
        "Common comparison set with Madeira Canyon and Green Valley",
        "Del Webb Lake Las Vegas nearby for 55+ buyers",
      ]}
      sections={[
        {
          title: "Lake premium vs Madeira elevation",
          body: "Lake Las Vegas pricing often reflects water proximity, golf membership options, and village HOA layers. Madeira Canyon and Club Madeira price more for elevation, canyon backdrop, and Strip night views. We run a same-square-footage comparison so relocators see the real monthly cost difference, not just list price.",
        },
        {
          title: "Who fits Lake Las Vegas",
          body: "Buyers who want marina access, resort dining, and golf calendars. Condos and townhomes can lower the entry point versus custom lakefront estates. Confirm boat slips, rental rules, and HOA special assessments in writing before escrow.",
        },
      ]}
      faqs={[
        {
          question: "Is Lake Las Vegas part of Henderson?",
          answer:
            "Yes. Lake Las Vegas is in Henderson, NV, east of the Anthem / Madeira Canyon area. Commute times to the Strip and McCarran/Harry Reid corridors vary by village and traffic.",
        },
        {
          question: "Should I buy Lake Las Vegas or Madeira Canyon?",
          answer:
            "Choose Lake Las Vegas for water and resort villages; choose Madeira Canyon / Club Madeira for elevated Anthem living, parks, and canyon trails. Dr. Jan Duffy can tour both in one day from the Bonaparte Ln office area.",
        },
        {
          question: "Are there 55+ options near Lake Las Vegas?",
          answer:
            "Yes. Del Webb at Lake Las Vegas is a nearby active-adult community. See our 55+ pages or call (702) 500-1942 for current inventory.",
        },
        {
          question: "How do I start a Lake Las Vegas search?",
          answer:
            "Call Dr. Jan Duffy at (702) 500-1942 or use the RealScout listings on this page. Office: Suite A, 2721 Bonaparte Ln, Henderson, NV 89044.",
        },
      ]}
      relatedLinks={[
        { href: "/neighborhoods/madeira-canyon", label: "Madeira Canyon" },
        { href: "/55-plus-communities/del-webb-lake-las-vegas", label: "Del Webb Lake Las Vegas" },
        { href: "/luxury-homes", label: "Luxury homes" },
        { href: "/neighborhoods/henderson", label: "Henderson neighborhoods" },
      ]}
      quote="Lake Las Vegas is a lifestyle product. I put marina fees and golf options next to Club Madeira dues so the comparison is honest before anyone falls in love with a model home."
    />
  );
}
