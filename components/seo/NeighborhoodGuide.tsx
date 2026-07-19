import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import JsonLd from "@/components/seo/JsonLd";
import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import {
  combineSchemas,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateNeighborhoodSchema,
  generateWebPageSchema,
  type FAQItem,
} from "@/lib/schema";
import { agentInfo, officeInfo, siteConfig } from "@/lib/site-config";

export type NeighborhoodStat = {
  label: string;
  value: string;
};

export type NeighborhoodSection = {
  title: string;
  body: string;
};

export type NeighborhoodGuideProps = {
  name: string;
  slug: string;
  h1: string;
  intro: string;
  containedIn?: string;
  latitude?: number;
  longitude?: number;
  description: string;
  stats: NeighborhoodStat[];
  highlights: string[];
  sections: NeighborhoodSection[];
  faqs: FAQItem[];
  relatedLinks?: { href: string; label: string }[];
  quote?: string;
  lastUpdated?: string;
};

export default function NeighborhoodGuide({
  name,
  slug,
  h1,
  intro,
  containedIn = "Henderson",
  latitude,
  longitude,
  description,
  stats,
  highlights,
  sections,
  faqs,
  relatedLinks = [],
  quote,
  lastUpdated = "July 2026",
}: NeighborhoodGuideProps) {
  const pageUrl = `/neighborhoods/${slug}`;
  const schema = combineSchemas(
    generateWebPageSchema({
      name: h1,
      description,
      url: pageUrl,
      dateModified: "2026-07-19",
    }),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Neighborhoods", url: "/neighborhoods" },
      { name: name, url: pageUrl },
    ]),
    generateNeighborhoodSchema({
      name,
      slug,
      description,
      containedIn,
      latitude,
      longitude,
    }),
    generateFAQSchema(faqs)
  );

  return (
    <>
      <JsonLd data={schema} />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto mb-6">
            <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              {" / "}
              <Link href="/neighborhoods" className="hover:text-blue-600">
                Neighborhoods
              </Link>
              {" / "}
              <span className="text-slate-900">{name}</span>
            </nav>
          </div>

          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold tracking-wide text-blue-800 mb-4">
              {siteConfig.brandLine}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              {h1}
            </h1>
            <p className="text-xl text-slate-600">{intro}</p>
          </div>

          <RealScoutListings
            title={`${name} & Nearby Homes for Sale`}
            subtitle={`Live RealScout office listings near ${name}, Henderson, NV`}
          />

          <section className="mb-16 bg-slate-900 text-white rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">
              {name} Market Snapshot | {lastUpdated}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-300 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Why Buyers Look at {name}
            </h2>
            <ul className="grid md:grid-cols-2 gap-3 mb-10">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="border-l-4 border-blue-600 bg-slate-50 px-4 py-3 text-slate-700"
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="space-y-8">
              {sections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {section.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{section.body}</p>
                </div>
              ))}
            </div>
          </section>

          {quote && (
            <section className="mb-16 max-w-4xl mx-auto">
              <div className="bg-blue-50 border-l-4 border-blue-600 p-8">
                <blockquote className="text-lg text-slate-700 italic mb-4">
                  &ldquo;{quote}&rdquo;
                </blockquote>
                <cite className="text-slate-900 font-semibold not-italic">
                  — {agentInfo.name}, {agentInfo.brokerage}
                </cite>
              </div>
            </section>
          )}

          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              {name} FAQs
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="bg-white border border-slate-200 p-6"
                >
                  <h3 className="font-bold text-slate-900 mb-2">{faq.question}</h3>
                  <p className="text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {relatedLinks.length > 0 && (
            <section className="mb-16 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Related Guides
              </h2>
              <ul className="flex flex-wrap gap-3">
                {relatedLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:border-blue-600 hover:text-blue-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="text-center bg-blue-600 text-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tour {name} With Dr. Jan Duffy
            </h2>
            <p className="text-xl text-blue-100 mb-6">
              Madeira Canyon | Homes by Dr Jan Duffy — {officeInfo.address.full}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={agentInfo.phoneTel}
                className="inline-flex items-center bg-white text-blue-600 px-8 py-4 font-bold text-lg hover:bg-blue-50"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call {agentInfo.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center border border-white px-8 py-4 font-bold text-lg hover:bg-blue-700"
              >
                <MapPin className="h-5 w-5 mr-2" />
                Get Directions
              </Link>
            </div>
            <p className="mt-4 text-blue-200 text-sm">
              License {agentInfo.license} · {agentInfo.brokerage}
            </p>
          </section>
        </div>
        <div className="text-center text-sm text-slate-500 mt-8">
          Last Updated: {lastUpdated}
        </div>
      </main>
      <Footer />
    </>
  );
}
