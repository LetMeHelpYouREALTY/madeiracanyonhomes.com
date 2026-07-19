/**
 * Page hero image registry — local SEO / AEO / GEO assets under /public/images/hero
 *
 * Conventions (2026):
 * - Keyword-rich filenames (place + intent)
 * - Alt text: place + property type + city/state (visible on page via PageHero)
 * - Prefer Nevada place photos (Wikimedia / brand originals) over generic stock
 * - Author/credit from lib/image-credits.ts for ImageObject + /photo-credits
 */

import { creditForFile, type ImageCredit } from "@/lib/image-credits";

export type HeroImage = {
  src: string;
  alt: string;
  /** Optional caption for AEO / ImageObject */
  caption?: string;
  width?: number;
  height?: number;
  /** Photographer / rights holder */
  author?: string;
  authorUrl?: string;
  license?: string;
  licenseUrl?: string;
  sourceUrl?: string;
};

const H = "/images/hero";
const SITE = "https://madeiracanyonhomes.com";

function withCredit<T extends HeroImage>(image: T): T & Partial<ImageCredit> {
  const credit = creditForFile(image.src);
  if (!credit) return image;
  return {
    ...image,
    author: credit.author,
    authorUrl: credit.authorUrl,
    license: credit.license,
    licenseUrl: credit.licenseUrl,
    sourceUrl: credit.sourceUrl,
  };
}

