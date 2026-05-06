# Bacolav

Premium scrollytelling landing page for the fictional rum-cola brand **Bacolav**.

Stack: Next.js 16 (App Router) · React 19 · TypeScript 5 · Tailwind v4.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
npm run lint
```

## Project layout

- `src/app/` — App Router entry (`layout.tsx`, `page.tsx`, `globals.css`)
- `src/components/` — page sections (Hero, ScrollyScene, Story, Ingredients, Stats, Quote, Logo, Cta, Footer) and SVG primitives (CrateSvg, BottleSvg)
- `public/` — static assets, including `public/uploads/` for hero imagery
- `CLAUDE.md` / `AGENTS.md` — agent instructions (symlinked)
- `DESIGN.md` — visual/brand reference: palette, typography, section flow, motion, copy voice

## Design

See [`DESIGN.md`](./DESIGN.md) for the full brand and motion spec before making UI changes. Brand tokens live in `src/app/globals.css` under `@theme` (Tailwind v4, no `tailwind.config`).

## Notes

Next.js 16 contains breaking changes vs. earlier versions — consult `node_modules/next/dist/docs/` before writing Next-specific code.
