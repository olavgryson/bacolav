"use client";

import { useEffect, useRef } from "react";
import BottleSvg from "./BottleSvg";
import CrateSvg from "./CrateSvg";

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function ScrollyScene() {
  const playSpaceRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const sceneBgRef = useRef<HTMLDivElement>(null);
  const txt1Ref = useRef<HTMLDivElement>(null);
  const txt2Ref = useRef<HTMLDivElement>(null);
  const txt3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const playSpace = playSpaceRef.current;
      const bottle = bottleRef.current;
      const sceneBg = sceneBgRef.current;
      const t1 = txt1Ref.current;
      const t2 = txt2Ref.current;
      const t3 = txt3Ref.current;
      if (!playSpace || !bottle || !sceneBg || !t1 || !t2 || !t3) return;

      const rect = playSpace.getBoundingClientRect();
      const rawProgress = clamp(
        -rect.top / (rect.height - window.innerHeight),
        0,
        1
      );

      // Phase 1 (0→0.25) — bottle rises out of crate
      const phase1 = clamp(rawProgress / 0.25, 0, 1);
      const riseEased = easeOutCubic(phase1);

      // Phase 2 (0.25→0.55) — bottle scales up & centers
      const phase2 = clamp((rawProgress - 0.25) / 0.3, 0, 1);
      const scaleEased = easeInOutCubic(phase2);

      // Phase 3 (0.40→0.80) — 360° rotation
      const phase3 = clamp((rawProgress - 0.4) / 0.4, 0, 1);
      const rotationEased = easeInOutCubic(phase3);

      const translateY = lerp(100, -20, riseEased);
      const scale = lerp(0.6, 1.35, scaleEased);
      const rotation = lerp(0, 360, rotationEased);

      bottle.style.opacity = String(clamp(phase1 * 3, 0, 1));
      bottle.style.transform = `translateX(-50%) translateY(${translateY}%) scale(${scale}) rotateY(${rotation}deg)`;

      const glowIntensity = clamp(phase2, 0, 1);
      sceneBg.style.background = `radial-gradient(ellipse at center bottom, oklch(${
        0.2 + glowIntensity * 0.12
      } 0.06 35) 0%, oklch(0.07 0.02 30) 70%)`;

      // Text panels
      const v1 =
        clamp(rawProgress / 0.2, 0, 1) -
        clamp((rawProgress - 0.28) / 0.06, 0, 1);
      t1.style.opacity = String(clamp(v1, 0, 1));
      t1.style.transform = `translateX(${lerp(
        -30,
        0,
        easeOutCubic(clamp(rawProgress / 0.2, 0, 1))
      )}px)`;

      const t2in = clamp((rawProgress - 0.2) / 0.12, 0, 1);
      const t2out = clamp((rawProgress - 0.52) / 0.08, 0, 1);
      t2.style.opacity = String(clamp(t2in - t2out, 0, 1));
      t2.style.transform = `translateX(${lerp(30, 0, easeOutCubic(t2in))}px)`;

      const t3in = clamp((rawProgress - 0.55) / 0.15, 0, 1);
      const t3out = clamp((rawProgress - 0.88) / 0.08, 0, 1);
      t3.style.opacity = String(clamp(t3in - t3out, 0, 1));
      t3.style.transform = `translateX(${lerp(-30, 0, easeOutCubic(t3in))}px)`;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative">
      {/* Sticky scene */}
      <div
        id="sticky-scene"
        className="pointer-events-none sticky top-0 z-10 flex h-screen w-full items-center justify-center overflow-hidden"
      >
        <div ref={sceneBgRef} className="scene-bg-default absolute inset-0" />

        <div
          className="relative flex h-[340px] w-[340px] items-end justify-center"
          style={{ perspective: "800px" }}
        >
          <div
            ref={bottleRef}
            className="absolute bottom-[56%] left-1/2 z-5 w-[90px] opacity-0 will-change-transform"
            style={{
              transform: "translateX(-50%) translateY(100%) scale(0.6)",
              transformOrigin: "bottom center",
              perspective: "800px",
            }}
          >
            <BottleSvg />
          </div>

          <CrateSvg />
        </div>
      </div>

      {/* Scroll-driven play space */}
      <div ref={playSpaceRef} className="relative h-[400vh]">
        <div
          ref={txt1Ref}
          className="pointer-events-none absolute top-[20vh] left-[5vw] z-20 opacity-0 transition-[opacity,transform] duration-[600ms,800ms] ease-[ease,cubic-bezier(0.16,1,0.3,1)]"
        >
          <div className="mb-4 text-[0.72rem] font-medium tracking-[0.35em] text-gold uppercase">
            Hoofdstuk I
          </div>
          <div className="font-display text-[clamp(3rem,7vw,7rem)] leading-[0.92] font-black tracking-[-0.02em] text-balance">
            Het
            <br />
            <em className="text-red not-italic [font-style:italic]">Geheim</em>
            <br />
            Recept.
          </div>
        </div>

        <div
          ref={txt2Ref}
          className="pointer-events-none absolute top-[15vh] right-[5vw] z-20 text-right opacity-0 transition-[opacity,transform] duration-[600ms,800ms] ease-[ease,cubic-bezier(0.16,1,0.3,1)]"
        >
          <div className="mb-4 text-[0.72rem] font-medium tracking-[0.35em] text-gold uppercase">
            Hoofdstuk II
          </div>
          <div className="font-display text-[clamp(3rem,7vw,7rem)] leading-[0.92] font-black tracking-[-0.02em] text-balance">
            60%
            <br />
            <em className="text-red [font-style:italic]">Rum.</em>
          </div>
          <div className="mt-6 ml-auto max-w-[38ch] text-[clamp(1rem,1.5vw,1.2rem)] leading-[1.65] font-light text-[oklch(0.75_0.03_60)]">
            Cubaanse suikerriet rum, drie jaar gerijpt.
            <br />
            Dan gemengd met iets dat je beter niet vraagt.
          </div>
        </div>

        <div
          ref={txt3Ref}
          className="pointer-events-none absolute bottom-[20vh] left-[5vw] z-20 opacity-0 transition-[opacity,transform] duration-[600ms,800ms] ease-[ease,cubic-bezier(0.16,1,0.3,1)]"
        >
          <div className="mb-4 text-[0.72rem] font-medium tracking-[0.35em] text-gold uppercase">
            Hoofdstuk III
          </div>
          <div className="font-display text-[clamp(3rem,7vw,7rem)] leading-[0.92] font-black tracking-[-0.02em] text-balance">
            100%
            <br />
            <em className="text-red [font-style:italic]">Fun.</em>
          </div>
          <div className="mt-6 max-w-[38ch] text-[clamp(1rem,1.5vw,1.2rem)] leading-[1.65] font-light text-[oklch(0.75_0.03_60)]">
            Wetenschappelijk bewezen.
            <br />
            Door niemand. Maar voelt zo.
          </div>
        </div>
      </div>
    </div>
  );
}
