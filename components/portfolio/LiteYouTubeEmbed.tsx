"use client";

import { useState } from "react";
import Image from "next/image";
import { IMAGE_QUALITY, HERO_IMAGE_SIZES } from "@/lib/image";
import { cn } from "@/lib/cn";
import { useMediaQuery } from "@/lib/use-media-query";

type Props = {
  videoId: string;
  title: string;
  className?: string;
  /** Local fallback thumbnail when available */
  posterSrc?: string;
};

/**
 * Muted autoplay YouTube embed — loads immediately and keeps looping.
 * Falls back to click-to-play when prefers-reduced-motion is set.
 */
export function LiteYouTubeEmbed({ videoId, title, className, posterSrc }: Props) {
  const [manualPlay, setManualPlay] = useState(false);
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const active = !reduceMotion || manualPlay;
  const remotePoster = `https://i.ytimg.com/vi_webp/${videoId}/sddefault.webp`;

  const embedSrc = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1&loop=1&playlist=${videoId}`;

  return (
    <div
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-[10px] bg-black",
        className,
      )}
    >
      {active ? (
        <iframe
          title={title}
          src={embedSrc}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setManualPlay(true);
          }}
          className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
          aria-label={`Play video: ${title}`}
        >
          <Image
            src={posterSrc ?? remotePoster}
            alt=""
            fill
            sizes={HERO_IMAGE_SIZES}
            quality={IMAGE_QUALITY}
            className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.02]"
            priority
          />
          <span className="absolute inset-0 rounded-[10px] bg-black/20" aria-hidden="true" />
          <span
            className="absolute left-1/2 top-1/2 flex h-12 w-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[14px] bg-[#ff0033] shadow-lg transition-transform motion-safe:group-hover:scale-105"
            aria-hidden="true"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M8 5.5v13l11-6.5L8 5.5z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
