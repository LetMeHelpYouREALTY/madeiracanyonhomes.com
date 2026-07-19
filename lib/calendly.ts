/**
 * Dr. Jan Duffy Calendly event URLs.
 * Native Calendly widgets handle scheduling, reminders, and calendar sync —
 * do not rebuild forms on top of this.
 */

export const CALENDLY_SCRIPT =
  "https://assets.calendly.com/assets/external/widget.js";
export const CALENDLY_CSS =
  "https://assets.calendly.com/assets/external/widget.css";

export const CALENDLY_EVENTS = {
  /** Property tour / showing */
  showing: "https://calendly.com/drjanduffy/showing",
  /** General appointment / consultation */
  appointment: "https://calendly.com/drjanduffy/appointment",
  /** Quick 15-minute call */
  quick: "https://calendly.com/drjanduffy/15min",
} as const;

export type CalendlyEventKey = keyof typeof CALENDLY_EVENTS;

/** Map former lead-form intents → Calendly events */
export type CalendlyIntent =
  | CalendlyEventKey
  | "contact"
  | "home-valuation"
  | "property-search"
  | "newsletter"
  | "consultation"
  | "tour";

const INTENT_MAP: Record<CalendlyIntent, CalendlyEventKey> = {
  showing: "showing",
  appointment: "appointment",
  quick: "quick",
  contact: "appointment",
  "home-valuation": "appointment",
  "property-search": "showing",
  newsletter: "quick",
  consultation: "appointment",
  tour: "showing",
};

export function resolveCalendlyUrl(
  urlOrIntent: string = "appointment"
): string {
  if (urlOrIntent.startsWith("http://") || urlOrIntent.startsWith("https://")) {
    return urlOrIntent;
  }
  const key = (urlOrIntent in INTENT_MAP
    ? INTENT_MAP[urlOrIntent as CalendlyIntent]
    : urlOrIntent in CALENDLY_EVENTS
      ? (urlOrIntent as CalendlyEventKey)
      : "appointment") as CalendlyEventKey;
  return CALENDLY_EVENTS[key];
}

export function calendlyUrlForFormType(
  formType: "contact" | "property-search" | "home-valuation" | "newsletter"
): string {
  return resolveCalendlyUrl(formType);
}
