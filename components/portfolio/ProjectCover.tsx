"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";
import { DEFAULT_MEDIA_GRADIENT } from "@/lib/project-media";

type Props = {
  src: string;
  alt: string;
  coverSrc?: string;
  gradient?: string;
  priority?: boolean;
  sizes?: string;
  aspectClass?: string;
  fit?: "cover" | "contain";
  position?: "center" | "left" | "right";
  insetLeft?: number;
  insetRight?: number;
  className?: string;
  imageClassName?: string;
};

export function ProjectCover({
  src,
  alt,
  coverSrc,
  gradient = DEFAULT_MEDIA_GRADIENT,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 58vw",
  aspectClass = "aspect-[16/11]",
  fit = "cover",
  position = "center",
  insetLeft = 20,
  insetRight = 20,
  className,
  imageClassName,
}: Props) {
  const fitClass = fit === "contain" ? "object-contain" : "object-cover";
  const positionClass =
    position === "left" ? "object-left" : position === "right" ? "object-right" : "object-center";

  return (
    <div
      className={cn("relative w-full overflow-hidden rounded-[2px]", aspectClass, className)}
      style={{ backgroundImage: gradient }}
    >
      <div
        className="absolute inset-y-0 transition-transform duration-500 ease-out group-hover:scale-105"
        style={{ left: insetLeft, right: insetRight }}
      >
        <CoverImage
          src={src}
          alt={alt}
          sizes={sizes}
          priority={priority && !coverSrc}
          fitClass={fitClass}
          positionClass={positionClass}
          visible={!coverSrc}
          imageClassName={imageClassName}
        />
        {coverSrc ? (
          <CoverImage
            src={coverSrc}
            alt=""
            sizes={sizes}
            priority={priority}
            fitClass={fitClass}
            positionClass={positionClass}
            visible={false}
            hideOnHover
            imageClassName={imageClassName}
          />
        ) : null}
      </div>
    </div>
  );
}

function CoverImage({
  src,
  alt,
  sizes,
  priority,
  fitClass,
  positionClass,
  visible,
  hideOnHover,
  imageClassName,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  fitClass: string;
  positionClass: string;
  visible: boolean;
  hideOnHover?: boolean;
  imageClassName?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      quality={90}
      priority={priority}
      className={cn(
        fitClass,
        positionClass,
        "transition-opacity duration-500 ease-out",
        visible ? "opacity-100" : "opacity-0 group-hover:opacity-100",
        hideOnHover && "group-hover:opacity-0",
        imageClassName,
      )}
      aria-hidden={alt === ""}
    />
  );
}
