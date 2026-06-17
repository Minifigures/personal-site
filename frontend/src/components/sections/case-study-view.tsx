"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaArrowLeft } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { SiDevpost } from "react-icons/si";
import type { IconType } from "react-icons";
import type { CaseStudy } from "@/types";

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-10">
      <h2 className="text-coral font-mono text-xs uppercase tracking-[0.3em]">
        {title}
      </h2>
      <ul className="mt-4 space-y-3">
        {items.map((it, i) => (
          <li key={i} className="text-sand/80 flex gap-3 text-sm leading-relaxed">
            <span className="bg-teal mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
            {it}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CaseStudyView({ study }: { study: CaseStudy }) {
  const links = (
    [
      study.links.github && { href: study.links.github, label: "GitHub", Icon: FaGithub },
      study.links.liveUrl && { href: study.links.liveUrl, label: "Live", Icon: FiExternalLink },
      study.links.devpost && { href: study.links.devpost, label: "Devpost", Icon: SiDevpost },
    ] as ({ href: string; label: string; Icon: IconType } | "" | undefined)[]
  ).filter(Boolean) as { href: string; label: string; Icon: IconType }[];

  return (
    <main
      className="min-h-screen px-5 py-16 sm:px-8"
      style={{
        background:
          "radial-gradient(ellipse at top, #15152e 0%, #0a0a18 55%, #06060f 100%)",
      }}
    >
      <div className="mx-auto max-w-3xl">
        <Link
          href="/#projects"
          className="interactive text-sand/60 hover:text-coral inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest transition-colors"
        >
          <FaArrowLeft size={11} /> Back to projects
        </Link>

        <motion.header
          className="mt-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {study.award && (
            <span className="border-amber/40 bg-amber/10 text-amber inline-block rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider">
              {study.award}
            </span>
          )}
          <h1 className="text-sand mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {study.title}
          </h1>
          <p className="text-sand/70 mt-4 text-lg leading-relaxed">
            {study.oneLiner}
          </p>
          {links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {links.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive glass-thin text-sand hover:text-coral inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-xs transition-colors"
                >
                  <Icon size={14} /> {label}
                </a>
              ))}
            </div>
          )}
        </motion.header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <section className="mt-10">
            <h2 className="text-coral font-mono text-xs uppercase tracking-[0.3em]">
              The Problem
            </h2>
            <p className="text-sand/80 mt-3 text-sm leading-relaxed">
              {study.problem}
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-coral font-mono text-xs uppercase tracking-[0.3em]">
              My Role
            </h2>
            <p className="text-sand/80 mt-3 text-sm leading-relaxed">
              {study.role}
            </p>
          </section>

          <ListBlock title="The Approach" items={study.approach} />
          <ListBlock title="Key Decisions" items={study.keyDecisions} />
          <ListBlock title="Impact & Results" items={study.impact} />

          <section className="mt-10">
            <h2 className="text-coral font-mono text-xs uppercase tracking-[0.3em]">
              The Stack
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {study.stack.map((s) => (
                <span
                  key={s}
                  className="glass-thin text-teal rounded-full px-3 py-1 font-mono text-xs"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>

          <ListBlock title="What I Learned" items={study.learned} />
        </motion.div>
      </div>
    </main>
  );
}
