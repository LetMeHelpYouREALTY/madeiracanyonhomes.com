/**
 * Dr. Jan Duffy headshot — prefers Cloudflare Images when configured,
 * falls back to the local brand asset under /images.
 *
 * Cloudflare Images delivery:
 *   https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE_ID>/<VARIANT>
 *
 * Env (optional):
 *   NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH
 *   NEXT_PUBLIC_DR_JAN_CF_IMAGE_ID  (Images dashboard ID)
 *   NEXT_PUBLIC_DR_JAN_CF_VARIANT   (default: public)
 *   NEXT_PUBLIC_DR_JAN_PHOTO_URL    (full override URL)
 */

export const DR_JAN_LOCAL_PHOTO = "/images/dr-jan-duffy.jpg";
export const DR_JAN_LOCAL_HEADSHOT = "/images/agent/dr-jan-duffy-headshot.jpg";
/** Gold-framed circular badge for homepage hero brand mark */
export const DR_JAN_HERO_FRAMED = "/images/agent/dr-jan-duffy-hero-framed.jpg";

const DEFAULT_VARIANT = "public";

export function getDrJanPhotoUrl(options?: {
  /** Prefer square/agent path when using local assets */
  variant?: "default" | "headshot" | "hero";
}): string {
  const override = process.env.NEXT_PUBLIC_DR_JAN_PHOTO_URL?.trim();
  // Framed hero badge is a local design asset — don't replace with CF override
  if (options?.variant === "hero") {
    return DR_JAN_HERO_FRAMED;
  }
  if (override) return override;

  const accountHash = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH?.trim();
  const imageId = process.env.NEXT_PUBLIC_DR_JAN_CF_IMAGE_ID?.trim();
  const cfVariant =
    process.env.NEXT_PUBLIC_DR_JAN_CF_VARIANT?.trim() || DEFAULT_VARIANT;

  if (accountHash && imageId) {
    return `https://imagedelivery.net/${accountHash}/${imageId}/${cfVariant}`;
  }

  return options?.variant === "headshot"
    ? DR_JAN_LOCAL_HEADSHOT
    : DR_JAN_LOCAL_PHOTO;
}

/** Absolute URL for JSON-LD / Open Graph */
export function getDrJanPhotoAbsoluteUrl(baseUrl: string): string {
  const photo = getDrJanPhotoUrl();
  if (photo.startsWith("http://") || photo.startsWith("https://")) {
    return photo;
  }
  const base = baseUrl.replace(/\/$/, "");
  return `${base}${photo.startsWith("/") ? photo : `/${photo}`}`;
}

export function isCloudflareImagesPhoto(url: string = getDrJanPhotoUrl()): boolean {
  return url.includes("imagedelivery.net");
}
