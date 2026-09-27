import {
  CURATED_AMENITY_PLACES,
  MADEIRA_CANYON_COMMUNITY,
  type CuratedPlace,
} from "@/lib/amenities/madeira-canyon-amenities";
import { generateRealEstateAgentSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import type { FAQItem } from "@/lib/schema";

export function generateAmenitiesItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Nearby amenities in ${MADEIRA_CANYON_COMMUNITY.name}, ${MADEIRA_CANYON_COMMUNITY.city}`,
    itemListElement: CURATED_AMENITY_PLACES.map((place, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: placeToSchema(place),
    })),
  };
}

function placeToSchema(place: CuratedPlace) {
  const [streetAddress, localityPart] = splitAddress(place.address);
  const localityMatch = localityPart?.match(/^([^,]+),\s*([A-Z]{2})\s*(\d{5})?/);
  return {
    "@type": place.schemaType,
    name: place.name,
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality: localityMatch?.[1] ?? MADEIRA_CANYON_COMMUNITY.city,
      addressRegion: localityMatch?.[2] ?? MADEIRA_CANYON_COMMUNITY.state,
      postalCode: localityMatch?.[3] ?? MADEIRA_CANYON_COMMUNITY.zip,
      addressCountry: "US",
    },
  };
}

function splitAddress(full: string): [string, string] {
  const parts = full.split(",").map((p) => p.trim());
  if (parts.length < 2) return [full, ""];
  return [parts[0], parts.slice(1).join(", ")];
}

export function generateCommunityPlaceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: MADEIRA_CANYON_COMMUNITY.name,
    description:
      "Madeira Canyon master-planned neighborhood and Club Madeira in Henderson, NV 89044.",
    address: {
      "@type": "PostalAddress",
      addressLocality: MADEIRA_CANYON_COMMUNITY.city,
      addressRegion: MADEIRA_CANYON_COMMUNITY.state,
      postalCode: MADEIRA_CANYON_COMMUNITY.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: MADEIRA_CANYON_COMMUNITY.center.lat,
      longitude: MADEIRA_CANYON_COMMUNITY.center.lng,
    },
  };
}

export function generateAmenitiesPageSchema(faqs: FAQItem[]) {
  const agent = generateRealEstateAgentSchema();
  return [
    generateCommunityPlaceSchema(),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    generateAmenitiesItemListSchema(),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Nearby Amenities",
          item: `${siteConfig.url}/amenities`,
        },
      ],
    },
    {
      ...agent,
      areaServed: [
        ...(Array.isArray(agent.areaServed) ? agent.areaServed : []),
        {
          "@type": "Place",
          name: "Madeira Canyon",
          geo: {
            "@type": "GeoCoordinates",
            latitude: MADEIRA_CANYON_COMMUNITY.center.lat,
            longitude: MADEIRA_CANYON_COMMUNITY.center.lng,
          },
        },
      ],
    },
  ];
}
