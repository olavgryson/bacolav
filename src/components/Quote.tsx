"use client";

import { useReveal } from "./useReveal";

export default function Quote() {
  const ref = useReveal<HTMLElement>({ threshold: 0.25 });

  return (
    <section
      id="quote"
      ref={ref}
      className="quote-decor relative z-30 flex min-h-[80vh] items-center justify-center overflow-hidden bg-red px-[10vw] py-[8vh]"
    >
      <div
        className="reveal-scale font-display relative z-1 max-w-[900px] text-center text-[clamp(2rem,4.5vw,5rem)] leading-tight font-bold text-cream italic"
        style={{
          transition:
            "opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        &ldquo;Het enige drankje dat tegelijkertijd premium
        <br />
        en volledig onverantwoord is.&rdquo;
        <span className="font-sans mt-10 block text-[0.8rem] font-normal tracking-[0.3em] text-[oklch(0.85_0.08_60)] not-italic uppercase">
          — Niemand minder dan onszelf, 2024
        </span>
      </div>
    </section>
  );
}
