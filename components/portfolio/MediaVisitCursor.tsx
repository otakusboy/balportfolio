"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { setVisitCursorActive } from "@/components/cursor/SiteCursor";

type Props = {
  children: ReactNode;
  label?: string;
};

/**
 * Replaces the cursor over linked project media with a “Visit Website” pill.
 * Rendered in a portal with fixed positioning so overflow parents can't crop it.
 */
export function MediaVisitCursor({ children, label = "Visit Website" }: Props) {
  const [active, setActive] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const [mounted, setMounted] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFinePointer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    setVisitCursorActive(active);
    return () => setVisitCursorActive(false);
  }, [active]);

  const pill =
    mounted && finePointer
      ? createPortal(
          <motion.div
            className="pointer-events-none fixed z-[9999]"
            style={{ left: x, top: y, x: "-50%", y: "-50%" }}
            initial={false}
            animate={{
              opacity: active ? 1 : 0,
              scale: active ? 1 : 0.82,
            }}
            transition={{ duration: 0 }}
            aria-hidden
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black px-3.5 py-2 text-[13px] font-medium leading-none tracking-[-0.01em] text-white shadow-[0_8px_24px_rgba(0,0,0,0.28)]">
              {label}
              <ArrowUpRight size={14} weight="bold" aria-hidden />
            </span>
          </motion.div>,
          document.body,
        )
      : null;

  return (
    <div
      className={finePointer ? "relative cursor-none" : "relative"}
      onMouseEnter={() => finePointer && setActive(true)}
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
