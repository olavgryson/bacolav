# Bacolav — Design Reference

Premium scrollytelling landing page for fictional rum-cola brand "Bacolav". Tone: luxurious Southern-European brand experience (gastronomy/artisanal feel) with a dry, deadpan humorous undertone. Tagline energy: *"60% rum. 100% fun. 0% apologies."* / *"Gasolina in a Bottle."*

## Art direction

- **Mood**: warm, cinematic, dramatic, professional. Maximum impact through bold contrast, never cluttered. Minimalist with massive typographic weight.
- **Typography as graphic element**: headlines are screen-filling, layered. Italic serif accents in brand red.

## Palette (oklch)

| Token | Value | Use |
|---|---|---|
| `darker` | `oklch(0.07 0.02 30)` | page bg |
| `dark` | `oklch(0.10 0.02 35)` | section bg |
| `card` / `card-hover` | `0.09` / `0.14` | ingredient cards |
| `ingredients-bg` | `oklch(0.12 0.03 35)` | ingredients section |
| `red` | `oklch(0.45 0.22 25)` | accent, italic words, glow |
| `gold` | `oklch(0.72 0.16 75)` | eyebrows, hover borders |
| `cream` | `oklch(0.94 0.02 75)` | primary text |
| `brown` | `oklch(0.28 0.06 45)` | warm support |
| `mute` / `mute-dim` / `line` / `line-strong` | greys | body, dividers |

Cinematic film-grain overlay (SVG fractalNoise) sits above content at 40% opacity (`body::after`).

## Type

- **Display** — Playfair Display (900, italic): section headlines, quote. Italic + red for emphasis words.
- **Sans** — DM Sans (300/400/500): body, sub copy.
- **Bebas Neue**: nav logo, hero wordmark, CTA wordmark, decorative `bg-word` outlines.

Headline scale: `clamp(3.5rem, 8vw, 8rem)`, weight 900, line-height 0.92, tracking -0.02em.
Eyebrow: 0.72rem uppercase, tracking 0.35em, gold.
Sub: `clamp(1rem, 1.5vw, 1.2rem)`, weight 300, max-width 38ch.

## Page flow

1. **Nav** (fixed, fade gradient) — Bebas wordmark left, uppercase links right.
2. **Hero** — full-bleed product photo (`/uploads/...`), warm grade + dark left-to-right overlay. Bottom-left wordmark `BACO`+red `LAV`. Vertical scroll-cue right.
3. **Scrolly scene** — sticky 100vh stage in center: crate SVG fixed, bottle SVG rises out of crate, scales up, performs 360° rotation around vertical axis revealing label. Driven by scroll progress over a 400vh play-space. Text overlays fade in/out per scroll phase.
4. **Story sections** (×2) — alternating left/right grid. Eyebrow + huge headline + red expanding divider + sub copy + image. Reveals: text from left, image from right (mirrored on second).
5. **Ingredients** — 3-up card grid on `ingredients-bg`. Cards stagger in (120ms each). Hover: lift -6px, border→gold, shadow.
6. **Stats** — large numerals count up from 0; after settle, infinite red glow pulse (`stat-glow`).
7. **Quote** — centered italic display type, scale-in from 0.94. Giant decorative `"` in dark red behind.
8. **Logo section** — wordmark fade+scale-in then perpetual `logo-float` (±12px, 5s).
9. **CTA** — stacked Bebas word stack, second line outlined (`text-outline`), staggered drop-in. Cream-bordered button, inverts on hover.
10. **Footer** — minimal.

## Motion

- All reveals via `IntersectionObserver` toggling `is-revealed` on elements with `reveal-*` classes (`from-left`, `from-right`, `up`, `up-sm`, `up-lg`, `scale`, `logo`, `clip`, `divider`, `line`).
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)`, durations ~1.1s.
- Scrolly bottle is scroll-driven (not IO) — read scroll progress within play-space and apply transform.
- Keyframes defined in `globals.css` `@theme`: `scroll-pulse`, `logo-float`, `stat-glow`.
- Hero photo has subtle parallax (translates slower than text).

## Layout primitives

- Sticky scene: `position: sticky; top: 0; height: 100vh` inside a container with `400vh` play-space sibling.
- Section padding: `0 6vw`, vertical `10vh`.
- `bg-word`: huge (30vw) outlined Bebas word as decorative backdrop, behind content (`z-1`), `pointer-events: none`.
- `text-outline`: 2px cream stroke, transparent fill.
- `story-rtl` flips story grid direction for the mirrored variant.

## Copy voice

Short, declarative, dry. Mixes premium European refinement with deadpan punchlines. Examples in components: hero wordmark, CTA stack, quote, stats labels.

### Tagline pool (NL)

Reusable label/quote copy. Pick by section tone.

**Sterk / Gasolina:**
- "Sterker dan je ex haar argumenten."
- "Waarschuwing: Kan leiden tot legendarische verhalen."

**Grappig / luchtig:**
- "Mengverhouding: ja."
- "Cola voor de kleur."
- "Officieel festivalbrandstof."
- "Niet geschikt voor beginners."
- "Proef de zomer. Vergeet de rest."
- "60/40 bijna illegaal."
- "Drink nu. Denk later."

**Extra sterk editie:**
- "Powered by rum."
- "Dit is geen drankje. Dit is een keuze."
- "Sterk genoeg om je naam te vergeten."

## Implementation notes

- Brand tokens live in `src/app/globals.css` `@theme` (Tailwind v4) — use utility classes like `bg-darker`, `text-cream`, `border-gold`.
- Fonts loaded via `next/font` in `src/app/layout.tsx`, exposed as `--font-dm-sans`, `--font-playfair`, `--font-bebas`.
- Reveal hook: `src/components/useReveal.ts`.
- Crate/bottle are inline SVG components (`CrateSvg.tsx`, `BottleSvg.tsx`); image placeholders use `HatchPlaceholder.tsx`.
