import Script from "next/script";

/**
 * GA4 for MadeiraCanyonHomes.com — must be this property ID.
 * Do not prefer a shared NEXT_PUBLIC_GA_MEASUREMENT_ID: Vercel was baking in
 * another site's ID (G-1RRQY4S4TE), so Google couldn't detect G-4WVZJXRSHX.
 */
export const GA_MEASUREMENT_ID = "G-4WVZJXRSHX";

/**
 * Google Analytics 4 (gtag.js).
 * afterInteractive keeps LCP free; ID is inlined so Tag Assistant can see it.
 */
export default function GoogleAnalytics() {
  const id = GA_MEASUREMENT_ID;

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
        gtag('config', '${id}');
      `}</Script>
    </>
  );
}
