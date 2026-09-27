import type { BreadcrumbItem } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

const SEGMENT_LABELS: Record<string, string> = {
  about: "About",
  buyers: "Buyers",
  sellers: "Sellers",
  contact: "Contact",
  faq: "FAQ",
  neighborhoods: "Neighborhoods",
  guides: "Guides",
  compare: "Compare",
  listings: "Listings",
  services: "Services",
  relocation: "Relocation",
  "home-valuation": "Home Valuation",
  "luxury-homes": "Luxury Homes",
  "new-construction": "New Construction",
  "investment-properties": "Investment Properties",
  "market-report": "Market Report",
  "market-update": "Market Update",
  "market-insights": "Market Insights",
  "google-business": "Google Business Profile",
  "photo-credits": "Photo Credits",
  "security-policy": "Security Policy",
  "why-berkshire-hathaway": "Why Berkshire Hathaway",
  "55-plus-communities": "55+ Communities",
  "madeira-canyon": "Madeira Canyon",
  "club-madeira": "Club Madeira",
  "first-time-buyers": "First-Time Buyers",
  "california-relocator": "California Relocator",
  "luxury-homes-las-vegas": "Luxury Homes Las Vegas",
  "divorce-probate": "Divorce & Probate",
  downsizing: "Downsizing",
  "move-up": "Move-Up",
  "buying-madeira-canyon-homes": "Buying Madeira Canyon Homes",
  "selling-madeira-canyon": "Selling Madeira Canyon",
  "club-madeira-hoa": "Club Madeira HOA",
  "madeira-canyon-schools": "Madeira Canyon Schools",
  "henderson-relocation": "Henderson Relocation",
  "madeira-canyon-vs-anthem": "Madeira Canyon vs Anthem",
  "madeira-canyon-vs-cadence": "Madeira Canyon vs Cadence",
  "madeira-canyon-vs-inspirada": "Madeira Canyon vs Inspirada",
};

function labelForSegment(segment: string): string {
  if (SEGMENT_LABELS[segment]) return SEGMENT_LABELS[segment];
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Build BreadcrumbList items from a URL pathname (inner pages only).
 */
export function breadcrumbsFromPathname(pathname: string): BreadcrumbItem[] {
  const normalized = pathname.split("?")[0]?.split("#")[0] || "/";
  if (normalized === "/" || normalized === "") {
    return [];
  }

  const segments = normalized.replace(/^\/|\/$/g, "").split("/").filter(Boolean);
  const items: BreadcrumbItem[] = [{ name: "Home", url: "/" }];

  let path = "";
  for (const segment of segments) {
    path += `/${segment}`;
    items.push({
      name: labelForSegment(segment),
      url: path,
    });
  }

  return items;
}

export function absoluteBreadcrumbUrl(relativePath: string): string {
  const base = siteConfig.url.replace(/\/$/, "");
  if (relativePath.startsWith("http")) return relativePath;
  return `${base}${relativePath.startsWith("/") ? relativePath : `/${relativePath}`}`;
}
