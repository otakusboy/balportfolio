import Image from "next/image";
import { IMAGE_QUALITY } from "@/lib/image";

const NEXTJS_LOGO = "/images/brands/nextjs.svg";

/** “Made with Next.js” pill — matches the Framer-style badge pattern. */
export function MadeWithNextjs() {
  return (
    <a
      href="https://nextjs.org"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 text-[13px] font-semibold leading-none tracking-[-0.01em] text-[var(--text)] shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-colors hover:bg-[var(--surface-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
      aria-label="Made with Next.js — opens in a new tab"
    >
      <Image
        src={NEXTJS_LOGO}
        alt=""
        width={16}
        height={16}
        quality={IMAGE_QUALITY}
        unoptimized
        className="h-4 w-4 shrink-0"
        aria-hidden
      />
      <span>Made with Next.js</span>
    </a>
  );
}
