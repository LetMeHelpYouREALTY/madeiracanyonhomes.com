"use client";

import { Phone } from "lucide-react";
import CalendlyWidget from "@/components/calendly/CalendlyWidget";
import CalendlyButton from "@/components/calendly/CalendlyButton";
import { CALENDLY_EVENTS } from "@/lib/calendly";

type CalendlyCTASectionProps = {
  title?: string;
  subtitle?: string;
  /** which Calendly event to embed */
  event?: "showing" | "appointment" | "quick";
  showInline?: boolean;
  className?: string;
};

/**
 * Sitewide realtor scheduling CTA — Madeira Canyon / Club Madeira focused.
 * Rendered from root layout so it appears on every page.
 */
export default function CalendlyCTASection({
  title = "Book a Madeira Canyon Consultation with Dr. Jan Duffy",
  subtitle = "Buyer strategy, listing consultation, home valuation, or a private showing — pick a time that works. Berkshire Hathaway HomeServices Nevada Properties.",
  event = "appointment",
  showInline = true,
  className = "",
}: CalendlyCTASectionProps) {
  const url = CALENDLY_EVENTS[event];

  return (
    <section
      id="schedule"
      aria-labelledby="calendly-cta-heading"
      className={`bg-slate-900 text-white ${className}`}
    >
      <div className="container mx-auto px-4 py-14 md:py-16">
        <div className="mx-auto max-w-3xl text-center mb-8">
          <p className="text-blue-300 text-sm font-semibold tracking-wide uppercase mb-2">
            Madeira Canyon | Homes by Dr Jan Duffy
          </p>
          <h2
            id="calendly-cta-heading"
            className="text-2xl md:text-3xl font-bold mb-3"
          >
            {title}
          </h2>
          <p className="text-slate-300 text-base md:text-lg">{subtitle}</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <CalendlyButton
              url={url}
              text="Schedule now"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition-colors"
            />
            <CalendlyButton
              url={CALENDLY_EVENTS.showing}
              text="Book a showing"
              className="inline-flex items-center justify-center bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-md font-semibold transition-colors"
            />
            <a
              href="tel:+17025001942"
              className="inline-flex items-center justify-center border border-slate-500 hover:bg-slate-800 text-white px-6 py-3 rounded-md font-semibold transition-colors"
            >
              <Phone className="h-4 w-4 mr-2" aria-hidden />
              (702) 500-1942
            </a>
          </div>
        </div>

        {showInline ? (
          <div className="mx-auto max-w-4xl overflow-hidden rounded-lg bg-white">
            <CalendlyWidget url={url} height="680px" />
          </div>
        ) : null}

        <p className="mt-6 text-center text-slate-400 text-xs">
          Suite A, 2721 Bonaparte Ln, Henderson, NV 89044 · License S.0197614.LLC
        </p>
      </div>
    </section>
  );
}
