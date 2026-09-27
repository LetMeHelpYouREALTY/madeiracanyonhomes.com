"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { MapPin, Navigation } from "lucide-react";
import {
  AMENITY_CATEGORIES,
  CURATED_AMENITY_PLACES,
  MADEIRA_CANYON_COMMUNITY,
  getCuratedPlacesByCategory,
  getKeylessMapEmbedUrl,
  getPlaceDirectionsUrl,
  type AmenityCategoryId,
} from "@/lib/amenities/madeira-canyon-amenities";

type MapPlaceResult = {
  id: string;
  name: string;
  address?: string;
  rating?: number;
  lat: number;
  lng: number;
  directionsQuery: string;
};

type CommunityAmenityMapProps = {
  /** Initial category chip */
  defaultCategory?: AmenityCategoryId;
  /** Reserved map height (prevents CLS) */
  height?: number;
  className?: string;
  /** Show static curated list below map (always on in fallback mode) */
  showCuratedList?: boolean;
};

const MAP_CONTAINER_MIN_HEIGHT = 380;

declare global {
  interface Window {
    google?: {
      maps: {
        importLibrary: (name: string) => Promise<unknown>;
        Map: new (
          el: HTMLElement,
          opts: Record<string, unknown>
        ) => {
          setCenter: (c: { lat: number; lng: number }) => void;
          setZoom: (z: number) => void;
        };
        InfoWindow: new (opts?: Record<string, unknown>) => {
          setContent: (html: string) => void;
          open: (opts: { map: unknown; anchor?: unknown }) => void;
          close: () => void;
        };
        Marker: new (opts: Record<string, unknown>) => {
          setMap: (map: unknown | null) => void;
          addListener: (event: string, fn: () => void) => void;
        };
        LatLng: new (lat: number, lng: number) => unknown;
        places: {
          PlacesService: new (map: unknown) => {
            nearbySearch: (
              request: Record<string, unknown>,
              callback: (
                results: Array<Record<string, unknown>> | null,
                status: string
              ) => void
            ) => void;
          };
        };
      };
    };
  }
}

function getApiKey(): string | undefined {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  return key && key.length > 0 && !key.includes("your_") ? key : undefined;
}

