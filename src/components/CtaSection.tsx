"use client";

import { useState } from "react";
import { useReveal } from "./useReveal";
import PreOrderModal from "./PreOrderModal";

export default function CtaSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useReveal<HTMLElement>({ threshold: 0.2 });

  const stagger = (i: number) =>
    `opacity 1s ${i * 0.18}s cubic-bezier(0.16,1,0.3,1), transform 1s ${i * 0.18}s cubic-bezier(0.16,1,0.3,1)`;

  return (
    <section
      id="cta"
      ref={ref}
      className="relative z-30 flex min-h-screen flex-col items-center justify-center px-[6vw] py-[10vh] text-center"
    >
      <span
        className="reveal-up font-bebas block text-[clamp(4rem,14vw,16rem)] leading-[0.88] tracking-[0.02em] text-cream"
        style={{ transition: stagger(0) }}
      >
        DRINK
        <br />
        <span className="text-outline">BACO</span>LAV.
      </span>
      <div
        className="reveal-up my-12 text-[0.85rem] tracking-[0.3em] text-mute uppercase"
        style={{ transition: stagger(1) }}
      >
        Beschikbaar waar goede smaak en slechte beslissingen samenkomen
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="reveal-up font-sans inline-block cursor-pointer border-[1.5px] border-cream bg-transparent px-16 py-5 text-[0.75rem] tracking-[0.3em] text-cream uppercase no-underline hover:bg-cream hover:text-darker"
        style={{
          transition: `${stagger(2)}, background 0.3s, color 0.3s`,
        }}
      >
        Pre-order een Krat
      </button>

      <PreOrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
