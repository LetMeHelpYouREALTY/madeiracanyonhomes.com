import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import PageHero from "@/components/sections/PageHero";
import JsonLd from "@/components/seo/JsonLd";
import Link from "next/link";
import { Phone, ExternalLink, MapPin, GraduationCap } from "lucide-react";
import type { Metadata } from "next";
import {
  combineSchemas,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateWebPageSchema,
} from "@/lib/schema";
import { getHero } from "@/lib/hero-images";
import { agentInfo, officeInfo, siteConfig } from "@/lib/site-config";
import { CALENDLY_EVENTS } from "@/lib/calendly";

export const metadata: Metadata = {
  title: "Madeira Canyon Schools | Henderson NV School Names & Ratings",
  description:
    "School names near Madeira Canyon, Henderson NV 89044: Wallin Elementary, Del E. Webb Middle, Liberty High, plus nearby Henderson and Boulder City options. Verify zoning by address. Dr. Jan Duffy (702) 500-1942.",
  keywords: [
    "Madeira Canyon schools",
    "Wallin Elementary Henderson",
    "Del E Webb Middle School",
    "Liberty High School Henderson",
    "Madeira Canyon Henderson NV schools",
    "Clark County School District 89044",
  ],
  alternates: {
    canonical: "https://www.madeiracanyonhomes.com/guides/madeira-canyon-schools",
  },
  openGraph: {
    title: "Madeira Canyon Schools | Henderson NV",
    description:
      "Public and nearby school names for Madeira Canyon addresses — ratings with sources, zoning verification tip.",
    url: "https://www.madeiracanyonhomes.com/guides/madeira-canyon-schools",
  },
};

type SchoolOption = {
  name: string;
  grades: string;
  city: string;
  type: string;
  note: string;
  ratings: string;
  proficiency?: string;
  sourceUrl: string;
  relation: "madeira-pipeline" | "nearby";
};

/**
 * Ratings pulled July 2026 from GreatSchools / Niche / Public School Review.
 * Zoning changes — always confirm the exact address in CCSD Zoning Search.
 */
const schools: SchoolOption[] = [
  {
    name: "Shirley & Bill Wallin Elementary School",
    grades: "Pre-K–5",
    city: "Henderson, NV",
    type: "CCSD public",
    note: "Common elementary name for many Madeira Canyon / Anthem Highlands addresses. Campus sits near Madeira Canyon Park.",
    ratings: "Niche overall A− · GreatSchools 6/10",
    proficiency: "Niche-reported state testing: about 66% math / 70% reading proficiency (verify current year on Niche).",
    sourceUrl: "https://www.niche.com/k12/shirley-and-bill-wallin-elementary-school-henderson-nv/",
    relation: "madeira-pipeline",
  },
  {
    name: "Del E. Webb Middle School",
    grades: "6–8",
    city: "Henderson, NV",
    type: "CCSD public",
    note: "Common middle-school name published for Madeira Canyon addresses in neighborhood guides.",
    ratings: "GreatSchools 6/10",
    proficiency: "Public School Review / U.S. News figures near 47% math / 63% reading proficiency (verify current year).",
    sourceUrl: "https://www.greatschools.org/nevada/henderson/775-Del-E-Webb-Middle-School/",
    relation: "madeira-pipeline",
  },
  {
    name: "Liberty High School",
    grades: "9–12",
    city: "Henderson, NV",
    type: "CCSD public",
    note: "Common high-school name for Madeira Canyon and Anthem Highlands addresses (CCSD).",
    ratings: "GreatSchools 5/10 · Niche lists AP course options",
    proficiency: "Niche-reported figures near 23% math / 57% reading proficiency (verify current year).",
    sourceUrl: "https://www.greatschools.org/nevada/henderson/768-Liberty-High-School/",
    relation: "madeira-pipeline",
  },
  {
    name: "Elton M. & Madelaine E. Garrett Junior High School",
    grades: "6–8",
    city: "Boulder City, NV (not Madeira Canyon)",
    type: "CCSD public · open enrollment / STEM programs",
    note: "Located at 1200 Avenue G, Boulder City — not the Madeira Canyon feeder middle school. Buyers sometimes research it as a STEAM / open-enrollment option.",
    ratings: "GreatSchools 8/10",
    proficiency: "Recent published ranges roughly ~38–43% math / ~55–60% reading depending on source year — not 72%/72%.",
    sourceUrl: "https://www.greatschools.org/nevada/boulder-city/141-Elton-M-Garrett-Junior-High-School/",
    relation: "nearby",
  },
  {
    name: "Bob Miller Middle School",
    grades: "6–8",
    city: "Henderson, NV",
    type: "CCSD public",
    note: "Henderson middle school buyers often compare when researching Green Valley / MacDonald Ranch corridors — confirm whether any open-enrollment seat applies to your address.",
    ratings: "See GreatSchools / Niche for current scores",
    sourceUrl: "https://www.greatschools.org/nevada/henderson/597-Bob-Miller-Middle-School/",
    relation: "nearby",
  },
  {
    name: "Coral Academy of Science Las Vegas (charter campuses)",
    grades: "K–12 (campus-dependent)",
    city: "Henderson / Las Vegas area",
    type: "Tuition-free public charter",
    note: "Zone-free charter option with multiple campuses. Admission is application-based — not automatic with a Madeira Canyon address.",
    ratings: "Check each campus on Niche / GreatSchools",
    sourceUrl: "https://www.coralacademy.org/",
    relation: "nearby",
  },
  {
    name: "Pinecrest Academy (Inspirada / Sloan Canyon campuses)",
    grades: "K–12 (campus-dependent)",
    city: "Henderson, NV",
    type: "Tuition-free public charter",
    note: "Nearby charter campuses in the south Henderson corridor. Application and waitlists apply.",
    ratings: "Check each campus on Niche / GreatSchools",
    sourceUrl: "https://www.pinecrestnv.org/",
    relation: "nearby",
  },
];