export const heroImages = {
  default: {
    src: `${H}/madeira-canyon-henderson-nv-home-exterior-2.jpg`,
    alt: "Madeira Canyon homes for sale in Henderson NV — modern single-family exterior with pool near Club Madeira",
    caption: "Madeira Canyon | Homes by Dr Jan Duffy — Henderson, NV 89044",
    width: 2070,
    height: 1380,
  },
  madeiraCanyon: {
    // Best full-bleed Madeira Canyon hero: bright landscape, pool/patio, clean (no stock watermarks)
    src: `${H}/madeira-canyon-henderson-nv-home-exterior-2.jpg`,
    alt: "Madeira Canyon Henderson Nevada home for sale — modern exterior with pool and patio in ZIP 89044",
    caption: "Buy and sell Madeira Canyon homes with Dr. Jan Duffy, BHHS Nevada Properties",
    width: 2070,
    height: 1380,
  },
  clubMadeira: {
    src: `${H}/las-vegas-strip-skyline-blue-diamond-hill-nv.jpg`,
    alt: "Las Vegas Strip skyline views from elevated Henderson ridges near Club Madeira and Madeira Canyon",
    caption: "Club Madeira (clubmadeirahoa.com) buyers often pay a premium for valley and Strip views",
    width: 1920,
    height: 1280,
  },
  anthem: {
    src: `${H}/suburban-neighborhood-street-southwest.jpg`,
    alt: "Anthem Highlands Henderson NV residential street near Madeira Canyon and Club Madeira",
    caption: "Anthem corridor living — Madeira Canyon, Club Madeira, and nearby Henderson villages",
    width: 1920,
    height: 1280,
  },
  henderson: {
    src: `${H}/madeira-canyon-henderson-nv-home-exterior-2.jpg`,
    alt: "Henderson Nevada real estate — Madeira Canyon area home exterior for sale",
    caption: "Henderson homes with Dr. Jan Duffy — Suite A, 2721 Bonaparte Ln, Henderson, NV 89044",
    width: 2070,
    height: 1380,
  },
  summerlin: {
    src: `${H}/red-rock-canyon-calico-hills-summerlin-nv.jpg`,
    alt: "Red Rock Canyon Calico Hills near Summerlin Las Vegas Nevada — outdoor lifestyle for home buyers",
    caption: "Summerlin real estate near Red Rock Canyon National Conservation Area",
    width: 1920,
    height: 1536,
  },
  luxury: {
    src: `${H}/southwest-luxury-home-exterior-pool.jpg`,
    alt: "Luxury home with pool in the Las Vegas Valley — high-end Henderson and Summerlin estates",
    caption: "Luxury homes Las Vegas and Henderson — Berkshire Hathaway HomeServices Nevada Properties",
    width: 1920,
    height: 1280,
  },
  golf: {
    src: `${H}/desert-golf-community-fairway-nevada.jpg`,
    alt: "Desert golf community fairway in Southern Nevada — Anthem and Henderson golf-course living",
    caption: "Golf community homes in Henderson and the Las Vegas Valley",
    width: 1920,
    height: 1280,
  },
  lake: {
    src: `${H}/lake-mead-nevada-from-hoover-dam.jpg`,
    alt: "Lake Mead Nevada reservoir near Henderson and Lake Las Vegas waterfront communities",
    caption: "Lake Las Vegas and Lake Mead area homes — Henderson, NV",
    width: 1920,
    height: 1080,
  },
  pool: {
    src: `${H}/resort-community-pool-henderson-lifestyle.jpg`,
    alt: "Resort-style community pool lifestyle in Henderson NV — Inspirada and master-planned amenities",
    caption: "Resort amenities compared with Club Madeira and Madeira Canyon living",
    width: 1920,
    height: 1280,
  },
  courtyard: {
    src: `${H}/henderson-style-modern-home-curb-appeal.jpg`,
    alt: "Modern Henderson NV home curb appeal with desert landscaping and three-car garage style",
    caption: "Modern homes for sale in Henderson and Madeira Canyon",
    width: 1920,
    height: 1274,
  },
  skyline: {
    src: `${H}/las-vegas-strip-night-lights-nv.jpg`,
    alt: "Las Vegas Strip night lights — Southern Nevada skyline for relocating home buyers",
    caption: "Las Vegas and Henderson real estate market — Dr. Jan Duffy",
    width: 1920,
    height: 1277,
  },
  desert: {
    src: `${H}/mojave-desert-sunset-southern-nevada.jpg`,
    alt: "Mojave Desert sunset over Southern Nevada mountains near Henderson and Madeira Canyon",
    caption: "Relocating to Henderson NV — desert lifestyle near Madeira Canyon",
    width: 1920,
    height: 1280,
  },
  newConstruction: {
    src: `${H}/new-construction-homesite-las-vegas-valley.jpg`,
    alt: "New construction homesite in the Las Vegas Valley — Cadence and Henderson builder communities",
    caption: "New construction representation in Henderson and Las Vegas",
    width: 1920,
    height: 1280,
  },
  interior: {
    src: `${H}/modern-kitchen-home-buyer-nevada.jpg`,
    alt: "Modern white kitchen with island — buyer expectations for Henderson and Madeira Canyon homes",
    caption: "Home buying and selling guidance — Madeira Canyon | Homes by Dr Jan Duffy",
    width: 2400,
    height: 3600,
  },
  buyers: {
    src: `${H}/home-keys-closing-day-real-estate.jpg`,
    alt: "House keys on closing day — buying a home in Madeira Canyon or Club Madeira Henderson NV",
    caption: "How to buy a Madeira Canyon home with Dr. Jan Duffy",
    width: 1920,
    height: 1280,
  },
  sellers: {
    src: `${H}/staged-home-interior-open-house-nevada.jpg`,
    alt: "Staged living room ready for open house — selling in Henderson and Madeira Canyon Nevada",
    caption: "Sell your Madeira Canyon or Club Madeira home — listing preparation",
    width: 2400,
    height: 1266,
  },
  modern: {
    src: `${H}/henderson-style-modern-home-curb-appeal.jpg`,
    alt: "Modern single-family home exterior in Henderson Nevada for sale",
    caption: "Listings and modern homes — MadeiraCanyonHomes.com",
    width: 1920,
    height: 1274,
  },
  fiftyPlus: {
    src: `${H}/active-adult-community-living-room-light.jpg`,
    alt: "Bright active-adult community living space — 55+ homes near Summerlin and Anthem Nevada",
    caption: "55+ communities in Las Vegas and Henderson — Sun City, Del Webb, and more",
    width: 1920,
    height: 1280,
  },
  contact: {
    src: `${H}/madeira-canyon-henderson-nv-home-exterior-3.jpg`,
    alt: "Contact Madeira Canyon Homes by Dr Jan Duffy — Henderson NV office near Bonaparte Lane",
    caption: "Suite A, 2721 Bonaparte Ln, Henderson, NV 89044 · (702) 500-1942",
    width: 2070,
    height: 1380,
  },
  services: {
    src: `${H}/madeira-canyon-area-single-family-home-nv.jpg`,
    alt: "Full-service real estate for Madeira Canyon and Club Madeira Henderson Nevada homes",
    caption: "Buyer and seller services — Berkshire Hathaway HomeServices Nevada Properties",
    width: 1280,
    height: 1280,
  },
  stripDusk: {
    src: `${H}/las-vegas-boulevard-strip-dusk-nv.jpg`,
    alt: "Las Vegas Boulevard Strip at dusk — iconic Southern Nevada skyline",
    caption: "Las Vegas Valley real estate context for Henderson relocators",
    width: 1920,
    height: 1275,
  },
} as const satisfies Record<string, HeroImage>;

export type HeroImageKey = keyof typeof heroImages;

