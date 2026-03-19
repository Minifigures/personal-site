"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/ui/section-header";
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
        <SectionHeader number="01" label="About" title="Who I Am" />

        <div className="grid gap-8 md:grid-cols-2">
          <GlassCard>
            <p className="text-base leading-relaxed text-sand/70">
              I am a{" "}
              Honours Bachelor of Arts in{" "}
              <span className="text-sand">
                Communication, Culture, Information and Technology (CCIT) and
                Sociology
              </span>{" "}
              student at the University of Toronto Mississauga. I build modern
              web experiences, ship fast, and learn new tools obsessively.
            </p>
            <p className="mt-4 text-base leading-relaxed text-sand/70">
              I am the type of builder who takes an idea from rough concept to
              live and working, then keeps iterating until it feels clean, fast,
              and polished. From winning{" "}
              <span className="text-coral">DeerHacks V</span> to competing at
              GenAI Genesis and Hack the Globe, I love pushing boundaries at
              hackathons and turning ambitious ideas into working products under
              pressure.
            </p>
            <p className="mt-4 text-base leading-relaxed text-sand/70">
              Currently an AI/ML Systems Engineer Intern at{" "}
              <span className="text-teal">
                Paideia Mundi NeuroSystems Institute
              </span>
              , Lead Full-Stack Developer for the{" "}
              <span className="text-teal">UTM Billiards Club</span>, and
              Webmaster Intern at <span className="text-teal">MINOA</span>.
            </p>
            <p className="mt-4 text-base leading-relaxed text-sand/70">
              When I am not building, I am usually at the gym, playing
              billiards, catching sunsets, or listening to music while I work.
            </p>

            {/* Languages */}
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

          <GlassCard delay={0.15}>
            <h3 className="mb-4 font-display text-lg font-semibold text-sand">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <motion.span
                  key={skill.name}
                  className={`rounded-full border px-3 py-1 font-mono text-xs ${
                    SKILL_COLORS[skill.category] ??
                    "border-sand/20 text-sand/50"
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
                { label: "Hackathon Wins", value: "1" },
                { label: "Hackathons", value: "2" },
                { label: "Languages", value: "3" },
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