const faqs = [
  {
    question: "Which schools serve Madeira Canyon, Henderson NV?",
    answer:
      "Many Madeira Canyon addresses are commonly associated with Shirley & Bill Wallin Elementary, Del E. Webb Middle School, and Liberty High School in the Clark County School District. Zoning follows the exact street address and can change — confirm in the official CCSD Zoning Search before you write an offer.",
  },
  {
    question: "Is Garrett Junior High in Madeira Canyon?",
    answer:
      "No. Elton M. & Madelaine E. Garrett Junior High School is in Boulder City, NV. It carries a GreatSchools rating of 8/10 as of mid-2026 reporting, and some buyers research it for open enrollment or STEM programs, but it is not the standard Madeira Canyon middle-school assignment.",
  },
  {
    question: "What are Wallin Elementary’s published ratings?",
    answer:
      "As of July 2026 research, Shirley & Bill Wallin Elementary shows a Niche overall grade of A− and a GreatSchools rating of 6/10. Niche-reported proficiency figures were about 66% math and 70% reading — check Niche and GreatSchools for the latest year.",
  },
  {
    question: "How do I verify school assignment for a listing?",
    answer:
      "Use the Clark County School District Zoning Search with the property’s full street address. Dr. Jan Duffy can pull the assigned school names for each Madeira Canyon or Club Madeira home you tour — call (702) 500-1942.",
  },
  {
    question: "What else does Madeira Canyon offer besides schools?",
    answer:
      "Madeira Canyon and Club Madeira in ZIP 89044 include Madeira Canyon Park (fields, tennis, splash pad), trail access toward Black Mountain and Sloan, Videiras and Club Madeira gated villages, and Anthem Highlands shopping about two miles north. Recent neighborhood medians have been near $745K. Learn more on the Madeira Canyon homes page.",
  },
];

