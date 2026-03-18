import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "locatr",
    title: "LOCATR",
    description:
      "AI-powered real-time location intelligence platform that aggregates and analyzes geospatial data to provide actionable insights for urban planning and emergency response.",
    techStack: ["Next.js", "Python", "TensorFlow", "FastAPI", "PostgreSQL", "TypeScript"],
    award: "DeerHacks V Winner",
    featured: true,
    github: "https://github.com/Minifigures",
  },
  {
    id: "vigil",
    title: "VIGIL",
    description:
      "Intelligent monitoring and alerting system powered by generative AI that detects anomalies in real-time data streams and provides natural language explanations of incidents.",
    techStack: ["React", "Node.js", "LangChain", "GenAI", "WebSocket", "TypeScript"],
    award: "GenAI Genesis Top 2",
    featured: true,
    github: "https://github.com/Minifigures",
  },
  {
    id: "compass",
    title: "COMPASS",
    description:
      "Accessible navigation platform that leverages computer vision and NLP to provide context-aware guidance for users in unfamiliar environments, with real-time translation support.",
    techStack: ["Next.js", "Python", "OpenCV", "FastAPI", "AI/ML"],
    award: "Hack the Globe Submission",
    featured: true,
    github: "https://github.com/Minifigures",
  },
  {
    id: "personal-site",
    title: "This Portfolio",
    description:
      "An immersive Three.js beach/sunset portfolio built with React Three Fiber, featuring scroll-driven camera animation, procedural ocean, and a 3D island with palm trees.",
    techStack: ["Next.js", "R3F", "Three.js", "GSAP", "Tailwind", "TypeScript"],
    featured: false,
    github: "https://github.com/Minifigures/personal-site",
    liveUrl: "https://marcoayuste.com",
  },
];
