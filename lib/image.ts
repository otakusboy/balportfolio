/**
 * Shared next/image settings — hi-res portfolio delivery without visible quality loss.
 * Next.js optimizes to AVIF/WebP at request time (see next.config.ts formats).
 * Source PNG/JPG in /public stay lossless; optimized derivatives are high-quality lossy (~q90).
 */
export const IMAGE_QUALITY = 90;

/** Responsive `sizes` for full-width portfolio media below the desktop split. */
export const PORTFOLIO_IMAGE_SIZES = "(max-width: 1300px) 100vw, 58vw";

/** Responsive `sizes` for the YouTube hero / wide featured slot. */
export const HERO_IMAGE_SIZES = "(max-width: 1300px) 100vw, 60vw";

/** Responsive `sizes` for side-by-side device mockups. */
export const DEVICE_IMAGE_SIZES = "(max-width: 640px) 100vw, 28vw";
