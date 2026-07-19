import Script from "next/script";

/** GA4 measurement ID for MadeiraCanyonHomes.com */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-4WVZJXRSHX";

/**
 * Google Analytics 4 (gtag.js).
 * Uses afterInteractive so the hero LCP is not blocked by the GA script.
 */
export default function GoogleAnalytics() {
  const id = GA_MEASUREMENT_ID;
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-gtag" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${id}', { anonymize_ip: true });
      `}</Script>
    </>
  );
}
