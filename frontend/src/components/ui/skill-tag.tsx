"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiAnthropic,
  SiAuth0,
  SiBootstrap,
  SiClaude,
  SiCss,
  SiDocker,
  SiFastapi,
  SiFigma,
  SiFramer,
  SiGit,
  SiGithub,
  SiGnubash,
  SiGooglecloud,
  SiGooglecolab,
  SiGooglesheets,
  SiHtml5,
  SiJavascript,
  SiLangchain,
  SiMlflow,
  SiMysql,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiR,
  SiReact,
  SiScikitlearn,
  SiSelenium,
  SiSnowflake,
  SiStreamlit,
  SiSupabase,
  SiTailwindcss,
  SiTensorflow,
  SiThreedotjs,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import type { Skill } from "@/types";

const SKILL_ICONS: Record<string, IconType> = {
  TypeScript: SiTypescript,
  Python: SiPython,
  JavaScript: SiJavascript,
  HTML: SiHtml5,
  CSS: SiCss,
  Bash: SiGnubash,
  R: SiR,
  "Next.js": SiNextdotjs,
  React: SiReact,
  FastAPI: SiFastapi,
  "Node.js": SiNodedotjs,
  "Three.js / R3F": SiThreedotjs,
  TailwindCSS: SiTailwindcss,
  Streamlit: SiStreamlit,
  "scikit-learn": SiScikitlearn,
  PyTorch: SiPytorch,
  TensorFlow: SiTensorflow,
  LangChain: SiLangchain,
  "Framer Motion": SiFramer,
  Bootstrap: SiBootstrap,
  Pandas: SiPandas,
  NumPy: SiNumpy,
  Git: SiGit,
  GitHub: SiGithub,
  Docker: SiDocker,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  MLflow: SiMlflow,
  Auth0: SiAuth0,
  Figma: SiFigma,
  Selenium: SiSelenium,
  "Google Sheets API": SiGooglesheets,
  Vercel: SiVercel,
  Netlify: SiNetlify,
  Supabase: SiSupabase,
  Snowflake: SiSnowflake,
  "Google Cloud Platform": SiGooglecloud,
  "Google Colab": SiGooglecolab,
  Claude: SiClaude,
  Anthropic: SiAnthropic,
};

const COLOR_BY_CATEGORY: Record<Skill["category"], string> = {
  language: "border-coral/40 text-coral hover:bg-coral/10",
  framework: "border-teal/40 text-teal hover:bg-teal/10",
  tool: "border-amber/40 text-amber hover:bg-amber/10",
  platform: "border-sand/40 text-sand/70 hover:bg-sand/10",
};

interface SkillTagProps {
  skill: Skill;
  index: number;
}

export function SkillTag({ skill, index }: SkillTagProps) {
  const Icon = SKILL_ICONS[skill.name];
  const colorClass = COLOR_BY_CATEGORY[skill.category];

  return (
    <motion.span
      role="listitem"
      aria-label={skill.name}
      title={skill.name}
      className={`group inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs transition-colors duration-200 ${colorClass}`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.02 * index }}
    >
      {Icon ? (
        <Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
      ) : (
        <span
          aria-hidden="true"
          className="font-display text-[0.65rem] font-bold uppercase tracking-widest opacity-70"
        >
          {skill.name.slice(0, 2)}
        </span>
      )}
      <span>{skill.name}</span>
    </motion.span>
  );
}
