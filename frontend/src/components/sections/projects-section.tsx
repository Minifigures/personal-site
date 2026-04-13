"use client";

import Image from "next/image";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/ui/section-header";
import { projects } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="flex min-h-screen items-center px-4 py-24 sm:px-8"
    >
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeader number="03" label="Projects" title="What I Have Built" />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <GlassCard
              key={project.id}
              delay={0.08 * i}
              className="group interactive relative flex flex-col overflow-hidden !p-0 transition-all duration-300 hover:border-coral/30"
            >
              {project.image && (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy/40">
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    priority={i < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                  {project.featured && (
                    <span className="absolute top-3 right-3 rounded-full bg-coral/90 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-sand backdrop-blur">
                      Featured
                    </span>
                  )}
                </div>
              )}

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-bold text-sand">
                    {project.title}
                  </h3>
                  {!project.image && project.featured && (
                    <span className="rounded-full bg-coral/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-coral">
                      Featured
                    </span>
                  )}
                </div>

                {project.award && (
                  <p className="mt-1 font-mono text-xs text-amber">
                    {project.award}
                  </p>
                )}

                {project.role && (
                  <p className="mt-2 text-xs italic text-sand/50">
                    {project.role}
                  </p>
                )}

                <p className="mt-3 text-sm leading-relaxed text-sand/70">
                  {project.description}
                </p>

                {project.outcomes && (
                  <div className="mt-3 border-l-2 border-teal/40 pl-3">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-teal/80">
                      Impact
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-sand/70">
                      {project.outcomes}
                    </p>
                  </div>
                )}

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-sand/5 px-2 py-0.5 font-mono text-[10px] text-sand/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex gap-4 border-t border-sand/5 pt-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="interactive font-mono text-xs text-sand/50 transition-colors hover:text-coral"
                    >
                      GitHub ↗
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="interactive font-mono text-xs text-sand/50 transition-colors hover:text-teal"
                    >
                      Live ↗
                    </a>
                  )}
                  {project.devpost && (
                    <a
                      href={project.devpost}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="interactive font-mono text-xs text-sand/50 transition-colors hover:text-amber"
                    >
                      Devpost ↗
                    </a>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
