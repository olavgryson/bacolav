"use client";

import { useReveal } from "./useReveal";

type Card = { code: string; name: string; desc: string };

const CARDS: Card[] = [
  {
    code: "RON",
    name: "Cubaanse Rum",
    desc: "Drie jaar in eikenhouten vaten. Daarna onmiddellijk gemengd met cola. Deskundigen huilen. Wij niet.",
  },
  {
    code: "COL",
    name: "Premium Cola",
    desc: "Koolzuurhoudend. Donker. Zoet. Het doet wat cola doet, maar dan samen met rum. Teamwork.",
  },
  {
    code: "60%",
    name: "Lef",
    desc: "Het geheime derde ingrediënt. Niet te koop in supermarkten. Zit wel in elke fles Bacolav. Gratis bijgeleverd.",
  },
];

export default function Ingredients() {
  const ref = useReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="ingredients"
      ref={ref}
      className="relative z-30 flex min-h-screen flex-col items-center justify-center bg-ingredients-bg px-[6vw] py-[10vh] text-center"
    >
      <div
        className="reveal-up-sm reveal-base mb-2 text-[0.72rem] font-medium tracking-[0.35em] text-gold uppercase"
      >
        De Heilige Drie
      </div>
      <div
        className="reveal-up-sm reveal-base delay-100 font-display mb-16 text-[clamp(2.5rem,6vw,6rem)] font-black text-cream italic"
      >
        Wat zit erin?
      </div>
 
      <div className="grid w-full max-w-[900px] grid-cols-1 gap-[2px] sm:grid-cols-3">
        {CARDS.map((c, i) => (
          <div
            key={c.code}
            className={`ingredient-card reveal-up-lg reveal-base flex cursor-default flex-col items-center gap-4 border border-line-strong bg-card px-8 py-12 ${
              i === 0 ? "delay-250" : i === 1 ? "delay-370" : "delay-490"
            }`}
          >
            <div className="font-bebas text-[1.5rem] leading-none tracking-[0.05em] text-gold">
              {c.code}
            </div>
            <div className="font-bebas text-[1.4rem] tracking-[0.1em] text-gold">
              {c.name}
            </div>
            <p className="text-center text-[0.8rem] leading-relaxed font-light text-mute">
              {c.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
