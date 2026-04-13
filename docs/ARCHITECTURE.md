# Architecture

A single-page, scroll-driven portfolio that renders a live 3D scene beneath HTML content. The Canvas is pinned full-screen behind the document, the HTML sections scroll over the top, and a hand-rolled scroll orchestrator drives the camera through six keyframes.

## System context

```
          ┌────────────────────┐
          │  Visitor (browser) │
          └──────────┬─────────┘
                     │ HTTPS
          ┌──────────▼─────────┐
          │   Vercel Edge      │
          │   (static + SSR)   │
          └──────────┬─────────┘
                     │
          ┌──────────▼─────────┐
          │   Next.js 15 app   │   marcoayuste.com
          │   (App Router)     │   (deployed from ./frontend)
          └─┬──────────┬──────┘
            │          │
     EmailJS│          │POST /chat (planned)
    (client │          │
     side)  ▼          ▼
    inbox        ┌──────────────────┐
                 │  FastAPI service │  ./backend (scaffolded, not yet wired)
                 │  + Claude agent  │
                 └──────────────────┘
```

## Repo layout

```
personal-site/
├── frontend/               # Next.js 15 app, deploys to Vercel
├── backend/                # FastAPI service, scaffolded
├── docs/                   # This doc + ENGINEERING.md
└── README.md
```

## Frontend layout

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Fonts, metadata, viewport, global styles
│   │   ├── page.tsx          # Composes Scene + every HTML section
│   │   ├── globals.css       # Theme tokens, cursor, scrollbar, keyframes
│   │   └── sitemap.ts        # /sitemap.xml
│   ├── components/
│   │   ├── canvas/           # Three.js scene
│   │   │   ├── scene.tsx         # R3F Canvas, adaptive perf wrappers, tone mapping
│   │   │   ├── camera-rig.tsx    # Scroll-driven camera, 6 keyframes, lerp + easing
│   │   │   ├── island.tsx        # Main island, boat, small islands
│   │   │   ├── ocean.tsx         # Procedural waves
│   │   │   ├── sunset-sky.tsx    # Gradient sky and sun
│   │   │   ├── clouds.tsx        # Animated clouds
│   │   │   ├── particles.tsx     # Floating particles
│   │   │   ├── seagulls.tsx      # Flying seagulls
│   │   │   └── post-processing.tsx
│   │   ├── sections/         # HTML sections rendered over the canvas
│   │   │   ├── hero.tsx
│   │   │   ├── about.tsx
│   │   │   ├── experience-section.tsx
│   │   │   ├── projects-section.tsx
│   │   │   └── contact.tsx
│   │   ├── ui/               # Reusable UI primitives
│   │   │   ├── navbar.tsx
│   │   │   ├── loading-screen.tsx
│   │   │   ├── custom-cursor.tsx
│   │   │   ├── glass-card.tsx
│   │   │   ├── scroll-indicator.tsx
│   │   │   ├── section-header.tsx
│   │   │   └── ui-toggle.tsx
│   │   └── layout/
│   │       └── footer.tsx
│   ├── data/                 # Typed content (single source of truth)
│   │   ├── projects.ts
│   │   ├── experience.ts
│   │   └── skills.ts
│   ├── hooks/
│   │   ├── use-scroll-progress.ts
│   │   └── use-media-query.ts
│   ├── stores/
│   │   └── use-app-store.ts  # Zustand: currentSection, scrollProgress, isLoaded, reducedMotion
│   ├── types/
│   │   └── index.ts          # Project, Experience, Skill
│   └── lib/                  # Small utilities
├── public/                   # 3D models, textures, project images
├── next.config.ts            # Security headers, Turbopack transpile list
├── tsconfig.json             # strict: true, @/* path alias
└── package.json
```

## Scroll orchestration

Implemented in `frontend/src/components/canvas/camera-rig.tsx`.

1. A passive `scroll` listener reads `window.scrollY` and computes a normalised progress value in `[0, 1]` as `scrollTop / (scrollHeight - innerHeight)`.
2. Six keyframes describe camera `position` and `lookAt` at each scroll milestone (hero, about, experience, projects, contact, footer).
3. `useFrame` interpolates between the surrounding keyframes every tick using a frame-rate-independent lerp: `1 - Math.pow(k, delta)`. A smoothstep easing softens the transitions.
4. A small mouse-parallax offset is added on top of the interpolated camera position for subtle depth.
5. Scroll progress is also pushed into the Zustand store so HTML sections (navbar highlight, section header animation) can react.

The camera rig never touches the DOM directly. It reads scroll position, writes to the Three.js camera, and publishes progress to shared state. Sections listen to that state.

## HTML over Canvas

`frontend/src/app/page.tsx` mounts the `Scene` first (fixed, full-viewport, `z-index: 0`) and the HTML sections above it (`z-index: 10+`). Sections use `pointer-events: auto` locally so links and forms work, while the rest of the page stays transparent to clicks that should land on the canvas (cursor effects, future 3D interactions).

## State management

```ts
// frontend/src/stores/use-app-store.ts (shape)
interface AppState {
  currentSection: number;
  scrollProgress: number;   // 0..1
  isLoaded: boolean;
  reducedMotion: boolean;
  // setters ...
}
```

Zustand was chosen over Redux or Context because (a) the store has four values, (b) it avoids the re-render storms you get from passing setters through Context, and (c) selectors keep canvas code subscribed only to the slices that actually change each frame.

## Performance

Wired up in `frontend/src/components/canvas/scene.tsx`:

- `<PerformanceMonitor>` wraps the scene and exposes fps health.
- `<AdaptiveDpr pixelated />` drops device pixel ratio when fps dips.
- `<AdaptiveEvents />` throttles raycast / pointer events under load.
- `<Preload all />` forces all assets into the GPU before the hero fades in.
- `Canvas` configured with `dpr={[1, 2]}`, ACES filmic tone mapping, shadows on.

Targets: 60fps on a mid-range laptop, 30fps on mobile, Lighthouse 90+ across all four categories.

## Data layer

Projects, experience, and skills live as typed arrays in `frontend/src/data/`. `frontend/src/types/index.ts` exports the `Project`, `Experience`, and `Skill` interfaces. The sections import the typed arrays and render them. This keeps content edits a one-file change and makes the backend chatbot's grounding trivial (same data, same shape).

## Deploy

- Vercel builds from the `frontend/` subdirectory. Root Directory is set to `frontend` in the Vercel project settings, so Vercel reads `frontend/package.json` and `frontend/next.config.ts` directly.
- GitHub push to `main` triggers a Vercel production build.
- Domain: `marcoayuste.com` on project `personal-site`.
- Security headers set in `frontend/next.config.ts` (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy).

## Planned: backend

See [`../backend/README.md`](../backend/README.md). FastAPI service, Claude agent grounded on `frontend/src/data/`, deployed to Fly.io or Railway, integrated behind a chat widget in the frontend.
