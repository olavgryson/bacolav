"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import BgWord from "./BgWord";

export default function LogoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wrap = imgWrapRef.current;
    const sub = subRef.current;
    if (!section || !wrap || !sub) return;

    const glow = wrap.querySelector<HTMLDivElement>("[data-logo-glow]");

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          section.classList.add("is-revealed");
          if (glow) glow.style.opacity = "1";
          sub.style.opacity = "1";
          setTimeout(() => {
            if (glow) {
              glow.style.transition = "opacity 2s ease-in-out";
              glow.style.opacity = "0.55";
            }
            wrap.classList.add("animate-logo-float");
          }, 1400);
          obs.unobserve(section);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-dark px-[6vw] py-[10vh]"
    >
      <BgWord
        className="opacity-[0.06]"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "40vw",
        }}
      >
        B
      </BgWord>

      <div className="relative z-5 text-center">
        <div
          ref={imgWrapRef}
          className="reveal-logo reveal-base-slow relative inline-block"
        >
          <div
            data-logo-glow
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-1400 ease-linear"
            style={{
              background:
                "radial-gradient(closest-side, rgba(204,20,20,0.45), rgba(204,20,20,0) 70%)",
              transform: "scale(1.25)",
            }}
          />
          <Image
            src="/uploads/bacolav-logo.webp"
            alt="Bacolav Logo"
            width={1536}
            height={1024}
            sizes="(max-width: 768px) 80vw, 600px"
            className="h-auto max-w-[min(600px,80vw)]"
          />
        </div>
        <div
          ref={subRef}
          className="mt-12 text-[0.75rem] tracking-[0.4em] text-mute-dim uppercase opacity-0 transition-opacity duration-1000 ease-linear delay-500"
        >
          Strong &amp; Smooth · Gasolina in a Bottle
        </div>
      </div>
    </section>
  );
}
