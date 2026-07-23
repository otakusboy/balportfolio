import fs from "node:fs";
import path from "node:path";
import type { BrandLogo } from "@/types/profile";

const BRANDS_PUBLIC_DIR = path.join(process.cwd(), "public/images/brands");

/** Files excluded from the marquee (used elsewhere, e.g. Made with Next.js badge). */
const EXCLUDED_FILES = new Set(["nextjs.svg"]);

const LOGO_EXT = /\.(svg|png|jpe?g|webp|avif)$/i;

/**
 * Reads `/public/images/brands` and returns logos sorted by numeric filename
 * (1.svg, 2.svg, … 10.svg). Add or reorder files in that folder to update the slider.
 */
export function getBrandLogos(): BrandLogo[] {
  if (!fs.existsSync(BRANDS_PUBLIC_DIR)) return [];

  const files = fs.readdirSync(BRANDS_PUBLIC_DIR).filter((file) => {
    if (EXCLUDED_FILES.has(file.toLowerCase())) return false;
    return LOGO_EXT.test(file);
  });

  return files
    .sort((a, b) => compareNumericFilenames(a, b))
    .map((file) => {
      const id = path.parse(file).name;
      return {
        id,
        name: `Brand logo ${id}`,
        src: `/images/brands/${encodeURIComponent(file)}`,
      };
    });
}

function compareNumericFilenames(a: string, b: string): number {
  const numA = Number.parseInt(path.parse(a).name, 10);
  const numB = Number.parseInt(path.parse(b).name, 10);

  if (!Number.isNaN(numA) && !Number.isNaN(numB)) return numA - numB;
  return a.localeCompare(b);
}
