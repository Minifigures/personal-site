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
    github: "https://github.com/Minifigures",
  },
  {
    id: "vigil",
    title: "VIGIL",
    description:
      "Multi-agent dental billing fraud detection system built at GenAI Genesis 2026. Uses LangGraph orchestration with IBM watsonx Granite and Gemini 2.0 Flash to identify anomalous billing patterns across dental claims. Team of 4, #1 GitHub contributor, 21,000+ lines of code.",
    techStack: ["LangGraph", "IBM watsonx Granite", "Gemini 2.0 Flash", "Supabase", "Moorcheh SDK"],
    award: "GenAI Genesis 2026",
    featured: true,
    github: "https://github.com/Minifigures",
  },
  {
    id: "compass",
    title: "COMPASS",
    description:
      "Multi-agent AI platform helping seniors and caregivers discover and navigate government benefits. Built at Hack the Globe 2026 using LangGraph, Gemini, Snowflake, Mapbox, Auth0, FastAPI, and Next.js for intelligent benefit matching and accessibility.",
    techStack: ["LangGraph", "Gemini", "Snowflake", "Mapbox", "Auth0", "FastAPI", "Next.js"],
    award: "Hack the Globe 2026",
    featured: true,
    github: "https://github.com/Minifigures",
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
