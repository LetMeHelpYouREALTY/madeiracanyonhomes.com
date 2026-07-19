import { MetadataRoute } from "next";
import { headers } from "next/headers";

// Dynamic per-domain robots.txt. This deployment serves 80+ domains
// (see lib/domain-config.ts) from one codebase, so the sitemap URL must
// always point back to the domain that was actually requested — a
// hardcoded host here would make Google Search Console reject every
// other domain's submitted sitemap as pointing off-site.
export default function robots(): MetadataRoute.Robots {
  const host = headers().get("host") || "heyberkshire.com";
  const baseUrl = `https://${host}`;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/", "/monitoring/"],
      },
      // Slow down aggressive SEO crawlers instead of blocking them outright
      { userAgent: "AhrefsBot", allow: "/", crawlDelay: 10 },
      { userAgent: "SemrushBot", allow: "/", crawlDelay: 10 },
      { userAgent: "Bingbot", allow: "/", crawlDelay: 5 },
      // Block AI training crawlers, but explicitly allow Google's SGE bot
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "anthropic-ai", disallow: "/" },
      { userAgent: "Claude-Web", disallow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
