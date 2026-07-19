import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import JsonLd from "@/components/seo/JsonLd";
import Link from "next/link";
import { Phone } from "lucide-react";
import type { Metadata } from "next";
import {
  combineSchemas,
  generateBreadcrumbSchema,
  generateWebPageSchema,
} from "@/lib/schema";
import { agentInfo, officeInfo } from "@/lib/site-config";
import PageHero from "@/components/sections/PageHero";
import { getHero } from "@/lib/hero-images";

export const metadata: Metadata = {
  title: "Madeira Canyon Real Estate Guides | AEO Answers | Dr Jan Duffy",
  description:
    "Buying, selling, and HOA guides for Madeira Canyon and Club Madeira (Madeira Canyon Homes). Answer-ready articles by Dr. Jan Duffy, BHHS Nevada Properties.",
  keywords: [
    "Madeira Canyon buying guide",
    "Club Madeira HOA guide",
    "Henderson real estate guides",
    "Madeira Canyon Homes",
  ],
  alternates: { canonical: "https://www.madeiracanyonhomes.com/guides" },
};

const guides = [
  {
    href: "/guides/buying-madeira-canyon-homes",
    title: "How to Buy a Home in Madeira Canyon",
    blurb: "Step-by-step buyer process, budgets, and village selection.",
  },
  {
    href: "/guides/selling-madeira-canyon",
    title: "How to Sell in Madeira Canyon",
    blurb: "Pricing, prep, and Club Madeira marketing checklist.",
  },
  {
    href: "/guides/club-madeira-hoa",
    title: "Club Madeira HOA FAQ",
    blurb: "HOA vs Madeira Canyon Homes, dues, and documents.",
  },
  {
    href: "/guides/henderson-relocation",
    title: "Relocating to Henderson, NV",
    blurb: "Timeline, neighborhoods, and Madeira Canyon fit for relocators.",
  },
  {
    href: "/guides/madeira-canyon-schools",
    title: "Madeira Canyon Schools",
    blurb: "School names, published ratings, and CCSD zoning verification for 89044.",
  },
  {
    href: "/compare/madeira-canyon-vs-inspirada",
    title: "Madeira Canyon vs Inspirada",
    blurb: "Side-by-side lifestyle and price comparison.",
  },
  {
    href: "/compare/madeira-canyon-vs-anthem",
    title: "Madeira Canyon vs Anthem",
    blurb: "Village naming, gates, and amenity differences.",
  },
];

export default function GuidesHubPage() {
  const schema = combineSchemas(
    generateWebPageSchema({
      name: "Madeira Canyon Real Estate Guides",
      description: metadata.description as string,
      url: "/guides",
    }),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Guides", url: "/guides" },
    ])
  );

  return (
    <>
      <JsonLd data={schema} />
      <Navbar />
      <PageHero
        title={"Madeira Canyon & Club Madeira Guides"}
        subtitle={"Answer-engine ready guides for buyers, sellers, and relocators — written for Google, AI Overviews, and local search around Madeira Canyon Homes."}
        image={getHero("madeiraCanyon")}
      />
      <main className="pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
<RealScoutListings />

          <ul className="grid md:grid-cols-2 gap-5 mb-14">
            {guides.map((guide) => (
              <li key={guide.href}>
                <Link
                  href={guide.href}
                  className="block h-full border border-slate-200 p-6 hover:border-blue-600"
                >
                  <h2 className="text-xl font-bold text-slate-900 mb-2">
                    {guide.title}
                  </h2>
                  <p className="text-slate-600 text-sm">{guide.blurb}</p>
                </Link>
              </li>
            ))}
          </ul>

          <section className="bg-slate-900 text-white p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Need a human answer?</h2>
            <p className="text-slate-300 mb-4">
              {officeInfo.address.full} · License {agentInfo.license}
            </p>
            <a
              href={agentInfo.phoneTel}
              className="inline-flex items-center bg-blue-600 px-6 py-3 font-bold hover:bg-blue-500"
            >
              <Phone className="h-5 w-5 mr-2" />
              {agentInfo.phone}
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
