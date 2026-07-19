"use client";

import { motion } from "motion/react";
import type { BrandLogo } from "@/types/profile";

type Props = {
  brands: BrandLogo[];
  label: string;
};

function BrandSet({ brands, suffix }: { brands: BrandLogo[]; suffix: string }) {
  return (
    <ul className="flex shrink-0 items-center gap-6 pr-6" aria-hidden={suffix !== "a"}>
      {brands.map((brand) => (
        <li key={`${brand.id}-${suffix}`} className="opacity-50 grayscale">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={brand.src}
            alt={suffix === "a" ? brand.name : ""}
            width={160}
            height={48}
            className="h-12 w-40 shrink-0 object-cover"
            draggable={false}
          />
        </li>
      ))}
    </ul>
  );
}

export function BrandMarquee({ brands, label }: Props) {
  if (brands.length === 0) return null;

  return (
    <div>
      <p className="text-[12px] font-medium leading-[1.25] text-[var(--text-faint)]">{label}</p>
      <div
        className="mt-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        aria-label={label}
      >
        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: Math.max(12, brands.length * 4),
              ease: "linear",
            },
          }}
        >
          <BrandSet brands={brands} suffix="a" />
          <BrandSet brands={brands} suffix="b" />
        </motion.div>
      </div>
    </div>
  );
}
