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
  /** Slug of the linked interview-proof case study, if one exists. */
  caseStudy?: string;
}

export interface CaseStudyLinks {
  github?: string;
  liveUrl?: string;
  devpost?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  oneLiner: string;
  problem: string;
  role: string;
  approach: string[];
  keyDecisions: string[];
  impact: string[];
  learned: string[];
  stack: string[];
  links: CaseStudyLinks;
  award?: string;
}

export interface Experience {
  id: string;
  company: string;
  /** Optional sub-organization shown under the company (e.g. a branch or unit). */
  division?: string;
  role: string;
  startDate: string;
  endDate: string;
  workMode: "Remote" | "On-site" | "Hybrid";
  /** Optional plain-text line shown above the bullet list (e.g. a team name). */
  team?: string;
  bullets: string[];
  /** Optional logo path (e.g. /logos/company.svg) or inline SVG data URI. Falls back to letter monogram when absent. */
  logo?: string;
}

export interface Skill {
  name: string;
  category: "language" | "framework" | "tool" | "platform";
  icon?: string;
}
