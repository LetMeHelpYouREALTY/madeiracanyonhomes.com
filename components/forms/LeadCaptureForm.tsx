/**
 * Lead capture → Calendly (native scheduling).
 * Replaces custom FUB web forms with Dr. Jan Duffy's Calendly widgets.
 * Calendly + native FUB integrations handle contact capture.
 */

"use client";

import CalendlyWidget from "@/components/calendly/CalendlyWidget";
import CalendlyButton from "@/components/calendly/CalendlyButton";
import { calendlyUrlForFormType } from "@/lib/calendly";

export interface LeadCaptureFormProps {
  source?: string;
  stage?: string;
  defaultTags?: string[];
  formType?: "contact" | "property-search" | "home-valuation" | "newsletter";
  onSuccess?: () => void;
  onError?: (error: string) => void;
  height?: string;
}

const COPY: Record<
  NonNullable<LeadCaptureFormProps["formType"]>,
  { title: string; blurb: string; cta: string }
> = {
  contact: {
    title: "Schedule a consultation",
    blurb:
      "Book time with Dr. Jan Duffy for Madeira Canyon buying, selling, or market questions.",
    cta: "Open scheduler",
  },
  "property-search": {
    title: "Book a property showing",
    blurb:
      "Tour Madeira Canyon and Henderson homes on your schedule — free buyer representation.",
    cta: "Book a showing",
  },
  "home-valuation": {
    title: "Schedule your free home valuation",
    blurb:
      "Get a Madeira Canyon / Henderson CMA from Dr. Jan Duffy — no obligation.",
    cta: "Book valuation consult",
  },
  newsletter: {
    title: "Quick market call",
    blurb: "Grab 15 minutes with Dr. Jan for Madeira Canyon market updates.",
    cta: "Book 15 minutes",
  },
};

export function LeadCaptureForm({
  formType = "contact",
  height = "650px",
}: LeadCaptureFormProps) {
  const url = calendlyUrlForFormType(formType);
  const copy = COPY[formType];

  return (
    <div
      className="space-y-4 rounded-lg border border-slate-200 bg-white overflow-hidden"
      data-lead-capture="calendly"
      data-form-type={formType}
    >
      <div className="bg-blue-600 text-white px-4 py-3 text-center">
        <h3 className="font-bold text-lg">{copy.title}</h3>
        <p className="text-blue-100 text-sm mt-1">{copy.blurb}</p>
      </div>
      <div className="px-2 pb-2">
        <CalendlyWidget url={url} height={height} />
      </div>
      <div className="flex justify-center px-4 pb-4">
        <CalendlyButton url={url} text={copy.cta} />
      </div>
    </div>
  );
}

export default LeadCaptureForm;
