import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import JsonLd from "@/components/seo/JsonLd";
import Link from "next/link";
import { Phone, CheckCircle } from "lucide-react";
import {
  combineSchemas,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateHowToSchema,
  generateWebPageSchema,
  type FAQItem,
} from "@/lib/schema";
import { agentInfo, officeInfo, siteConfig } from "@/lib/site-config";

export type AnswerGuideProps = {
  title: string;
  path: string;
  h1: string;
  intro: string;
  description: string;
  keywords: string[];
  sections: { title: string; body: string }[];
  faqs: FAQItem[];
  howto?: {
    name: string;
    description: string;
    totalTime?: string;
    steps: { name: string; text: string; url?: string }[];
  };
  relatedLinks?: { href: string; label: string }[];
  showListings?: boolean;
  lastUpdated?: string;
};

export default function AnswerGuide({
  title,
  path,
  h1,
  intro,
  description,
  keywords,
  sections,
  faqs,
  howto,
  relatedLinks = [],
  showListings = true,
  lastUpdated = "July 2026",
}: AnswerGuideProps) {
  const schemas: Record<string, unknown>[] = [
    generateWebPageSchema({
      name: title,
      description,
      url: path,
      dateModified: "2026-07-19",
    }),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Guides", url: "/guides" },
      { name: h1, url: path },
    ]),
    generateArticleSchema({
      headline: h1,
      description,
      url: path,
      datePublished: "2026-07-01",
      dateModified: "2026-07-19",
      keywords,
    }),
    generateFAQSchema(faqs),
  ];

  if (howto) {
    schemas.push(generateHowToSchema(howto));
  }

  return (
    <>
      <JsonLd data={combineSchemas(...schemas)} />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-6">
            <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              {" / "}
              <Link href="/guides" className="hover:text-blue-600">
                Guides
              </Link>
              {" / "}
              <span className="text-slate-900">{title}</span>
            </nav>
          </div>

          <article className="max-w-4xl mx-auto">
            <p className="text-sm font-semibold tracking-wide text-blue-800 mb-4">
              {siteConfig.brandLine}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {h1}
            </h1>
            <p className="text-xl text-slate-600 mb-10">{intro}</p>

            {showListings && <RealScoutListings />}

            {howto && (
              <section className="mb-14">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Step-by-step
                </h2>
                <ol className="space-y-4">
                  {howto.steps.map((step, index) => (
                    <li
                      key={step.name}
                      className="flex gap-4 border border-slate-200 p-5"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-blue-600 text-white font-bold">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-1">
                          {step.name}
                        </h3>
                        <p className="text-slate-600">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <div className="space-y-10 mb-14">
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
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Quick answers
              </h2>
              <div className="space-y-5">
                {faqs.map((faq) => (
                  <div key={faq.question} className="border border-slate-200 p-5">
                    <h3 className="font-bold text-slate-900 mb-2 flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                      {faq.question}
                    </h3>
                    <p className="text-slate-600 pl-7">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {relatedLinks.length > 0 && (
              <section className="mb-14">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Keep reading
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

            <section className="bg-blue-600 text-white p-8 md:p-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Talk with a Madeira Canyon specialist
              </h2>
              <p className="text-blue-100 mb-6">
                {officeInfo.address.full} · {agentInfo.email}
              </p>
              <a
                href={agentInfo.phoneTel}
                className="inline-flex items-center bg-white text-blue-600 px-8 py-4 font-bold text-lg hover:bg-blue-50"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call {agentInfo.phone}
              </a>
            </section>
          </article>
        </div>
        <div className="text-center text-sm text-slate-500 mt-8">
          Last Updated: {lastUpdated}
        </div>
      </main>
      <Footer />
    </>
  );
}
