import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "locatr",
    title: "LOCATR",
    description:
      "AI-powered real-time location intelligence platform that aggregates and analyzes geospatial data to provide actionable insights for urban planning and emergency response.",
    techStack: ["LangGraph", "FastAPI", "Next.js", "Snowflake", "Gemini 2.5", "Auth0", "Docker"],
    award: "DeerHacks V Winner",
    featured: true,
    github: "https://github.com/Minifigures",
  },
  {
    id: "vigil",
    title: "VIGIL",
    description:
      "Intelligent monitoring and alerting system powered by generative AI that detects anomalies in real-time data streams and provides natural language explanations of incidents.",
    techStack: ["LangGraph", "IBM watsonx Granite", "Gemini 2.0 Flash", "Supabase", "Moorcheh SDK"],
    award: "GenAI Genesis 2026",
    featured: true,
    github: "https://github.com/Minifigures",
  },
  {
    id: "compass",
    title: "COMPASS",
    description:
      "Accessible navigation platform leveraging computer vision and NLP to provide context-aware guidance for users in unfamiliar environments, with real-time translation support.",
    techStack: ["Next.js", "Python", "OpenCV", "FastAPI", "AI/ML"],
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
