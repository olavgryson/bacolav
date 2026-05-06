"use client";

import { Suspense, useLayoutEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Group } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroScene3D from "./HeroScene3D";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollyScene() {
  const playSpaceRef = useRef<HTMLDivElement>(null);
  const sceneBgRef = useRef<HTMLDivElement>(null);
  const txt1Ref = useRef<HTMLDivElement>(null);
  const txt2Ref = useRef<HTMLDivElement>(null);
  const txt3Ref = useRef<HTMLDivElement>(null);

  const bottleRef = useRef<Group>(null);
  const crateRef = useRef<Group>(null);
  const elevatorRef = useRef<Group>(null);

  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    if (!ready) return;
    const playSpace = playSpaceRef.current;
    const bottle = bottleRef.current;
    const crate = crateRef.current;
    const elevator = elevatorRef.current;
    const sceneBg = sceneBgRef.current;
    if (!playSpace || !bottle || !crate || !sceneBg || !elevator) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      elevator.position.y = 0.4;
      bottle.rotation.y = Math.PI * 2;
      bottle.rotation.x = -Math.PI / 2;
      crate.position.y = -0.4;
      [txt1Ref, txt2Ref, txt3Ref].forEach((r) => {
        if (r.current) r.current.style.opacity = "1";
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: playSpace,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          markers: true,
          onUpdate: (self) => {
            const p = self.progress;
            let chapter = "None";
            if (p > 0 && p < 0.28) chapter = "I";
            else if (p >= 0.28 && p < 0.55) chapter = "II";
            else if (p >= 0.55) chapter = "III";

            console.log(
              `Scroll Progress: ${p.toFixed(3)} | Chapter: ${chapter}`
            );
          },
        },
      });

      tl.to(
        elevator.position,
        { y: "+=0.5", ease: "power2.out", duration: 1 },
        0
      )
        .to(
          bottle.position,
          { x: 0, z: 0.2, ease: "power2.inOut", duration: 0.7 },
          0.2
        )
        .to(bottle.rotation, { y: Math.PI * 2, duration: 1 }, 0)
        .to(
          crate.position,
          { y: -0.9, ease: "power2.in", duration: 0.45 },
          0.55
        )
        .fromTo(
          sceneBg,
          {
            backgroundImage:
              "radial-gradient(ellipse at center bottom, oklch(0.20 0.06 35) 0%, oklch(0.07 0.02 30) 70%)",
          },
          {
            backgroundImage:
              "radial-gradient(ellipse at center bottom, oklch(0.32 0.06 35) 0%, oklch(0.07 0.02 30) 70%)",
            duration: 0.3,
            ease: "power2.inOut",
          },
          0.25
        )
        // Chapter I — visible 0 → 0.34
        .fromTo(
          txt1Ref.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.08, ease: "power2.out" },
          0
        )
        .to(
          txt1Ref.current,
          { opacity: 0, duration: 0.06 },
          0.40
        )
        // Chapter II — visible 0.36 → 0.66
        .fromTo(
          txt2Ref.current,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.08, ease: "power2.out" },
          0.36
        )
        .to(
          txt2Ref.current,
          { opacity: 0, duration: 0.06 },
          1
        )
        // Chapter III — visible 0.70 → 1.0
        .fromTo(
          txt3Ref.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.08, ease: "power2.out" },
          0.70
        )
        .to(
          txt3Ref.current,
          { opacity: 0, duration: 0.06 },
          1
        );
    }, playSpace);

    return () => ctx.revert();
  }, [ready]);

  return (
    <div className="relative">
      {/* Sticky 3D stage */}
      <div
        id="sticky-scene"
        className="pointer-events-none sticky top-0 z-10 h-screen w-full overflow-hidden"
      >
        <div ref={sceneBgRef} className="scene-bg-default absolute inset-0" />
        <Canvas
          className="!absolute inset-0"
          dpr={[1, 2]}
          gl={{ antialias: true, powerPreference: "high-performance" }}
        >
          <Suspense fallback={null}>
            <HeroScene3D
              bottleRef={bottleRef}
              crateRef={crateRef}
              elevatorRef={elevatorRef}
              onReady={() => setReady(true)}
            />
          </Suspense>
        </Canvas>

        {/* Chapter overlays — pinned to sticky stage so they stay visible
            for the full scroll-trigger window; GSAP controls fade timing. */}
        <div
          ref={txt1Ref}
          className="pointer-events-none absolute top-[20vh] left-[5vw] z-20 opacity-0"
          style={{ willChange: "opacity, transform" }}
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
          className="pointer-events-none absolute top-[15vh] right-[5vw] z-20 text-right opacity-0"
          style={{ willChange: "opacity, transform" }}
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
          className="pointer-events-none absolute bottom-[20vh] left-[5vw] z-20 opacity-0"
          style={{ willChange: "opacity, transform" }}
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

      {/* Scroll-driven play space — invisible, just provides scroll length. */}
      <div ref={playSpaceRef} className="relative h-[400vh]" />
    </div>
  );
}
