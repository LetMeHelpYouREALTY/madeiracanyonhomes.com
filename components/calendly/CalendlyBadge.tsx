"use client";

import { useEffect } from "react";
import { resolveCalendlyUrl } from "@/lib/calendly";
import "./types";

interface CalendlyBadgeProps {
  url?: string;
  text?: string;
  color?: string;
  textColor?: string;
  branding?: boolean;
}

/**
 * Floating Calendly badge. Prefer CalendlyProvider in root layout for
 * sitewide use; this remains for page-level overrides.
 */
export default function CalendlyBadge({
  url = "appointment",
  text = "Schedule with Dr. Jan",
  color = "#1d4ed8",
  textColor = "#ffffff",
  branding = true,
}: CalendlyBadgeProps) {
  const resolvedUrl = resolveCalendlyUrl(url);

  useEffect(() => {
    const initBadge = () => {
      if (!window.Calendly) return;
      window.Calendly.initBadgeWidget({
        url: resolvedUrl,
        text,
        color,
        textColor,
        branding,
      });
    };

    if (window.Calendly) {
      initBadge();
      return;
    }

    window.addEventListener("calendly-loaded", initBadge);
    return () => window.removeEventListener("calendly-loaded", initBadge);
  }, [resolvedUrl, text, color, textColor, branding]);

  return null;
}
