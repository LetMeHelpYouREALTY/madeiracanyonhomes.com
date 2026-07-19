import { MapPin, Navigation, Phone, Star } from "lucide-react";
import {
  GOOGLE_REVIEWS_URL,
  MADEIRA_CANYON_MAP,
  getGoogleMapsDirectionsUrl,
  getGoogleMapsEmbedUrl,
  getGoogleMapsViewUrl,
  type MapFocus,
} from "@/lib/maps";
import { officeInfo } from "@/lib/site-config";

type MadeiraCanyonMapProps = {
  /** office = GBP pin; community = Madeira Canyon area; park = Madeira Canyon Park */
  focus?: MapFocus;
  title?: string;
  subtitle?: string;
  height?: number;
  showActions?: boolean;
  className?: string;
  /** Compact variant for sidebars */
  compact?: boolean;
};

/**
 * Madeira Canyon Google Map with NAP-matching pin and GBP action buttons.
 * Used sitewide (Footer) and on /contact.
 */
export default function MadeiraCanyonMap({
  focus = "office",
  title = "Madeira Canyon, Henderson — Find Us on the Map",
  subtitle = `${officeInfo.address.full} · Club Madeira & Madeira Canyon specialist`,
  height = 360,
  showActions = true,
  className = "",
  compact = false,
}: MadeiraCanyonMapProps) {
  const embedUrl = getGoogleMapsEmbedUrl(focus);
  const viewUrl = getGoogleMapsViewUrl(focus);
  const directionsUrl = getGoogleMapsDirectionsUrl();
  const mapTitle =
    focus === "community"
      ? "Google Map of Madeira Canyon, Henderson, NV"
      : focus === "park"
        ? "Google Map of Madeira Canyon Park, Henderson, NV"
        : `Google Map — ${officeInfo.address.full}`;

  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name:
      focus === "park"
        ? "Madeira Canyon Park"
        : focus === "community"
          ? "Madeira Canyon"
          : officeInfo.name,
    description:
      "Madeira Canyon and Club Madeira in Henderson, NV 89044 — served by Madeira Canyon | Homes by Dr Jan Duffy.",
    address: {
      "@type": "PostalAddress",
      streetAddress: officeInfo.address.street,
      addressLocality: officeInfo.address.city,
      addressRegion: officeInfo.address.state,
      postalCode: officeInfo.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: MADEIRA_CANYON_MAP.lat,
      longitude: MADEIRA_CANYON_MAP.lng,
    },
    hasMap: getGoogleMapsViewUrl(focus),
    telephone: officeInfo.phoneTel.replace("tel:", ""),
  };

  return (
    <section
      id="madeira-canyon-map"
      aria-labelledby="madeira-canyon-map-heading"
      className={`bg-slate-50 ${className}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />
      <div className={compact ? "" : "container mx-auto px-4 py-12 md:py-14"}>
        {compact ? (
          <h2 id="madeira-canyon-map-heading" className="sr-only">
            {title}
          </h2>
        ) : (
          <div className="mx-auto max-w-3xl text-center mb-6">
            <p className="text-blue-700 text-sm font-semibold tracking-wide uppercase mb-2">
              Madeira Canyon | Homes by Dr Jan Duffy
            </p>
            <h2
              id="madeira-canyon-map-heading"
              className="text-2xl md:text-3xl font-bold text-slate-900 mb-2"
            >
              {title}
            </h2>
            <p className="text-slate-600">{subtitle}</p>
            <address className="not-italic mt-3 text-slate-800 font-medium">
              {officeInfo.address.full}
              <br />
              <a
                href={officeInfo.phoneTel}
                className="text-blue-700 hover:underline"
              >
                {officeInfo.phone}
              </a>
            </address>
          </div>
        )}

        <div
          className={`overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ${
            compact ? "" : "mx-auto max-w-5xl"
          }`}
        >
          <iframe
            src={embedUrl}
            width="100%"
            height={height}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={mapTitle}
            className="w-full"
          />
        </div>

        {showActions ? (
          <div
            className={`mt-4 grid gap-3 sm:grid-cols-3 ${
              compact ? "" : "mx-auto max-w-5xl"
            }`}
          >
            <a
              href={officeInfo.phoneTel}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              <Phone className="h-4 w-4" aria-hidden />
              Call
            </a>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800 transition-colors"
            >
              <Navigation className="h-4 w-4" aria-hidden />
              Directions
            </a>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <Star className="h-4 w-4 text-amber-500" aria-hidden />
              View Google Reviews
            </a>
          </div>
        ) : null}

        {!compact ? (
          <p className="mt-4 text-center text-sm text-slate-500">
            <MapPin className="inline h-4 w-4 mr-1 text-blue-600" aria-hidden />
            <a
              href={viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline"
            >
              Open Madeira Canyon on Google Maps
            </a>
            {" · "}
            Serving Club Madeira, Videiras, and Anthem Highlands (89044)
          </p>
        ) : null}
      </div>
    </section>
  );
}
