"use client";

import { useEffect, useState } from "react";
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
 * Loads Calendly assets once (after idle) and mounts the floating badge.
 * CSS is injected via JS so it never blocks first paint / LCP.
 */
export default function CalendlyProvider({
  showBadge = true,
  badgeText = "Schedule with Dr. Jan",
  badgeUrl = CALENDLY_EVENTS.appointment,
}: CalendlyProviderProps) {
  const [loadScript, setLoadScript] = useState(false);

  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const enable = () => setLoadScript(true);

    const schedule = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(enable, { timeout: 4000 });
      } else {
        timeoutId = setTimeout(enable, 3000);
      }
    };

    if (document.readyState === "complete") {
      timeoutId = setTimeout(schedule, 1500);
    } else {
      window.addEventListener(
        "load",
        () => {
          timeoutId = setTimeout(schedule, 1500);
        },
        { once: true }
      );
    }

    return () => {
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!loadScript) return;

    // Non-blocking stylesheet inject
    if (!document.querySelector('link[data-calendly-css="1"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CALENDLY_CSS;
      link.setAttribute("data-calendly-css", "1");
      document.head.appendChild(link);
    }
  }, [loadScript]);

  useEffect(() => {
    if (!showBadge || !loadScript) return;

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
  }, [showBadge, badgeText, badgeUrl, loadScript]);

  if (!loadScript) return null;

  return (
    <Script
      src={CALENDLY_SCRIPT}
      strategy="lazyOnload"
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
  );
}
