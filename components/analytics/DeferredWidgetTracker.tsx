"use client";

import { useEffect } from "react";

const WIDGET_SRC = "https://widgetbe.com/agent";
const WIDGET_ID = "WT-XQHVYQWW";

/**
 * WidgetBe tracker + CTA — delayed until idle + interaction (or long timeout)
 * so hero LCP is not competed with ~340KB of unused third-party JS.
 */
export default function DeferredWidgetTracker() {
  useEffect(() => {
    let loaded = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const ensureIframeTitle = () => {
      document
        .querySelectorAll<HTMLIFrameElement>('iframe[name="widgetCta"]:not([title])')
        .forEach((iframe) => {
          iframe.title = "Contact and scheduling widget";
        });
    };

    const load = () => {
      if (loaded) return;
      loaded = true;
      cleanup();

      const w = window as Window & {
        WidgetTrackerObject?: string;
        widgetTracker?: ((...args: unknown[]) => void) & {
          q?: unknown[];
          ds?: number;
        };
      };

      const g = "widgetTracker";
      w.WidgetTrackerObject = g;
      w.widgetTracker =
        w.widgetTracker ||
        function (...args: unknown[]) {
          (w.widgetTracker!.q = w.widgetTracker!.q || []).push(args);
        };
      w.widgetTracker.ds = 1 * Date.now();

      const script = document.createElement("script");
      script.async = true;
      script.src = WIDGET_SRC;
      script.onload = () => {
        w.widgetTracker?.("create", WIDGET_ID);
        w.widgetTracker?.("send", "pageview");
        ensureIframeTitle();
        // Widget injects iframe asynchronously
        const mo = new MutationObserver(ensureIframeTitle);
        mo.observe(document.body, { childList: true, subtree: true });
        window.setTimeout(() => mo.disconnect(), 15000);
      };
      document.head.appendChild(script);
    };

    const onInteract = () => load();

    const cleanup = () => {
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener("scroll", onInteract);
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
    };

    window.addEventListener("scroll", onInteract, { once: true, passive: true });
    window.addEventListener("pointerdown", onInteract, { once: true });
    window.addEventListener("keydown", onInteract, { once: true });

    // Fallback: load after long idle so analytics still fire without interaction
    const scheduleIdle = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(() => load(), { timeout: 12000 });
      } else {
        timeoutId = setTimeout(load, 12000);
      }
    };

    // Wait until after load so LCP paint is not competing
    if (document.readyState === "complete") {
      timeoutId = setTimeout(scheduleIdle, 4000);
    } else {
      window.addEventListener(
        "load",
        () => {
          timeoutId = setTimeout(scheduleIdle, 4000);
        },
        { once: true }
      );
    }

    return cleanup;
  }, []);

  return null;
}
