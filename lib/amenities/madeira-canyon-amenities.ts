/**
 * Madeira Canyon hyperlocal amenity map configuration.
 * Center: Club Madeira / Dr. Jan Duffy office coordinates (site-config officeInfo),
 * documented on Compass MLS listings at 2721 Bonaparte Ln, Henderson NV 89044.
 */

import { officeInfo, siteConfig } from "@/lib/site-config";

export const MADEIRA_CANYON_COMMUNITY = {
  name: "Madeira Canyon",
  shortName: "Madeira Canyon",
  city: "Henderson",
  state: "NV",
  zip: "89044",
  /** Community center for map radius searches */
  center: {
    lat: officeInfo.coordinates.lat,
    lng: officeInfo.coordinates.lng,
  },
  centerLabel: "Madeira Canyon & Club Madeira",
  centerAddress: officeInfo.address.full,
  centerSource:
    "2721 Bonaparte Ln, Henderson NV 89044 (GBP/office NAP and site-config officeInfo.coordinates)",
  defaultZoom: 14,
  searchRadiusMeters: 8000,
} as const;

export type AmenityCategoryId =
  | "parks"
  | "grocery"
  | "restaurants"
  | "cafes"
  | "schools"
  | "healthcare"
  | "pharmacies"
  | "shopping"
  | "fitness"
  | "golf"
  | "parking";

export type AmenityCategory = {
  id: AmenityCategoryId;
  label: string;
  /** Google Places (New) primary types for searchNearby */
  googleTypes: string[];
  ariaLabel: string;
};

/** Family master-planned community — parks and daily errands first, schools included */
export const AMENITY_CATEGORIES: AmenityCategory[] = [
  {
    id: "parks",
    label: "Parks",
    googleTypes: ["park", "playground"],
    ariaLabel: "Show parks and recreation near Madeira Canyon",
  },
  {
    id: "grocery",
    label: "Grocery",
    googleTypes: ["grocery_store", "supermarket"],
    ariaLabel: "Show grocery stores near Madeira Canyon",
  },
  {
    id: "restaurants",
    label: "Restaurants",
    googleTypes: ["restaurant"],
    ariaLabel: "Show restaurants near Madeira Canyon",
  },
  {
    id: "cafes",
    label: "Cafes",
    googleTypes: ["cafe", "coffee_shop"],
    ariaLabel: "Show cafes near Madeira Canyon",
  },
  {
    id: "schools",
    label: "Schools",
    googleTypes: ["school", "primary_school", "secondary_school"],
    ariaLabel: "Show schools near Madeira Canyon",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    googleTypes: ["hospital", "doctor", "medical_clinic"],
    ariaLabel: "Show hospitals and clinics near Madeira Canyon",
  },
  {
    id: "pharmacies",
    label: "Pharmacies",
    googleTypes: ["pharmacy", "drugstore"],
    ariaLabel: "Show pharmacies near Madeira Canyon",
  },
  {
    id: "shopping",
    label: "Shopping",
    googleTypes: ["shopping_mall", "department_store"],
    ariaLabel: "Show shopping near Madeira Canyon",
  },
  {
    id: "fitness",
    label: "Fitness",
    googleTypes: ["gym", "fitness_center"],
    ariaLabel: "Show gyms and fitness centers near Madeira Canyon",
  },
  {
    id: "golf",
    label: "Golf",
    googleTypes: ["golf_course"],
    ariaLabel: "Show golf courses near Madeira Canyon",
  },
  {
    id: "parking",
    label: "Parking",
    googleTypes: ["parking"],
    ariaLabel: "Show parking near Madeira Canyon",
  },
];

export type CuratedPlace = {
  name: string;
  category: AmenityCategoryId;
  address: string;
  /** Optional coordinates for fallback map markers (verified via Google Maps / City of Henderson) */
  lat?: number;
  lng?: number;
  schemaType:
    | "Park"
    | "Restaurant"
    | "CafeOrCoffeeShop"
    | "GroceryStore"
    | "School"
    | "Hospital"
    | "Pharmacy"
    | "ShoppingCenter"
    | "ExerciseGym"
    | "GolfCourse"
    | "Place";
  note?: string;
};

/**
 * Curated places for crawlable HTML and map fallback (verified names/addresses only).
 */
