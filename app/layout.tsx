import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { headers } from "next/headers";
import { getDomainConfig } from "@/lib/domain-config";
import { Analytics } from "@vercel/analytics/react";
import CalendlyProvider from "@/components/calendly/CalendlyProvider";
import DeferredWidgetTracker from "@/components/analytics/DeferredWidgetTracker";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
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
    ? "Madeira Canyon | Homes by Dr Jan Duffy | Madeira Canyon Homes"
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
          width: 1920,
          height: 1280,
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
        {/* dns-prefetch only — full preconnect steals early bandwidth from LCP hero */}
        <link rel="dns-prefetch" href="https://em.realscout.com" />
        <link rel="dns-prefetch" href="https://www.realscout.com" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        <link rel="dns-prefetch" href="https://calendly.com" />
        <link rel="dns-prefetch" href="https://maps.google.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://widgetbe.com" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        {children}
        <GoogleAnalytics />
        <CalendlyProvider />
        <DeferredWidgetTracker />
        <Analytics />
      </body>
    </html>
  );
}
