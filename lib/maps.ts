/**
 * Google Maps embeds for Madeira Canyon / Club Madeira office.
 * NAP must match GBP: Suite A, 2721 Bonaparte Ln, Henderson, NV 89044
 */

import { officeInfo } from "@/lib/site-config";

export const MADEIRA_CANYON_MAP = {
  label: "Madeira Canyon, Henderson, NV",
  communityQuery: "Madeira Canyon, Henderson, NV 89044",
  parkQuery: "Madeira Canyon Park, Henderson, NV",
  officeQuery: officeInfo.address.full,
  lat: officeInfo.coordinates.lat,
  lng: officeInfo.coordinates.lng,
  zoomOffice: 15,
  zoomCommunity: 13,
} as const;

export type MapFocus = "office" | "community" | "park";

/** Legacy no-API-key embed (same pattern as existing /contact map). */
export function getGoogleMapsEmbedUrl(focus: MapFocus = "office"): string {
  const q =
    focus === "community"
      ? MADEIRA_CANYON_MAP.communityQuery
      : focus === "park"
        ? MADEIRA_CANYON_MAP.parkQuery
        : MADEIRA_CANYON_MAP.officeQuery;
  const z =
    focus === "office"
      ? MADEIRA_CANYON_MAP.zoomOffice
      : MADEIRA_CANYON_MAP.zoomCommunity;
  const params = new URLSearchParams({
    q,
    t: "m",
    z: String(z),
    ie: "UTF8",
    iwloc: "",
    output: "embed",
  });
  return `https://maps.google.com/maps?${params.toString()}`;
}

export function getGoogleMapsViewUrl(focus: MapFocus = "office"): string {
  const q =
    focus === "community"
      ? MADEIRA_CANYON_MAP.communityQuery
      : focus === "park"
        ? MADEIRA_CANYON_MAP.parkQuery
        : MADEIRA_CANYON_MAP.officeQuery;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

export function getGoogleMapsDirectionsUrl(): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    MADEIRA_CANYON_MAP.officeQuery
  )}`;
}

/** Placeholder-friendly reviews URL used elsewhere on the site */
export const GOOGLE_REVIEWS_URL =
  "https://g.page/r/madeiracanyonhomes/review";
