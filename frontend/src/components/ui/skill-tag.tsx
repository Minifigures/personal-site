"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiAuth0,
  SiCplusplus,
  SiCss,
  SiDocker,
  SiFastapi,
  SiFigma,
  SiFramer,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGnubash,
  SiGooglebigquery,
  SiGooglecloud,
  SiGooglecolab,
  SiGooglesheets,
  SiHtml5,
  SiJavascript,
  SiLangchain,
  SiLaravel,
  SiLinux,
  SiMlflow,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiPydantic,
  SiPytest,
  SiPython,
  SiPytorch,
  SiReact,
  SiScikitlearn,
  SiScipy,
  SiSnowflake,
  SiSqlalchemy,
  SiStreamlit,
  SiSupabase,
  SiTailwindcss,
  SiTensorflow,
  SiThreedotjs,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { FaAws, FaJava } from "react-icons/fa6";
import { TbBrain } from "react-icons/tb";
import { VscCode } from "react-icons/vsc";
import type { Skill } from "@/types";

/** Brand icon per skill name. Anything not listed falls back to a generic code glyph. */
const SKILL_ICONS: Record<string, IconType> = {
  TypeScript: SiTypescript,
  Python: SiPython,
  JavaScript: SiJavascript,
  Java: FaJava,
  "C++": SiCplusplus,
  HTML: SiHtml5,
  CSS: SiCss,
  Bash: SiGnubash,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  FastAPI: SiFastapi,
  Laravel: SiLaravel,
  TailwindCSS: SiTailwindcss,
  Pydantic: SiPydantic,
  "Three.js / R3F": SiThreedotjs,
  "Framer Motion": SiFramer,
  Streamlit: SiStreamlit,
  "scikit-learn": SiScikitlearn,
  PyTorch: SiPytorch,
  TensorFlow: SiTensorflow,
  LangChain: SiLangchain,
  LangGraph: TbBrain,
  Pandas: SiPandas,
  NumPy: SiNumpy,
  SciPy: SiScipy,
  Git: SiGit,
  GitHub: SiGithub,
  "GitHub Actions": SiGithubactions,
  Docker: SiDocker,
  "Linux/Unix": SiLinux,
  MLflow: SiMlflow,
  Auth0: SiAuth0,
  Figma: SiFigma,
  pytest: SiPytest,
  "Prompt Engineering": TbBrain,
  "Retrieval-Augmented Generation (RAG)": TbBrain,
  "Model Context Protocol (MCP)": TbBrain,
  "IBM watsonx": TbBrain,
  "Google Sheets API": SiGooglesheets,
  Vercel: SiVercel,
  Supabase: SiSupabase,
  Snowflake: SiSnowflake,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  SQLAlchemy: SiSqlalchemy,
  BigQuery: SiGooglebigquery,
  AWS: FaAws,
  "Google Cloud Platform": SiGooglecloud,
  "Vertex AI": SiGooglecloud,
  Gemini: SiGooglecloud,
  "Google Colab": SiGooglecolab,
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
  const Icon = SKILL_ICONS[skill.name] ?? VscCode;
  const colorClass = COLOR_BY_CATEGORY[skill.category];

  return (
    <motion.span
      role="listitem"
      aria-label={skill.name}
      title={skill.name}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs transition-colors duration-200 ${colorClass}`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.02 * index }}
    >
      <Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
      <span>{skill.name}</span>
    </motion.span>
  );
}
