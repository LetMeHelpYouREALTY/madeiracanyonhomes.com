"use client";

import { useEffect } from "react";
import { REALSCOUT_WIDGET_SCRIPT } from "@/lib/realscout";

const SCRIPT_ATTR = "data-realscout-widget";

/** Inject RealScout web-components bundle once (idempotent). */
export function loadRealScoutScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  const existing = document.querySelector<HTMLScriptElement>(
    `script[${SCRIPT_ATTR}]`
  );
  if (existing) {
    if (
      existing.dataset.loaded === "1" ||
      customElements.get("realscout-office-listings") ||
      customElements.get("realscout-simple-search")
    ) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      existing.addEventListener("load", () => resolve(), { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = REALSCOUT_WIDGET_SCRIPT;
    script.async = true;
    script.setAttribute(SCRIPT_ATTR, "1");
    script.onload = () => {
      script.dataset.loaded = "1";
      resolve();
    };
    script.onerror = () => reject(new Error("RealScout script failed to load"));
    document.head.appendChild(script);
  });
}

type RealScoutScriptProps = {
  /** When true, load after window load + short idle (homepage search). */
  eagerIdle?: boolean;
};

/**
 * Loads RealScout after the page is interactive / near a widget.
 * Prefer mounting near listings; use eagerIdle for hero search only.
 */
export default function RealScoutScript({ eagerIdle = false }: RealScoutScriptProps) {
  useEffect(() => {
    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const run = () => {
      if (cancelled) return;
      void loadRealScoutScript();
    };

    if (!eagerIdle) {
      run();
      return;
    }

    const afterLoad = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(run, { timeout: 2500 });
      } else {
        timeoutId = setTimeout(run, 2000);
      }
    };

    if (document.readyState === "complete") {
      afterLoad();
    } else {
      window.addEventListener("load", afterLoad, { once: true });
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [eagerIdle]);

  return null;
}
