import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import JsonLd from "@/components/seo/JsonLd";
import Link from "next/link";
import { Phone } from "lucide-react";
import {
  combineSchemas,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateWebPageSchema,
  type FAQItem,
} from "@/lib/schema";
import { agentInfo, officeInfo, siteConfig } from "@/lib/site-config";

export type CompareRow = {
  factor: string;
  left: string;
  right: string;
};

export type CompareGuideProps = {
  title: string;
  path: string;
  h1: string;
  intro: string;
  description: string;
  leftName: string;
  rightName: string;
  rows: CompareRow[];
  sections: { title: string; body: string }[];
  faqs: FAQItem[];
  relatedLinks?: { href: string; label: string }[];
};

export default function CompareGuide({
  title,
  path,
  h1,
  intro,
  description,
  leftName,
  rightName,
  rows,
  sections,
  faqs,
  relatedLinks = [],
}: CompareGuideProps) {
  const schema = combineSchemas(
    generateWebPageSchema({ name: title, description, url: path }),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Compare", url: "/compare" },
      { name: title, url: path },
    ]),
    generateArticleSchema({
      headline: h1,
      description,
      url: path,
      datePublished: "2026-07-01",
      dateModified: "2026-07-19",
    }),
    generateFAQSchema(faqs)
  );

  return (
    <>
      <JsonLd data={schema} />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <nav className="text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            {" / "}
            <Link href="/compare" className="hover:text-blue-600">
              Compare
            </Link>
            {" / "}
            <span className="text-slate-900">{title}</span>
          </nav>

          <p className="text-sm font-semibold text-blue-800 mb-3">
            {siteConfig.brandLine}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {h1}
          </h1>
          <p className="text-xl text-slate-600 mb-10">{intro}</p>

          <RealScoutListings />

          <section className="mb-14 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-4 font-semibold">Factor</th>
                  <th className="p-4 font-semibold">{leftName}</th>
                  <th className="p-4 font-semibold">{rightName}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.factor} className="border-b border-slate-200">
                    <th className="p-4 font-semibold text-slate-900 align-top">
                      {row.factor}
                    </th>
                    <td className="p-4 text-slate-600 align-top">{row.left}</td>
                    <td className="p-4 text-slate-600 align-top">{row.right}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <div className="space-y-8 mb-14">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  {section.title}
                </h2>
                <p className="text-slate-600 leading-relaxed">{section.body}</p>
              </section>
            ))}
          </div>

          <section className="mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">FAQs</h2>
            <div className="space-y-5">
              {faqs.map((faq) => (
                <div key={faq.question} className="border border-slate-200 p-5">
                  <h3 className="font-bold text-slate-900 mb-2">{faq.question}</h3>
                  <p className="text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {relatedLinks.length > 0 && (
            <ul className="flex flex-wrap gap-3 mb-14">
              {relatedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block border border-slate-300 px-4 py-2 text-sm hover:border-blue-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <section className="bg-blue-600 text-white p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Tour both in one day</h2>
            <p className="text-blue-100 mb-4">{officeInfo.address.full}</p>
            <a
              href={agentInfo.phoneTel}
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 font-bold"
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
