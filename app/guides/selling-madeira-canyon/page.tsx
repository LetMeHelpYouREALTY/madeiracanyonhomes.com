import AnswerGuide from "@/components/seo/AnswerGuide";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Sell Your Madeira Canyon Home | 2026 Guide",
  description:
    "Sell a Madeira Canyon or Club Madeira home: pricing, prep, photos, and HOA resale package. Dr. Jan Duffy, BHHS Nevada Properties. Call (702) 500-1942.",
  keywords: [
    "sell Madeira Canyon home",
    "Club Madeira home seller",
    "Henderson home selling guide",
    "Madeira Canyon listing agent",
  ],
  alternates: {
    canonical: "https://madeiracanyonhomes.com/guides/selling-madeira-canyon",
  },
};

export default function SellingMadeiraCanyonGuidePage() {
  return (
    <AnswerGuide
      title="Selling Madeira Canyon Homes"
      path="/guides/selling-madeira-canyon"
      h1="How to Sell Your Home in Madeira Canyon"
      intro="A practical seller checklist for Madeira Canyon, Club Madeira, and Videiras — priced against 2026 solds near the $745K neighborhood median and higher Club Madeira bands."
      description="HowTo and FAQ guide for selling homes in Madeira Canyon and Club Madeira, Henderson, NV."
      keywords={[
        "sell Madeira Canyon",
        "Club Madeira listing",
        "Henderson home sale",
      ]}
      howto={{
        name: "How to sell a Madeira Canyon home",
        description:
          "Steps to list and sell a property in Madeira Canyon or Club Madeira with Dr. Jan Duffy.",
        totalTime: "P60D",
        steps: [
          {
            name: "Order a village-level CMA",
            text: "Price against Club Madeira, Videiras, or open Madeira solds—not a single Henderson average. Call (702) 500-1942 or start at the home valuation page.",
            url: "/home-valuation",
          },
          {
            name: "Complete HOA resale package early",
            text: "Order Club Madeira / Madeira Canyon HOA documents early so buyer review periods do not stall escrow. Confirm any age, rental, or architectural rules that affect marketing claims.",
            url: "/guides/club-madeira-hoa",
          },
          {
            name: "Prep for elevation and outdoor living photos",
            text: "Clean patio furniture, service the pool if you have one, and highlight Strip or canyon views at dusk when relevant. Staging ROI is highest in the rooms buyers photograph first.",
          },
          {
            name: "Launch with BHHS + RealScout distribution",
            text: "List with Berkshire Hathaway HomeServices Nevada Properties for MLS reach and targeted Madeira Canyon buyer alerts.",
            url: "/sellers",
          },
          {
            name: "Negotiate repairs and close",
            text: "Use inspection responses that protect net proceeds. Typical Madeira Canyon marketing time recently averages near 45 days before sale in public summaries—your DOM will vary by price and condition.",
          },
        ],
      }}
      sections={[
        {
          title: "Net sheet before you pick a list price",
          body: "Sellers often anchor to a neighbor’s ask. We start from your mortgage payoff, HOA transfer fees, concessions, and likely buyer credits so the list price supports the net you need at Suite A, 2721 Bonaparte Ln strategy meetings.",
        },
        {
          title: "Club Madeira marketing angle",
          body: "Club Madeira listings should lead with gate, clubhouse access, and view corridor—then square footage. Buyers arriving from clubmadeirahoa.com already know the amenity story; they need proof your home is the right unit inside the Club.",
        },
      ]}
      faqs={[
        {
          question: "What is my Madeira Canyon home worth?",
          answer:
            "It depends on village, view, and condition. Neighborhood medians near $745K are a starting point only. Club Madeira homes often support $900K–$1.3M+ when updates and views align. Request a CMA at (702) 500-1942.",
        },
        {
          question: "How do I sell if I live out of state?",
          answer:
            "Dr. Jan Duffy coordinates lockboxes, vendors, and remote offer review. Email DrDuffy@MadeiraCanyonHomes.com with your address and timeline.",
        },
        {
          question: "Should I list before buying my next home?",
          answer:
            "Many Anthem / Madeira sellers list first with a rent-back or overlapping close. We map both timelines so you are not homeless between escrows.",
        },
      ]}
      relatedLinks={[
        { href: "/sellers", label: "Seller services" },
        { href: "/home-valuation", label: "Home valuation" },
        { href: "/neighborhoods/club-madeira", label: "Club Madeira" },
        { href: "/guides/buying-madeira-canyon-homes", label: "Buyer guide" },
      ]}
    />
  );
}
