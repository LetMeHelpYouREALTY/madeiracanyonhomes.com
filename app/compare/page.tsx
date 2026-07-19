import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import JsonLd from "@/components/seo/JsonLd";
import Link from "next/link";
import type { Metadata } from "next";
import {
  combineSchemas,
  generateBreadcrumbSchema,
  generateWebPageSchema,
} from "@/lib/schema";
import PageHero from "@/components/sections/PageHero";
import { getHero } from "@/lib/hero-images";

export const metadata: Metadata = {
  title: "Compare Henderson Neighborhoods | Madeira Canyon Guides",
  description:
    "Compare Madeira Canyon vs Inspirada, Anthem, Cadence, and Club Madeira. Side-by-side guides for Henderson home buyers by Dr. Jan Duffy.",
  alternates: { canonical: "https://www.madeiracanyonhomes.com/compare" },
};

const comparisons = [
  {
    href: "/compare/madeira-canyon-vs-inspirada",
    title: "Madeira Canyon vs Inspirada",
    blurb: "Elevation and Club amenities vs newer resort-pool master planning.",
  },
  {
    href: "/compare/madeira-canyon-vs-anthem",
    title: "Madeira Canyon vs Anthem",
    blurb: "Village naming, gates, and when “Anthem” is too broad.",
  },
  {
    href: "/compare/madeira-canyon-vs-cadence",
    title: "Madeira Canyon vs Cadence",
    blurb: "Established Anthem living vs new-construction incentives.",
  },
];

export default function CompareHubPage() {
  const schema = combineSchemas(
    generateWebPageSchema({
      name: "Compare Henderson Neighborhoods",
      description: metadata.description as string,
      url: "/compare",
    }),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Compare", url: "/compare" },
    ])
  );

  return (
    <>
      <JsonLd data={schema} />
      <Navbar />
      <PageHero
        title={"Compare Henderson Neighborhoods"}
        subtitle={"GEO-friendly side-by-side pages built for buyers asking AI engines “Madeira Canyon vs …” questions."}
        image={getHero("henderson")}
      />
      <main className="pb-16">
        <div className="container mx-auto px-4 max-w-4xl pt-10">
          <ul className="space-y-4">
            {comparisons.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block border border-slate-200 p-6 hover:border-blue-600"
                >
                  <h2 className="text-xl font-bold text-slate-900 mb-2">
                    {item.title}
                  </h2>
                  <p className="text-slate-600 text-sm">{item.blurb}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
