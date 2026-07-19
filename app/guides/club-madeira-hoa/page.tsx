import AnswerGuide from "@/components/seo/AnswerGuide";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Club Madeira HOA FAQ | Madeira Canyon Homes Explained",
  description:
    "Club Madeira HOA questions for buyers and sellers: Madeira Canyon Homes vs MadeiraCanyonHomes.com, dues, documents, gates. Dr. Jan Duffy (702) 500-1942.",
  keywords: [
    "Madeira Canyon Homes",
    "Club Madeira HOA",
    "Club Madeira dues",
    "Club at Madeira Canyon HOA",
    "Madeira Canyon HOA",
  ],
  alternates: {
    canonical: "https://www.madeiracanyonhomes.com/guides/club-madeira-hoa",
  },
};

export default function ClubMadeiraHoaGuidePage() {
  return (
    <AnswerGuide
      title="Club Madeira HOA FAQ"
      path="/guides/club-madeira-hoa"
      h1="Club Madeira HOA FAQ (Madeira Canyon Homes)"
      intro="Clear answers for buyers looking for Madeira Canyon Homes: what the HOA site covers, what a REALTOR® handles, and which documents matter before you write an offer in The Club at Madeira Canyon."
      description="FAQ guide clarifying Club Madeira HOA, Madeira Canyon Homes, and brokerage services from Dr. Jan Duffy."
      keywords={[
        "Madeira Canyon Homes",
        "Club Madeira HOA",
        "Madeira Canyon HOA documents",
      ]}
      showListings={true}
      sections={[
        {
          title: "Two websites, two jobs",
          body: "The Club Madeira HOA has a community information channel for rules and amenities. Madeira Canyon Homes (MadeiraCanyonHomes.com) is Dr. Jan Duffy — Berkshire Hathaway HomeServices Nevada Properties — for browsing homes, pricing, offers, and closing. Neither replaces the official HOA resale package you receive when you buy.",
        },
        {
          title: "What to request in every Club Madeira offer",
          body: "Ask for the current budget, reserve summary, CC&Rs, rules and regulations, age or occupancy restrictions if any, rental policies, architectural guidelines, and any pending special assessments. Dues amounts change; verify the number on the resale certificate for your APN.",
        },
        {
          title: "Gates, guests, and amenity access",
          body: "Club Madeira marketing highlights the clubhouse, pool, and views. Confirm whether your parcel’s membership tier matches the amenities you saw on a tour. Guest policies and gate codes are HOA-controlled and can differ from open Madeira Canyon streets.",
        },
      ]}
      faqs={[
        {
          question: "Is the Club Madeira HOA website owned by Dr. Jan Duffy?",
          answer:
            "No. The Club Madeira HOA runs its own community site. Madeira Canyon Homes is Dr. Jan Duffy’s brokerage site — Berkshire Hathaway HomeServices Nevada Properties — for buying and selling.",
        },
        {
          question: "How much are Club Madeira HOA dues?",
          answer:
            "UNKNOWN, needs verification for your specific APN and year. Dues change with the HOA budget. Dr. Jan Duffy will pull the current resale figures before you finalize an offer—call (702) 500-1942.",
        },
        {
          question: "Can I rent my Club Madeira home?",
          answer:
            "Maybe—rental caps and minimum lease terms are set in the CC&Rs and rules. Never assume short-term rental rights. Review the HOA package or ask the management company in writing.",
        },
        {
          question: "Who helps me interpret HOA documents?",
          answer:
            "Your agent and, when needed, your title/escrow team and a Nevada real estate attorney. Dr. Jan Duffy flags deal-breaking clauses early. Office: Suite A, 2721 Bonaparte Ln, Henderson, NV 89044.",
        },
      ]}
      relatedLinks={[
        { href: "/neighborhoods/club-madeira", label: "Club Madeira homes" },
        { href: "/neighborhoods/madeira-canyon", label: "Madeira Canyon" },
        { href: "/guides/buying-madeira-canyon-homes", label: "Buying guide" },
        { href: "/faq", label: "Site FAQ" },
      ]}
    />
  );
}
