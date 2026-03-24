import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "locatr",
    title: "LOCATR",
    description:
      "DeerHacks V Winner. Multi-agent location intelligence system using LangGraph orchestration to aggregate and analyze geospatial data for urban planning and emergency response. Team of 4, top contributor, 40,000+ lines.",
    techStack: ["LangGraph", "FastAPI", "Next.js", "Snowflake", "Gemini 2.5", "Auth0", "Docker"],
    award: "DeerHacks V Winner",
    featured: true,
    github: "https://github.com/Lushenwar/LOCATR",
  },
  {
    id: "vigil",
    title: "VIGIL",
    description:
      "Multi-agent dental billing fraud detection system built at GenAI Genesis 2026. Uses LangGraph orchestration with IBM watsonx Granite and Gemini 2.0 Flash to identify anomalous billing patterns across dental claims. Team of 4, #1 GitHub contributor, 21,000+ lines of code.",
    techStack: ["LangGraph", "IBM watsonx Granite", "Gemini 2.0 Flash", "Supabase", "Moorcheh SDK"],
    award: "GenAI Genesis 2026",
    featured: true,
    github: "https://github.com/Minifigures/genaihack",
  },
  {
    id: "canopy",
    title: "CANOPY",
    description:
      "Health & Humanity Track Finalist (1 of 2 teams) at Hack the Globe 2026. AI-powered remote care platform for elderly patients with immersive 3D interfaces. Keeps patients healthy at home, gives families peace of mind, and alerts clinicians before crises hit. Team of 4, #1 GitHub contributor, 117 commits.",
    techStack: ["LangGraph", "FastAPI", "Groq", "Gemini", "Supabase", "Three.js", "Next.js 15", "Docker"],
    award: "🏅 Hackathon Finalist",
    featured: true,
    github: "https://github.com/Minifigures/hacktheglobe",
    liveUrl: "https://hacktheglobe.vercel.app",
    devpost: "https://devpost.com/software/canopy-a0qp35",
  },
  {
    id: "utm-billiards-site",
    title: "UTM Billiards Platform",
    description:
      "Full-stack club platform with Elo rankings, tournament bracket generators, AI chatbot, and automated data pipelines serving 310+ members.",
    techStack: ["React", "TypeScript", "Tailwind", "Node.js", "Python", "Google Sheets API"],
    featured: true,
    liveUrl: "https://utm-billiards.netlify.app/",
    github: "https://github.com/Minifigures",
  },
  {
    id: "personal-site",
    title: "This Portfolio",
    description:
      "Immersive Three.js beach/sunset portfolio with scroll-driven camera, procedural ocean, 3D island with benchpress, speed boat, and cinematic post-processing.",
    techStack: ["Next.js 15", "R3F", "Three.js", "Tailwind", "TypeScript"],
    featured: false,
    github: "https://github.com/Minifigures/personal-site",
    liveUrl: "https://marcoayuste.com",
  },
];
