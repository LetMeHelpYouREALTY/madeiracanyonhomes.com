import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  MessageSquare,
  Users,
  Home,
  Navigation,
  FileText,
} from "lucide-react";
import type { Metadata } from "next";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import {
  businessInfo,
  gbpDescription,
  gbpFAQs,
  generateLocalBusinessSchema,
  generateFAQSchema,
} from "@/lib/gbp-schema";
import { gbpPostTemplates } from "@/lib/gbp-posts";
import PageHero from "@/components/sections/PageHero";
import MadeiraCanyonMap from "@/components/maps/MadeiraCanyonMap";
import { getHero } from "@/lib/hero-images";
import {
  GOOGLE_REVIEWS_URL,
  getGoogleMapsDirectionsUrl,
} from "@/lib/maps";
import { CALENDLY_EVENTS } from "@/lib/calendly";
import { agentStats } from "@/lib/site-config";

export const metadata: Metadata = {
  title:
    "Google Business Profile | Madeira Canyon Homes by Dr Jan Duffy | Henderson NV",
  description:
    "Madeira Canyon | Homes by Dr Jan Duffy — Google Business Profile hub. Suite A, 2721 Bonaparte Ln, Henderson, NV 89044. Call (702) 500-1942. Hours, map, reviews, and service areas for Club Madeira & Madeira Canyon.",
  keywords: [
    "Madeira Canyon Homes Google Business",
    "Dr. Jan Duffy realtor Henderson",
    "Club Madeira real estate agent",
    "Madeira Canyon Henderson NV",
    "Berkshire Hathaway HomeServices Las Vegas",
  ],
  openGraph: {
    title: "Madeira Canyon | Homes by Dr Jan Duffy — Google Business Profile",
    description:
      "NAP, hours, map, and reviews for Madeira Canyon and Club Madeira, Henderson NV. Call (702) 500-1942.",
    url: "https://www.madeiracanyonhomes.com/google-business",
    type: "website",
  },
};

const PRIMARY_SERVICE_AREAS = [
  { label: "Madeira Canyon, Henderson, NV", href: "/neighborhoods/madeira-canyon" },
  { label: "Club Madeira, Henderson, NV", href: "/neighborhoods/club-madeira" },
  { label: "Henderson, NV", href: "/neighborhoods/henderson" },
  { label: "Anthem Highlands, NV", href: "/neighborhoods/anthem" },
];

const EXTENDED_SERVICE_AREAS = [
  { label: "Summerlin, NV", href: "/neighborhoods/summerlin" },
  { label: "Green Valley, NV", href: "/neighborhoods/green-valley" },
  { label: "Inspirada, NV", href: "/neighborhoods/inspirada" },
  { label: "Las Vegas Valley", href: "/neighborhoods" },
];

