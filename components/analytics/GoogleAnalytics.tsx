"use client";

import { useEffect } from "react";

/**
 * GA4 for MadeiraCanyonHomes.com — must be this property ID.
 * Do not prefer a shared NEXT_PUBLIC_GA_MEASUREMENT_ID: Vercel was baking in
 * another site's ID (G-1RRQY4S4TE), so Google couldn't detect G-4WVZJXRSHX.
 */
export const GA_MEASUREMENT_ID = "G-4WVZJXRSHX";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Load GA4 after LCP (idle), not via next/script afterInteractive.
 * afterInteractive was racing the hero image (~410ms) and dropped mobile
 * PageSpeed from ~100 → ~72 (gtag ~167KB on the critical path).
 */
export default function GoogleAnalytics() {
  useEffect(() => {
    const id = GA_MEASUREMENT_ID;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const inject = () => {
      if (cancelled || document.querySelector('script[data-ga4="1"]')) return;

      window.dataLayer = window.dataLayer || [];
      // Match Google's snippet: push the Arguments object (not a rest array)
      window.gtag = function gtag(..._args: unknown[]) {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer!.push(arguments);
      };
      window.gtag("js", new Date());
      window.gtag("config", id);

      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      script.setAttribute("data-ga4", "1");
      document.head.appendChild(script);
    };

    const schedule = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(inject, { timeout: 5000 });
      } else {
        timeoutId = setTimeout(inject, 3000);
      }
    };

    // Wait for load + brief delay so hero LCP paints first
    if (document.readyState === "complete") {
      timeoutId = setTimeout(schedule, 2500);
    } else {
      window.addEventListener(
        "load",
        () => {
          timeoutId = setTimeout(schedule, 2500);
        },
        { once: true }
      );
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
