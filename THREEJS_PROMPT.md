# Three.js Hero Animation — Handoff Prompt

Paste this entire file into a fresh Claude session opened in `/home/ogryson/bacolav`.

---

## Context

Marketing site `bacolav` (Next.js 16 App Router + React 19 + TS 5 + Tailwind v4). See `CLAUDE.md` — Next 16 has breaking changes vs older docs, consult `node_modules/next/dist/docs/` before writing Next-specific code. Tailwind v4 is config-less via `@import "tailwindcss"` in `globals.css`.

There is an existing placeholder hero scroll animation in `src/components/ScrollyScene.tsx` using SVG primitives (`BottleSvg.tsx`, `CrateSvg.tsx`). The task is to replace that with a real 3D scroll-driven scene using the GLB models below. `Hero.tsx` is the static hero above it.

## Goal

A scroll-scrubbed 3D hero animation:

1. **Frame 0** — viewer sees a top-down (or 3/4) shot of the Bacolav crate full of bottles. One slot in the front row is empty (intentional — the bottle that performs the animation will sit there at start).
2. **Scroll phase A** — that single bottle rises straight up out of the empty slot.
3. **Scroll phase B** — while rising, it spins 360° (full rotation around the vertical axis Y).
4. **Scroll phase C** — once the spin completes, it tips/lands "on its label" (rotate 90° around horizontal X so the label faces camera flat — essentially the bottle ends lying on its side, label up toward viewer).
5. **Scroll phase D (overlapping with C)** — the crate slides downward off-screen, leaving only the bottle on its label centered in view.

End state: just the labeled bottle, centered, label facing camera, no crate.

## Assets (in repo)

- `public/models/bacolav_crate.glb` — crate + 23 bottles (the hero "starting state"). Currently ~11 MB unoptimized; **first thing to do: optimize it** (see "Optimization" below).
- `public/models/bacolav_bottle.glb` — single bottle, ~104 KB. Already optimized (512×341 JPEG label).
- Source `.blend` files live in `blender/` (`bacolav_crate_with_bottles.blend`, `bacolav_bottle.blend`) — only touch via the `blender-mcp` MCP server if you need to re-export.

### Coordinate system / units

- Models are exported in **millimeters** (Blender units, not converted). Crate is ~398 × 298 × 249 mm. Bottle is ~65 × 65 × 233 mm.
- Three.js default unit is meters. Either: (a) divide group scale by 1000 on load (`scene.scale.setScalar(0.001)`), or (b) keep mm and just use a wide camera + far clipping plane. Option (a) is cleaner.
- Crate is centered on XY at origin, sitting on Z=0 (Z is up in Blender → in Three.js after import this becomes Y-up automatically by the glTF loader). After load: bottom of crate at y=0, center at xz origin.
- **Empty slot (bottle starts here)**: world XY in Blender = (33.17, -111.75), Z bottom = 18 mm. After mm→m conversion and Y-up swap: position the bottle group at roughly `(0.033, 0.018, 0.112)` in Three.js coords (X stays, Blender Z becomes Three.js Y, Blender Y becomes Three.js -Z; sign of -Y depends on glTF transform — verify after first render).
- Bacolav logo is on the Blender ±Y walls of the crate → in Three.js those are the ±Z walls. Camera should look at the crate from the +Z (front) side so the front logo is visible.

## Recommended stack

- `three` + `@react-three/fiber` + `@react-three/drei` for the 3D scene
- `gsap` + `gsap/ScrollTrigger` for scroll-scrubbed timeline (set `scrub: true`)
- Keep using `"use client"` — R3F is client-only

Install:
```bash
npm i three @react-three/fiber @react-three/drei gsap
npm i -D @types/three
```

## Implementation outline

