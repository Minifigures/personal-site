import type { IconType } from "react-icons";
import {
  SiAnthropic,
  SiAuth0,
  SiDocker,
  SiFastapi,
  SiFramer,
  SiGooglecloud,
  SiGooglesheets,
  SiLangchain,
  SiMapbox,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiReact,
  SiSnowflake,
  SiSupabase,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiGsap,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { TbBrain } from "react-icons/tb";

/**
 * Canonical name -> icon map shared across the site.
 * Keys are matched case-insensitively and prefix-stripped (e.g. "Next.js 15" -> "next.js").
 */
const ICON_MAP: Record<string, IconType> = {
  // Languages
  python: SiPython,
  typescript: SiTypescript,

  // Frameworks / runtimes
  "next.js": SiNextdotjs,
  react: SiReact,
  "react three fiber": SiThreedotjs,
  fastapi: SiFastapi,
  "tailwind": SiTailwindcss,
  tailwindcss: SiTailwindcss,
  "framer motion": SiFramer,
  gsap: SiGsap,

  // 3-D / viz
  "three.js": SiThreedotjs,

  // AI / agents
  langgraph: TbBrain,
  langchain: SiLangchain,
  "gemini": SiGooglecloud,
  "ibm watsonx": TbBrain,
  "ibm watsonx granite": TbBrain,
  rag: TbBrain,
  chromadb: TbBrain,
  claude: SiAnthropic,
  "moorcheh sdk": TbBrain,
  "groq": TbBrain,

  // Databases / platforms
  snowflake: SiSnowflake,
  supabase: SiSupabase,
  postgresql: SiPostgresql,
  docker: SiDocker,
  auth0: SiAuth0,
  mapbox: SiMapbox,
  "google sheets api": SiGooglesheets,

  // ML
  pytorch: SiPytorch,
};

/** Normalise a raw tech label to a lookup key. */
function normalise(raw: string): string {
  return raw
    .toLowerCase()
    // strip trailing version numbers like "14", "15", "v4", "2.5 flash"
    .replace(/\s+v?\d[\d.]*(\s.*)?$/, "")
    .trim();
}

/** Resolve a brand icon for any tech label, or fall back to a generic icon. */
export function getTechIcon(tech: string): IconType {
  const key = normalise(tech);
  return ICON_MAP[key] ?? VscCode;
}
