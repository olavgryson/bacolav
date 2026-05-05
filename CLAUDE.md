# Bacolav

This is NOT the Next.js you know. APIs, conventions, file structure may differ from training data. Read `node_modules/next/dist/docs/` before writing Next code. Heed deprecation notices.

Marketing site. Stack: Next.js 16 (App Router) + React 19 + TS 5 + Tailwind v4.

## Layout

- `src/app/` — routes (`layout.tsx`, `page.tsx`, `globals.css`)
- `src/components/` — page sections + SVG primitives
- `public/` — static assets, `public/uploads/` for user-supplied imagery
- `DESIGN.md` — visual/brand reference (palette, type, section flow, motion). Read before UI work.

## Rules

- Next 16 has breaking changes vs prior versions. Consult `node_modules/next/dist/docs/` before writing Next-specific code.
- Tailwind v4: config-less, CSS-first via `@import "tailwindcss"` in `globals.css`. No `tailwind.config.*`.
- Edit `src/`, never `_design-source/`.

## Scripts

`npm run dev` · `npm run build` · `npm run start` · `npm run lint`
