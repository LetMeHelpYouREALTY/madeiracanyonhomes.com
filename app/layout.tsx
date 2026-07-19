import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { headers } from "next/headers";
import { getDomainConfig } from "@/lib/domain-config";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { REALSCOUT_WIDGET_SCRIPT } from "@/lib/realscout";
import CalendlyProvider from "@/components/calendly/CalendlyProvider";
import { generateLocalBusinessSchema } from "@/lib/gbp-schema";
import { siteConfig } from "@/lib/site-config";

const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url).replace(/\/$/, "") ||
  "https://www.madeiracanyonhomes.com";

export async function generateMetadata(): Promise<Metadata> {
  const domain = headers().get("x-domain") || "";
  const config = getDomainConfig(domain);
  const isMadeira =
    config.domain === "madeiracanyonhomes.com" ||
    domain.replace(/^www\./, "").toLowerCase() === "madeiracanyonhomes.com" ||
    !domain;
  const title = isMadeira
    ? "Madeira Canyon | Homes by Dr Jan Duffy | clubmadeirahoa.com"
    : `${config.neighborhood} | Dr. Jan Duffy, REALTOR® | BHHS Nevada`;

  const googleVerification =
    process.env.GOOGLE_SITE_VERIFICATION ||
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
    undefined;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: config.description,
    keywords: config.keywords,
    authors: [{ name: "Dr. Jan Duffy", url: `${SITE_URL}/about` }],
    creator: "Dr. Jan Duffy",
    publisher: siteConfig.fullName,
    // Do not set a sitewide canonical here — it would force every page to "/"
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    ...(googleVerification
      ? {
          verification: {
            google: googleVerification,
          },
        }
      : {}),
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/site.webmanifest",
    openGraph: {
      title: isMadeira ? "Madeira Canyon | Homes by Dr Jan Duffy" : config.heroHeadline,
      description: config.description,
      type: "website",
      url: isMadeira ? SITE_URL : undefined,
      siteName: siteConfig.name,
      locale: "en_US",
      images: [
        {
          url: "/images/hero/madeira-canyon-henderson-nv-home-exterior-2.jpg",
          width: 2028,
          height: 1421,
          alt: "Madeira Canyon homes for sale in Henderson NV near Club Madeira",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isMadeira ? "Madeira Canyon | Homes by Dr Jan Duffy" : config.heroHeadline,
      description: config.description,
      images: ["/images/hero/madeira-canyon-henderson-nv-home-exterior-2.jpg"],
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Sitewide LocalBusiness / RealEstateAgent JSON-LD — NAP + hours match GBP
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        <link rel="preconnect" href="https://em.realscout.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.realscout.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://assets.calendly.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://calendly.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://maps.google.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google.com" crossOrigin="anonymous" />
        {/* RealScout widgets — load once globally (script from em.realscout.com; API on www.realscout.com) */}
        <Script src={REALSCOUT_WIDGET_SCRIPT} strategy="afterInteractive" />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        {children}
        <CalendlyProvider />
        <Analytics />
      </body>
    </html>
  );
}
