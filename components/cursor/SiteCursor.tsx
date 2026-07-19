"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue } from "motion/react";

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

/**
 * Site-wide 32px circular cursor with a slight soft shadow.
 * Hidden while the Visit Website pill is active.
 */
export function SiteCursor() {
  const [mounted, setMounted] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const visitActive = useVisitCursorActive();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => {
      const ok = mq.matches;
      setFinePointer(ok);
      document.documentElement.classList.toggle("has-site-cursor", ok);
    };
    sync();
    mq.addEventListener("change", sync);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("has-site-cursor");
    };
  }, [x, y]);

  if (!mounted || !finePointer) return null;

  return createPortal(
    <motion.div
      className="pointer-events-none fixed z-[9998] h-8 w-8 rounded-full bg-[var(--text)] shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
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
