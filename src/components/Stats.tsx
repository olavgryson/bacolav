"use client";

import { useEffect, useRef } from "react";

type Stat = { value: string; label: string };

const STATS: Stat[] = [
  { value: "60%", label: "Alcohol by Volume" },
  { value: "24", label: "Flessen per Krat" },
  { value: "∞", label: "Redenen om te openen" },
];

function countUp(el: HTMLElement, target: string, duration: number) {
  if (target === "∞") {
    el.textContent = "∞";
    return;
  }
  const suffix = target.includes("%") ? "%" : "";
  const num = parseFloat(target);
  const start = performance.now();
  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(num * eased) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          section.classList.add("is-revealed");

          setTimeout(() => {
            const numbers = section.querySelectorAll<HTMLElement>(".stat-number");
            numbers.forEach((el) => {
              const target = el.dataset.target ?? "";
              const duration = target.includes("%") ? 1400 : 1200;
              countUp(el, target, duration);
            });
            setTimeout(() => {
              numbers.forEach((el) => {
                el.style.animation = "statGlow 3s ease-in-out infinite";
              });
            }, 1600);
          }, 300);

          obs.unobserve(section);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative z-30 flex min-h-[60vh] items-center justify-center px-[6vw] py-[8vh]"
    >
      <div className="grid w-full max-w-[1000px] grid-cols-1 border border-line-strong sm:grid-cols-3">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`reveal-up-sm reveal-base border-b border-line-strong px-12 py-16 text-center last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0 ${
              i === 0 ? "delay-0" : i === 1 ? "delay-150" : "delay-300"
            }`}
          >
            <span
              className="stat-number font-bebas block text-[clamp(3rem,6vw,6rem)] leading-none text-red"
              data-target={s.value}
            >
              {s.value}
            </span>
            <div className="mt-3 text-[0.7rem] font-normal tracking-[0.3em] text-mute uppercase">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