function loadGoogleMapsScript(apiKey: string): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  if (window.google?.maps) return Promise.resolve();

  const existing = document.getElementById("google-maps-js");
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("maps script error")));
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = "google-maps-js";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey
    )}&libraries=places,marker&loading=async`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("maps script failed"));
    document.head.appendChild(script);
  });
}

function curatedToResults(category: AmenityCategoryId): MapPlaceResult[] {
  return getCuratedPlacesByCategory(category)
    .filter(
      (place): place is typeof place & { lat: number; lng: number } =>
        place.lat !== undefined && place.lng !== undefined
    )
    .map((place, i) => ({
      id: `curated-${place.name}-${i}`,
      name: place.name,
      address: place.address,
      lat: place.lat,
      lng: place.lng,
      directionsQuery: place.address,
    }));
}

export default function CommunityAmenityMap({
  defaultCategory = "parks",
  height = MAP_CONTAINER_MIN_HEIGHT,
  className = "",
  showCuratedList = true,
}: CommunityAmenityMapProps) {
  const sectionId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<unknown>(null);
  const markersRef = useRef<unknown[]>([]);
  const communityMarkerRef = useRef<unknown>(null);
  const infoWindowRef = useRef<{ close: () => void; setContent: (h: string) => void; open: (o: { map: unknown; anchor?: unknown }) => void } | null>(null);

  const apiKey = getApiKey();
  const [inView, setInView] = useState(false);
  const [activeCategory, setActiveCategory] =
    useState<AmenityCategoryId>(defaultCategory);
  const [places, setPlaces] = useState<MapPlaceResult[]>(() =>
    curatedToResults(defaultCategory)
  );
  const [loading, setLoading] = useState(false);
  const [useFallback, setUseFallback] = useState(!apiKey);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px", threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((marker) => {
      const m = marker as { setMap: (map: null) => void };
      m.setMap(null);
    });
    markersRef.current = [];
  }, []);

  const renderMarkers = useCallback(
    (results: MapPlaceResult[]) => {
      const google = window.google;
      const map = mapRef.current;
      if (!google?.maps || !map) return;

      clearMarkers();
      if (!infoWindowRef.current) {
        infoWindowRef.current = new google.maps.InfoWindow();
      }
      const infoWindow = infoWindowRef.current;

      const communityPosition = MADEIRA_CANYON_COMMUNITY.center;
      if (!communityMarkerRef.current) {
        communityMarkerRef.current = new google.maps.Marker({
          map,
          position: communityPosition,
          title: MADEIRA_CANYON_COMMUNITY.centerLabel,
          label: { text: "★", color: "#ffffff", fontWeight: "700" },
          zIndex: 1000,
        });
        const cm = communityMarkerRef.current as {
          addListener: (e: string, fn: () => void) => void;
        };
        cm.addListener("click", () => {
          infoWindow.setContent(
            `<div style="max-width:240px"><strong>${MADEIRA_CANYON_COMMUNITY.centerLabel}</strong><br/>${MADEIRA_CANYON_COMMUNITY.centerAddress}<br/><a href="${getPlaceDirectionsUrl(MADEIRA_CANYON_COMMUNITY.centerAddress)}" target="_blank" rel="noopener noreferrer">Directions</a></div>`
          );
          infoWindow.open({ map, anchor: communityMarkerRef.current as unknown });
        });
      }

      results.forEach((place) => {
        const marker = new google.maps.Marker({
          map,
          position: { lat: place.lat, lng: place.lng },
          title: place.name,
        });
        marker.addListener("click", () => {
          const ratingLine =
            place.rating !== undefined
              ? `<br/>Rating: ${place.rating.toFixed(1)}`
              : "";
          const addressLine = place.address
            ? `<br/>${place.address}`
            : "";
          infoWindow.setContent(
            `<div style="max-width:260px"><strong>${place.name}</strong>${ratingLine}${addressLine}<br/><a href="${getPlaceDirectionsUrl(place.directionsQuery)}" target="_blank" rel="noopener noreferrer">Directions</a></div>`
          );
          infoWindow.open({ map, anchor: marker });
        });
        markersRef.current.push(marker);
      });
    },
    [clearMarkers]
  );

  const initMap = useCallback(async () => {
    if (!apiKey || !mapDivRef.current || mapRef.current) return;
    try {
      await loadGoogleMapsScript(apiKey);
      const google = window.google;
      if (!google?.maps) throw new Error("maps unavailable");

      const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;
      const map = new google.maps.Map(mapDivRef.current, {
        center: MADEIRA_CANYON_COMMUNITY.center,
        zoom: MADEIRA_CANYON_COMMUNITY.defaultZoom,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        ...(mapId ? { mapId } : {}),
      });
      mapRef.current = map;
      setUseFallback(false);
      renderMarkers(places);
    } catch {
      setMapError(true);
      setUseFallback(true);
    }
  }, [apiKey, places, renderMarkers]);

  useEffect(() => {
    if (inView && apiKey && !useFallback && !mapError) {
      void initMap();
    }
  }, [inView, apiKey, useFallback, mapError, initMap]);

  const fetchPlaces = useCallback(
    async (categoryId: AmenityCategoryId) => {
      const category = AMENITY_CATEGORIES.find((c) => c.id === categoryId);
      if (!category) return;

      if (!apiKey || useFallback || mapError) {
        setPlaces(curatedToResults(categoryId));
        return;
      }

      setLoading(true);
      try {
        await loadGoogleMapsScript(apiKey);
        const google = window.google;
        if (!google?.maps) throw new Error("no maps");

        let results: MapPlaceResult[] = [];

        try {
          const placesLib = (await google.maps.importLibrary(
            "places"
          )) as {
            Place: {
              searchNearby: (req: Record<string, unknown>) => Promise<{
                places: Array<{
                  id?: string;
                  displayName?: string;
                  formattedAddress?: string;
                  rating?: number;
                  location?: { lat: () => number; lng: () => number };
                  googleMapsURI?: string;
                }>;
              }>;
            };
          };

          const { places: nearby } = await placesLib.Place.searchNearby({
            fields: [
              "displayName",
              "formattedAddress",
              "location",
              "rating",
              "googleMapsURI",
            ],
            locationRestriction: {
              center: MADEIRA_CANYON_COMMUNITY.center,
              radius: MADEIRA_CANYON_COMMUNITY.searchRadiusMeters,
            },
            includedPrimaryTypes: category.googleTypes,
            maxResultCount: 15,
          });

          results = nearby
            .filter((p) => p.location)
            .map((p, i) => ({
              id: p.id ?? `place-${i}`,
              name: p.displayName ?? "Place",
              address: p.formattedAddress,
              rating: p.rating,
              lat: p.location!.lat(),
              lng: p.location!.lng(),
              directionsQuery: p.formattedAddress ?? p.displayName ?? "",
            }));
        } catch {
          if (!mapRef.current) {
            await initMap();
          }
          const map = mapRef.current;
          if (!map) throw new Error("no map for legacy search");

          await new Promise<void>((resolve) => {
            const service = new google.maps.places.PlacesService(map);
            service.nearbySearch(
              {
                location: new google.maps.LatLng(
                  MADEIRA_CANYON_COMMUNITY.center.lat,
                  MADEIRA_CANYON_COMMUNITY.center.lng
                ),
                radius: MADEIRA_CANYON_COMMUNITY.searchRadiusMeters,
                type: category.googleTypes[0],
              },
              (raw, status) => {
                if (status === "OK" && raw) {
                  results = raw.map((r, i) => {
                    const geom = r.geometry as {
                      location: { lat: () => number; lng: () => number };
                    };
                    return {
                      id: (r.place_id as string) ?? `legacy-${i}`,
                      name: (r.name as string) ?? "Place",
                      address: r.vicinity as string | undefined,
                      rating: r.rating as number | undefined,
                      lat: geom.location.lat(),
                      lng: geom.location.lng(),
                      directionsQuery:
                        (r.name as string) ?? (r.vicinity as string) ?? "",
                    };
                  });
                }
                resolve();
              }
            );
          });
        }

        if (results.length === 0) {
          results = curatedToResults(categoryId);
        }
        setPlaces(results);
        if (mapRef.current) {
          renderMarkers(results);
        }
      } catch {
        setPlaces(curatedToResults(categoryId));
        setUseFallback(true);
      } finally {
        setLoading(false);
      }
    },
    [apiKey, useFallback, mapError, initMap, renderMarkers]
  );

  useEffect(() => {
    if (inView) {
      void fetchPlaces(activeCategory);
    }
  }, [activeCategory, inView, fetchPlaces]);

  useEffect(() => {
    if (mapRef.current && !useFallback) {
      renderMarkers(places);
    }
  }, [places, renderMarkers, useFallback]);

  const showEmbed = !apiKey || useFallback || mapError;
  const curatedForCategory = getCuratedPlacesByCategory(activeCategory);
  const listToShow =
    curatedForCategory.length > 0
      ? curatedForCategory
      : CURATED_AMENITY_PLACES.filter((p) => p.category === activeCategory);

  return (
    <div ref={containerRef} className={className}>
      <div
        role="tablist"
        aria-label="Amenity categories near Madeira Canyon"
        className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-thin"
      >
        {AMENITY_CATEGORIES.map((cat) => {
          const selected = cat.id === activeCategory;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              id={`${sectionId}-tab-${cat.id}`}
              aria-selected={selected}
              aria-controls={`${sectionId}-panel`}
              aria-label={cat.ariaLabel}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                selected
                  ? "bg-blue-600 text-white"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-blue-400"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      <div
        id={`${sectionId}-panel`}
        role="tabpanel"
        aria-labelledby={`${sectionId}-tab-${activeCategory}`}
        className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
        style={{ minHeight: height }}
      >
        {showEmbed ? (
          <iframe
            title="Map of Madeira Canyon, Henderson NV and nearby amenities"
            src={getKeylessMapEmbedUrl()}
            width="100%"
            height={height}
            style={{ border: 0, display: "block" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        ) : (
          <div
            ref={mapDivRef}
            className="w-full bg-slate-100"
            style={{ height }}
            aria-label="Interactive Google Map showing amenities near Madeira Canyon"
          />
        )}
        {loading ? (
          <p className="sr-only" aria-live="polite">
            Loading nearby places…
          </p>
        ) : null}
      </div>

      {showCuratedList && (showEmbed || listToShow.length > 0) ? (
        <ul className="mt-4 space-y-3" aria-label="Curated nearby places list">
          {showEmbed
            ? listToShow.map((item) => (
                <li
                  key={`${item.name}-${item.address}`}
                  className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="text-sm text-slate-600">{item.address}</p>
                    {item.note ? (
                      <p className="text-xs text-slate-500 mt-1">{item.note}</p>
                    ) : null}
                  </div>
                  <a
                    href={getPlaceDirectionsUrl(item.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:underline shrink-0"
                  >
                    <Navigation className="h-4 w-4" aria-hidden />
                    Directions
                  </a>
                </li>
              ))
            : places.slice(0, 8).map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    {item.address ? (
                      <p className="text-sm text-slate-600">{item.address}</p>
                    ) : null}
                    {item.rating !== undefined ? (
                      <p className="text-xs text-slate-500 mt-1">
                        Google rating: {item.rating.toFixed(1)}
                      </p>
                    ) : null}
                  </div>
                  <a
                    href={getPlaceDirectionsUrl(item.directionsQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:underline shrink-0"
                  >
                    <Navigation className="h-4 w-4" aria-hidden />
                    Directions
                  </a>
                </li>
              ))}
        </ul>
      ) : null}

      {!apiKey ? (
        <p className="mt-3 text-xs text-slate-500 flex items-start gap-1">
          <MapPin className="h-4 w-4 shrink-0 text-blue-600 mt-0.5" aria-hidden />
          Interactive search requires{" "}
          <code className="text-slate-700">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code>{" "}
          in Vercel. Map shows Madeira Canyon center until the key is set.
        </p>
      ) : null}
    </div>
  );
}