export default function GoogleBusinessPage() {
  const localBusinessSchema = generateLocalBusinessSchema();
  const faqSchema = generateFAQSchema();
  const directionsUrl = getGoogleMapsDirectionsUrl();
  const postsForGbp = gbpPostTemplates.slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <PageHero
        title="Madeira Canyon | Homes by Dr Jan Duffy"
        subtitle="Google Business Profile · Henderson, NV 89044"
        image={getHero("contact")}
      />
      <main className="pb-16">
        <div className="container mx-auto px-4">
          {/* NAP + actions — must match GBP exactly */}
          <section className="max-w-4xl mx-auto -mt-8 mb-12 relative z-10">
            <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-2">
                Name · Address · Phone
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                {businessInfo.name}
              </h1>
              <address className="not-italic text-slate-700 mb-4 leading-relaxed">
                Berkshire Hathaway HomeServices Nevada Properties
                <br />
                {businessInfo.address.streetAddress}
                <br />
                {businessInfo.address.addressLocality},{" "}
                {businessInfo.address.addressRegion}{" "}
                {businessInfo.address.postalCode}
              </address>
              <div className="flex flex-wrap gap-3 mb-6">
                <a
                  href={`tel:${businessInfo.phone.tel}`}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  Call {businessInfo.phone.display}
                </a>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-slate-300 hover:bg-slate-50 text-slate-800 px-5 py-2.5 rounded-lg font-semibold transition-colors"
                >
                  <Navigation className="h-4 w-4" aria-hidden />
                  Directions
                </a>
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-amber-300 bg-amber-50 hover:bg-amber-100 text-slate-900 px-5 py-2.5 rounded-lg font-semibold transition-colors"
                >
                  <Star className="h-4 w-4 text-amber-500" aria-hidden />
                  View Google Reviews
                </a>
              </div>
              <p className="text-sm text-slate-600">
                {agentStats.averageRating} average · {agentStats.reviewCount}+
                reviews · License {businessInfo.license}
              </p>
            </div>
          </section>

          <RealScoutListings />

          {/* Business Hours — match GBP */}
          <section className="max-w-5xl mx-auto mb-16">
            <div className="bg-slate-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-blue-600" aria-hidden />
                <h2 className="text-xl font-bold text-slate-900">Business Hours</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium">Monday:</span> 9am – 6pm
                </div>
                <div>
                  <span className="font-medium">Tuesday:</span> 9am – 6pm
                </div>
                <div>
                  <span className="font-medium">Wednesday:</span> 9am – 6pm
                </div>
                <div>
                  <span className="font-medium">Thursday:</span> 9am – 6pm
                </div>
                <div>
                  <span className="font-medium">Friday:</span> 9am – 6pm
                </div>
                <div>
                  <span className="font-medium">Saturday:</span> 10am – 4pm
                </div>
                <div>
                  <span className="font-medium">Sunday:</span> By Appointment
                </div>
              </div>
            </div>
          </section>

          {/* Office map pin */}
          <section className="max-w-5xl mx-auto mb-16">
            <MadeiraCanyonMap
              focus="office"
              title="Office Location — Google Map Pin"
              subtitle={`${businessInfo.address.streetAddress}, ${businessInfo.address.addressLocality}, ${businessInfo.address.addressRegion} ${businessInfo.address.postalCode}`}
              height={400}
            />
          </section>

          {/* About */}
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              About Madeira Canyon Homes
            </h2>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" aria-hidden />
                Experience & Background
              </h3>
              <p className="text-slate-700 leading-relaxed">{gbpDescription.whoWeAre}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Home className="h-5 w-5 text-blue-600" aria-hidden />
                Services & Value
              </h3>
              <p className="text-slate-700 leading-relaxed">{gbpDescription.whatWeDo}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" aria-hidden />
                Areas Served
              </h3>
              <p className="text-slate-700 leading-relaxed">{gbpDescription.whereWeServe}</p>
            </div>
          </section>

          {/* Services */}
          <section className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Real Estate Services
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {businessInfo.services.map((service) => (
                <div
                  key={service.name}
                  className="bg-white border border-slate-200 rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle
                      className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
                      aria-hidden
                    />
                    <div>
                      <h3 className="font-semibold text-slate-900">{service.name}</h3>
                      <p className="text-sm text-slate-600">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Service Areas — Madeira-first */}
          <section className="max-w-5xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Service Areas
            </h2>
            <div className="bg-blue-50 rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-slate-900 mb-3">Primary Markets</h3>
                  <ul className="space-y-2">
                    {PRIMARY_SERVICE_AREAS.map((area) => (
                      <li key={area.label}>
                        <Link
                          href={area.href}
                          className="flex items-center gap-2 text-slate-800 hover:text-blue-700"
                        >
                          <MapPin className="h-4 w-4 text-blue-600" aria-hidden />
                          {area.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-3">Extended Coverage</h3>
                  <ul className="space-y-2">
                    {EXTENDED_SERVICE_AREAS.map((area) => (
                      <li key={area.label}>
                        <Link
                          href={area.href}
                          className="flex items-center gap-2 text-slate-800 hover:text-blue-700"
                        >
                          <MapPin className="h-4 w-4 text-blue-600" aria-hidden />
                          {area.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* GBP post templates — copy into Google Business */}
          <section className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FileText className="h-6 w-6 text-blue-600" aria-hidden />
              <h2 className="text-3xl font-bold text-slate-900 text-center">
                GBP Post Templates
              </h2>
            </div>
            <p className="text-slate-600 text-center mb-8 max-w-2xl mx-auto">
              Ready-to-publish Google Business updates. Copy into your GBP Posts
              weekly for freshness signals.
            </p>
            <div className="space-y-6">
              {postsForGbp.map((post) => (
                <article
                  key={post.id}
                  className="bg-white border border-slate-200 rounded-lg p-6"
                >
                  <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">
                    {post.type} · {post.publishDate}
                  </p>
                  <h3 className="font-bold text-slate-900 mb-3">{post.title}</h3>
                  <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans mb-4">
                    {post.content}
                  </pre>
                  {post.cta && (
                    <a
                      href={post.cta.url}
                      className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                    >
                      CTA: {post.cta.text} →
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {gbpFAQs.map((faq) => (
                <div
                  key={faq.question}
                  className="bg-white border border-slate-200 rounded-lg p-6"
                >
                  <h3 className="font-bold text-slate-900 mb-3 flex items-start gap-2">
                    <MessageSquare
                      className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0"
                      aria-hidden
                    />
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 ml-7">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Review CTA */}
          <section className="max-w-4xl mx-auto mb-16">
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-8 text-center">
              <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" aria-hidden />
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Your Review Helps Others Find Quality Service
              </h2>
              <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                If Dr. Jan helped you buy or sell a home, please consider sharing
                your experience. Mention your neighborhood, type of transaction,
                and what made the experience valuable.
              </p>
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Leave a Google Review
              </a>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="max-w-4xl mx-auto">
            <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-slate-300 mb-8">
                Contact Dr. Jan Duffy for a free consultation about buying or
                selling in Madeira Canyon and Henderson.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`tel:${businessInfo.phone.tel}`}
                  className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
                >
                  <Phone className="h-5 w-5 mr-2" aria-hidden />
                  {businessInfo.phone.display}
                </a>
                <a
                  href={CALENDLY_EVENTS.appointment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-white text-slate-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-slate-100 transition-colors"
                >
                  <Mail className="h-5 w-5 mr-2" aria-hidden />
                  Schedule Appointment
                </a>
              </div>
              <p className="text-slate-400 text-sm mt-6">
                {businessInfo.address.streetAddress},{" "}
                {businessInfo.address.addressLocality},{" "}
                {businessInfo.address.addressRegion}{" "}
                {businessInfo.address.postalCode}
              </p>
            </div>
          </section>
        </div>
        <div className="text-center text-sm text-slate-500 mt-8">
          Last Updated: July 2026
        </div>
      </main>
      <Footer />
    </>
  );
}
