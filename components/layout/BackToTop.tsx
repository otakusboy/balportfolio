"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "@phosphor-icons/react";
import { useMediaQuery } from "@/lib/use-media-query";

const SHOW_AFTER_PX = 120;

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    const scrollEl = document.querySelector<HTMLElement>(".portfolio-scroll");

    const update = () => {
      const paneScrolled = (scrollEl?.scrollTop ?? 0) > SHOW_AFTER_PX;
      const pageScrolled = window.scrollY > SHOW_AFTER_PX;
      setVisible(paneScrolled || pageScrolled);
    };

    update();
    scrollEl?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("scroll", update, { passive: true });

    return () => {
      scrollEl?.removeEventListener("scroll", update);
      window.removeEventListener("scroll", update);
    };
  }, []);

  const scrollToTop = () => {
    const behavior = reduceMotion ? "auto" : "smooth";
    const scrollEl = document.querySelector<HTMLElement>(".portfolio-scroll");
    if (!scrollEl) return;

    scrollEl.scrollTo({ top: 0, behavior });

    const paneScrolls = scrollEl.scrollHeight > scrollEl.clientHeight;
    if (!paneScrolls) {
      const top = scrollEl.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior });
    }
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-8 right-8 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--text)] text-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
    >
      <ArrowUp size={18} weight="bold" aria-hidden />
    </button>
  );
}
