import Link from "next/link";
import dynamic from "next/dynamic";
import { MapPin, ArrowRight } from "lucide-react";
import {
  AMENITIES_PAGE_PATH,
  MADEIRA_CANYON_COMMUNITY,
} from "@/lib/amenities/madeira-canyon-amenities";

const CommunityAmenityMap = dynamic(
  () => import("@/components/maps/CommunityAmenityMap"),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full rounded-xl bg-slate-200 animate-pulse"
        style={{ minHeight: 380 }}
        aria-hidden="true"
      />
    ),
  }
);

type NearbyAmenitiesSectionProps = {
  /** Section heading — defaults to Life Near Madeira Canyon */
  title?: string;
  subtitle?: string;
  className?: string;
  /** Show link to full amenities page */
  showFullPageLink?: boolean;
  compact?: boolean;
};

export default function NearbyAmenitiesSection({
  title = `Life Near ${MADEIRA_CANYON_COMMUNITY.name}`,
  subtitle = `Explore dining, parks, grocery, schools, and healthcare around Club Madeira and Madeira Canyon in Henderson, NV 89044.`,
  className = "",
  showFullPageLink = true,
  compact = false,
}: NearbyAmenitiesSectionProps) {
  return (
    <section
      className={`${compact ? "py-10" : "py-16 md:py-20"} bg-slate-50 ${className}`}
      aria-labelledby="nearby-amenities-heading"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-8">
          <p className="text-blue-700 text-sm font-semibold tracking-wide uppercase mb-2 flex items-center justify-center gap-1">
            <MapPin className="h-4 w-4" aria-hidden />
            What&apos;s Nearby
          </p>
          <h2
            id="nearby-amenities-heading"
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-3"
          >
            {title}
          </h2>
          <p className="text-slate-600">{subtitle}</p>
          {showFullPageLink ? (
            <p className="mt-4">
              <Link
                href={AMENITIES_PAGE_PATH}
                className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:underline"
              >
                Full nearby amenities guide
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </p>
          ) : null}
        </div>
        <div className="mx-auto max-w-5xl">
          <CommunityAmenityMap showCuratedList={!compact} />
        </div>
      </div>
    </section>
  );
}
