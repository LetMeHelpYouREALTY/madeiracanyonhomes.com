/**
 * Page hero image registry — local assets under /public/images/hero
 * Used for SEO/AEO full-bleed heroes sitewide.
 */

export type HeroImage = {
  src: string;
  alt: string;
};

const H = "/images/hero";

export const heroImages = {
  default: {
    src: `${H}/henderson-home-1.jpg`,
    alt: "Henderson Nevada home exterior at golden hour",
  },
  madeiraCanyon: {
    src: `${H}/desert-canyon.jpg`,
    alt: "Desert canyon landscape near Madeira Canyon Henderson Nevada",
  },
  clubMadeira: {
    src: `${H}/luxury-estate.jpg`,
    alt: "Luxury estate home similar to Club Madeira Henderson living",
  },
  anthem: {
    src: `${H}/suburban-street.jpg`,
    alt: "Anthem Highlands style residential street in Henderson",
  },
  henderson: {
    src: `${H}/henderson-home-2.jpg`,
    alt: "Residential homes in Henderson Nevada",
  },
  summerlin: {
    src: `${H}/red-rock.jpg`,
    alt: "Red Rock Canyon scenery near Summerlin Las Vegas",
  },
  luxury: {
    src: `${H}/luxury-estate.jpg`,
    alt: "Luxury home exterior with modern architecture",
  },
  golf: {
    src: `${H}/golf-community.jpg`,
    alt: "Golf community fairway at sunrise",
  },
  lake: {
    src: `${H}/mountain-lake.jpg`,
    alt: "Lake and mountain landscape near Lake Las Vegas",
  },
  pool: {
    src: `${H}/resort-pool.jpg`,
    alt: "Resort-style community pool and cabanas",
  },
  courtyard: {
    src: `${H}/pool-courtyard.jpg`,
    alt: "Modern home pool courtyard in Southern Nevada",
  },
  skyline: {
    src: `${H}/las-vegas-skyline.jpg`,
    alt: "Las Vegas skyline at dusk",
  },
  desert: {
    src: `${H}/desert-sunset.jpg`,
    alt: "Nevada desert sunset over mountains",
  },
  newConstruction: {
    src: `${H}/new-construction.jpg`,
    alt: "New construction home framing on a building site",
  },
  interior: {
    src: `${H}/kitchen-interior.jpg`,
    alt: "Bright modern kitchen interior in a Nevada home",
  },
  buyers: {
    src: `${H}/keys-closing.jpg`,
    alt: "House keys at closing for a home purchase",
  },
  sellers: {
    src: `${H}/open-house.jpg`,
    alt: "Open house ready living room staged for buyers",
  },
  modern: {
    src: `${H}/modern-home-exterior.jpg`,
    alt: "Modern single-family home exterior with landscaping",
  },
  fiftyPlus: {
    src: `${H}/active-adult.jpg`,
    alt: "Bright active-adult style living room and patio light",
  },
  contact: {
    src: `${H}/contact-office.jpg`,
    alt: "Professional real estate office workspace",
  },
  services: {
    src: `${H}/henderson-home-3.jpg`,
    alt: "Southern Nevada home exterior representing full-service real estate",
  },
} as const satisfies Record<string, HeroImage>;

export type HeroImageKey = keyof typeof heroImages;

/** Route → hero image key for automated page wiring */
export const heroByRoute: Record<string, HeroImageKey> = {
  "/": "skyline",
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
};

export function getHeroForRoute(route: string): HeroImage {
  const key = heroByRoute[route] ?? "default";
  return heroImages[key];
}

export function getHero(key: HeroImageKey): HeroImage {
  return heroImages[key];
}
