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

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          section.classList.add("is-revealed");
          wrap.style.filter = "drop-shadow(0 0 80px rgba(204,20,20,0.5))";
          sub.style.opacity = "1";
          setTimeout(() => {
            wrap.style.transition = "filter 2s ease-in-out";
            wrap.style.filter = "drop-shadow(0 0 30px rgba(204,20,20,0.25))";
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
          className="reveal-logo inline-block"
          style={{
            filter: "drop-shadow(0 0 60px rgba(204,20,20,0.3))",
            transition:
              "opacity 1.4s cubic-bezier(0.16,1,0.3,1), transform 1.4s cubic-bezier(0.16,1,0.3,1), filter 1.4s ease",
          }}
        >
          <Image
            src="/uploads/bacolav-logo.png"
            alt="Bacolav Logo"
            width={1200}
            height={1200}
            className="h-auto max-w-[min(600px,80vw)]"
          />
        </div>
        <div
          ref={subRef}
          className="mt-12 text-[0.75rem] tracking-[0.4em] text-mute-dim uppercase opacity-0"
          style={{ transition: "opacity 1s 0.5s ease" }}
        >
          Strong &amp; Smooth · Gasolina in a Bottle
        </div>
      </div>
    </section>
  );
}
