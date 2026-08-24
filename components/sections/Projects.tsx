"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  FileText,
  LockKeyhole,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { ProjectCanvas } from "@/components/projects/ProjectCanvas";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

const AUTO_SLIDE_MS = 12000;

export function Projects() {
  const reduceMotion = useReducedMotion();
  const projectsRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasEnteredProjects, setHasEnteredProjects] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isProjectHovered, setIsProjectHovered] = useState(false);

  useEffect(() => {
    const section = projectsRef.current;
    if (!section || reduceMotion || hasEnteredProjects) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredProjects(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [hasEnteredProjects, reduceMotion]);

  const goToIndex = useCallback(
    (index: number) => {
      const total = projects.length;
      const next = ((index % total) + total) % total;
      setDirection(next > activeIndex || (activeIndex === total - 1 && next === 0) ? 1 : -1);
      if (activeIndex === 0 && next === total - 1) setDirection(-1);
      setActiveIndex(next);
    },
    [activeIndex],
  );

  const stepBy = useCallback(
    (delta: -1 | 1) => {
      setDirection(delta);
      setActiveIndex((current) => {
        const total = projects.length;
        return (current + delta + total) % total;
      });
    },
    [],
  );

  useEffect(() => {
    if (
      !hasEnteredProjects ||
      reduceMotion ||
      isProjectHovered ||
      projects.length < 2
    ) return;

    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setDirection(1);
      setActiveIndex((current) => (current + 1) % projects.length);
    }, AUTO_SLIDE_MS);

    return () => window.clearInterval(timer);
  }, [hasEnteredProjects, isProjectHovered, reduceMotion]);

  const project = projects[activeIndex];

  if (!project) return null;

  return (
    <section ref={projectsRef} id="projects" className="relative overflow-hidden">
      <div className="projects-shell">
        <div className="mb-8 flex flex-col gap-6 md:mb-10 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            className="mb-0"
            eyebrow="03 — Selected work"
            title="Web applications I've built."
          />

          <Reveal variant="right" delayMs={160}>
            <div className="flex shrink-0 items-center gap-3">
              <div className="hidden items-center gap-1.5 sm:flex" aria-hidden>
                {projects.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Go to ${item.name}`}
                    onClick={() => goToIndex(index)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      index === activeIndex
                        ? "w-7 bg-accent"
                        : "w-1.5 bg-white/20 hover:bg-white/35",
                    )}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => stepBy(-1)}
                  aria-label="Previous project"
                  className="btn btn-secondary !min-h-11 !rounded-xl !px-3"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => stepBy(1)}
                  aria-label="Next project"
                  className="btn btn-secondary !min-h-11 !rounded-xl !px-3"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal variant="rise" delayMs={120} durationMs={900}>

          <div
            className="relative overflow-hidden"
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") stepBy(1);
              if (event.key === "ArrowLeft") stepBy(-1);
            }}
          >
            <div
              className="relative"
              aria-label="Project case studies slider"
              aria-roledescription="carousel"
            >
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.article
                  key={project.id}
                  custom={direction}
                  variants={{
                    enter: (dir: number) =>
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, x: dir > 0 ? 48 : -48 },
                    center: { opacity: 1, x: 0 },
                    exit: (dir: number) =>
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, x: dir > 0 ? -48 : 48 },
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: reduceMotion ? 0.15 : 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative overflow-hidden rounded-[1.6rem] border border-border bg-[#080c16]/80"
                  onMouseEnter={() => setIsProjectHovered(true)}
                  onMouseLeave={() => setIsProjectHovered(false)}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(ellipse 60% 50% at 80% 0%, ${project.accent}22, transparent 55%)`,
                    }}
                  />

                  {hasEnteredProjects && !reduceMotion ? (
                    <span
                      key={`${project.id}-${activeIndex}-progress`}
                      className="project-auto-progress absolute inset-x-0 top-0 z-20 h-[2px] origin-left bg-gradient-to-r from-accent via-sky-400 to-violet-400"
                      style={{
                        animationDuration: `${AUTO_SLIDE_MS}ms`,
                        animationPlayState: isProjectHovered ? "paused" : "running",
                      }}
                    />
                  ) : null}

                  <div className="relative z-10 grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="flex flex-col justify-between p-6 md:p-8 lg:p-10">
                      <div>
                        <div className="flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.16em] text-muted uppercase">
                          <span style={{ color: project.accent }}>
                            {project.id}
                          </span>
                          <span className="text-subtle">/</span>
                          <span>{project.year}</span>
                          <span className="text-subtle">/</span>
                          <span>{project.category}</span>
                        </div>

                        <h3 className="display-title mt-5 text-[clamp(2rem,4vw,3.2rem)]">
                          {project.name}
                        </h3>
                        <p className="mt-3 text-lg tracking-tight text-foreground/90">
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
                        )
                        }
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
                        Study {activeIndex + 1} of {projects.length}
                      </p>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

            <div className="mt-5 flex justify-center gap-1.5 sm:hidden">
              {projects.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Go to ${item.name}`}
                  onClick={() => goToIndex(index)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    index === activeIndex
                      ? "w-7 bg-accent"
                      : "w-1.5 bg-white/20",
                  )}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div >
    </section >
  );
}
