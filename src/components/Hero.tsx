"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero text entrance
    const t = setTimeout(() => {
      textRef.current?.classList.add("is-revealed");
    }, 300);

    // Parallax on the bg image
    const onScroll = () => {
      const bg = bgRef.current;
      if (!bg) return;
      const y = window.scrollY;
      if (y < window.innerHeight) {
        bg.style.transform = `scale(1.06) translateY(${y * 0.35}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative flex h-screen items-end justify-start overflow-hidden px-[6vw] pb-[8vh]"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 scale-[1.06] bg-[url('/uploads/hero-bg.webp')] bg-cover bg-[center_30%] will-change-transform"
      />
      <div className="hero-overlay absolute inset-0" />
      <div className="hero-grade absolute inset-0" />

      <div
        ref={textRef}
        className="reveal-up transition-reveal relative z-30 max-w-[55vw]"
        style={{
          transition:
            "opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <span className="font-bebas block text-[clamp(5rem,16vw,18rem)] leading-[0.85] tracking-[0.02em] text-cream">
          BACO<span className="text-red">LAV</span>
        </span>
        <div className="mt-8 text-[0.8rem] tracking-[0.4em] text-gold uppercase">
          Gasolina in a bottle — Est. 2024
        </div>
      </div>

      <div className="absolute right-[6vw] bottom-[6vh] flex flex-col items-center gap-3 opacity-50">
        <div className="animate-scroll-pulse h-[60px] w-px bg-gradient-to-b from-cream to-transparent" />
        <span className="text-[0.65rem] [writing-mode:vertical-lr] tracking-[0.3em] uppercase">
          Scroll
        </span>
      </div>
    </section>
  );
}
