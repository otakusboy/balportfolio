"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "@phosphor-icons/react";
import { useReducedMotion } from "motion/react";
import { MadeWithNextjs } from "@/components/layout/MadeWithNextjs";

const SHOW_AFTER_PX = 120;
const PORTFOLIO_SCROLL = ".portfolio-scroll";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const scrollEl = document.querySelector<HTMLElement>(PORTFOLIO_SCROLL);

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
    const scrollEl = document.querySelector<HTMLElement>(PORTFOLIO_SCROLL);
    if (!scrollEl) return;

    scrollEl.scrollTo({ top: 0, behavior });

    const paneScrolls = scrollEl.scrollHeight > scrollEl.clientHeight;
    if (!paneScrolls) {
      const top = scrollEl.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior });
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3">
      <MadeWithNextjs />
      {visible ? (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--text)] text-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
        >
          <ArrowUp size={18} weight="bold" aria-hidden />
        </button>
      ) : null}
    </div>
  );
}
