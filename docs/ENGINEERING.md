# Engineering principles

Principles the codebase actually follows, with the file you can read to verify each one. Written for other engineers (and future-me) so new work keeps the same shape.

## 1. Type safety end to end

- TypeScript `strict` is on (see `frontend/tsconfig.json`); no `any` allowed.
- Content is typed at the source: `frontend/src/types/index.ts` declares `Project`, `Experience`, `Skill`, and every data file in `frontend/src/data/` is typed against those interfaces.
- The backend uses Pydantic v2 for the same contract discipline: `ChatRequest` and `ChatResponse` in `backend/main.py` validate every message at the boundary.

## 2. Separation of concerns

At the repo level, `frontend/` (Next.js/TS) and `backend/` (FastAPI/Python) are decoupled: different languages, different lockfiles, different deploy targets. They meet at a network boundary, not in shared code.

Inside the frontend, the codebase has four layers, each with one job:

| Layer | Directory                         | Responsibility                                           |
|-------|-----------------------------------|----------------------------------------------------------|
| Data  | `frontend/src/data/`              | Content as typed arrays (projects, experience, skills)   |
| State | `frontend/src/stores/`            | App-wide runtime state (scroll progress, loaded flag)    |
| Scene | `frontend/src/components/canvas/` | Three.js world and scroll-driven camera                  |
| UI    | `frontend/src/components/sections/`, `frontend/src/components/ui/` | HTML overlays |

No section component reaches into Three.js. No canvas component reads content data directly. They meet through typed props and the Zustand store.

## 3. Single source of truth

- Projects and experience live in `frontend/src/data/`. A typo gets fixed once.
- Runtime state lives in Zustand. The scroll progress the navbar reads is the same value the camera rig wrote.
- The future chatbot will ground on the same `frontend/src/data/` files, so the things the site *says* and the things the bot *says* cannot drift.

## 4. Convention over configuration

- Next.js App Router: file-system routing, no custom router config.
- Tailwind v4 with CSS-based config (no `tailwind.config.js`), tokens live in `frontend/src/app/globals.css`.
- ESLint extends `next/core-web-vitals` and `next/typescript`; no hand-rolled rule list.
- Commits follow Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).
- Filenames are kebab-case (`glass-card.tsx`, not `GlassCard.tsx`), components use named exports (no `export default`).

## 5. Small composable components

- UI components stay under 150 lines each (see `frontend/src/components/ui/`).
- Canvas parts are split per concern (`ocean.tsx`, `clouds.tsx`, `seagulls.tsx`, `post-processing.tsx`), so fps regressions can be bisected by commenting out a single import.
- Sections compose primitives from `ui/` instead of duplicating styles.

## 6. Progressive enhancement and adaptivity

- `AdaptiveDpr` and `AdaptiveEvents` downshift automatically on slow devices.
- A `reducedMotion` flag in the store exists so motion-sensitive visitors get static fallbacks when the preference is set.
- The site loads and renders with JS disabled enough to show text content (App Router SSR).

## 7. Twelve-factor configuration

- Frontend: `frontend/.env.local` for EmailJS keys, prefixed `NEXT_PUBLIC_` when the client needs them.
- Backend: `backend/.env` for `ANTHROPIC_API_KEY` and `CORS_ORIGINS`, loaded via `pydantic-settings`; the Docker image binds to `$PORT` and is stateless.
- No secrets in the repo. `.env` files are gitignored at every level.

## 8. Security by default

- `frontend/next.config.ts` sets X-Content-Type-Options, X-Frame-Options, Referrer-Policy, and Permissions-Policy on every response.
- Backend CORS uses an explicit origin allowlist (no `*`), configurable per environment.
- Contact form sends through EmailJS; the recipient is not hard-coded in the page source.
- Root `.gitignore` blocks secrets (`.env`, `*.pem`, `*.key`, SSH keys, cloud credentials, package-manager auth tokens) at every depth so a stray file in any subdirectory is covered.

## 9. Performance as a feature, not an afterthought

- Draco-friendly GLTF loading, fixed `dpr=[1, 2]` cap, ACES tone mapping, `<Preload all />` before the hero fades in.
- Targets: 60 fps on mid-range laptops, 30 fps on mobile, Lighthouse 90+ across all four categories.
- `frontend/src/components/canvas/camera-rig.tsx` uses frame-rate-independent lerp, so a 144 Hz monitor and a 30 Hz Chromebook reach the same camera position at the same moment.

## 10. Deploy pipeline is the CI

- `git push origin main` triggers a Vercel production build from `frontend/` (Root Directory set in Vercel project settings). There is no separate CI to maintain.
- Preview deploys per branch are automatic; PRs get a live URL.
- Rollbacks are one click in the Vercel dashboard, because every commit on `main` produces its own immutable build artifact.
- The backend is not yet in the deploy pipeline. When wired, it ships to Fly.io or Railway with its own Dockerfile and env config, independent of the frontend's cadence.

## 11. Documentation lives next to the code it describes

- Root `README.md` points newcomers at the right doc.
- `docs/ARCHITECTURE.md` covers what the system does and why.
- `docs/ENGINEERING.md` (this file) covers how the team writes it.
- `backend/README.md` covers the backend specifically, so it stays honest about its own status (currently: scaffolded, not wired).

## 12. Honest status markers

The backend is scaffolded, not live. That fact is stated in `backend/README.md`, in this doc, and in `docs/ARCHITECTURE.md`. Portfolios that claim finished systems they never shipped get caught in interviews; this one says what runs and what is planned.
