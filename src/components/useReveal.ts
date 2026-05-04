"use client";

import { useEffect, useRef } from "react";

type Options = {
  threshold?: number;
  rootMargin?: string;
  /** Callback invoked once when the element first becomes visible. */
  onReveal?: (el: HTMLElement) => void;
};

/**
 * Adds the `is-revealed` class once the element scrolls into view.
 * Pair with the reveal-* classes defined in globals.css.
 */
export function useReveal<T extends HTMLElement>({
  threshold = 0.15,
  rootMargin = "0px 0px -80px 0px",
  onReveal,
}: Options = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-revealed");
            onReveal?.(entry.target as HTMLElement);
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin, onReveal]);

  return ref;
}
