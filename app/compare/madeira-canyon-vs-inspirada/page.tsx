import CompareGuide from "@/components/seo/CompareGuide";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Madeira Canyon vs Inspirada | Henderson Neighborhood Comparison",
  description:
    "Madeira Canyon vs Inspirada: prices, amenities, new vs resale, Club Madeira. Which Henderson community fits you? Dr. Jan Duffy (702) 500-1942.",
  alternates: {
    canonical:
      "https://www.madeiracanyonhomes.com/compare/madeira-canyon-vs-inspirada",
  },
};

export default function MadeiraVsInspiradaPage() {
  return (
    <CompareGuide
      title="Madeira Canyon vs Inspirada"
      path="/compare/madeira-canyon-vs-inspirada"
      h1="Madeira Canyon vs Inspirada: Which Henderson Community Fits?"
      intro="Two popular Henderson choices with different product stories: Madeira Canyon’s elevated Anthem living and Club Madeira amenities versus Inspirada’s newer resort-style master plan."
      description="Side-by-side comparison of Madeira Canyon and Inspirada for Henderson NV home buyers."
      leftName="Madeira Canyon"
      rightName="Inspirada"
      rows={[
        {
          factor: "Recent price anchor",
          left: "Neighborhood median sale near $745K; Club Madeira often $900K–$1.3M+",
          right: "Community median often cited near $525K; new construction commonly $450K–$750K",
        },
        {
          factor: "Housing age",
          left: "Mostly established resale; Videiras & Club Madeira enclaves",
          right: "Heavier new-construction and newer resale mix",
        },
        {
          factor: "Signature amenity",
          left: "Madeira Canyon Park + Club Madeira clubhouse/views",
          right: "Resort pools, trails, sports courts",
        },
        {
          factor: "Gating",
          left: "Mix: open streets, Club Madeira, Videiras",
          right: "Primarily open master-plan villages",
        },
        {
          factor: "Best for",
          left: "Buyers wanting elevation, trails, Club amenities",
          right: "Buyers wanting newer systems and resort pools",
        },
      ]}
      sections={[
        {
          title: "How to decide in one weekend",
          body: "Tour Madeira Canyon Park and a Club Madeira street on Saturday morning, then Inspirada’s pool villages Saturday afternoon. Keep the same bed/bath and budget filter so the comparison is fair. Base from Suite A, 2721 Bonaparte Ln, Henderson, NV 89044.",
        },
        {
          title: "Total cost—not list price",
          body: "Inspirada can win on entry price and builder credits. Madeira Canyon can win on lot feel and Club Madeira lifestyle. Model HOA + utilities + likely capital expenses (roof/HVAC) on older Madeira resales against incentive math on Inspirada new homes.",
        },
      ]}
      faqs={[
        {
          question: "Is Madeira Canyon more expensive than Inspirada?",
          answer:
            "Often yes at the median and especially inside Club Madeira. Inspirada’s broader median is commonly lower, though upgraded new homes can overlap Madeira pricing.",
        },
        {
          question: "Which is better for relocators?",
          answer:
            "Neither is universally better. Relocators who want Club Madeira gates and views lean Madeira; those who want newer construction lean Inspirada. Call (702) 500-1942 for a matched tour.",
        },
        {
          question: "Can I see both with one agent?",
          answer:
            "Yes. Dr. Jan Duffy tours both communities and writes offers with the correct HOA packages for each.",
        },
      ]}
      relatedLinks={[
        { href: "/neighborhoods/madeira-canyon", label: "Madeira Canyon" },
        { href: "/neighborhoods/inspirada", label: "Inspirada" },
        { href: "/neighborhoods/club-madeira", label: "Club Madeira" },
        { href: "/guides/buying-madeira-canyon-homes", label: "Buying guide" },
      ]}
    />
  );
}
