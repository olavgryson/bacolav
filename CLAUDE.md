# Bacolav

This is NOT the Next.js you know. APIs, conventions, file structure may differ from training data. Read `node_modules/next/dist/docs/` before writing Next code. Heed deprecation notices.

Marketing site with 3D hero + scrolly scenes. Stack: Next.js 16 (App Router) + React 19 + TS 5 + Tailwind v4 + three.js (@react-three/fiber + drei) + GSAP.

## Layout

- `src/app/` — routes (`layout.tsx`, `page.tsx`, `globals.css`); `api/preorder/route.ts` = pre-order endpoint, mails via Brevo (env: `BREVO_API_KEY`, `NOTIFICATION_EMAIL`)
- `src/components/` — page sections, 3D scenes (`HeroScene3D`, `ScrollyScene` + client wrapper), SVG primitives, `useReveal.ts`
- `public/` — static + WebGL assets; `blender/` and `pictures/` = source art, not shipped
- `Dockerfile` — production container

## Rules

- Tailwind v4: config-less, CSS-first via `@import "tailwindcss"` in `globals.css`. No `tailwind.config.*`.
- Design/brand knowledge lives in the brain vault (see below), not in this repo.

## Scripts

`npm run dev` · `npm run build` · `npm run start` · `npm run lint`

## Brain Vault — single source of truth

Persoonlijk project (buiten Gryve/VOF-scope). Projectkennis leeft **uitsluitend** in de privé Obsidian-vault, niet in dit repo.

- Toegang via de `obsidian` MCP-server, niet via losse file-reads. Vereist draaiende Obsidian (REST 127.0.0.1:27124).
- Project-notes: `~/brain/personal/projects/bacolav/` — start bij `Bacolav.md`.

**Regel:** schrijf nooit een kennis-`.md` in dit repo. Nieuwe kennis → vault.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
