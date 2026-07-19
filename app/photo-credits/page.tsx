import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import PageHero from "@/components/sections/PageHero";
import JsonLd from "@/components/seo/JsonLd";
import Link from "next/link";
import type { Metadata } from "next";
import {
  creditsByKind,
  formatCreditLine,
  imageCredits,
} from "@/lib/image-credits";
import { getHero } from "@/lib/hero-images";
import {
  combineSchemas,
  generateBreadcrumbSchema,
  generateWebPageSchema,
} from "@/lib/schema";
import { agentInfo } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Photo Credits & Authors | Madeira Canyon Homes",
  description:
    "Photographer and author credits for images on MadeiraCanyonHomes.com — Wikimedia Commons attribution and Unsplash contributors.",
  alternates: { canonical: "https://madeiracanyonhomes.com/photo-credits" },
  robots: { index: true, follow: true },
};

function CreditTable({
  title,
  kind,
}: {
  title: string;
  kind: "brand" | "wikimedia" | "unsplash";
}) {
  const rows = creditsByKind(kind);
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">{title}</h2>
      <div className="overflow-x-auto border border-slate-200">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="p-3 font-semibold">Image</th>
              <th className="p-3 font-semibold">Author</th>
              <th className="p-3 font-semibold">License</th>
              <th className="p-3 font-semibold">Source</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.file} className="border-t border-slate-200">
                <td className="p-3 text-slate-800">
                  <div className="font-medium">{row.title}</div>
                  <div className="text-xs text-slate-500 font-mono">{row.file}</div>
                </td>
                <td className="p-3">
                  {row.authorUrl ? (
                    <a
                      href={row.authorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:underline"
                    >
                      {row.author}
                    </a>
                  ) : (
                    <span className="text-slate-800">{row.author}</span>
                  )}
                </td>
                <td className="p-3">
                  {row.licenseUrl ? (
                    <a
                      href={row.licenseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:underline"
                    >
                      {row.license}
                    </a>
                  ) : (
                    row.license
                  )}
                </td>
                <td className="p-3">
                  <a
                    href={row.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                  >
                    View source
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function PhotoCreditsPage() {
  const schema = combineSchemas(
    generateWebPageSchema({
      name: "Photo Credits & Authors",
      description: metadata.description as string,
      url: "/photo-credits",
    }),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Photo Credits", url: "/photo-credits" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://madeiracanyonhomes.com/about#person",
      name: agentInfo.name,
      jobTitle: agentInfo.title,
      url: "https://madeiracanyonhomes.com/about",
      email: agentInfo.email,
      telephone: "+1-702-500-1942",
      identifier: agentInfo.license,
    }
  );

  return (
    <>
      <JsonLd data={schema} />
      <Navbar />
      <PageHero
        title="Photo Credits & Authors"
        subtitle="Attribution for photographers and brand imagery used on MadeiraCanyonHomes.com — required for Wikimedia CC licenses and listed for Unsplash contributors."
        image={getHero("contact")}
        showCta={false}
        size="compact"
      />
      <main className="pb-16">
        <div className="container mx-auto max-w-5xl px-4 pt-10">
          <p className="text-slate-600 mb-8 leading-relaxed">
            Content author for guides and market pages:{" "}
            <Link href="/about" className="text-blue-700 hover:underline font-medium">
              {agentInfo.name}
            </Link>
            , {agentInfo.title} (License {agentInfo.license}), Berkshire Hathaway
            HomeServices Nevada Properties. Site brand photography is credited to Madeira
            Canyon | Homes by Dr Jan Duffy.
          </p>

          <CreditTable title="Brand photography (site originals)" kind="brand" />
          <CreditTable
            title="Wikimedia Commons (attribution required)"
            kind="wikimedia"
          />
          <CreditTable
            title="Unsplash (license allows use without attribution; credited when known)"
            kind="unsplash"
          />

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Quick credit lines
            </h2>
            <ul className="space-y-2 text-sm text-slate-600">
              {imageCredits
                .filter((c) => c.kind === "wikimedia")
                .map((c) => (
                  <li key={c.file} className="border-l-4 border-blue-600 pl-3">
                    {formatCreditLine(c)}
                  </li>
                ))}
            </ul>
          </section>

          <p className="text-sm text-slate-500">
            Questions about licensing:{" "}
            <a
              href="mailto:DrDuffy@MadeiraCanyonHomes.com"
              className="text-blue-700 hover:underline"
            >
              DrDuffy@MadeiraCanyonHomes.com
            </a>
            . Full machine-readable notes also live in{" "}
            <code className="text-xs bg-slate-100 px-1">
              /images/hero/ATTRIBUTION.md
            </code>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
