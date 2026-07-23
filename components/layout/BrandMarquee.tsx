"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { BrandLogo } from "@/types/profile";
import { IMAGE_QUALITY } from "@/lib/image";

type Props = {
  brands: BrandLogo[];
  label: string;
};

function BrandSet({ brands, suffix }: { brands: BrandLogo[]; suffix: string }) {
  return (
    <ul className="flex shrink-0 items-center gap-6 pr-6" aria-hidden={suffix !== "a"}>
      {brands.map((brand) => (
        <li key={`${brand.id}-${suffix}`} className="opacity-50 grayscale">
          <Image
            src={brand.src}
            alt={suffix === "a" ? brand.name : ""}
            width={160}
            height={40}
            quality={IMAGE_QUALITY}
            className="h-10 max-h-10 w-auto max-w-40 shrink-0 object-contain"
            draggable={false}
            aria-hidden={suffix !== "a"}
          />
        </li>
      ))}
    </ul>
  );
}

export function BrandMarquee({ brands, label }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [loopWidth, setLoopWidth] = useState(0);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      // Track contains two identical sets — scroll one set width for a seamless loop
      setLoopWidth(track.scrollWidth / 2);
    };

    measure();

    const images = track.querySelectorAll("img");
    images.forEach((img) => img.addEventListener("load", measure));

    const observer = new ResizeObserver(measure);
    observer.observe(track);

    return () => {
      images.forEach((img) => img.removeEventListener("load", measure));
      observer.disconnect();
    };
  }, [brands]);

  if (brands.length === 0) return null;

  const duration = Math.max(12, brands.length * 4);
  const shouldAnimate = loopWidth > 0 && !reduceMotion;

  return (
    <div>
      <p className="text-[12px] font-medium leading-[1.25] text-[var(--text-faint)]">{label}</p>
      <div
        className="mt-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        aria-label={label}
      >
        <motion.div
          ref={trackRef}
          className="flex w-max"
          // Right → left seamless loop
          animate={shouldAnimate ? { x: [0, -loopWidth] } : { x: 0 }}
          transition={
            shouldAnimate
              ? { duration, repeat: Infinity, ease: "linear" }
              : { duration: 0 }
          }
        >
          <BrandSet brands={brands} suffix="a" />
          <BrandSet brands={brands} suffix="b" />
        </motion.div>
      </div>
    </div>
  );
}