1. **Optimize the crate GLB first** (it's currently ~11 MB which is unacceptable for hero):
   ```bash
   npx -y @gltf-transform/cli optimize public/models/bacolav_crate.glb public/models/bacolav_crate.opt.glb \
     --texture-compress webp --texture-size 1024 --simplify-error 0.001
   ```
   If still too big, also try `dedup` + `instance` + `weld` from gltf-transform — the 23 bottles should be instanced (currently exported as 23 separate primitives). Target: <2 MB. Replace original once verified.

2. **Create `src/components/HeroScene3D.tsx`** (client component):
   - `<Canvas>` with `dpr={[1, 2]}`, `camera={{ position: [0, 0.25, 0.6], fov: 35 }}` (adjust after seeing).
   - Use `useGLTF('/models/bacolav_crate.opt.glb')` and `useGLTF('/models/bacolav_bottle.opt.glb')`.
   - Two refs: `crateRef` (the crate group) and `bottleRef` (the standalone bottle that animates).
   - Position bottle initially at the empty-slot world coords inside the crate (see coords above).
   - Lighting: `<Environment preset="warehouse" />` from drei + a soft directional light. The label is a plain texture (no PBR baking), keep ambient bright.

3. **Wire scroll timeline** in a `useLayoutEffect`:
   ```ts
   gsap.registerPlugin(ScrollTrigger);
   const tl = gsap.timeline({
     scrollTrigger: {
       trigger: containerRef.current,   // a tall section, ~300vh
       start: "top top",
       end: "bottom bottom",
       scrub: 0.5,
       pin: true,                       // pin canvas while scrolling
     },
   });
   tl.to(bottleRef.current.position, { y: "+=0.35", duration: 1, ease: "power2.out" }, 0)
     .to(bottleRef.current.rotation, { y: Math.PI * 2,    duration: 1, ease: "none"        }, 0)
     .to(bottleRef.current.rotation, { x: -Math.PI / 2,   duration: 0.6, ease: "power2.inOut" }, 0.8)
     .to(crateRef.current.position,  { y: -0.4,           duration: 0.6, ease: "power2.in"  }, 0.9)
     .to(crateRef.current,           { /* fade material */ }, 0.9);
   ```
   Tune durations against scroll length once you can see it.

4. **Mount in the page**: replace or sit alongside `ScrollyScene.tsx` in `src/app/page.tsx`. Wrap canvas in a section sized `h-[300vh]` for scroll length; the canvas itself is `h-screen sticky top-0` (or use ScrollTrigger pinning).

5. **SSR safety**: dynamic import the scene with `ssr: false`:
   ```ts
   const HeroScene3D = dynamic(() => import("@/components/HeroScene3D"), { ssr: false });
   ```

## Open decisions to confirm with the user before building

1. **Spin axis**: original message said "spin then land on label" — confirmed as Y-axis rotation (vertical, "spinning on the spot") followed by X-axis tip to land flat. Confirm.
2. **End state**: bottle lying on its side with label up, centered? Or upright with label facing camera (no horizontal tip)?
3. **Crate exit direction**: down/off-bottom (current plan), fade out, or shrink-to-floor?
4. **Replace `ScrollyScene` entirely** or keep both (3D for hero, SVG section further down)?
5. **Performance budget**: target FPS on mobile? (affects whether to use instancing on the 23 crate bottles vs baking them into the crate mesh).

## Verification checklist

- [ ] Crate GLB optimized to <2 MB
- [ ] First paint: crate visible with logo facing camera, missing slot at front-right-of-center
- [ ] Scroll triggers: bottle rises smoothly out of the empty slot
- [ ] 360° spin completes during rise
- [ ] Bottle tips to land on label after spin
- [ ] Crate slides down off-screen, leaving bottle centered
- [ ] Reverse scroll runs animation backward (scrub behavior)
- [ ] No layout shift / jank on mobile (Lighthouse perf > 80)

## Where to start

Read `src/app/page.tsx` and `src/components/ScrollyScene.tsx` to see how the current placeholder is wired. Then ask the user the 5 open-decision questions above before installing anything.
