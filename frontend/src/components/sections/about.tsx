"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/ui/section-header";
import { SkillTag } from "@/components/ui/skill-tag";
import { skills } from "@/data/skills";

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
            <div role="list" className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <SkillTag key={skill.name} skill={skill} index={i} />
              ))}
            </div>

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
