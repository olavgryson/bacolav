"use client";

import { useReveal } from "./useReveal";

export default function SectionLine() {
  const ref = useReveal<HTMLDivElement>({ threshold: 0.5 });

  return (
    <div
      ref={ref}
      className="reveal-line relative z-30 h-px w-full bg-line"
      style={{ transition: "transform 1.2s cubic-bezier(0.16,1,0.3,1)" }}
    />
  );
}
