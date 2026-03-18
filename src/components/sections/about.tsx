"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { skills } from "@/data/skills";

const SKILL_COLORS: Record<string, string> = {
  language: "border-coral/40 text-coral",
  framework: "border-teal/40 text-teal",
  tool: "border-amber/40 text-amber",
  platform: "border-sand/40 text-sand/70",
};

export function About() {
  return (
    <section
      id="about"
      className="flex min-h-screen items-center px-4 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-coral/70">
            01 / About
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-sand sm:text-5xl">
            Who I Am
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <GlassCard>
            <p className="text-base leading-relaxed text-sand/70">
              I am a Computer Science and Communication, Culture, Information
              and Technology (CCIT) student at the{" "}
              <span className="text-sand">University of Toronto Mississauga</span>.
              I am passionate about building intelligent systems that bridge the
              gap between complex AI/ML models and real-world user experiences.
            </p>
            <p className="mt-4 text-base leading-relaxed text-sand/70">
              From winning{" "}
              <span className="text-coral">DeerHacks V</span> to placing
              in the top 2 at{" "}
              <span className="text-coral">GenAI Genesis</span>, I love
              pushing boundaries at hackathons and turning ambitious ideas into
              working products under pressure.
            </p>
            <p className="mt-4 text-base leading-relaxed text-sand/70">
              Currently an AI/ML Engineer Intern at{" "}
              <span className="text-teal">Paideia Mundi</span>, where I
              develop intelligent systems and full-stack applications with modern
              frameworks.
            </p>
          </GlassCard>

          <GlassCard delay={0.15}>
            <h3 className="mb-4 font-display text-lg font-semibold text-sand">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill.name}
                  className={`rounded-full border px-3 py-1 font-mono text-xs ${
                    SKILL_COLORS[skill.category] ?? "border-sand/20 text-sand/50"
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.02 * i }}
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                { label: "Hackathons Won", value: "3+" },
                { label: "Projects Shipped", value: "10+" },
                { label: "Languages", value: "5" },
                { label: "Coffees", value: "Infinite" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                >
                  <div className="font-display text-2xl font-bold text-coral">
                    {stat.value}
                  </div>
                  <div className="font-mono text-xs text-sand/40">
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
