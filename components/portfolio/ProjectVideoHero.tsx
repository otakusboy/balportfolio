"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import BackgroundVideo from "next-video/background-video";
import { useReducedMotion } from "motion/react";
import landingPageWorks from "/videos/landing-page-works.mp4";
import { IMAGE_QUALITY, HERO_IMAGE_SIZES } from "@/lib/image";
import { CARD_CORNERS } from "@/lib/card";
import { cn } from "@/lib/cn";
import { FINE_POINTER_QUERY, useMediaQuery } from "@/lib/use-media-query";

type Props = {
  title: string;
  posterSrc: string;
};

const PORTFOLIO_SCROLL = ".portfolio-scroll";
const DESKTOP_LAYOUT_QUERY = "(min-width: 1301px)";

/** Mux-hosted stream from next-video sync — plays in production without the local .mp4. */
const videoAsset = landingPageWorks;
const muxPoster =
  typeof videoAsset.poster === "string" ? videoAsset.poster : undefined;

/**
 * Muted autoplay hero via Mux HLS (next-video).
 * - Lazy-mounts the player when near the viewport (saves bandwidth on load).
 * - Source: 1920×1080 — Mux HLS includes a 1080p rendition; desktop requests it explicitly.
 * - Poster + tap-to-play when prefers-reduced-motion is on.
 */
export function ProjectVideoHero({ title, posterSrc }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [manualPlay, setManualPlay] = useState(false);
  const reduceMotion = useReducedMotion();
  const finePointer = useMediaQuery(FINE_POINTER_QUERY);
  const wantsVideo = !reduceMotion || manualPlay;
  const showPlayer = inView && wantsVideo;

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const root =
      typeof window !== "undefined" &&
      window.matchMedia(DESKTOP_LAYOUT_QUERY).matches
        ? document.querySelector<HTMLElement>(PORTFOLIO_SCROLL)
        : null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { root, rootMargin: "240px", threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden bg-black",
        CARD_CORNERS,
        "[&_.next-video-container]:!aspect-[16/10] [&_.next-video-container]:h-full",
      )}
    >
      {showPlayer ? (
        <BackgroundVideo
          src={videoAsset}
          maxResolution="1080p"
          {...(finePointer ? { minResolution: "1080p" as const } : {})}
          renditionOrder="desc"
          className="absolute inset-0 h-full w-full"
        />
      ) : null}

      {!showPlayer ? (
        reduceMotion ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setManualPlay(true);
              setInView(true);
            }}
            className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
            aria-label={`Play video: ${title}`}
          >
            <PosterImage src={posterSrc} />
            <PlayBadge />
          </button>
        ) : (
          <div className="absolute inset-0" aria-hidden="true">
            {muxPoster ? (
              // eslint-disable-next-line @next/next/no-img-element -- Mux CDN poster; not in next/image config
              <img
                src={muxPoster}
                alt=""
                className="h-full w-full object-cover"
                decoding="async"
              />
            ) : (
              <PosterImage src={posterSrc} />
            )}
          </div>
        )
      ) : null}
    </div>
  );
}

function PosterImage({ src }: { src: string }) {
  return (
    <>
      <Image
        src={src}
        alt=""
        fill
        sizes={HERO_IMAGE_SIZES}
        quality={IMAGE_QUALITY}
        className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.02]"
        priority
      />
      <span className={cn("absolute inset-0 bg-black/20", CARD_CORNERS)} aria-hidden="true" />
    </>
  );
}

function PlayBadge() {
  return (
    <span
      className="absolute left-1/2 top-1/2 flex h-12 w-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[14px] bg-[#ff0033] shadow-lg transition-transform motion-safe:group-hover:scale-105"
      aria-hidden="true"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
        <path d="M8 5.5v13l11-6.5L8 5.5z" />
      </svg>
    </span>
  );
}
