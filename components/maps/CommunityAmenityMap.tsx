"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Navigation } from "lucide-react";
import {
  AMENITY_CATEGORIES,
  MADEIRA_CANYON_COMMUNITY,
  getCuratedPlacesByCategory,
  getKeylessMapEmbedUrl,
  getPlaceDirectionsUrl,
  type AmenityCategoryId,
} from "@/lib/amenities/madeira-canyon-amenities";
import {
  loadGoogleMaps,
  mapsAuthFailed,
} from "@/lib/google-maps-loader";
import {
  searchCategory,
  type NearbyPlaceResult,
} from "@/lib/amenities/places-search";

type CommunityAmenityMapProps = {
  defaultCategory?: AmenityCategoryId;
  height?: number;
  className?: string;
  showCuratedList?: boolean;
};

const MAP_CONTAINER_MIN_HEIGHT = 380;

function getApiKey(): string | undefined {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  return key && key.length > 0 && !key.includes("your_") ? key : undefined;
}

function curatedToResults(category: AmenityCategoryId): NearbyPlaceResult[] {
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

function buildInfoWindowContent(opts: {
  title: string;
  address?: string;
  directionsUrl: string;
}): HTMLElement {
  const div = document.createElement("div");
  div.style.maxWidth = "260px";
  const strong = document.createElement("strong");
  strong.textContent = opts.title;
  div.appendChild(strong);
  if (opts.address) {
    div.appendChild(document.createElement("br"));
    const addr = document.createElement("span");
    addr.textContent = opts.address;
    div.appendChild(addr);
  }
  div.appendChild(document.createElement("br"));
  const link = document.createElement("a");
  link.href = opts.directionsUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Directions";
  div.appendChild(link);
  return div;
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
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const communityMarkerRef = useRef<google.maps.Marker | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const apiKey = getApiKey();
  const [inView, setInView] = useState(false);
  const [activeCategory, setActiveCategory] =
    useState<AmenityCategoryId>(defaultCategory);
  const [places, setPlaces] = useState<NearbyPlaceResult[]>(() =>
    curatedToResults(defaultCategory)
  );
  const [loading, setLoading] = useState(false);
  const [useFallback, setUseFallback] = useState(
    () => !apiKey || mapsAuthFailed
  );

  const enterFallback = useCallback(() => {
    setUseFallback(true);
    mapRef.current = null;
    communityMarkerRef.current = null;
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
    infoWindowRef.current?.close();
    infoWindowRef.current = null;
    setPlaces(curatedToResults(activeCategory));
  }, [activeCategory]);

  useEffect(() => {
    const onAuthFailure = () => enterFallback();
    if (mapsAuthFailed) enterFallback();
    window.addEventListener("gmaps:auth-failure", onAuthFailure);
    return () =>
      window.removeEventListener("gmaps:auth-failure", onAuthFailure);
  }, [enterFallback]);

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
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  }, []);

  const renderMarkers = useCallback(
    (results: NearbyPlaceResult[]) => {
      const map = mapRef.current;
      if (!map || !window.google?.maps) return;

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
        communityMarkerRef.current.addListener("click", () => {
          infoWindow.setContent(
            buildInfoWindowContent({
              title: MADEIRA_CANYON_COMMUNITY.centerLabel,
              address: MADEIRA_CANYON_COMMUNITY.centerAddress,
              directionsUrl: getPlaceDirectionsUrl(
                MADEIRA_CANYON_COMMUNITY.centerAddress
              ),
            })
          );
          infoWindow.open({
            map,
            anchor: communityMarkerRef.current ?? undefined,
          });
        });
      }

      results.forEach((place) => {
        const marker = new google.maps.Marker({
          map,
          position: { lat: place.lat, lng: place.lng },
          title: place.name,
        });
        marker.addListener("click", () => {
          infoWindow.setContent(
            buildInfoWindowContent({
              title: place.name,
              address: place.address,
              directionsUrl: getPlaceDirectionsUrl(place.directionsQuery),
            })
          );
          infoWindow.open({ map, anchor: marker });
        });
        markersRef.current.push(marker);
      });
    },
    [clearMarkers]
  );

  const initMap = useCallback(async () => {
    if (!apiKey || !mapDivRef.current || mapRef.current || useFallback) {
      return;
    }
    if (mapsAuthFailed) {
      enterFallback();
      return;
    }
    try {
      await loadGoogleMaps(apiKey);
      if (mapsAuthFailed) {
        enterFallback();
        return;
      }

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
      renderMarkers(places);
    } catch {
      enterFallback();
    }
  }, [apiKey, places, renderMarkers, useFallback, enterFallback]);

  useEffect(() => {
    if (inView && apiKey && !useFallback) {
      void initMap();
    }
  }, [inView, apiKey, useFallback, initMap]);

  const fetchPlaces = useCallback(
    async (categoryId: AmenityCategoryId) => {
      const category = AMENITY_CATEGORIES.find((c) => c.id === categoryId);
      if (!category) return;

      if (!apiKey || useFallback || mapsAuthFailed) {
        setPlaces(curatedToResults(categoryId));
        return;
      }

      setLoading(true);
      try {
        await loadGoogleMaps(apiKey);
        if (mapsAuthFailed) {
          enterFallback();
          setPlaces(curatedToResults(categoryId));
          return;
        }

        const results = await searchCategory(
          MADEIRA_CANYON_COMMUNITY.center,
          categoryId,
          category.googleTypes
        );

        const next =
          results.length > 0 ? results : curatedToResults(categoryId);
        setPlaces(next);
        if (mapRef.current) {
          renderMarkers(next);
        }
      } catch {
        setPlaces(curatedToResults(categoryId));
      } finally {
        setLoading(false);
      }
    },
    [apiKey, useFallback, renderMarkers, enterFallback]
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

  const curatedForCategory = getCuratedPlacesByCategory(activeCategory);
  const listToShow = curatedForCategory;

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
        {useFallback || !apiKey ? (
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

      {showCuratedList && (useFallback || listToShow.length > 0) ? (
        <ul className="mt-4 space-y-3" aria-label="Curated nearby places list">
          {useFallback
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
    </div>
  );
}
