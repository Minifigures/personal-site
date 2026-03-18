"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="flex min-h-screen items-center px-4 py-24 sm:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-coral/70">
            03 / Projects
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold text-sand sm:text-5xl">
            What I Have Built
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <GlassCard
              key={project.id}
              delay={0.1 * i}
              className="group interactive relative overflow-hidden transition-all duration-300 hover:border-coral/30"
            >
              {/* Featured badge */}
              {project.featured && (
                <div className="absolute top-4 right-4">
                  <span className="rounded-full bg-coral/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-coral">
                    Featured
                  </span>
                </div>
              )}

              {/* Project icon */}
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(232,115,90,0.15), rgba(42,157,143,0.15))",
                }}
              >
                <span className="font-display text-lg font-bold text-coral">
                  {project.title.charAt(0)}
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-sand">
                {project.title}
              </h3>

              {project.award && (
                <p className="mt-1 font-mono text-xs text-amber">
                  {project.award}
                </p>
              )}

              <p className="mt-3 text-sm leading-relaxed text-sand/60">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-sand/5 px-2 py-0.5 font-mono text-[10px] text-sand/40"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="mt-5 flex gap-3 border-t border-sand/5 pt-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive font-mono text-xs text-sand/40 transition-colors hover:text-coral"
                  >
                    GitHub ↗
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive font-mono text-xs text-sand/40 transition-colors hover:text-teal"
                  >
                    Live ↗
                  </a>
                )}
                {project.devpost && (
                  <a
                    href={project.devpost}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive font-mono text-xs text-sand/40 transition-colors hover:text-amber"
                  >
                    Devpost ↗
                  </a>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
