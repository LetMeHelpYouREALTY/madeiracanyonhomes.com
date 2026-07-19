"use client";

import { useEffect } from "react";
import Script from "next/script";
import {
  CALENDLY_CSS,
  CALENDLY_EVENTS,
  CALENDLY_SCRIPT,
} from "@/lib/calendly";
import "./types";

type CalendlyProviderProps = {
  /** Floating badge on every page */
  showBadge?: boolean;
  badgeText?: string;
  badgeUrl?: string;
};

/**
 * Loads Calendly assets once and mounts the floating badge widget.
 * Place in root layout so every page gets schedule access.
 */
export default function CalendlyProvider({
  showBadge = true,
  badgeText = "Schedule with Dr. Jan",
  badgeUrl = CALENDLY_EVENTS.appointment,
}: CalendlyProviderProps) {
  useEffect(() => {
    if (!showBadge) return;

    const initBadge = () => {
      if (typeof window === "undefined" || !window.Calendly) return;
      window.Calendly.initBadgeWidget({
        url: badgeUrl,
        text: badgeText,
        color: "#1d4ed8",
        textColor: "#ffffff",
        branding: true,
      });
    };

    if (window.Calendly) {
      initBadge();
      return;
    }

    window.addEventListener("calendly-loaded", initBadge);
    return () => window.removeEventListener("calendly-loaded", initBadge);
  }, [showBadge, badgeText, badgeUrl]);

  return (
    <>
      <link href={CALENDLY_CSS} rel="stylesheet" />
      <Script
        src={CALENDLY_SCRIPT}
        strategy="afterInteractive"
        onLoad={() => {
          window.dispatchEvent(new Event("calendly-loaded"));
          if (showBadge && window.Calendly) {
            window.Calendly.initBadgeWidget({
              url: badgeUrl,
              text: badgeText,
              color: "#1d4ed8",
              textColor: "#ffffff",
              branding: true,
            });
          }
        }}
      />
    </>
  );
}
