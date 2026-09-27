import { headers } from "next/headers";
import { BreadcrumbSchema } from "@/components/SchemaScript";
import { breadcrumbsFromPathname } from "@/lib/breadcrumbs-from-path";

/** Sitewide BreadcrumbList JSON-LD for all non-home routes (server-rendered). */
export default function AutoBreadcrumbJsonLd() {
  const pathname = headers().get("x-pathname") ?? "/";
  const items = breadcrumbsFromPathname(pathname);
  if (items.length < 2) {
    return null;
  }
  return <BreadcrumbSchema items={items} />;
}
