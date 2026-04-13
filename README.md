# Marco Ayuste, Personal Portfolio

Scroll-driven portfolio with a fixed full-viewport Three.js beach scene and HTML sections stacked on top. A hand-rolled scroll orchestrator drives the camera through six keyframes; the content layer (projects, experience, skills) is typed and lives in one place.

**Live:** [marcoayuste.com](https://marcoayuste.com)

## Repo layout

Monorepo split by runtime: Next.js frontend ships today, FastAPI backend is scaffolded for a follow-up AI chatbot. Each side is self-contained (own package manager, own lockfile, own Dockerfile where relevant).

```
personal-site/
├── frontend/             # Next.js 15 app (TypeScript, R3F, ships to Vercel)
│   ├── src/
│   │   ├── app/            # App Router entry, globals, sitemap
│   │   ├── components/
│   │   │   ├── canvas/       # Three.js scene (ocean, island, sky, ...)
│   │   │   ├── sections/     # Hero, About, Experience, Projects, Contact
│   │   │   ├── ui/           # Reusable primitives (glass-card, navbar, cursor)
│   │   │   └── layout/       # Footer
│   │   ├── data/           # Typed content (projects, experience, skills)
│   │   ├── hooks/          # use-scroll-progress, use-media-query
│   │   ├── stores/         # Zustand store
│   │   ├── types/          # Shared TypeScript interfaces
│   │   └── lib/            # Small utilities
│   ├── public/           # 3D models, textures, project images
│   ├── next.config.ts    # Security headers, Turbopack transpile list
│   ├── tsconfig.json     # strict: true, @/* path alias
│   └── package.json
├── backend/              # FastAPI service for the planned AI chatbot (scaffolded)
│   ├── main.py             # FastAPI app, CORS, /health, /chat
│   ├── agent.py            # Claude-backed portfolio agent (stub)
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
├── docs/
│   ├── ARCHITECTURE.md   # System design and scroll orchestration
│   └── ENGINEERING.md    # Principles the codebase follows
└── README.md
```

## Quick start, frontend

```bash
cd frontend
npm install
npm run dev              # Turbopack dev server on http://localhost:3000
```

Other scripts:

```bash
npm run build            # Production build
npm run lint             # ESLint (next/core-web-vitals + next/typescript)
npm start                # Serve the production build locally
```

### Environment (frontend)

Create `frontend/.env.local` for the contact form:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
```

## Quick start, backend

See [`backend/README.md`](backend/README.md) for the FastAPI scaffold. Short version:

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env      # then fill ANTHROPIC_API_KEY
uvicorn main:app --reload --port 8000
```

## Stack

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript (strict), Tailwind CSS v4 (CSS-based config)
- **3D:** React Three Fiber, Drei, Three.js, postprocessing
- **Animation:** Framer Motion (section transitions), GSAP (supporting scroll animations)
- **State:** Zustand
- **Email:** EmailJS
- **Backend (planned):** FastAPI (Python 3.11), Anthropic SDK, Pydantic v2, Docker
- **Deploy:** Vercel (frontend, Root Directory: `frontend`), Fly.io or Railway (backend, when wired)

## What to read next

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) explains the scroll camera, HTML-over-Canvas layering, state, and performance strategy.
- [`docs/ENGINEERING.md`](docs/ENGINEERING.md) lists the engineering principles the repo follows, with the file you can check for each one.
- [`backend/README.md`](backend/README.md) covers the planned AI chatbot service and its integration plan.

## Performance targets

- 60 fps on a mid-range laptop, 30 fps on mobile.
- Lighthouse 90+ across Performance, Accessibility, Best Practices, and SEO.
- `AdaptiveDpr` (pixelated), `AdaptiveEvents`, and `PerformanceMonitor` are wired in `frontend/src/components/canvas/scene.tsx` to keep the scene responsive on slower hardware.

## Colour palette

| Colour | Hex       | Usage                 |
|--------|-----------|-----------------------|
| Coral  | `#E8735A` | Accents, CTAs         |
| Amber  | `#F4A942` | Highlights, sun       |
| Teal   | `#2A9D8F` | Links, icons          |
| Sand   | `#FDF6EC` | Backgrounds, text     |
| Navy   | `#1A1A2E` | Dark sections, base   |

## Credits

Designed and built by Marco Ayuste. Beach/sunset 3D experience inspired by the Three.js ocean example.
