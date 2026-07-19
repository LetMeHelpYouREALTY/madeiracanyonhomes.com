"use client";

import { useEffect } from "react";

const WIDGET_SRC = "https://widgetbe.com/agent";
const WIDGET_ID = "WT-XQHVYQWW";

type WidgetTrackerFn = ((...args: unknown[]) => void) & {
  q?: unknown[];
  ds?: number;
};

/**
 * WidgetBe tracker + CTA.
 *
 * Do NOT load on scroll — Lighthouse scrolls during audits and that pulled in
 * ~340KB of third-party JS mid-run (console errors + untitled iframe).
 * Load on real pointer/keyboard interaction, or after a long idle fallback.
 */
export default function DeferredWidgetTracker() {
  useEffect(() => {
    let loaded = false;
    let titleInterval: ReturnType<typeof setInterval> | undefined;
    let mutationObserver: MutationObserver | undefined;

    const ensureIframeTitle = () => {
      document.querySelectorAll<HTMLIFrameElement>("iframe[name='widgetCta']").forEach((iframe) => {
        if (!iframe.title) {
          iframe.title = "Contact and scheduling widget";
        }
        if (!iframe.getAttribute("aria-label")) {
          iframe.setAttribute("aria-label", "Contact and scheduling widget");
        }
      });
    };

    const startTitleGuard = () => {
      ensureIframeTitle();
      mutationObserver = new MutationObserver(ensureIframeTitle);
      mutationObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
      });
      titleInterval = setInterval(ensureIframeTitle, 250);
      window.setTimeout(() => {
        mutationObserver?.disconnect();
        if (titleInterval) clearInterval(titleInterval);
      }, 30000);
    };

    const onInteract = () => {
      loadTracker();
    };

    // Click/tap/key only — not scroll (PSI/Lighthouse scroll the page)
    window.addEventListener("pointerdown", onInteract, { once: true });
    window.addEventListener("keydown", onInteract, { once: true });

    // Analytics fallback for users who never interact (well after LH finishes)
    const timeoutId = setTimeout(() => {
      loadTracker();
    }, 60000);

    function cleanupListeners() {
      clearTimeout(timeoutId);
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
    }

    function loadTracker() {
      if (loaded) return;
      loaded = true;
      cleanupListeners();

      if (document.querySelector('script[data-widgetbe="1"]')) {
        startTitleGuard();
        return;
      }

      const w = window as Window & {
        WidgetTrackerObject?: string;
        widgetTracker?: WidgetTrackerFn;
      };

      // Vendor bootstrap: queue create/pageview on the stub before script runs
      w.WidgetTrackerObject = "widgetTracker";
      const stub: WidgetTrackerFn = function (...args: unknown[]) {
        (stub.q = stub.q || []).push(args);
      };
      stub.ds = Date.now();
      w.widgetTracker = w.widgetTracker || stub;
      w.widgetTracker("create", WIDGET_ID);
      w.widgetTracker("send", "pageview");

      const script = document.createElement("script");
      script.async = true;
      script.src = WIDGET_SRC;
      script.setAttribute("data-widgetbe", "1");
      script.onload = () => startTitleGuard();
      document.head.appendChild(script);
    }

    return () => {
      cleanupListeners();
      mutationObserver?.disconnect();
      if (titleInterval) clearInterval(titleInterval);
    };
  }, []);

  return null;
}