/** Route → hero image key for page wiring */
export const heroByRoute: Record<string, HeroImageKey> = {
  "/": "madeiraCanyon",
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
  "/why-berkshire-hathaway": "stripDusk",
  "/market-report": "skyline",
  "/market-update": "skyline",
  "/market-insights": "skyline",
  "/google-business": "contact",
  "/guides": "madeiraCanyon",
  "/guides/buying-madeira-canyon-homes": "buyers",
  "/guides/selling-madeira-canyon": "sellers",
  "/guides/club-madeira-hoa": "clubMadeira",
  "/guides/henderson-relocation": "desert",
  "/compare": "henderson",
  "/compare/madeira-canyon-vs-inspirada": "pool",
  "/compare/madeira-canyon-vs-anthem": "anthem",
  "/compare/madeira-canyon-vs-cadence": "newConstruction",
  "/neighborhoods": "henderson",
  "/neighborhoods/madeira-canyon": "madeiraCanyon",
  "/neighborhoods/club-madeira": "clubMadeira",
  "/neighborhoods/anthem": "anthem",
  "/neighborhoods/henderson": "henderson",
  "/neighborhoods/summerlin": "summerlin",
  "/neighborhoods/green-valley": "golf",
  "/neighborhoods/the-ridges": "luxury",
  "/neighborhoods/southern-highlands": "golf",
  "/neighborhoods/north-las-vegas": "newConstruction",
  "/neighborhoods/skye-canyon": "desert",
  "/neighborhoods/centennial-hills": "desert",
  "/neighborhoods/inspirada": "pool",
  "/neighborhoods/mountains-edge": "desert",
  "/neighborhoods/lake-las-vegas": "lake",
  "/neighborhoods/cadence": "newConstruction",
  "/55-plus-communities": "fiftyPlus",
  "/55-plus-communities/sun-city-summerlin": "fiftyPlus",
  "/55-plus-communities/sun-city-anthem": "golf",
  "/55-plus-communities/del-webb-lake-las-vegas": "lake",
  "/55-plus-communities/sun-city-aliante": "fiftyPlus",
  "/55-plus-communities/solera-anthem": "fiftyPlus",
  "/55-plus-communities/heritage-stonebridge": "fiftyPlus",
  "/55-plus-communities/trilogy-summerlin": "fiftyPlus",
  "/security-policy": "contact",
};

export function getHeroForRoute(route: string): HeroImage {
  const key = heroByRoute[route] ?? "default";
  return withCredit(heroImages[key]);
}

export function getHero(key: HeroImageKey): HeroImage {
  return withCredit(heroImages[key]);
}

/** ImageObject JSON-LD for AEO / GEO image understanding + author credit */
export function generateImageObjectSchema(image: HeroImage) {
  const credited = withCredit(image);
  const credit = creditForFile(credited.src);
  const url = credited.src.startsWith("http")
    ? credited.src
    : `${SITE}${credited.src}`;

  const authorName = credited.author || "Madeira Canyon | Homes by Dr Jan Duffy";
  const isBrand = credit?.kind === "brand" || !credited.author;
  const creditText = credited.author
    ? `Photo by ${credited.author}${credited.license ? ` · ${credited.license}` : ""}`
    : "Madeira Canyon | Homes by Dr Jan Duffy";

  const creatorEntity = isBrand
    ? {
        "@type": "Organization" as const,
        "@id": `${SITE}/#organization`,
        name: authorName,
        url: credited.authorUrl || `${SITE}/about`,
      }
    : {
        "@type": "Person" as const,
        name: authorName,
        ...(credited.authorUrl && { url: credited.authorUrl }),
      };

  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: url,
    url,
    name: credited.caption || credited.alt,
    description: credited.alt,
    ...(credited.caption && { caption: credited.caption }),
    ...(credited.width && { width: credited.width }),
    ...(credited.height && { height: credited.height }),
    ...(credited.license && {
      license: credited.licenseUrl || credited.license,
    }),
    ...(credited.sourceUrl && { acquireLicensePage: credited.sourceUrl }),
    creator: creatorEntity,
    author: creatorEntity,
    copyrightHolder: isBrand
      ? {
          "@type": "Organization",
          "@id": `${SITE}/#organization`,
          name: "Madeira Canyon | Homes by Dr Jan Duffy",
          url: SITE,
        }
      : creatorEntity,
    creditText,
    copyrightNotice: credited.license
      ? `${creditText}. Used on MadeiraCanyonHomes.com with license compliance.`
      : "Used for MadeiraCanyonHomes.com local real estate marketing",
  };
}
