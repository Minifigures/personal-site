# Marco Ayuste — Personal Portfolio

An immersive, scroll-driven portfolio site featuring a 3D beach/sunset scene built with Three.js, overlaid with animated HTML sections. Sail through an ocean at sunset while exploring projects, experience, and skills.

**Live:** [marcoayuste.com](https://marcoayuste.com)

## What it does

- **3D scroll experience**: Navigate through a fully interactive beach scene — ocean waves, islands, a lighthouse, palm trees, clouds, and seagulls — all driven by scroll position.
- **Portfolio sections**: Hero, About, Experience (alternating timeline), Projects (grid with live/GitHub/Devpost links), Skills, and Contact — all overlaid on the 3D canvas with glassmorphism cards.
- **Contact form**: Send messages directly via EmailJS with built-in rate limiting (5 emails / 24h).
- **Adaptive performance**: Automatically adjusts resolution and effects based on device capability using AdaptiveDpr, AdaptiveEvents, and PerformanceMonitor for 60fps on desktop and 30fps on mobile.

## Tech stack

- **Frontend**: Next.js 15 (App Router), React, TypeScript (strict mode).
- **3D**: React Three Fiber, Drei, Three.js, postprocessing.
- **Animation**: Framer Motion (section transitions), GSAP + ScrollTrigger (scroll-driven camera).
- **Styling**: Tailwind CSS v4 (CSS-based config).
- **State**: Zustand.
- **Email**: EmailJS.
- **Deploy**: Vercel.

## Project structure

```text
src/
├── app/                  # Next.js App Router (layout, page, globals.css)
├── components/
│   ├── canvas/           # 3D scene (ocean, island, sky, clouds, seagulls)
│   ├── sections/         # Page sections (hero, about, experience, projects, contact)
│   ├── ui/               # Reusable UI (navbar, glass-card, cursor, loading)
│   └── layout/           # Footer
├── data/                 # Content data (projects, skills, experience)
├── hooks/                # Custom hooks (scroll progress, media query)
├── stores/               # Zustand store
├── types/                # TypeScript interfaces
└── lib/                  # Utilities
```

## Running the project

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site locally.

### Other commands

```bash
npm run build    # Production build
npm run lint     # ESLint
```

## Environment

Create a `.env.local` file in the project root for the contact form:

- `NEXT_PUBLIC_EMAILJS_SERVICE_ID` — your EmailJS service ID
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` — your EmailJS template ID
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` — your EmailJS public key

## Colour palette

| Colour | Hex       | Usage               |
|--------|-----------|---------------------|
| Coral  | `#E8735A` | Accents, CTAs       |
| Amber  | `#F4A942` | Highlights, sun     |
| Teal   | `#2A9D8F` | Links, icons        |
| Sand   | `#FDF6EC` | Backgrounds, text   |
| Navy   | `#1A1A2E` | Dark sections, base |

## License and credits

Designed and built by Marco Ayuste. Beach/sunset 3D experience inspired by the Three.js ocean example.
