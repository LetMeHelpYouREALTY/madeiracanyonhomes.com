import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { headers } from "next/headers";
import { getDomainConfig } from "@/lib/domain-config";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers();
  const domain = headersList.get("x-domain") || "";
  const pathname = headersList.get("x-pathname") || "/";
  const config = getDomainConfig(domain);

  // Self-reference the exact host that was requested (don't normalize
  // www on/off — some of these 80+ domains redirect apex to www and some
  // don't). Every domain on this deployment must canonicalize to itself,
  // never to heyberkshire.com, or Google Search Console will flag it as
  // duplicate content / an invalid sitemap entry.
  const host = domain || "heyberkshire.com";
  const baseUrl = `https://${host}`;
  const canonicalUrl = `${baseUrl}${pathname}`;
  const googleSiteVerification =
    config.googleSiteVerification || process.env.GOOGLE_SITE_VERIFICATION;

  return {
    metadataBase: new URL(baseUrl),
    title: `${config.neighborhood} | Dr. Jan Duffy, REALTOR® | BHHS Nevada`,
    description: config.description,
    keywords: config.keywords,
    alternates: {
      canonical: pathname,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
    openGraph: {
      title: config.heroHeadline,
      description: config.description,
      url: canonicalUrl,
      siteName: "Dr. Jan Duffy | Berkshire Hathaway HomeServices Nevada Properties",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.heroHeadline,
      description: config.description,
    },
    ...(googleSiteVerification && {
      verification: { google: googleSiteVerification },
    }),
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        {/* WidgetTracker */}
        <Script id="widget-tracker" strategy="afterInteractive">{`
          (function(w,i,d,g,e,t){w["WidgetTrackerObject"]=g;(w[g]=w[g]||function()
          {(w[g].q=w[g].q||[]).push(arguments);}),(w[g].ds=1*new Date());(e="script"),
          (t=d.createElement(e)),(e=d.getElementsByTagName(e)[0]);t.async=1;t.src=i;
          e.parentNode.insertBefore(t,e);})
          (window,"https://widgetbe.com/agent",document,"widgetTracker");
          window.widgetTracker("create","WT-XQHVYQWW");
          window.widgetTracker("send","pageview");
        `}</Script>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
