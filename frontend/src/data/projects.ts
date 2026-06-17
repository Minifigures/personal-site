import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "locatr",
    title: "LOCATR",
    role: "Full-stack / AI engineer, top GitHub contributor (team of 4)",
    description:
      "Agentic spatial intelligence platform built in 36 hours at DeerHacks V. Six LangGraph agents (Commander, Scout, Vibe Matcher, Cost Analyst, Critic, Synthesiser) turn natural-language requests into a live Mapbox shortlist, streaming agent state to the client over WebSockets.",
    outcomes:
      "DeerHacks V 2026 Winner (1 of 9 prizes across 164 participants). Asyncio fan-out across the Analyst agents dropped pipeline latency from ~9s to under 3s (~70% reduction); 45,000+ lines shipped; Auth0 CIBA gates real Gmail bookings behind a secure mobile push.",
    techStack: ["LangGraph", "FastAPI", "Next.js 14", "Snowflake", "Gemini 2.5", "Mapbox", "Auth0"],
    award: "DeerHacks V 2026 Winner",
    featured: true,
    caseStudy: "locatr",
    image: "/projects/locatr.png",
    github: "https://github.com/Lushenwar/LOCATR",
    devpost: "https://devpost.com/software/pathfinder-6h8y1v",
  },
  {
    id: "canopy",
    title: "CANOPY",
    role: "Full-stack / AI engineer, #1 GitHub contributor (team of 4)",
    description:
      "Continuous remote-care platform for elderly patients. Three linked surfaces: a 'garden' patient check-in with voice AI, a family dashboard, and a clinical dashboard with 0-100 risk stratification. A LangGraph pipeline turns daily signals into early-warning alerts.",
    outcomes:
      "Won the Health & Humanity Track at Hack the Globe 2026, Global Spark's international social impact hackathon run with BCG across Toronto, London, and virtual. 117 commits in 36 hours; judges flagged the triple-interface design as the strongest clinical workflow of the track.",
    techStack: ["LangGraph", "FastAPI", "Groq", "Gemini", "Supabase", "Three.js", "Next.js 15", "Docker"],
    award: "Hack the Globe 2026 - Health & Humanity Winner",
    featured: true,
    caseStudy: "canopy",
    image: "/projects/canopy.png",
    github: "https://github.com/Minifigures/hacktheglobe",
    liveUrl: "https://hacktheglobe.vercel.app",
    devpost: "https://devpost.com/software/canopy-a0qp35",
  },
  {
    id: "utm-billiards-site",
    title: "UTM Billiards Platform",
    role: "Lead developer, club tech lead",
    description:
      "Official site for the UTM Billiards Club (320+ members). Built Elo rankings, a tournament bracket generator, a TF-IDF FAQ chatbot, an in-browser 8-ball game with physics, and a Google-Sheets-backed data pipeline so execs can update rankings without touching code.",
    outcomes:
      "Replaced a static Linktree with a production platform the club runs on week-to-week. Handles live leaderboard updates and tournament sign-ups each term.",
    techStack: ["Next.js 16", "TypeScript", "Tailwind v4", "React Three Fiber", "p5.js", "Google Sheets API"],
    featured: true,
    caseStudy: "utmbc",
    image: "/projects/utm-billiards.png",
    liveUrl: "https://utmbc.vercel.app",
    github: "https://github.com/UTM-Billiards-Club/utm-billiards-site",
  },
  {
    id: "paideia-mundi",
    title: "Paideia Mundi Neural Research Platform",
    role: "Engineering lead, AI/ML Engineer Intern",
    description:
      "Multimodal AI research platform I am leading for the NeuroSystems Intelligence and Research Unit at Paideia Mundi NeuroSystems Institute. Ships the ML data pipeline, model training loop, and privacy-compliant full-stack architecture supporting neurodevelopmental research.",
    outcomes:
      "Deploying May 2026. Leading a small engineering team through architecture, data preprocessing, feature extraction, and secure infrastructure sign-off ahead of the public launch.",
    techStack: ["Python", "PyTorch", "FastAPI", "Next.js", "PostgreSQL", "Docker"],
    award: "Deploying May 2026",
    featured: true,
    image: "/projects/paideia-mundi.svg",
    liveUrl: "https://www.paideiamundi.org",
  },
  {
    id: "vigil",
    title: "VIGIL",
    role: "Full-stack / AI engineer, #1 GitHub contributor (team of 4)",
    description:
      "Multi-agent healthcare billing fraud detection built at GenAI Genesis 2026. Students upload a receipt; a 14-agent LangGraph pipeline across five layers (Perception, Reasoning, Planning, Action, Reflection) cross-checks it against the Ontario Dental Association fee guide and surfaces unused benefits.",
    outcomes:
      "Honourable Mention at GKE Turns 10 Hackathon. 21,000+ lines of code, 26 Playwright E2E tests, and a YAML-driven policy layer so fraud scoring stays auditable.",
    techStack: ["LangGraph", "IBM watsonx", "Gemini 2.0 Flash", "Supabase", "Moorcheh SDK", "FastAPI", "Next.js 14"],
    award: "GenAI Genesis 2026 - GKE Turns 10 Honourable Mention",
    featured: true,
    caseStudy: "vigil",
    image: "/projects/vigil.png",
    github: "https://github.com/Minifigures/genaihack",
    devpost: "https://devpost.com/software/vigil-mj3y0x",
  },
  {
    id: "claimflow",
    title: "ClaimFlow",
    role: "Solo engineer",
    description:
      "Human-in-the-loop AI medical insurance claims platform: provider-pluggable LLM extraction (Claude with Gemini fallback), per-claimant ChromaDB RAG, and a fine-tuned EfficientNet-B0 imaging classifier, with human approval gating every stage.",
    outcomes:
      "94.2% imaging accuracy (ECE 0.016) on 15,000 images, a 253-test suite across state-machine, audit-tamper, PII, and prompt-injection cases, and a hash-chained audit log over every model call.",
    techStack: ["Python", "FastAPI", "PyTorch", "ChromaDB", "Claude", "Next.js"],
    featured: true,
    caseStudy: "claimflow",
    github: "https://github.com/Minifigures/claimflow",
  },
  {
    id: "pandexis",
    title: "Pandexis",
    role: "Full-stack / AI Engineer (team of 5)",
    description:
      "IBM x UNSA two-track winning epidemic simulator pairing a vectorized SEIR plus Monte Carlo engine with a fault-tolerant RAG LLM explainer (IBM Granite, Claude, deterministic template fallback) on IBM Cloud.",
    outcomes:
      "Won two tracks (1 of 5 on the team) against 600+ participants from a 10,000+ applicant pool, backed by 104 automated tests on CI/CD.",
    techStack: ["Python", "FastAPI", "IBM watsonx Granite", "RAG", "Next.js", "MapLibre"],
    award: "IBM x UNSA Two-Track Winner",
    featured: true,
    caseStudy: "pandexis",
    image: "/projects/pandexis.png",
    devpost: "https://devpost.com/software/disease-outflow-forecaster",
  },
  {
    id: "personal-site",
    title: "This Portfolio",
    role: "Designer, developer (solo)",
    description:
      "Single-page Three.js beach/sunset portfolio with a scroll-driven camera, procedural ocean, and a 3D island scene. R3F Canvas is fixed full-screen; HTML sections overlay on top with GSAP ScrollTrigger keyframes.",
    outcomes:
      "60fps on mid-range laptops via AdaptiveDpr, AdaptiveEvents, and Draco-compressed GLTF. Lighthouse 90+ across categories.",
    techStack: ["Next.js 15", "React Three Fiber", "Three.js", "Tailwind v4", "Framer Motion", "GSAP"],
    featured: false,
    caseStudy: "personal-site",
    image: "/projects/personal-site.png",
    github: "https://github.com/Minifigures/personal-site",
    liveUrl: "https://marcoayuste.com",
  },
];