export default function MadeiraCanyonSchoolsPage() {
  const path = "/guides/madeira-canyon-schools";
  const pipeline = schools.filter((s) => s.relation === "madeira-pipeline");
  const nearby = schools.filter((s) => s.relation === "nearby");

  const schema = combineSchemas(
    generateWebPageSchema({
      name: "Madeira Canyon Schools | Henderson NV",
      description: metadata.description as string,
      url: path,
      dateModified: "2026-07-19",
    }),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Guides", url: "/guides" },
      { name: "Madeira Canyon Schools", url: path },
    ]),
    generateArticleSchema({
      headline: "Madeira Canyon Schools in Henderson, NV",
      description: metadata.description as string,
      url: path,
      datePublished: "2026-07-19",
      dateModified: "2026-07-19",
      keywords: [
        "Madeira Canyon schools",
        "Wallin Elementary",
        "Liberty High School Henderson",
      ],
    }),
    generateFAQSchema(faqs)
  );

  return (
    <>
      <JsonLd data={schema} />
      <Navbar />
      <PageHero
        title="Madeira Canyon Schools in Henderson, NV"
        subtitle="School names, published ratings, and zoning verification for ZIP 89044 — Madeira Canyon | Homes by Dr Jan Duffy"
        image={getHero("madeiraCanyon")}
      />
      <main className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-6 mt-8">
            <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              {" / "}
              <Link href="/guides" className="hover:text-blue-600">
                Guides
              </Link>
              {" / "}
              <span className="text-slate-900">Madeira Canyon Schools</span>
            </nav>
          </div>

          <article className="max-w-4xl mx-auto">
            <RealScoutListings />

            <section className="mb-12">
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                Buyers researching Madeira Canyon and Club Madeira in Henderson, NV
                often ask which Clark County School District campuses appear for
                specific addresses. Below are{" "}
                <strong className="font-semibold text-slate-900">
                  seven school options
                </strong>{" "}
                commonly reviewed: three names frequently tied to Madeira Canyon
                addresses, plus nearby Henderson and Boulder City choices
                including charter campuses.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Assignment is by street address. Confirm every listing in the{" "}
                <a
                  href="https://www.ccsd.net/zoning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  CCSD Zoning Search
                </a>{" "}
                before you finalize. Ratings below are third-party snapshots as of
                July 2026 research — not a guarantee of future performance.
              </p>
              <p className="text-sm text-slate-500 border-l-4 border-slate-300 pl-4">
                Fair housing note: This page lists school names, grades, cities,
                and published rating sources. It does not market neighborhoods by
                school quality slogans. Visit campuses and review current district
                data yourself.
              </p>
            </section>

            <section className="mb-14">
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="h-6 w-6 text-blue-600" aria-hidden />
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Common public names for Madeira Canyon addresses
                </h2>
              </div>
              <ul className="space-y-6">
                {pipeline.map((school) => (
                  <li
                    key={school.name}
                    className="border border-slate-200 p-5 md:p-6"
                  >
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {school.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-3 flex flex-wrap gap-x-3 gap-y-1">
                      <span>{school.grades}</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" aria-hidden />
                        {school.city}
                      </span>
                      <span>{school.type}</span>
                    </p>
                    <p className="text-slate-700 mb-2">{school.note}</p>
                    <p className="text-slate-800 font-medium mb-1">
                      Published ratings: {school.ratings}
                    </p>
                    {school.proficiency && (
                      <p className="text-slate-600 text-sm mb-3">
                        {school.proficiency}
                      </p>
                    )}
                    <a
                      href={school.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm font-medium"
                    >
                      View source
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-14">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                Nearby cities, charters, and research options
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                These campuses are not automatic Madeira Canyon assignments. Buyers
                often compare them when looking at open enrollment, charter
                applications, or neighboring Henderson corridors.
              </p>
              <ul className="space-y-6">
                {nearby.map((school) => (
                  <li
                    key={school.name}
                    className="border border-slate-200 p-5 md:p-6"
                  >
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {school.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-3 flex flex-wrap gap-x-3 gap-y-1">
                      <span>{school.grades}</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" aria-hidden />
                        {school.city}
                      </span>
                      <span>{school.type}</span>
                    </p>
                    <p className="text-slate-700 mb-2">{school.note}</p>
                    <p className="text-slate-800 font-medium mb-1">
                      Published ratings: {school.ratings}
                    </p>
                    {school.proficiency && (
                      <p className="text-slate-600 text-sm mb-3">
                        {school.proficiency}
                      </p>
                    )}
                    <a
                      href={school.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm font-medium"
                    >
                      View source
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-14">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                What Madeira Canyon offers beyond school names
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Madeira Canyon sits in southeast Henderson against Black Mountain
                and Sloan National Conservation Area. Buyers weigh square footage
                (often 1,800–3,500+), gated villages such as Videiras and Club
                Madeira, Madeira Canyon Park amenities, and commute times of about
                30–45 minutes to the Las Vegas Strip. Recent public summaries put
                the 12-month median sale near $745,000.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/neighborhoods/madeira-canyon"
                  className="inline-block border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:border-blue-600 hover:text-blue-700"
                >
                  Madeira Canyon homes guide
                </Link>
                <Link
                  href="/neighborhoods/club-madeira"
                  className="inline-block border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:border-blue-600 hover:text-blue-700"
                >
                  Club Madeira
                </Link>
                <Link
                  href="/guides/henderson-relocation"
                  className="inline-block border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:border-blue-600 hover:text-blue-700"
                >
                  Henderson relocation
                </Link>
              </div>
            </section>

            <section className="mb-14">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Quick answers
              </h2>
              <div className="space-y-5">
                {faqs.map((faq) => (
                  <div key={faq.question} className="border border-slate-200 p-5">
                    <h3 className="font-bold text-slate-900 mb-2">{faq.question}</h3>
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-blue-600 text-white p-8 md:p-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Need school names for a specific Madeira Canyon address?
              </h2>
              <p className="text-blue-100 mb-2">
                {siteConfig.name} · {officeInfo.address.full}
              </p>
              <p className="text-blue-100 mb-6">{agentInfo.email}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={agentInfo.phoneTel}
                  className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 font-bold text-lg hover:bg-blue-50"
                >
                  <Phone className="h-5 w-5 mr-2" aria-hidden />
                  Call {agentInfo.phone}
                </a>
                <a
                  href={CALENDLY_EVENTS.appointment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border border-white px-8 py-4 font-bold text-lg hover:bg-blue-500"
                >
                  Schedule on Calendly
                </a>
              </div>
            </section>
          </article>
        </div>
        <div className="text-center text-sm text-slate-500 mt-8">
          Last Updated: July 2026 · Ratings from GreatSchools, Niche, and related
          public sources — independently verify
        </div>
      </main>
      <Footer />
    </>
  );
}
