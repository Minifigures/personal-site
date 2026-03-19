# Personal Portfolio

An immersive, scroll-driven portfolio site featuring a 3D beach/sunset scene built with Three.js, overlaid with animated HTML sections.

**Live:** [marcoayuste.com](https://marcoayuste.com)

## Tech Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **3D:** React Three Fiber, Drei, Three.js
- **Animation:** Framer Motion + GSAP (ScrollTrigger)
- **Styling:** Tailwind CSS v4
- **State:** Zustand
- **Email:** EmailJS
- **Deploy:** Vercel

## Features

- Scroll-driven 3D camera moving through a beach scene (ocean, islands, sunset sky, clouds, seagulls)
- Glass-morphism UI cards with smooth Framer Motion transitions
- Alternating timeline for work experience
- Project showcase grid with live/GitHub/Devpost links
- Contact form with rate limiting (5 emails/24h)
- Custom cursor, loading screen, and scroll indicator
- Adaptive performance (AdaptiveDpr, AdaptiveEvents, PerformanceMonitor)
- Fully responsive

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (Turbopack)
npm run dev

# Production build
npm run build

# Lint
npm run lint
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file for the contact form:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## Project Structure

```
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

## Colour Palette

| Colour | Hex       |
|--------|-----------|
| Coral  | `#E8735A` |
| Amber  | `#F4A942` |
| Teal   | `#2A9D8F` |
| Sand   | `#FDF6EC` |
| Navy   | `#1A1A2E` |
