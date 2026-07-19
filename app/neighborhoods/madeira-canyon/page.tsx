import NeighborhoodGuide from "@/components/seo/NeighborhoodGuide";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Madeira Canyon Homes for Sale | Henderson NV | Dr Jan Duffy",
  description:
    "Madeira Canyon homes in Henderson, NV — median sale near $745K (2026). Club Madeira, Videiras, trails, Strip views. Madeira Canyon | Homes by Dr Jan Duffy. Call (702) 500-1942.",
  keywords: [
    "Madeira Canyon homes for sale",
    "Madeira Canyon Henderson",
    "clubmadeirahoa.com",
    "Club Madeira homes",
    "Madeira Canyon real estate",
    "Homes by Dr Jan Duffy",
  ],
  alternates: { canonical: "https://www.madeiracanyonhomes.com/neighborhoods/madeira-canyon" },
  openGraph: {
    title: "Madeira Canyon Homes for Sale | Henderson NV",
    description:
      "Buy or sell in Madeira Canyon and Club Madeira with Dr. Jan Duffy, BHHS Nevada Properties.",
    url: "https://www.madeiracanyonhomes.com/neighborhoods/madeira-canyon",
  },
};

export default function MadeiraCanyonPage() {
  return (
    <NeighborhoodGuide
      name="Madeira Canyon"
      slug="madeira-canyon"
      h1="Madeira Canyon Homes for Sale in Henderson, NV"
      intro="Elevated Anthem-area living with canyon trails, Madeira Canyon Park, and Club Madeira amenities — guided by Dr. Jan Duffy at Berkshire Hathaway HomeServices Nevada Properties."
      description="Madeira Canyon real estate guide for Henderson, NV including Club Madeira, Videiras, market stats, amenities, and FAQs."
      containedIn="Henderson"
      latitude={35.927504}
      longitude={-115.090006}
      stats={[
        { label: "Median sale (12 mo)", value: "$745K" },
        { label: "YoY change", value: "+8%" },
        { label: "Typical DOM", value: "45 days" },
        { label: "Price band", value: "$515K–$2M+" },
      ]}
      highlights={[
        "Master-planned Anthem Highlands location in ZIP 89044",
        "Madeira Canyon Park with lighted fields, tennis, splash pad",
        "Club at Madeira (Club Madeira) resort clubhouse and pool",
        "Videiras guard-gated enclave with larger custom-style homes",
        "Black Mountain and Nevada Power Trail access nearby",
        "Water-smart landscaping and walkable sidewalk network",
      ]}
      sections={[
        {
          title: "Where Madeira Canyon sits in Henderson",
          body: "Madeira Canyon sits in southeast Henderson within the broader Anthem Highlands area, roughly near Suite A, 2721 Bonaparte Ln, Henderson, NV 89044. Buyers often compare it with Inspirada, Cadence, and Lake Las Vegas for commute time to the Las Vegas Strip (about 20–30 minutes depending on traffic) and outdoor access to Black Mountain trails.",
        },
        {
          title: "Home types and price bands (2026)",
          body: "Across Madeira Canyon, recent public market summaries put the 12-month median sale near $745,000 (about +8% year over year), with list medians near $755K. Non-gated sections often trade roughly $550K–$750K depending on square footage and upgrades. Guard-gated Videiras commonly runs about $800K–$1.25M. Club at Madeira (Club Madeira / clubmadeirahoa.com community searches) typically ranges about $900K–$1.3M+ for elevated lots with valley and Strip views.",
        },
        {
          title: "Amenities buyers ask about first",
          body: "Madeira Canyon Park anchors recreation with baseball fields, tennis courts, a splash pad, and playgrounds. Club Madeira residents use the community clubhouse, pool, and fitness spaces. Trail connections support walking and cycling without leaving the Anthem corridor. Always verify current HOA dues, age rules, and amenity access for the specific village before writing an offer.",
        },
      ]}
      faqs={[
        {
          question: "What is the median home price in Madeira Canyon in 2026?",
          answer:
            "Recent public summaries show a Madeira Canyon 12-month median sale near $745,000, up about 8% year over year, with average value estimates near $845K and roughly $296 per square foot. Club Madeira and Videiras listings often price higher than the broader neighborhood median.",
        },
        {
          question: "Is Club Madeira the same as Madeira Canyon?",
          answer:
            "Club Madeira (The Club at Madeira Canyon) is a guard-gated village inside the larger Madeira Canyon master plan. Madeira Canyon also includes non-gated streets and enclaves such as Videiras. clubmadeirahoa.com is the community/HOA site; MadeiraCanyonHomes.com is Dr. Jan Duffy’s brokerage site for buying and selling.",
        },
        {
          question: "How large are typical Madeira Canyon homes?",
          answer:
            "Many resale homes run about 1,800–3,500+ square feet with three to five bedrooms. Videiras and Club Madeira homes often sit on the larger end with three-car garages, private pools, and upgraded outdoor living spaces.",
        },
        {
          question: "Who should I call to tour Madeira Canyon homes?",
          answer:
            "Call Dr. Jan Duffy at (702) 500-1942 or email DrDuffy@MadeiraCanyonHomes.com. Office: Suite A, 2721 Bonaparte Ln, Henderson, NV 89044. Berkshire Hathaway HomeServices Nevada Properties, license S.0197614.LLC.",
        },
      ]}
      relatedLinks={[
        { href: "/neighborhoods/club-madeira", label: "Club Madeira homes" },
        { href: "/guides/buying-madeira-canyon-homes", label: "Buying guide" },
        { href: "/guides/madeira-canyon-schools", label: "Madeira Canyon schools" },
        { href: "/guides/club-madeira-hoa", label: "Club Madeira HOA FAQ" },
        { href: "/compare/madeira-canyon-vs-inspirada", label: "vs Inspirada" },
        { href: "/neighborhoods/anthem", label: "Anthem Highlands" },
      ]}
      quote="Madeira Canyon buyers usually care about elevation, trail access, and whether they want Club Madeira amenities or a quieter non-gated street. I match the village to the commute and the square footage—not a generic Henderson ZIP code search."
    />
  );
}
