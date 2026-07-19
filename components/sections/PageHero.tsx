import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { agentInfo, siteConfig } from "@/lib/site-config";
import {
  generateImageObjectSchema,
  type HeroImage,
} from "@/lib/hero-images";

export type PageHeroProps = {
  title: string;
  subtitle: string;
  image: HeroImage;
  /** Show phone CTA (default true) */
  showCta?: boolean;
  ctaHref?: string;
  ctaLabel?: string;
  /** Compact height for utility-style pages */
  size?: "default" | "compact";
};

/**
 * Full-bleed page hero — brand, one headline, one supporting line, one CTA,
 * one dominant edge-to-edge image. Emits ImageObject JSON-LD for AEO/GEO.
 */
export default function PageHero({
  title,
  subtitle,
  image,
  showCta = true,
  ctaHref = agentInfo.phoneTel,
  ctaLabel = `Call ${agentInfo.phone}`,
  size = "default",
}: PageHeroProps) {
  const minHeight =
    size === "compact"
      ? "min-h-[42vh] md:min-h-[48vh]"
      : "min-h-[56vh] md:min-h-[64vh]";

  const imageSchema = generateImageObjectSchema(image);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
      />
      <section
        className={`relative w-full ${minHeight} flex items-end md:items-center overflow-hidden pt-20`}
        aria-label="Page hero"
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          title={image.caption || image.alt}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/55 to-slate-900/35"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full px-4 py-16 md:py-20">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="text-sm md:text-base font-semibold tracking-wide text-blue-300 mb-4">
              {siteConfig.brandLine}
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
              {subtitle}
            </p>
            {showCta && (
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                {ctaHref.startsWith("tel:") || ctaHref.startsWith("http") ? (
                  <a
                    href={ctaHref}
                    className="inline-flex items-center bg-white text-slate-900 px-7 py-3.5 font-bold text-base hover:bg-blue-50 transition-colors"
                  >
                    {ctaHref.startsWith("tel:") && (
                      <Phone className="h-5 w-5 mr-2" aria-hidden="true" />
                    )}
                    {ctaLabel}
                  </a>
                ) : (
                  <Link
                    href={ctaHref}
                    className="inline-flex items-center bg-white text-slate-900 px-7 py-3.5 font-bold text-base hover:bg-blue-50 transition-colors"
                  >
                    {ctaLabel}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Visible caption supports image SEO / AEO without overlaying the hero media */}
      {image.caption && (
        <p className="sr-only">{image.caption}</p>
      )}
    </>
  );
}
