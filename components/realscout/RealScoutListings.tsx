"use client";

import { REALSCOUT_AGENT_ENCODED_ID } from "@/lib/realscout";

type RealScoutListingsProps = {
  /** Optional heading override for neighborhood pages */
  title?: string;
  subtitle?: string;
};

/**
 * RealScout office-listings widget — place directly below each page hero.
 * Script is loaded once in root layout (em.realscout.com).
 */
export default function RealScoutListings({
  title = "Madeira Canyon & Henderson Homes for Sale",
  subtitle = "Live office listings via RealScout — Club Madeira, Madeira Canyon, and nearby Henderson inventory",
}: RealScoutListingsProps) {
  return (
    <section
      className="py-12 md:py-16 bg-slate-50 border-y border-slate-200"
      aria-label="Office property listings"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
              {title}
            </h2>
            <p className="text-slate-600 text-base md:text-lg max-w-2xl">{subtitle}</p>
          </div>
          <a
            href="http://drjanduffy.realscout.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition-colors"
          >
            View All Properties
          </a>
        </div>

        {/* RealScout office widget — dangerouslySetInnerHTML per RealScout/Next.js rules */}
        <div
          dangerouslySetInnerHTML={{
            __html: `<realscout-office-listings
              agent-encoded-id="${REALSCOUT_AGENT_ENCODED_ID}"
              sort-order="NEWEST"
              listing-status="For Sale"
              property-types=",SFR,MF,TC,CND"
              price-min="400000"
              price-max="2500000"
            ></realscout-office-listings>`,
          }}
        />
      </div>
    </section>
  );
}
