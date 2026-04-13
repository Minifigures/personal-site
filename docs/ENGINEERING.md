# Engineering principles

Principles the codebase actually follows, with the file you can read to verify each one. Written for other engineers (and future-me) so new work keeps the same shape.

## 1. Type safety end to end

- TypeScript `strict` is on (see `tsconfig.json`); no `any` allowed.
- Content is typed at the source: `src/types/index.ts` declares `Project`, `Experience`, `Skill`, and every data file in `src/data/` is typed against those interfaces.
- The backend uses Pydantic v2 for the same contract discipline: `ChatRequest` and `ChatResponse` in `backend/main.py` validate every message at the boundary.

## 2. Separation of concerns

The codebase has four layers, each with one job:

| Layer | Directory | Responsibility |
|-------|-----------|----------------|
| Data | `src/data/` | Content as typed arrays (projects, experience, skills) |
| State | `src/stores/` | App-wide runtime state (scroll progress, loaded flag) |
| Scene | `src/components/canvas/` | Three.js world and scroll-driven camera |
| UI | `src/components/sections/`, `src/components/ui/` | HTML overlays |

No section component reaches into Three.js. No canvas component reads content data directly. They meet through typed props and the Zustand store.

## 3. Single source of truth

- Projects and experience live in `src/data/`. A typo gets fixed once.
- Runtime state lives in Zustand. The scroll progress the navbar reads is the same value the camera rig wrote.
- The future chatbot will ground on the same `src/data/` files, so the things the site *says* and the things the bot *says* cannot drift.

## 4. Convention over configuration

- Next.js App Router: file-system routing, no custom router config.
- Tailwind v4 with CSS-based config (no `tailwind.config.js`), tokens live in `src/app/globals.css`.
- ESLint extends `next/core-web-vitals` and `next/typescript`; no hand-rolled rule list.
- Commits follow Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).
- Filenames are kebab-case (`glass-card.tsx`, not `GlassCard.tsx`), components use named exports (no `export default`).

## 5. Small composable components

- UI components stay under 150 lines each (see `src/components/ui/`).
- Canvas parts are split per concern (`ocean.tsx`, `clouds.tsx`, `seagulls.tsx`, `post-processing.tsx`), so fps regressions can be bisected by commenting out a single import.
- Sections compose primitives from `ui/` instead of duplicating styles.

## 6. Progressive enhancement and adaptivity

- `AdaptiveDpr` and `AdaptiveEvents` downshift automatically on slow devices.
- A `reducedMotion` flag in the store exists so motion-sensitive visitors get static fallbacks when the preference is set.
- The site loads and renders with JS disabled enough to show text content (App Router SSR).

## 7. Twelve-factor configuration

- Frontend: `.env.local` for EmailJS keys, prefixed `NEXT_PUBLIC_` when the client needs them.
- Backend: `.env` for `ANTHROPIC_API_KEY` and `CORS_ORIGINS`, loaded via `pydantic-settings`; the Docker image binds to `$PORT` and is stateless.
- No secrets in the repo. `.env` files are gitignored at every level.

## 8. Security by default

- `next.config.ts` sets X-Content-Type-Options, X-Frame-Options, Referrer-Policy, and Permissions-Policy on every response.
- Backend CORS uses an explicit origin allowlist (no `*`), configurable per environment.
- Contact form sends through EmailJS; the recipient is not hard-coded in the page source.

## 9. Performance as a feature, not an afterthought

- Draco-friendly GLTF loading, fixed `dpr=[1, 2]` cap, ACES tone mapping, `<Preload all />` before the hero fades in.
- Targets: 60 fps on mid-range laptops, 30 fps on mobile, Lighthouse 90+ across all four categories.
- `camera-rig.tsx` uses frame-rate-independent lerp, so a 144 Hz monitor and a 30 Hz Chromebook reach the same camera position at the same moment.

## 10. Deploy pipeline is the CI

- `git push origin main` triggers a Vercel production build. There is no separate CI to maintain.
- Preview deploys per branch are automatic; PRs get a live URL.
- Rollbacks are one click in the Vercel dashboard, because every commit on `main` produces its own immutable build artifact.

## 11. Documentation lives next to the code it describes

- `README.md` at the repo root points newcomers at the right doc.
- `docs/ARCHITECTURE.md` (this directory) covers what the system does and why.
- `docs/ENGINEERING.md` (this file) covers how the team writes it.
- `backend/README.md` covers the backend specifically, so it stays honest about its own status (currently: scaffolded, not wired).

## 12. Honest status markers

The backend is scaffolded, not live. That fact is stated in `backend/README.md`, in this doc, and in the architecture doc. Portfolios that claim finished systems they never shipped get caught in interviews; this one says what runs and what is planned.
