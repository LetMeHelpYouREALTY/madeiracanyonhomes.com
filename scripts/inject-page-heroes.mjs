#!/usr/bin/env node
/**
 * Injects full-bleed PageHero into marketing pages that still use text-only heroes.
 * Extracts existing H1 + first supporting paragraph; maps image via lib/hero-images route map.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const APP = path.join(ROOT, "app");

/** Inline copy of heroByRoute keys → src/alt (keep in sync with lib/hero-images.ts) */
const H = "/images/hero";
const IMAGES = {
  default: { src: `${H}/henderson-home-1.jpg`, alt: "Henderson Nevada home exterior at golden hour" },
  madeiraCanyon: { src: `${H}/desert-canyon.jpg`, alt: "Desert canyon landscape near Madeira Canyon Henderson Nevada" },
  clubMadeira: { src: `${H}/luxury-estate.jpg`, alt: "Luxury estate home similar to Club Madeira Henderson living" },
  anthem: { src: `${H}/suburban-street.jpg`, alt: "Anthem Highlands style residential street in Henderson" },
  henderson: { src: `${H}/henderson-home-2.jpg`, alt: "Residential homes in Henderson Nevada" },
  summerlin: { src: `${H}/red-rock.jpg`, alt: "Red Rock Canyon scenery near Summerlin Las Vegas" },
  luxury: { src: `${H}/luxury-estate.jpg`, alt: "Luxury home exterior with modern architecture" },
  golf: { src: `${H}/golf-community.jpg`, alt: "Golf community fairway at sunrise" },
  lake: { src: `${H}/mountain-lake.jpg`, alt: "Lake and mountain landscape near Lake Las Vegas" },
  pool: { src: `${H}/resort-pool.jpg`, alt: "Resort-style community pool and cabanas" },
  courtyard: { src: `${H}/pool-courtyard.jpg`, alt: "Modern home pool courtyard in Southern Nevada" },
  skyline: { src: `${H}/las-vegas-skyline.jpg`, alt: "Las Vegas skyline at dusk" },
  desert: { src: `${H}/desert-sunset.jpg`, alt: "Nevada desert sunset over mountains" },
  newConstruction: { src: `${H}/new-construction.jpg`, alt: "New construction home framing on a building site" },
  interior: { src: `${H}/kitchen-interior.jpg`, alt: "Bright modern kitchen interior in a Nevada home" },
  buyers: { src: `${H}/keys-closing.jpg`, alt: "House keys at closing for a home purchase" },
  sellers: { src: `${H}/open-house.jpg`, alt: "Open house ready living room staged for buyers" },
  modern: { src: `${H}/modern-home-exterior.jpg`, alt: "Modern single-family home exterior with landscaping" },
  fiftyPlus: { src: `${H}/active-adult.jpg`, alt: "Bright active-adult style living room and patio light" },
  contact: { src: `${H}/contact-office.jpg`, alt: "Professional real estate office workspace" },
  services: { src: `${H}/henderson-home-3.jpg`, alt: "Southern Nevada home exterior representing full-service real estate" },
};

const ROUTE_KEYS = {
  "/about": "contact",
  "/contact": "contact",
  "/services": "services",
  "/faq": "interior",
  "/listings": "modern",
  "/home-valuation": "sellers",
  "/buyers": "buyers",
  "/buyers/first-time-buyers": "buyers",
  "/buyers/california-relocator": "desert",
  "/buyers/luxury-homes-las-vegas": "luxury",
  "/sellers": "sellers",
  "/sellers/move-up": "modern",
  "/sellers/downsizing": "fiftyPlus",
  "/sellers/divorce-probate": "interior",
  "/sellers/relocation": "desert",
  "/relocation": "desert",
  "/luxury-homes": "luxury",
  "/new-construction": "newConstruction",
  "/investment-properties": "modern",
  "/why-berkshire-hathaway": "skyline",
  "/market-report": "skyline",
  "/market-update": "skyline",
  "/market-insights": "skyline",
  "/google-business": "contact",
  "/guides": "madeiraCanyon",
  "/compare": "henderson",
  "/neighborhoods": "henderson",
  "/neighborhoods/summerlin": "summerlin",
  "/neighborhoods/henderson": "henderson",
  "/neighborhoods/green-valley": "golf",
  "/neighborhoods/the-ridges": "luxury",
  "/neighborhoods/southern-highlands": "golf",
  "/neighborhoods/north-las-vegas": "newConstruction",
  "/neighborhoods/skye-canyon": "desert",
  "/neighborhoods/centennial-hills": "desert",
  "/neighborhoods/inspirada": "pool",
  "/neighborhoods/mountains-edge": "desert",
  "/55-plus-communities": "fiftyPlus",
  "/55-plus-communities/sun-city-summerlin": "fiftyPlus",
  "/55-plus-communities/sun-city-anthem": "golf",
  "/55-plus-communities/del-webb-lake-las-vegas": "lake",
  "/55-plus-communities/sun-city-aliante": "fiftyPlus",
  "/55-plus-communities/solera-anthem": "fiftyPlus",
  "/55-plus-communities/heritage-stonebridge": "fiftyPlus",
  "/55-plus-communities/trilogy-summerlin": "fiftyPlus",
};

const SKIP = new Set([
  path.join(APP, "page.tsx"), // homepage handled separately
  path.join(APP, "security-policy", "page.tsx"),
]);

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (ent.name === "page.tsx") out.push(p);
  }
  return out;
}

