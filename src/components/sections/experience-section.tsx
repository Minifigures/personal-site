"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { experiences } from "@/data/experience";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="flex min-h-screen items-center px-4 py-24 sm:px-8"
    >
      <div className="mx-auto w-full max-w-4xl">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-coral/70">
            02 / Experience
          </span>
          <h2
            className="mt-2 font-display text-3xl font-bold text-sand sm:text-5xl"
            style={{
              WebkitTextStroke: "1px #312E81",
              paintOrder: "stroke fill",
            }}
          >
            Where I Have Worked
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-coral/40 via-teal/30 to-transparent md:left-1/2" />

          {experiences.map((exp, i) => (
            <div
              key={exp.id}
              className={`relative mb-12 flex flex-col md:flex-row ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 top-8 z-10 md:left-1/2 md:-translate-x-1/2">
                <motion.div
                  className="h-3 w-3 rounded-full border-2 border-coral bg-navy"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                />
              </div>

              {/* Card */}
              <div
                className={`ml-12 w-full md:ml-0 md:w-[calc(50%-2rem)] ${
                  i % 2 === 0 ? "md:pr-8" : "md:pl-8"
                }`}
              >
                <GlassCard delay={0.1 * i}>
                  <div className="mb-2 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(232,115,90,0.2), rgba(42,157,143,0.2))",
                      }}
                    >
                      <span className="font-display text-sm font-bold text-coral">
                        {exp.company.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3
                        className="font-display text-lg font-semibold text-sand"
                        style={{
                          WebkitTextStroke: "0.5px #312E81",
                          paintOrder: "stroke fill",
                        }}
                      >
                        {exp.role}
                      </h3>
                      <p className="font-mono text-xs text-teal">
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  <p className="mb-3 font-mono text-xs text-sand/40">
                    {exp.startDate} - {exp.endDate}
                    <span className="ml-2 rounded-full bg-sand/5 px-2 py-0.5 text-sand/30">
                      {exp.workMode}
                    </span>
                  </p>

                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, j) => (
                      <li
                        key={j}
                        className="flex gap-2 text-sm text-sand/60"
                      >
                        <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-coral/50" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
