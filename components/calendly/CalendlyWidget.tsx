"use client";

import { useEffect, useRef, useState } from "react";
import { resolveCalendlyUrl } from "@/lib/calendly";
import "./types";

interface CalendlyWidgetProps {
  /** Full Calendly URL or intent key (showing | appointment | quick | contact | …) */
  url?: string;
  minWidth?: string;
  height?: string;
}

/**
 * Inline Calendly embed — mounts only after the host enters the viewport
 * so booking CSS/JS (~2MB) does not compete with LCP on first paint.
 */
export default function CalendlyWidget({
  url = "appointment",
  minWidth = "320px",
  height = "700px",
}: CalendlyWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const resolvedUrl = resolveCalendlyUrl(url);

  useEffect(() => {
    const parent = widgetRef.current;
    if (!parent) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );
    observer.observe(parent);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const parent = widgetRef.current;
    if (!parent) return;

    const initWidget = () => {
      if (!window.Calendly || !widgetRef.current) return;

      widgetRef.current.innerHTML = "";

      const widgetDiv = document.createElement("div");
      widgetDiv.className = "calendly-inline-widget";
      widgetDiv.setAttribute("data-url", resolvedUrl);
      widgetDiv.style.minWidth = minWidth;
      widgetDiv.style.height = height;
      widgetDiv.style.width = "100%";

      widgetRef.current.appendChild(widgetDiv);

      window.Calendly.initInlineWidget({
        url: resolvedUrl,
        parentElement: widgetDiv,
      });
    };

    if (window.Calendly) {
      initWidget();
      return;
    }

    const onLoaded = () => initWidget();
    window.addEventListener("calendly-loaded", onLoaded);

    const checkCalendly = window.setInterval(() => {
      if (window.Calendly) {
        window.clearInterval(checkCalendly);
        initWidget();
      }
    }, 100);

    const timeout = window.setTimeout(() => {
      window.clearInterval(checkCalendly);
    }, 10000);

    return () => {
      window.removeEventListener("calendly-loaded", onLoaded);
      window.clearInterval(checkCalendly);
      window.clearTimeout(timeout);
    };
  }, [isVisible, resolvedUrl, minWidth, height]);

  return (
    <div
      ref={widgetRef}
      className="calendly-widget-host"
      style={{ minWidth, height, width: "100%" }}
      data-calendly-url={resolvedUrl}
      aria-label="Schedule with Dr. Jan Duffy on Calendly"
    />
  );
}
