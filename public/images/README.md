# Image Assets Guide

## Folder Structure

```
images/
├── hero/           # Homepage hero backgrounds
├── agent/          # Dr. Jan Duffy photos
├── properties/     # Listing photos
├── neighborhoods/  # Area/community photos
├── testimonials/   # Client headshots
└── logos/          # Brand assets
```

## Recommended Specifications

| Folder | Size | Format | Notes |
|--------|------|--------|-------|
| hero/ | 1920x1080+ | WebP, JPG | 16:9 ratio, compress <200KB |
| agent/ | 400x400+ | WebP, JPG | Square, professional headshot |
| properties/ | 1200x800+ | WebP, JPG | Landscape, MLS-quality |
| neighborhoods/ | 1200x800+ | WebP, JPG | Scenic community shots |
| testimonials/ | 200x200 | WebP, JPG | Square, optional |
| logos/ | Various | PNG, SVG | Transparent background |

## Naming Conventions

- Use lowercase with hyphens: `summerlin-aerial.webp`
- Be descriptive: `dr-jan-duffy-headshot.jpg`
- Production headshot: `dr-jan-duffy.jpg` (root) and `agent/dr-jan-duffy-headshot.jpg`
- Prefer Cloudflare Images via `NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH` + `NEXT_PUBLIC_DR_JAN_CF_IMAGE_ID` (see `lib/agent-photo.ts`)
- Include size if multiple: `hero-desktop.webp`, `hero-mobile.webp`

## Image Optimization

Before uploading, optimize images:

1. **Online tools**: [Squoosh](https://squoosh.app), [TinyPNG](https://tinypng.com)
2. **CLI**: `npx @squoosh/cli --webp '{"quality":80}' image.jpg`
3. **Target**: <200KB for hero, <100KB for thumbnails

## Usage in Code

```tsx
import Image from 'next/image'

<Image 
  src="/images/hero/las-vegas-skyline.webp"
  alt="Las Vegas skyline at sunset"
  width={1920}
  height={1080}
  priority // for above-fold images
/>
```

## Notes

- Next.js auto-optimizes images via `next/image`
- WebP preferred for web (30% smaller than JPEG)
- Always include descriptive alt text for SEO/accessibility
- Page heroes use `components/sections/PageHero.tsx` + `lib/hero-images.ts`
- Prefer **keyword-rich filenames** + Nevada place photography (see `hero/ATTRIBUTION.md`)
- Each `PageHero` emits `ImageObject` JSON-LD for AEO/GEO image understanding
