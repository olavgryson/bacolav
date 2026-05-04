"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function BgWord({ children, className = "", style }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const parent = el.closest("section, div");
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `${style?.transform ?? ""} translateY(${center * 0.08}px)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [style?.transform]);

  return (
    <div ref={ref} className={`bg-word ${className}`} style={style}>
      {children}
    </div>
  );
}
