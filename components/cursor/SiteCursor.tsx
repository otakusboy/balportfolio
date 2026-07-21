"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue } from "motion/react";
import {
  FINE_POINTER_QUERY,
  useIsClient,
  useMediaQuery,
} from "@/lib/use-media-query";

const visitStore = {
  active: false,
  listeners: new Set<() => void>(),
  set(next: boolean) {
    if (this.active === next) return;
    this.active = next;
    this.listeners.forEach((l) => l());
  },
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  },
};

export function setVisitCursorActive(active: boolean) {
  visitStore.set(active);
}

function useVisitCursorActive() {
  return useSyncExternalStore(
    (onStoreChange) => visitStore.subscribe(onStoreChange),
    () => visitStore.active,
    () => false,
  );
}

/** Site-wide 32px circular cursor. Hidden while the Visit Website pill is active. */
export function SiteCursor() {
  const mounted = useIsClient();
  const finePointer = useMediaQuery(FINE_POINTER_QUERY);
  const visitActive = useVisitCursorActive();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    document.documentElement.classList.toggle("has-site-cursor", finePointer);

    if (!finePointer) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("has-site-cursor");
    };
  }, [finePointer, x, y]);

  if (!mounted || !finePointer) return null;

  return createPortal(
    <motion.div
      className="pointer-events-none fixed z-[9998] h-6 w-6 rounded-full bg-[var(--text)] shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
      style={{ left: x, top: y, x: "-50%", y: "-50%" }}
      initial={false}
      animate={{
        opacity: visitActive ? 0 : 1,
        scale: visitActive ? 0.6 : 1,
      }}
      transition={{ duration: 0 }}
      aria-hidden
    />,
    document.body,
  );
}
