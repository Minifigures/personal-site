# CLAUDE.md - Project Context for Claude Code

## Project
Marco Ayuste's personal portfolio site. Beach/sunset themed Three.js experience.

## Tech Stack
- **Framework:** Next.js 15 (App Router) + TypeScript (strict)
- **3D:** React Three Fiber + Drei + postprocessing
- **State:** Zustand
- **Styling:** Tailwind CSS v4 (CSS-based config, not JS)
- **Animation:** Framer Motion + GSAP (ScrollTrigger)
- **Email:** EmailJS
- **Deploy:** Vercel

## Architecture
- Single-page scroll experience with scroll-driven 3D camera
- R3F Canvas is fixed fullscreen; HTML sections overlay with z-index
- All data (projects, experience, skills) in `src/data/` typed files
- 3D components in `src/components/canvas/`
- HTML sections in `src/components/sections/`
- Reusable UI in `src/components/ui/`

## Git Authorship
- **Always** set commit author to: `Minifigures <110493842+Minifigures@users.noreply.github.com>`
- Use `--author` flag on every commit. Never commit as Claude.

## Conventions
- TypeScript strict mode, no `any`
- Named exports only (no default exports)
- Kebab-case filenames
- Conventional commits (feat:, fix:, chore:)
- Components under 150 lines
- `next/font` for fonts, `next/image` for images
- `@/*` path alias maps to `./src/*`

## Key Commands
```
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run lint     # ESLint
```

## Colour Palette
- Coral: #E8735A
- Amber: #F4A942
- Teal: #2A9D8F
- Sand: #FDF6EC
- Navy: #1A1A2E

## Performance Targets
- 60fps on mid-range laptop, 30fps on mobile
- Lighthouse 90+ across all categories
- Use AdaptiveDpr, AdaptiveEvents, PerformanceMonitor
- Draco-compressed GLTF models
