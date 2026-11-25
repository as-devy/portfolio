"use client";

import { useRef } from "react";
import { ExternalLink, FileText, LockKeyhole } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { ProjectCanvas } from "@/components/projects/ProjectCanvas";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

const visibleProjects = projects.filter((project) => !project.hidden);

export function Projects() {
  return (
    <section id="projects" className="relative">
      <div className="projects-shell">
        <SectionHeading
          eyebrow="03 — Selected work"
          title="Web applications I've built."
        />

        <div className="flex flex-col gap-8 md:gap-10 lg:gap-0">
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              total={visibleProjects.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);
  const dimOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 0.45]);

  return (
    <div
      ref={ref}
      className="lg:sticky lg:pb-10"
      style={{ top: `calc(5rem + ${index} * 1.75rem)` }}
    >
      <motion.article
        style={reduceMotion ? undefined : { scale }}
        className="group relative origin-top overflow-hidden rounded-[1.6rem] border border-border bg-[#080c16]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 85% 0%, ${project.accent}22, transparent 55%)`,
          }}
        />
        <motion.div
          aria-hidden
          style={reduceMotion ? undefined : { opacity: dimOpacity }}
          className="pointer-events-none absolute inset-0 z-20 bg-[#05070d]"
        />

        <div className="relative z-10 grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col justify-between p-6 md:p-8 lg:p-10">
            <div>
              <div className="flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.16em] text-muted uppercase">
                <span style={{ color: project.accent }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-subtle">/</span>
                <span>{project.year}</span>
                <span className="text-subtle">/</span>
                <span>{project.category}</span>
              </div>

              <h3 className="display-title mt-5 text-[clamp(2rem,4vw,3.2rem)]">
                {project.name}
              </h3>
              <p className="mt-3 font-serif-accent text-xl italic tracking-tight text-foreground/85">
                {project.tagline}
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                {project.description}
              </p>

              <p className="mt-6 font-mono text-[0.68rem] tracking-wide text-subtle uppercase">
                Role · {project.role}
              </p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-border bg-white/[0.02] px-2.5 py-1 font-mono text-[0.65rem] text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary !min-h-10 !text-sm"
                >
                  Live preview
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : null}
              {project.briefUrl ? (
                <a
                  href={project.briefUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary !min-h-10 !text-sm"
                >
                  <FileText className="h-3.5 w-3.5" />
                  Show MFA Impact Project Brief
                </a>
              ) : project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary !min-h-10 !text-sm"
                >
                  <GitHubIcon className="h-3.5 w-3.5" />
                  Source
                </a>
              ) : project.technologies.includes("WordPress") ? null : (
                <button
                  type="button"
                  disabled
                  className="btn btn-secondary !min-h-10 !cursor-default !text-sm !opacity-50"
                  aria-label={`${project.name} source repository is private`}
                >
                  <GitHubIcon className="h-3.5 w-3.5" />
                  <LockKeyhole className="h-3.5 w-3.5" />
                  Private repo
                </button>
              )}
            </div>
          </div>

          <div
            className={cn(
              "relative",
              project.slug === "mfa-security-testing-lab"
                ? "min-h-[24rem] self-stretch overflow-hidden lg:min-h-0"
                : "p-4 pt-0 lg:p-8 lg:pl-0 lg:pt-8",
            )}
          >
            {project.slug === "mfa-security-testing-lab" ? (
              <ProjectCanvas project={project} />
            ) : (
              <div className="transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-1 group-hover:scale-[1.01]">
                <BrowserFrame
                  url={project.liveUrl}
                  accent={project.accent}
                  contentAspectRatio={project.image ? 1920 / 1080 : undefined}
                >
                  <ProjectCanvas project={project} />
                </BrowserFrame>
              </div>
            )}
            <p className="mt-3 text-right font-mono text-[0.65rem] text-subtle">
              Study {index + 1} of {total}
            </p>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
