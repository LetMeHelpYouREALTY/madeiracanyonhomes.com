/**
 * Photographer / author credits for hero imagery.
 * Wikimedia CC licenses require attribution; Unsplash does not require it
 * but we credit authors when known for E-E-A-T and engagement.
 *
 * Authors verified via Unsplash/Wikimedia pages (2026-07). Unknown Unsplash
 * authors stay as "Unsplash contributor" — never invent names.
 */

export type ImageCredit = {
  file: string;
  title: string;
  author: string;
  authorUrl?: string;
  sourceUrl: string;
  license: string;
  licenseUrl?: string;
  /** brand | wikimedia | unsplash */
  kind: "brand" | "wikimedia" | "unsplash";
};

const U = "https://unsplash.com/photos";
const C = "https://commons.wikimedia.org/wiki/File:";

export const imageCredits: ImageCredit[] = [
  // Brand / site originals
  {
    file: "madeira-canyon-henderson-nv-home-exterior-1.jpg",
    title: "Madeira Canyon Henderson home exterior",
    author: "Madeira Canyon | Homes by Dr Jan Duffy",
    authorUrl: "https://madeiracanyonhomes.com/about",
    sourceUrl:
      "https://madeiracanyonhomes.com/images/hero/madeira-canyon-henderson-nv-home-exterior-1.jpg",
    license: "All rights reserved (site brand asset)",
    kind: "brand",
  },
  {
    file: "madeira-canyon-henderson-nv-home-exterior-2.jpg",
    title: "Madeira Canyon Henderson residential exterior",
    author: "Madeira Canyon | Homes by Dr Jan Duffy",
    authorUrl: "https://madeiracanyonhomes.com/about",
    sourceUrl:
      "https://madeiracanyonhomes.com/images/hero/madeira-canyon-henderson-nv-home-exterior-2.jpg",
    license: "All rights reserved (site brand asset)",
    kind: "brand",
  },
  {
    file: "madeira-canyon-henderson-nv-home-exterior-3.jpg",
    title: "Madeira Canyon area home exterior",
    author: "Madeira Canyon | Homes by Dr Jan Duffy",
    authorUrl: "https://madeiracanyonhomes.com/about",
    sourceUrl:
      "https://madeiracanyonhomes.com/images/hero/madeira-canyon-henderson-nv-home-exterior-3.jpg",
    license: "All rights reserved (site brand asset)",
    kind: "brand",
  },
  {
    file: "madeira-canyon-area-single-family-home-nv.jpg",
    title: "Single-family home near Madeira Canyon, Henderson NV",
    author: "Madeira Canyon | Homes by Dr Jan Duffy",
    authorUrl: "https://madeiracanyonhomes.com/about",
    sourceUrl:
      "https://madeiracanyonhomes.com/images/hero/madeira-canyon-area-single-family-home-nv.jpg",
    license: "All rights reserved (site brand asset)",
    kind: "brand",
  },

  // Wikimedia — attribution required
  {
    file: "las-vegas-strip-skyline-blue-diamond-hill-nv.jpg",
    title: "Las Vegas Strip from Blue Diamond Hill",
    author: "Stan Shebs",
    authorUrl: "https://commons.wikimedia.org/wiki/User:Stan_Shebs",
    sourceUrl: `${C}Las_Vegas_Strip_from_Blue_Diamond_Hill_3.jpg`,
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    kind: "wikimedia",
  },
  {
    file: "las-vegas-strip-night-lights-nv.jpg",
    title: "Las Vegas Strip lights at night",
    author: "EconomicOldenburger",
    authorUrl: "https://commons.wikimedia.org/wiki/User:EconomicOldenburger",
    sourceUrl: `${C}Las_Vegas_Strip_lights_at_night.jpg`,
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    kind: "wikimedia",
  },
  {
    file: "red-rock-canyon-calico-hills-summerlin-nv.jpg",
    title: "Calico Hills at Red Rock Canyon National Conservation Area",
    author: "Frank Schulenburg",
    authorUrl: "https://commons.wikimedia.org/wiki/User:Frank_Schulenburg",
    sourceUrl: `${C}View_of_Calico_Hills_at_Red_Rock_Canyon_National_Conservation_Area_from_Scenic_Loop_Drive.jpg`,
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    kind: "wikimedia",
  },
  {
    file: "lake-mead-nevada-from-hoover-dam.jpg",
    title: "Lake Mead, Nevada",
    author: "Rick Pecoraro",
    authorUrl: "https://www.flickr.com/people/54063777@N00",
    sourceUrl: `${C}Lake_Mead.jpg`,
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    kind: "wikimedia",
  },

  // Unsplash — attribution appreciated (not required)
  {
    file: "las-vegas-boulevard-strip-dusk-nv.jpg",
    title: "Welcome to Fabulous Las Vegas signage",
    author: "Grant Cai",
    authorUrl: "https://unsplash.com/@grantcaiphoto",
    sourceUrl: `${U}/9xjdQ8-zLKI`,
    license: "Unsplash License",
    licenseUrl: "https://unsplash.com/license",
    kind: "unsplash",
  },
  {
    file: "home-keys-closing-day-real-estate.jpg",
    title: "House miniature and keys (home purchase)",
    author: "Tierra Mallorca",
    authorUrl: "https://unsplash.com/@tierramallorca",
    sourceUrl: `${U}/rgJ1J8SDEAY`,
    license: "Unsplash License",
    licenseUrl: "https://unsplash.com/license",
    kind: "unsplash",
  },
  {
    file: "mojave-desert-sunset-southern-nevada.jpg",
    title: "Desert hillside temple silhouette (stock lifestyle)",
    author: "Harry Kessell",
    authorUrl: "https://unsplash.com/@harrykessell",
    sourceUrl: `${U}/eE2trMn-6a0`,
    license: "Unsplash License",
    licenseUrl: "https://unsplash.com/license",
    kind: "unsplash",
  },
  {
    file: "red-rock-formations-near-las-vegas-nv.jpg",
    title: "High-rise skyline at dusk (stock lifestyle)",
    author: "Esmonde Yong",
    authorUrl: "https://unsplash.com/@esmonde",
    sourceUrl: `${U}/-9B08uduMyY`,
    license: "Unsplash License",
    licenseUrl: "https://unsplash.com/license",
    kind: "unsplash",
  },
  {
    file: "southwest-luxury-home-exterior-pool.jpg",
    title: "Southwest luxury home with pool",
    author: "Avi Werde",
    authorUrl: "https://unsplash.com/@aviwerde",
    sourceUrl: `${U}/hHz4yrvxwlA`,
    license: "Unsplash License",
    licenseUrl: "https://unsplash.com/license",
    kind: "unsplash",
  },
  {
    file: "henderson-style-modern-home-curb-appeal.jpg",
    title: "Modern home curb appeal",
    author: "Frames For Your Heart",
    authorUrl: "https://unsplash.com/@framesforyourheart",
    sourceUrl: `${U}/mR1CIDduGLc`,
    license: "Unsplash License",
    licenseUrl: "https://unsplash.com/license",
    kind: "unsplash",
  },
  {
    file: "resort-community-pool-henderson-lifestyle.jpg",
    title: "Resort community pool lifestyle",
    author: "Anmol Seth",
    authorUrl: "https://unsplash.com/@anmol_seth",
    sourceUrl: `${U}/hDbCjHNdF48`,
    license: "Unsplash License",
    licenseUrl: "https://unsplash.com/license",
    kind: "unsplash",
  },
  {
    file: "desert-golf-community-fairway-nevada.jpg",
    title: "Golfer swinging on fairway (stock lifestyle)",
    author: "Courtney Cook",
    authorUrl: "https://unsplash.com/@courtneymcook",
    sourceUrl: `${U}/SsIIw_MET0E`,
    license: "Unsplash License",
    licenseUrl: "https://unsplash.com/license",
    kind: "unsplash",
  },
  {
    file: "new-construction-homesite-las-vegas-valley.jpg",
    title: "Architect drafting plans (new construction metaphor)",
    author: "Daniel McCullough",
    authorUrl: "https://unsplash.com/@d_mccullough",
    sourceUrl: `${U}/HtBlQdxfG9k`,
    license: "Unsplash License",
    licenseUrl: "https://unsplash.com/license",
    kind: "unsplash",
  },
  {
    file: "staged-home-interior-open-house-nevada.jpg",
    title: "Staged home interior for open house",
    author: "Unsplash contributor",
    sourceUrl:
      "https://images.unsplash.com/photo-1600585154526-be33763f01dc",
    license: "Unsplash License",
    licenseUrl: "https://unsplash.com/license",
    kind: "unsplash",
  },
  {
    file: "modern-kitchen-home-buyer-nevada.jpg",
    title: "Modern kitchen interior",
    author: "Unsplash contributor",
    sourceUrl:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    license: "Unsplash License",
    licenseUrl: "https://unsplash.com/license",
    kind: "unsplash",
  },
  {
    file: "active-adult-community-living-room-light.jpg",
    title: "Bright living room light",
    author: "Jarek Ceborski",
    authorUrl: "https://unsplash.com/@jarson",
    sourceUrl: `${U}/jn7uVeCdf6U`,
    license: "Unsplash License",
    licenseUrl: "https://unsplash.com/license",
    kind: "unsplash",
  },
  {
    file: "suburban-neighborhood-street-southwest.jpg",
    title: "Suburban neighborhood street",
    author: "Wes Fischer",
    authorUrl: "https://unsplash.com/@ntwrk_img",
    sourceUrl: `${U}/g39p1kDjvSY`,
    license: "Unsplash License",
    licenseUrl: "https://unsplash.com/license",
    kind: "unsplash",
  },
  {
    file: "mountain-lake-reservoir-recreation-nv.jpg",
    title: "Mountain lake / reservoir recreation",
    author: "Sam Ferrara",
    authorUrl: "https://unsplash.com/@samferrara",
    sourceUrl: `${U}/1527pjeb6jg`,
    license: "Unsplash License",
    licenseUrl: "https://unsplash.com/license",
    kind: "unsplash",
  },
];

export function creditForFile(file: string): ImageCredit | undefined {
  const base = file.split("/").pop() || file;
  return imageCredits.find((c) => c.file === base);
}

export function creditsByKind(kind: ImageCredit["kind"]): ImageCredit[] {
  return imageCredits.filter((c) => c.kind === kind);
}

/** Credits still missing a named photographer (Unsplash placeholders). */
export function creditsNeedingAuthor(): ImageCredit[] {
  return imageCredits.filter(
    (c) => c.kind === "unsplash" && c.author === "Unsplash contributor"
  );
}

/** Format a human-readable credit line */
export function formatCreditLine(credit: ImageCredit): string {
  return `${credit.title} — Photo by ${credit.author} (${credit.license})`;
}

/** True when every hero file basename has a credit row */
export function hasCreditForEveryFile(files: string[]): boolean {
  return files.every((f) => Boolean(creditForFile(f)));
}
