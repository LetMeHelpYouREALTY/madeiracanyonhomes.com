import type { AmenityCategoryId } from "@/lib/amenities/madeira-canyon-amenities";

export type NearbyPlaceResult = {
  id: string;
  name: string;
  address?: string;
  lat: number;
  lng: number;
  directionsQuery: string;
  mapsUri?: string;
};

const cache = new Map<string, Promise<NearbyPlaceResult[]>>();

function readDisplayName(
  displayName: google.maps.places.Place["displayName"]
): string {
  if (!displayName) return "Place";
  if (typeof displayName === "string") return displayName;
  const withText = displayName as { text?: string };
  return withText.text ?? "Place";
}

export function searchCategory(
  center: google.maps.LatLngLiteral,
  categoryId: AmenityCategoryId,
  types: string[]
): Promise<NearbyPlaceResult[]> {
  const cached = cache.get(categoryId);
  if (cached) return cached;

  const request = (async () => {
    const { Place } = (await google.maps.importLibrary(
      "places"
    )) as google.maps.PlacesLibrary;
    const { places } = await Place.searchNearby({
      fields: [
        "displayName",
        "location",
        "formattedAddress",
        "googleMapsURI",
        "id",
      ],
      locationRestriction: { center, radius: 5000 },
      includedPrimaryTypes: types,
      maxResultCount: 10,
      rankPreference: "POPULARITY" as any,
    });

    return places
      .filter((place) => place.location)
      .map((place, i) => {
        const { lat, lng } = place.location!.toJSON();
        const name = readDisplayName(place.displayName);
        const address = place.formattedAddress ?? undefined;
        return {
          id: place.id ?? `place-${categoryId}-${i}`,
          name,
          address,
          lat,
          lng,
          directionsQuery: address ?? name,
          mapsUri: place.googleMapsURI ?? undefined,
        };
      });
  })();

  request.catch(() => cache.delete(categoryId));
  cache.set(categoryId, request);
  return request;
}
