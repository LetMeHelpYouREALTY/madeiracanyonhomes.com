import NeighborhoodGuide from "@/components/seo/NeighborhoodGuide";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadence Homes for Sale | Henderson NV | Dr Jan Duffy",
  description:
    "Cadence Henderson new-construction and resale homes. Compare Cadence with Madeira Canyon and Inspirada. Dr. Jan Duffy, BHHS Nevada Properties. (702) 500-1942.",
  keywords: [
    "Cadence Henderson homes",
    "Cadence NV real estate",
    "new construction Cadence Henderson",
    "Cadence vs Madeira Canyon",
  ],
  alternates: { canonical: "https://www.madeiracanyonhomes.com/neighborhoods/cadence" },
};

export default function CadencePage() {
  return (
    <NeighborhoodGuide
      name="Cadence"
      slug="cadence"
      h1="Cadence Homes for Sale in Henderson, NV"
      intro="Cadence is a large Henderson master plan with new construction villages, parks, and modern floor plans. Dr. Jan Duffy compares Cadence builder incentives with Madeira Canyon resale value."
      description="Cadence Henderson real estate guide for new construction and resale buyers comparing Cadence with Madeira Canyon."
      containedIn="Henderson"
      latitude={36.02}
      longitude={-114.97}
      stats={[
        { label: "Product mix", value: "New + resale" },
        { label: "Buyer draw", value: "Modern plans" },
        { label: "Compare with", value: "Madeira / Inspirada" },
        { label: "City", value: "Henderson" },
      ]}
      highlights={[
        "Multiple builder villages and floor-plan eras",
        "Parks, trails, and community gathering spaces",
        "Often cheaper entry than Club Madeira view homes",
        "Strong fit for relocators wanting newer systems",
        "Builder incentives can offset rate and closing costs",
        "Easy comparison set with Inspirada and Madeira Canyon",
      ]}
      sections={[
        {
          title: "Cadence vs Madeira Canyon",
          body: "Cadence usually wins on newer construction and builder warranties. Madeira Canyon and Club Madeira usually win on elevation, established landscaping, and resort-club amenities. We model total monthly cost: HOA + utilities + anticipated HVAC/roof age on resales versus builder incentive math on new homes.",
        },
        {
          title: "Buyer representation on new construction",
          body: "Nevada buyers benefit from independent representation even on builder lots. Dr. Jan Duffy reviews lot premiums, structural options, and closing credits so the builder’s net number is clear before you reserve a homesite. Call (702) 500-1942.",
        },
      ]}
      faqs={[
        {
          question: "Is Cadence a good alternative to Madeira Canyon?",
          answer:
            "Yes for buyers prioritizing newer homes and builder incentives. Choose Madeira Canyon or Club Madeira if you want elevated Anthem living, Madeira Canyon Park, and established Club amenities. Tour both with the same checklist.",
        },
        {
          question: "Do I need an agent for Cadence new construction?",
          answer:
            "Yes. Register with Dr. Jan Duffy before your first builder visit so representation and incentive credit are protected. Call (702) 500-1942.",
        },
        {
          question: "What should relocators compare first?",
          answer:
            "Compare square footage, HOA dues, solar leases, and commute to employment centers. Then walk Madeira Canyon Park versus Cadence amenities on the same weekend.",
        },
        {
          question: "Where is your office relative to Cadence?",
          answer:
            "Suite A, 2721 Bonaparte Ln, Henderson, NV 89044 — in the Madeira Canyon / Anthem area. Phone (702) 500-1942. Email DrDuffy@MadeiraCanyonHomes.com.",
        },
      ]}
      relatedLinks={[
        { href: "/neighborhoods/madeira-canyon", label: "Madeira Canyon" },
        { href: "/neighborhoods/inspirada", label: "Inspirada" },
        { href: "/new-construction", label: "New construction" },
        { href: "/buyers/california-relocator", label: "California relocators" },
      ]}
      quote="Cadence incentives look flashy until you price Club Madeira views on a five-year hold. I run both numbers so the relocator decides with math, not a model-home soundtrack."
    />
  );
}
