"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { CARD_CORNERS } from "@/lib/card";
import { cn } from "@/lib/cn";
import type { MediaObjectPositionValue } from "@/types/project";
import {
  DEFAULT_MEDIA_INSET,
  DEFAULT_MEDIA_INSET_VERTICAL,
  resolveMediaBackground,
  resolveObjectPosition,
} from "@/lib/project-media";
import { IMAGE_QUALITY, PORTFOLIO_IMAGE_SIZES } from "@/lib/image";

type Props = {
  coverSrc?: string;
  originalSrc: string;
  alt: string;
  background?: string;
  priority?: boolean;
  sizes?: string;
  aspectClass?: string;
  fit?: "cover" | "contain";
  objectPosition?: MediaObjectPositionValue;
  insetLeft?: number;
  insetRight?: number;
  insetTop?: number;
  insetBottom?: number;
  className?: string;
};

export function ProjectCover({
  coverSrc,
  originalSrc,
  alt,
  background,
  priority = false,
  sizes = PORTFOLIO_IMAGE_SIZES,
  aspectClass = "aspect-[16/11]",
  fit = "cover",
  objectPosition,
  insetLeft = DEFAULT_MEDIA_INSET,
  insetRight = DEFAULT_MEDIA_INSET,
  insetTop = DEFAULT_MEDIA_INSET_VERTICAL,
  insetBottom = DEFAULT_MEDIA_INSET_VERTICAL,
  className,
}: Props) {
  const originalFitClass = fit === "contain" ? "object-contain" : "object-cover";
  const { className: positionClass, style: positionStyle } = resolveObjectPosition(objectPosition);
  const hasCover = Boolean(coverSrc);
  const reduceMotion = useReducedMotion();
  const zoomOnHover = !hasCover && !reduceMotion;

  return (
    <div
      className={cn("relative w-full overflow-hidden", CARD_CORNERS, aspectClass, className)}
      style={resolveMediaBackground(background)}
    >
      {hasCover ? (
        <div className="absolute inset-0 z-10 overflow-hidden group-hover:hidden">
          <CoverImage src={coverSrc!} alt="" sizes={sizes} fillCover />
        </div>
      ) : null}

      <motion.div
        className={cn(
          "absolute inset-0 origin-center",
          hasCover && "z-0 hidden group-hover:block",
        )}
        style={{
          top: insetTop,
          right: insetRight,
          bottom: insetBottom,
          left: insetLeft,
        }}
        initial={false}
        whileHover={zoomOnHover ? { scale: 1.05 } : undefined}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="relative size-full">
          <CoverImage
            src={originalSrc}
            alt={alt}
            sizes={sizes}
            priority={priority}
            fitClass={originalFitClass}
            positionClass={positionClass}
            positionStyle={positionStyle}
          />
        </div>
      </motion.div>
    </div>
  );
}

function CoverImage({
  src,
  alt,
  sizes,
  priority = false,
  fillCover = false,
  fitClass = "object-cover",
  positionClass,
  positionStyle,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  fillCover?: boolean;
  fitClass?: string;
  positionClass?: string;
  positionStyle?: { objectPosition: string };
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      quality={IMAGE_QUALITY}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={cn(fitClass, fillCover ? "object-top" : positionClass)}
      style={fillCover ? undefined : positionStyle}
      aria-hidden={alt === ""}
    />
  );
}
