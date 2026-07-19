"use client";

import { resolveCalendlyUrl } from "@/lib/calendly";
import "./types";

interface CalendlyButtonProps {
  url?: string;
  text?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function CalendlyButton({
  url = "appointment",
  text = "Schedule with Dr. Jan",
  className = "inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors",
  children,
}: CalendlyButtonProps) {
  const resolvedUrl = resolveCalendlyUrl(url);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: resolvedUrl });
      return;
    }
    window.open(resolvedUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <a
      href={resolvedUrl}
      onClick={handleClick}
      className={className}
      rel="noopener noreferrer"
    >
      {children || text}
    </a>
  );
}
