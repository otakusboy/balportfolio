"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { setVisitCursorActive } from "@/components/cursor/SiteCursor";
import {
  FINE_POINTER_QUERY,
  useIsClient,
  useMediaQuery,
} from "@/lib/use-media-query";

type Props = {
  children: ReactNode;
  label?: string;
};

/** Replaces the cursor over linked project media with a “Visit Website” pill. */
export function MediaVisitCursor({ children, label = "Visit Website" }: Props) {
  const mounted = useIsClient();
  const finePointer = useMediaQuery(FINE_POINTER_QUERY);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);

  useEffect(() => {
    setVisitCursorActive(active);
    return () => setVisitCursorActive(false);
  }, [active]);

  // mouseleave often misses when the card scrolls out from under the cursor
  useEffect(() => {
    if (!active) return;

    const deactivate = () => setActive(false);
    window.addEventListener("scroll", deactivate, true);
    window.addEventListener("blur", deactivate);

    return () => {
      window.removeEventListener("scroll", deactivate, true);
      window.removeEventListener("blur", deactivate);
    };
  }, [active]);

  const pill =
    mounted && finePointer && active
      ? createPortal(
        <motion.div
          className="pointer-events-none fixed z-[9999]"
          style={{ left: x, top: y, x: "-50%", y: "-50%" }}
          initial={false}
          aria-hidden
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black px-3.5 py-3 text-[13px] font-medium leading-none tracking-[-0.01em] text-white shadow-[0_8px_24px_rgba(0,0,0,0.28)]">
            {label}
            <ArrowUpRight size={12} weight="bold" aria-hidden />
          </span>
        </motion.div>,
        document.body,
      )
      : null;

  return (
    <div
      className={finePointer ? "relative cursor-none" : "relative"}
      onMouseEnter={(e) => {
        if (!finePointer) return;
        x.set(e.clientX);
        y.set(e.clientY);
        setActive(true);
      }}
      onMouseLeave={() => setActive(false)}
      onMouseMove={(e) => {
        if (!finePointer) return;
        x.set(e.clientX);
        y.set(e.clientY);
      }}
    >
      {children}
      {pill}
    </div>
  );
}
