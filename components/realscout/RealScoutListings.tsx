"use client";

import { useEffect, useRef, useState } from "react";
import { REALSCOUT_AGENT_ENCODED_ID } from "@/lib/realscout";
import { loadRealScoutScript } from "@/components/realscout/RealScoutScript";

type RealScoutListingsProps = {
  /** Optional heading override for neighborhood pages */
  title?: string;
  subtitle?: string;
};

/**
 * RealScout office-listings widget — place directly below each page hero.
 * Script loads when this section nears the viewport (keeps hero LCP free).
 */
export default function RealScoutListings({
  title = "Madeira Canyon & Henderson Homes for Sale",
  subtitle = "Live office listings via RealScout — Club Madeira, Madeira Canyon, and nearby Henderson inventory",
}: RealScoutListingsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let cancelled = false;

    const activate = () => {
      void loadRealScoutScript().then(() => {
        if (!cancelled) setReady(true);
      });
    };

    if (!("IntersectionObserver" in window)) {
      activate();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          activate();
        }
      },
      { rootMargin: "240px 0px" }
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
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

        {ready ? (
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
        ) : (
          <p className="text-slate-600 text-sm" role="status">
            Loading live listings…
          </p>
        )}
      </div>
    </section>
  );
}
