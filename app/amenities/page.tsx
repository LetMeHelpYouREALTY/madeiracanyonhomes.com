import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import PageHero from "@/components/sections/PageHero";
import JsonLd from "@/components/seo/JsonLd";
import dynamic from "next/dynamic";
import { Phone, MapPin } from "lucide-react";
import {
  AMENITIES_PAGE_FAQ,
  AMENITIES_PAGE_PATH,
  CURATED_AMENITY_PLACES,
  MADEIRA_CANYON_COMMUNITY,
  amenitiesPageMetadata,
} from "@/lib/amenities/madeira-canyon-amenities";
import { generateAmenitiesPageSchema } from "@/lib/amenities/schema-helpers";
import { agentInfo, officeInfo, siteConfig } from "@/lib/site-config";
import { getHero } from "@/lib/hero-images";
import { CALENDLY_EVENTS } from "@/lib/calendly";
import { REALSCOUT_SEARCH_URL } from "@/lib/realscout";

const CommunityAmenityMap = dynamic(
  () => import("@/components/maps/CommunityAmenityMap"),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full rounded-xl bg-slate-200 animate-pulse"
        style={{ minHeight: 420 }}
        aria-hidden="true"
      />
    ),
  }
);

export const metadata: Metadata = {
  title: amenitiesPageMetadata.title,
  description: amenitiesPageMetadata.description,
  alternates: { canonical: amenitiesPageMetadata.canonical },
  openGraph: {
    title: amenitiesPageMetadata.title,
    description: amenitiesPageMetadata.description,
    url: amenitiesPageMetadata.canonical,
    siteName: siteConfig.name,
    type: "website",
  },
};

const WRITTEN_SECTIONS = [
  {
    id: "dining",
    title: "Dining & cafes",
    body:
      "Madeira Canyon sits in southeast Henderson’s Anthem Highlands corridor, a short drive from restaurant rows along Eastern Avenue, Horizon Ridge, and the St. Rose Parkway retail nodes. Use the map filters for Restaurants and Cafes to see what is open today near your route home from Club Madeira or Madeira Canyon Park — hours and menus change, so confirm before you visit.",
  },
  {
    id: "parks",
    title: "Parks & recreation",
    body:
      "Madeira Canyon Park at 2390 Democracy Dr is the City of Henderson hub for splash-pad days, lighted fields, tennis, and walking paths. Residents also use trail connections toward Black Mountain and the broader Anthem sidewalk network. Club Madeira homeowners may have separate clubhouse pool and fitness amenities depending on parcel and HOA tier.",
  },
  {
    id: "golf",
    title: "Golf",
    body:
      "Rio Secco Golf Club and Anthem Country Club are established courses in the Anthem / Seven Hills area near Madeira Canyon. Tee times, memberships, and guest policies are club-specific — the map’s Golf filter shows additional public and private courses within a typical 15–20 minute drive, approximate.",
  },
  {
    id: "healthcare",
    title: "Healthcare & pharmacies",
    body:
      "Henderson Hospital (1050 W Galleria Dr) and St. Rose Dominican Hospital, Siena Campus (3001 St Rose Pkwy) are major hospitals southeast and west of Madeira Canyon. Use the Healthcare and Pharmacies filters on the map for urgent-care, primary-care, and retail pharmacy options closest to your street.",
  },
  {
    id: "shopping",
    title: "Shopping & grocery",
    body:
      "Albertsons on Bicentennial Parkway (ZIP 89044) is a common grocery stop for Madeira Canyon errands. Smith’s Food and Drug on S Eastern Ave serves full weekly shopping trips. The Shopping filter surfaces malls and big-box nodes toward Green Valley and the 215 belt.",
  },
  {
    id: "schools",
    title: "Schools",
    body:
      "Shirley & Bill Wallin Elementary at 2333 Canyon Retreat Dr is the elementary campus adjacent to Madeira Canyon Park. Buyer guides often list Del E. Webb Middle and Liberty High for Anthem Highlands addresses — CCSD zoning shifts; verify every address in the district’s online zoning tool before you rely on a school name in a listing.",
  },
  {
    id: "commute",
    title: "Commute & regional access",
    body:
      "From Madeira Canyon, the Las Vegas Strip is roughly 20–30 minutes by car depending on traffic (approximate). Harry Reid International Airport is typically about 25–35 minutes via I-215 and I-515 (approximate). Downtown Summerlin and the 215 / I-11 belt are common commute paths for buyers who work west of the valley.",
  },
];

