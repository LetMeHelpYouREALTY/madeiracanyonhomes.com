import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * Google Search Console crawl rules (served at /robots.txt on www and apex).
 * Sitemap points at the preferred host (www). No `Host:` line — that is a
 * Yandex extension; Google ignores it and some GSC views prefer a clean file.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/monitoring/", "/admin/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/monitoring/", "/admin/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/", "/images/", "/_next/image"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
