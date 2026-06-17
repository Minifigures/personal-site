"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/ui/section-header";
import { SkillTag } from "@/components/ui/skill-tag";
import { skills } from "@/data/skills";
import type { Skill } from "@/types";

type FilterCategory = "all" | Skill["category"];

const FILTER_CHIPS: { label: string; value: FilterCategory }[] = [
  { label: "All", value: "all" },
  { label: "Languages", value: "language" },
  { label: "Frameworks", value: "framework" },
  { label: "Tools", value: "tool" },
  { label: "Platforms", value: "platform" },
];

export function About() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const shouldReduceMotion = useReducedMotion();

  const filteredSkills =
    activeFilter === "all"
      ? skills
      : skills.filter((s) => s.category === activeFilter);

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.03,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  };

  return (
    <section
      id="about"
      className="flex min-h-screen items-center px-4 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeader number="01" label="About" title="Who I Am" />

        <div className="grid gap-8 md:grid-cols-2">
          <GlassCard className="glass-coral">
            <p className="text-base leading-relaxed text-sand/70">
              I am Marco, a{" "}
              <span className="text-sand">University of Toronto</span> student
              graduating in 2027 (CCIT and Sociology at UTM). Concrete proof I
              ship: I built an AI pipeline that reads photos of paper tournament
              sheets and drops the data cleanly into Google Sheets, cutting my
              club president&apos;s weekly admin from{" "}
              <span className="text-coral">1 to 2 hours down to under 3 minutes</span>.
            </p>
            <p className="mt-4 text-base leading-relaxed text-sand/70">
              That is the work I am drawn to: turning tedious, error-prone,
              real-world workflows into boring-to-run, easy-to-audit software.
            </p>
            <p className="mt-4 text-base leading-relaxed text-sand/70">
              Right now I am a Full-Stack{" "}
              <span className="text-teal">Software Engineer Intern at Yadag</span>
              , Team Lead at{" "}
              <span className="text-teal">
                Paideia Mundi NeuroSystems Institute
              </span>
              , and founding developer of the{" "}
              <span className="text-teal">UTM Billiards Club</span> platform
              (320+ members).
            </p>
            <p className="mt-4 text-base leading-relaxed text-sand/70">
              I love hackathons: winner at{" "}
              <span className="text-coral">DeerHacks V</span> and{" "}
              <span className="text-coral">IBM Z x UNSA 2026</span>, finalist at
              Hack the Globe (Global Spark x BCG) and IMC Prosperity 4.
              Trilingual (English, French, Tagalog), born in Canada, based in
              Toronto / Mississauga.
            </p>

            {/* Languages spoken */}
            <div className="mt-6 border-t border-sand/5 pt-4">
              <h4 className="mb-2 font-mono text-xs uppercase tracking-wider text-sand/40">
                Languages Spoken
              </h4>
              <div className="flex gap-3">
                {["English", "Tagalog", "French"].map((lang) => (
                  <span
                    key={lang}
                    className="rounded-md bg-sand/5 px-2.5 py-1 font-mono text-xs text-sand/50"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>

          <GlassCard delay={0.15} className="glass-coral">
            <h3 className="mb-3 font-display text-lg font-semibold text-sand">
              Tech Stack
            </h3>

            {/* Filter chips */}
            <div role="group" aria-label="Filter skills by category" className="mb-4 flex flex-wrap gap-2">
              {FILTER_CHIPS.map((chip) => {
                const isActive = activeFilter === chip.value;
                return (
                  <button
                    key={chip.value}
                    onClick={() => setActiveFilter(chip.value)}
                    aria-pressed={isActive}
                    className={[
                      "rounded-full px-3 py-1 font-mono text-xs transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral",
                      isActive
                        ? "bg-coral text-navy font-semibold"
                        : "bg-sand/10 text-sand/60 hover:bg-sand/20 hover:text-sand/80",
                    ].join(" ")}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>

            {/* Skills grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                role="list"
                className="flex flex-wrap gap-2"
                variants={gridVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredSkills.map((skill, i) => (
                  <motion.div key={skill.name} variants={itemVariants} role="listitem">
                    <SkillTag skill={skill} index={i} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                { label: "Hackathon Wins", value: "2" },
                { label: "Competitions", value: "6" },
                { label: "Internships/Co-ops", value: "5" },
                { label: "Experiences", value: "11" },
                { label: "Languages", value: "3" },
                { label: "Coffees", value: "Infinite" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: shouldReduceMotion ? 0 : 0.1 * i }}
                >
                  <div className="font-display text-3xl font-bold text-coral">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 font-mono text-xs font-medium text-sand/50">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
