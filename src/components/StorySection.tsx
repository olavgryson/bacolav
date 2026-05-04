"use client";

import { useEffect, useRef } from "react";

type Props = {
  rightAlign?: boolean;
  eyebrow: string;
  headline: React.ReactNode;
  body: React.ReactNode;
  extra?: React.ReactNode;
  bgWord?: React.ReactNode;
  image: React.ReactNode;
};

export default function StorySection({
  rightAlign = false,
  eyebrow,
  headline,
  body,
  extra,
  bgWord,
  image,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            section.classList.add("is-revealed");
            obs.unobserve(section);
          }
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -80px 0px" }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative z-30 grid min-h-screen items-center gap-16 px-[6vw] md:grid-cols-2 ${
        rightAlign ? "story-rtl" : ""
      }`}
    >
      {bgWord}

      <div
        className={`transition-reveal ${
          rightAlign ? "reveal-from-right" : "reveal-from-left"
        }`}
        style={{
          transition:
            "opacity 1.1s cubic-bezier(0.16,1,0.3,1), transform 1.1s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div
          className="reveal-clip mb-4 text-[0.72rem] font-medium tracking-[0.35em] text-gold uppercase"
          style={{
            transition: "clip-path 0.8s 0.3s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {eyebrow}
        </div>
        <div className="font-display text-[clamp(3.5rem,8vw,8rem)] leading-[0.92] font-black tracking-[-0.02em] text-balance">
          {headline}
        </div>
        <div
          className="reveal-divider my-6 h-[2px] w-10 bg-red"
          style={{ transition: "transform 0.9s 0.5s cubic-bezier(0.16,1,0.3,1)" }}
        />
        <p className="mt-6 max-w-[38ch] text-[clamp(1rem,1.5vw,1.2rem)] leading-[1.65] font-light text-[oklch(0.75_0.03_60)]">
          {body}
        </p>
        {extra}
      </div>

      <div
        className={`flex items-center justify-center p-16 transition-reveal ${
          rightAlign ? "reveal-from-left" : "reveal-from-right"
        }`}
        style={{
          transition:
            "opacity 1.1s 0.15s cubic-bezier(0.16,1,0.3,1), transform 1.1s 0.15s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {image}
      </div>
    </section>
  );
}