export const CURATED_AMENITY_PLACES: CuratedPlace[] = [
  {
    name: "Madeira Canyon Park",
    category: "parks",
    address: "2390 Democracy Dr, Henderson, NV 89044",
    lat: 35.93187,
    lng: -115.08807,
    schemaType: "Park",
    note: "City of Henderson park with splash pad, fields, tennis, and trails.",
  },
  {
    name: "Shirley & Bill Wallin Elementary School",
    category: "schools",
    address: "2333 Canyon Retreat Dr, Henderson, NV 89044",
    lat: 35.9334,
    lng: -115.0908,
    schemaType: "School",
    note: "CCSD elementary campus near Madeira Canyon Park — confirm zoning by address.",
  },
  {
    name: "Del E. Webb Middle School",
    category: "schools",
    address: "2200 Reunion Dr, Henderson, NV 89052",
    schemaType: "School",
    note: "Common CCSD middle school name in Madeira Canyon buyer guides — verify assignment.",
  },
  {
    name: "Liberty High School",
    category: "schools",
    address: "3700 Liberty Heights Ave, Henderson, NV 89052",
    schemaType: "School",
    note: "CCSD high school referenced for Anthem Highlands addresses — verify assignment.",
  },
  {
    name: "Albertsons",
    category: "grocery",
    address: "2910 Bicentennial Pkwy, Henderson, NV 89044",
    lat: 35.9422,
    lng: -115.0674,
    schemaType: "GroceryStore",
    note: "Grocery in ZIP 89044 on the Bicentennial Parkway corridor.",
  },
  {
    name: "Smith's Food and Drug",
    category: "grocery",
    address: "10616 S Eastern Ave, Henderson, NV 89052",
    schemaType: "GroceryStore",
    note: "Full-service Kroger-owned grocery south of Madeira Canyon in Henderson.",
  },
  {
    name: "Henderson Hospital",
    category: "healthcare",
    address: "1050 W Galleria Dr, Henderson, NV 89014",
    schemaType: "Hospital",
    note: "Dignity Health hospital serving southeast Henderson.",
  },
  {
    name: "St. Rose Dominican Hospital, Siena Campus",
    category: "healthcare",
    address: "3001 St Rose Pkwy, Henderson, NV 89052",
    schemaType: "Hospital",
    note: "Major acute-care hospital west of the Anthem corridor.",
  },
  {
    name: "Rio Secco Golf Club",
    category: "golf",
    address: "2851 Grand Hills Dr, Henderson, NV 89052",
    schemaType: "GolfCourse",
    note: "Championship course in the Anthem / Seven Hills area.",
  },
  {
    name: "Anthem Country Club",
    category: "golf",
    address: "1 Club Side Dr, Henderson, NV 89052",
    schemaType: "GolfCourse",
    note: "Private club in the broader Anthem master plan.",
  },
  {
    name: "The Club at Madeira Canyon (Club Madeira)",
    category: "fitness",
    address: "2721 Bonaparte Ln, Henderson, NV 89044",
    schemaType: "ExerciseGym",
    note: "Guard-gated village clubhouse with pool and fitness — amenity access varies by parcel.",
  },
];

export const AMENITIES_PAGE_FAQ = [
  {
    question: "What grocery stores are near Madeira Canyon?",
    answer:
      "Albertsons at 2910 Bicentennial Pkwy (Henderson, NV 89044) sits in the same ZIP as Madeira Canyon; Smith's Food and Drug at 10616 S Eastern Ave (89052) is another common full-service option a short drive south. Drive times vary with traffic — call Dr. Jan at (702) 500-1942 to tour routes from a specific street.",
  },
  {
    question: "How far is Madeira Canyon from the Las Vegas Strip?",
    answer:
      "Madeira Canyon in southeast Henderson is roughly 20–30 minutes by car to the central Las Vegas Strip depending on time of day and your exit — approximate only. Buyers often compare that commute with Inspirada or Green Valley alternatives.",
  },
  {
    question: "Are there hospitals near Madeira Canyon?",
    answer:
      "Yes — Henderson Hospital (1050 W Galleria Dr) and St. Rose Dominican Hospital, Siena Campus (3001 St Rose Pkwy) are major acute-care options within a typical 15–25 minute drive of Madeira Canyon, approximate. Always confirm current ER wait times and specialties directly with the hospital.",
  },
  {
    question: "What park serves Madeira Canyon residents?",
    answer:
      "Madeira Canyon Park at 2390 Democracy Dr is the City of Henderson park with splash pad, ball fields, tennis, and trails at the heart of the neighborhood.",
  },
  {
    question: "Which schools are associated with Madeira Canyon addresses?",
    answer:
      "Many Madeira Canyon listings reference Shirley & Bill Wallin Elementary, Del E. Webb Middle, and Liberty High in CCSD — zoning changes; verify your exact address in the Clark County School District zoning search before you write an offer.",
  },
  {
    question: "Is there golf near Madeira Canyon?",
    answer:
      "Rio Secco Golf Club and Anthem Country Club are well-known courses in the Anthem / Seven Hills corridor near Madeira Canyon; membership and guest policies vary by club.",
  },
  {
    question: "How far is Madeira Canyon from Harry Reid International Airport?",
    answer:
      "Harry Reid International Airport is typically about 25–35 minutes from Madeira Canyon by car via I-215 and I-515, approximate depending on traffic and terminal.",
  },
  {
    question: "Who helps buyers compare Madeira Canyon amenities to other Henderson communities?",
    answer:
      "Dr. Jan Duffy at Madeira Canyon | Homes by Dr Jan Duffy (Berkshire Hathaway HomeServices Nevada Properties) specializes in Madeira Canyon, Club Madeira, and nearby Henderson villages — call (702) 500-1942 or email DrDuffy@MadeiraCanyonHomes.com.",
  },
];

export const AMENITIES_PAGE_PATH = "/amenities";

export function getKeylessMapEmbedUrl(): string {
  const { lat, lng } = MADEIRA_CANYON_COMMUNITY.center;
  const params = new URLSearchParams({
    q: `${lat},${lng}`,
    z: String(MADEIRA_CANYON_COMMUNITY.defaultZoom),
    output: "embed",
  });
  return `https://www.google.com/maps?${params.toString()}`;
}

export function getPlaceDirectionsUrl(query: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}

export function getCuratedPlacesByCategory(
  category: AmenityCategoryId
): CuratedPlace[] {
  return CURATED_AMENITY_PLACES.filter((p) => p.category === category);
}

export const amenitiesPageMetadata = {
  title: "Nearby Amenities in Madeira Canyon, Henderson NV | Dr Jan Duffy",
  description:
    "Interactive map and guide to dining, parks, grocery, schools, healthcare, and golf near Madeira Canyon & Club Madeira, Henderson NV 89044. Dr. Jan Duffy (702) 500-1942.",
  canonical: `${siteConfig.url}${AMENITIES_PAGE_PATH}`,
};
