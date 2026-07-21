"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import type { MediaObjectPositionValue } from "@/types/project";
import { DEFAULT_MEDIA_BACKGROUND, DEFAULT_MEDIA_INSET, resolveObjectPosition } from "@/lib/project-media";

/** High-quality delivery for portfolio covers (AVIF/WebP via next/image). */
const COVER_IMAGE_QUALITY = 90;

type Props = {
  /** Full-bleed cover shown before hover (optional) */
  coverSrc?: string;
  /** Original project image — padded inset; shown on hover or alone */
  originalSrc: string;
  alt: string;
  gradient?: string;
  priority?: boolean;
  sizes?: string;
  aspectClass?: string;
  fit?: "cover" | "contain";
  objectPosition?: MediaObjectPositionValue;
  insetLeft?: number;
  insetRight?: number;
  className?: string;
  imageClassName?: string;
};

export function ProjectCover({
  coverSrc,
  originalSrc,
  alt,
  gradient,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 58vw",
  aspectClass = "aspect-[16/11]",
  fit = "cover",
  objectPosition,
  insetLeft = DEFAULT_MEDIA_INSET,
  insetRight = DEFAULT_MEDIA_INSET,
  className,
  imageClassName,
}: Props) {
  const fitClass = fit === "contain" ? "object-contain" : "object-cover";
  const { className: positionClass, style: positionStyle } = resolveObjectPosition(objectPosition);

  const hasCover = Boolean(coverSrc);
  const reduceMotion = useReducedMotion();
  const zoomOnHover = !hasCover && !reduceMotion;

  const backgroundStyle = gradient
    ? { backgroundImage: gradient }
    : { backgroundColor: DEFAULT_MEDIA_BACKGROUND };

  const imageProps = {
    sizes,
    fitClass,
    positionClass,
    positionStyle,
    imageClassName,
  };

  return (
    <div
      className={cn("relative w-full overflow-hidden rounded-[10px]", aspectClass, className)}
      style={backgroundStyle}
    >
      {hasCover ? (
        <div className="absolute inset-0 z-10 group-hover:hidden">
          <CoverImage src={coverSrc!} alt="" {...imageProps} />
        </div>
      ) : null}

      <motion.div
        className={cn(
          "absolute inset-y-0 origin-center",
          hasCover && "z-0 hidden group-hover:block",
        )}
        style={{ left: insetLeft, right: insetRight }}
        initial={false}
        whileHover={zoomOnHover ? { scale: 1.05 } : undefined}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="absolute inset-0">
          <CoverImage
            src={originalSrc}
            alt={alt}
            priority={priority}
            {...imageProps}
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
  fitClass,
  positionClass,
  positionStyle,
  imageClassName,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  fitClass: string;
  positionClass?: string;
  positionStyle?: { objectPosition: string };
  imageClassName?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      quality={COVER_IMAGE_QUALITY}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={cn(fitClass, positionClass, imageClassName)}
      style={positionStyle}
      aria-hidden={alt === ""}
    />
  );
}
