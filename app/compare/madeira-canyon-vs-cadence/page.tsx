import CompareGuide from "@/components/seo/CompareGuide";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Madeira Canyon vs Cadence | Henderson Comparison",
  description:
    "Madeira Canyon vs Cadence Henderson: resale elevation vs new construction incentives. Side-by-side buyer guide by Dr. Jan Duffy. (702) 500-1942.",
  alternates: {
    canonical:
      "https://madeiracanyonhomes.com/compare/madeira-canyon-vs-cadence",
  },
};

export default function MadeiraVsCadencePage() {
  return (
    <CompareGuide
      title="Madeira Canyon vs Cadence"
      path="/compare/madeira-canyon-vs-cadence"
      h1="Madeira Canyon vs Cadence Henderson"
      intro="Established Anthem / Madeira Canyon living versus Cadence’s newer builder villages — a comparison relocators ask before booking flights."
      description="Side-by-side comparison of Madeira Canyon and Cadence for Henderson NV buyers."
      leftName="Madeira Canyon"
      rightName="Cadence"
      rows={[
        {
          factor: "Product mix",
          left: "Mostly resale; Club Madeira & Videiras enclaves",
          right: "Strong new-construction pipeline + newer resales",
        },
        {
          factor: "Price story",
          left: "Median near $745K; Club Madeira $900K–$1.3M+",
          right: "Often lower entry with builder incentives (varies by village)",
        },
        {
          factor: "Lifestyle draw",
          left: "Elevation, trails, Club Madeira clubhouse",
          right: "Modern plans, parks, master-plan programming",
        },
        {
          factor: "Buyer representation tip",
          left: "Focus CMA inside the correct village/HOA",
          right: "Register with your agent before the first builder visit",
        },
      ]}
      sections={[
        {
          title: "When Cadence wins",
          body: "You want a newer roof/HVAC profile, open floor plans, and builder credits that reduce cash to close. Independent representation still matters on builder lots.",
        },
        {
          title: "When Madeira Canyon wins",
          body: "You want Club Madeira amenities, canyon/Strip views, or an established Anthem street grid near Madeira Canyon Park. Resale diligence on systems age is the tradeoff.",
        },
      ]}
      faqs={[
        {
          question: "Can I afford Club Madeira if Cadence fits my budget?",
          answer:
            "Sometimes—not always. Run payment with HOA and insurance for both. Call (702) 500-1942 for a same-day net sheet comparison.",
        },
        {
          question: "Which appreciates more?",
          answer:
            "UNKNOWN without a property-level CMA and hold period. We review sold trends in both communities for the home types you actually want.",
        },
        {
          question: "Who helps compare them?",
          answer:
            "Dr. Jan Duffy, Madeira Canyon | Homes by Dr Jan Duffy, Suite A, 2721 Bonaparte Ln, Henderson, NV 89044. License S.0197614.LLC.",
        },
      ]}
      relatedLinks={[
        { href: "/neighborhoods/madeira-canyon", label: "Madeira Canyon" },
        { href: "/neighborhoods/cadence", label: "Cadence" },
        { href: "/new-construction", label: "New construction" },
        { href: "/guides/henderson-relocation", label: "Relocation guide" },
      ]}
    />
  );
}
