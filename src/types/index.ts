export interface Project {
  id: string;
  title: string;
  role?: string;
  description: string;
  outcomes?: string;
  techStack: string[];
  github?: string;
  liveUrl?: string;
  devpost?: string;
  image?: string;
  award?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  workMode: "Remote" | "On-site" | "Hybrid";
  bullets: string[];
}

export interface Skill {
  name: string;
  category: "language" | "framework" | "tool" | "platform";
  icon?: string;
}