export default function AmenitiesPage() {
  const hero = getHero("madeiraCanyon");
  const schema = generateAmenitiesPageSchema(AMENITIES_PAGE_FAQ);

  return (
    <>
      <JsonLd data={schema} />
      <Navbar />
      <PageHero
        title="Nearby Amenities in Madeira Canyon, Henderson"
        subtitle="Hyperlocal map and guide to parks, grocery, dining, schools, healthcare, and golf around Club Madeira — Madeira Canyon | Homes by Dr Jan Duffy."
        image={hero}
      />
      <main className="pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <nav
            className="text-sm text-slate-500 mt-8 mb-6"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-blue-600">Home</Link>
            {" / "}
            <span className="text-slate-900">Nearby Amenities</span>
          </nav>

          <p className="text-lg text-slate-700 leading-relaxed mb-10">
            Buyers researching Madeira Canyon Homes want to know what daily life
            looks like beyond the floor plan — parks, grocery runs, school
            names, and hospital access. This page centers on{" "}
            <strong>{MADEIRA_CANYON_COMMUNITY.centerLabel}</strong> (
            {MADEIRA_CANYON_COMMUNITY.centerAddress}) with an interactive map
            you can filter by category. Map center coordinates:{" "}
            {MADEIRA_CANYON_COMMUNITY.center.lat},{" "}
            {MADEIRA_CANYON_COMMUNITY.center.lng} (
            {MADEIRA_CANYON_COMMUNITY.centerSource}).
          </p>

          <section className="mb-14" aria-labelledby="amenity-map-heading">
            <h2
              id="amenity-map-heading"
              className="text-2xl font-bold text-slate-900 mb-4"
            >
              Interactive amenity map
            </h2>
            <CommunityAmenityMap defaultCategory="parks" height={420} />
          </section>

          <section className="mb-14 space-y-10" aria-labelledby="local-guide-heading">
            <h2 id="local-guide-heading" className="text-2xl font-bold text-slate-900">
              Madeira Canyon local guide
            </h2>
            {WRITTEN_SECTIONS.map((section) => (
              <article key={section.id} id={section.id}>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {section.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{section.body}</p>
              </article>
            ))}
          </section>

          <section
            className="mb-14"
            aria-labelledby="featured-places-heading"
          >
            <h2
              id="featured-places-heading"
              className="text-2xl font-bold text-slate-900 mb-6"
            >
              Featured nearby places
            </h2>
            <ul className="grid md:grid-cols-2 gap-4">
              {CURATED_AMENITY_PLACES.map((place) => (
                <li
                  key={place.name}
                  className="border border-slate-200 rounded-lg p-4 bg-white"
                >
                  <p className="font-semibold text-slate-900">{place.name}</p>
                  <p className="text-sm text-slate-600 mt-1">{place.address}</p>
                  {place.note ? (
                    <p className="text-xs text-slate-500 mt-2">{place.note}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-14" aria-labelledby="amenities-faq-heading">
            <h2
              id="amenities-faq-heading"
              className="text-2xl font-bold text-slate-900 mb-6"
            >
              Madeira Canyon amenities FAQ
            </h2>
            <div className="space-y-6">
              {AMENITIES_PAGE_FAQ.map((faq) => (
                <div
                  key={faq.question}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-6"
                >
                  <h3 className="font-bold text-slate-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-slate-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section
            className="text-center bg-blue-600 text-white rounded-2xl p-8 md:p-12"
            aria-labelledby="amenities-cta-heading"
          >
            <h2 id="amenities-cta-heading" className="text-3xl font-bold mb-3">
              Tour Madeira Canyon with a local expert
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              {agentInfo.name}, {agentInfo.title} — {agentInfo.brokerage}. Office:{" "}
              {officeInfo.address.full}. License {agentInfo.license}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={agentInfo.phoneTel}
                className="inline-flex items-center bg-white text-blue-600 px-8 py-4 font-bold text-lg hover:bg-blue-50 rounded-md"
              >
                <Phone className="h-5 w-5 mr-2" aria-hidden />
                Call {agentInfo.phone}
              </a>
              <a
                href={REALSCOUT_SEARCH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center border border-white px-8 py-4 font-bold text-lg hover:bg-blue-700 rounded-md"
              >
                Search homes for sale
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center border border-white px-8 py-4 font-bold text-lg hover:bg-blue-700 rounded-md"
              >
                <MapPin className="h-5 w-5 mr-2" aria-hidden />
                Contact
              </Link>
            </div>
            <p className="mt-6 text-sm text-blue-200">
              <a
                href={CALENDLY_EVENTS.showing}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline hover:text-blue-100 font-semibold"
              >
                Book a showing
              </a>
              {" · "}
              Email {agentInfo.email}
            </p>
          </section>

          <p className="text-center text-sm text-slate-500 mt-8">
            <Link href={AMENITIES_PAGE_PATH} className="text-blue-700 hover:underline">
              {siteConfig.url}{AMENITIES_PAGE_PATH}
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