function fileToRoute(file) {
  let rel = path.relative(APP, file).replace(/\\/g, "/");
  if (rel === "page.tsx") return "/";
  rel = rel.replace(/\/page\.tsx$/, "");
  // dynamic
  if (rel.includes("[")) return null;
  return `/${rel}`;
}

function stripTags(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\{[^}]+\}/g, " ")
    .replace(/\s+/g, " ")
    .replace(/&ldquo;|&rdquo;|&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .trim();
}

function extractTitleSubtitle(src) {
  const h1 = src.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!h1) return null;
  const title = stripTags(h1[1]);
  if (!title) return null;

  // Prefer paragraph after h1 within ~800 chars
  const after = src.slice(src.indexOf(h1[0]) + h1[0].length, src.indexOf(h1[0]) + h1[0].length + 1200);
  const p = after.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  let subtitle = p ? stripTags(p[1]) : "";
  if (subtitle.length > 220) subtitle = subtitle.slice(0, 217).trim() + "…";
  if (!subtitle) subtitle = "Madeira Canyon | Homes by Dr Jan Duffy — Berkshire Hathaway HomeServices Nevada Properties.";
  return { title, subtitle };
}

/** Remove common text-only hero blocks so we don't double H1 */
function removeTextHero(src) {
  let out = src;

  // Pattern: {/* Hero */} ... until RealScoutListings or next major section comment
  const patterns = [
    /\{\/\*\s*Hero[^*]*\*\/\}[\s\S]*?(?=\n\s*<RealScoutListings)/,
    /\{\/\*\s*Hero Section[^*]*\*\/\}[\s\S]*?(?=\n\s*<RealScoutListings)/,
    /\{\/\*\s*Hero - NAP Prominent\s*\*\/\}[\s\S]*?(?=\n\s*<RealScoutListings|\n\s*<section)/,
    // guides/compare hubs: brand + h1 + p before list/ul
    /<p className="text-sm font-semibold text-blue-800 mb-3">[\s\S]*?<\/p>\s*<h1[\s\S]*?<\/h1>\s*<p className="text-xl text-slate-600 mb-10">[\s\S]*?<\/p>\s*/,
    // neighborhoods hub hero
    /\{\/\*\s*Hero\s*\*\/\}\s*<div className="max-w-4xl mx-auto text-center mb-16">[\s\S]*?<\/div>\s*/,
    // generic max-w-4xl centered hero with h1 (first occurrence after main)
    /<div className="max-w-4xl mx-auto text-center mb-16">[\s\S]*?<\/div>\s*(?=\n\s*<RealScoutListings)/,
    /<div className="max-w-4xl mx-auto text-center mb-12">[\s\S]*?<\/div>\s*(?=\n\s*<RealScoutListings)/,
  ];

  for (const re of patterns) {
    if (re.test(out)) {
      out = out.replace(re, "\n");
      break;
    }
  }
  return out;
}

function ensureImport(src, importLine) {
  if (src.includes("PageHero")) return src;
  // After first import block line or at top after 'use client'
  if (src.startsWith("'use client'") || src.startsWith('"use client"')) {
    const nl = src.indexOf("\n");
    return src.slice(0, nl + 1) + importLine + "\n" + src.slice(nl + 1);
  }
  // Insert after last import from @/components or first import cluster
  const m = src.match(/^(?:import[\s\S]*?;\n)+/);
  if (m) {
    return m[0] + importLine + "\n" + src.slice(m[0].length);
  }
  return importLine + "\n" + src;
}

function inject(file) {
  if (SKIP.has(file)) return { file, status: "skip" };
  let src = fs.readFileSync(file, "utf8");
  if (src.includes("PageHero")) return { file, status: "already" };
  // SEO templates already handle heroes
  if (
    src.includes("NeighborhoodGuide") ||
    src.includes("AnswerGuide") ||
    src.includes("CompareGuide")
  ) {
    return { file, status: "template" };
  }

  const route = fileToRoute(file);
  if (!route) return { file, status: "dynamic-skip" };

  const extracted = extractTitleSubtitle(src);
  if (!extracted) return { file, status: "no-h1" };

  const key = ROUTE_KEYS[route] || "default";
  const image = IMAGES[key];

  const titleLit = JSON.stringify(extracted.title);
  const subLit = JSON.stringify(extracted.subtitle);
  const imgLit = JSON.stringify(image);

  src = ensureImport(
    src,
    'import PageHero from "@/components/sections/PageHero";'
  );

  // Insert hero after <Navbar />
  if (!src.includes("<Navbar")) return { file, status: "no-navbar" };

  src = src.replace(
    /<Navbar\s*\/>/,
    `<Navbar />\n      <PageHero\n        title={${titleLit}}\n        subtitle={${subLit}}\n        image={${imgLit}}\n      />`
  );

  // Relax top padding on main
  src = src.replace(
    /<main className="pt-24 pb-16"/g,
    '<main className="pb-16"'
  );
  src = src.replace(
    /<main className="pt-20 pb-16"/g,
    '<main className="pb-16"'
  );

  src = removeTextHero(src);

  // If H1 still present after hero (failed removal), demote remaining first h1 in main to h2 visually... better leave and warn
  const h1Count = (src.match(/<h1\b/g) || []).length;
  fs.writeFileSync(file, src);
  return { file, status: "updated", route, h1Count, key };
}

const files = walk(APP);
const results = files.map(inject);
const summary = results.reduce((acc, r) => {
  acc[r.status] = (acc[r.status] || 0) + 1;
  return acc;
}, {});
console.log(JSON.stringify({ summary, results }, null, 2));
