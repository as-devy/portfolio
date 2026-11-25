"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight, FileText } from "lucide-react";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { motion, useReducedMotion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { projects as allProjects } from "@/data/projects";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

function Links({ p }: { p: Project }) {
  const cls = "inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 font-mono text-xs tracking-wide text-foreground transition hover:border-white/60 hover:bg-white/10";
  return (
    <div className="flex flex-wrap gap-3">
      {p.liveUrl ? (
        <a className={cls} href={p.liveUrl} target="_blank" rel="noopener noreferrer">
          Live site <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      ) : null}
      {p.githubUrl ? (
        <a className={cls} href={p.githubUrl} target="_blank" rel="noopener noreferrer">
          <GitHubIcon className="h-3.5 w-3.5" /> Source
        </a>
      ) : null}
      {p.briefUrl ? (
        <a className={cls} href={p.briefUrl} target="_blank" rel="noopener noreferrer">
          <FileText className="h-3.5 w-3.5" /> Project brief
        </a>
      ) : null}
    </div>
  );
}

function ProjectMark({ p, compact = false }: { p: Project; compact?: boolean }) {
  const mark = p.mark;
  if (!mark) return null;
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none select-none rounded-md text-center", compact ? "px-3 py-1.5" : "px-5 py-3")}
      style={{
        border: `2px solid ${p.accent}d9`,
        boxShadow: `inset 0 0 0 1px ${p.accent}59`,
        color: p.accent,
        background: `linear-gradient(rgba(5,7,13,0.88), rgba(5,7,13,0.88)), ${p.accent}14`,
      }}
    >
      <p className={cn("font-mono uppercase opacity-80", compact ? "text-[0.42rem] tracking-[0.34em]" : "text-[0.5rem] tracking-[0.4em]")}>{mark.subTop}</p>
      <p className={cn("font-display mt-1 font-bold leading-none", compact ? "text-[1.05rem] tracking-[0.18em]" : "text-[1.7rem] tracking-[0.22em]")}>{mark.label}</p>
      <p className={cn("font-mono mt-1 uppercase opacity-80", compact ? "text-[0.42rem] tracking-[0.34em]" : "text-[0.5rem] tracking-[0.4em]")}>{mark.subBottom}</p>
    </div>
  );
}

function Shot({ p, sizes }: { p: Project; sizes: string }) {
  return p.image ? (
    <Image src={p.image} alt={`${p.name} screenshot`} fill sizes={sizes} className="object-cover object-top" />
  ) : null;
}

function Panel({ p, i, total }: { p: Project; i: number; total: number }) {
  return (
    <div
      className="relative flex h-full w-full shrink-0 items-center overflow-hidden px-14 pt-24 xl:px-24"
      style={{ background: `radial-gradient(60% 70% at 78% 45%, ${p.accent}2e, transparent 70%), #05070d` }}
    >
      <span aria-hidden className="serif outline-text pointer-events-none absolute -left-6 bottom-[-4rem] text-[32rem] leading-none">
        {p.id}
      </span>
      <div className="relative z-10 grid w-full max-w-[1320px] grid-cols-[0.92fr_1.08fr] items-center gap-20 xl:gap-28">
        <div>
          <p className="mono-label text-muted">
            {p.category} · {p.year} · {String(i + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </p>
          <h3 className="serif mt-5 text-[clamp(3.4rem,6.4vw,6.2rem)] leading-[0.95]">{p.name}</h3>
          <p className="serif mt-3 text-2xl italic" style={{ color: p.accent }}>{p.tagline}</p>
          <p className="mt-6 max-w-lg text-[0.95rem] leading-relaxed text-muted">{p.description}</p>
          <p className="mono-label mt-5 text-subtle">{p.role}</p>
          <ul className="mt-4 flex max-w-lg flex-wrap gap-2">
            {p.technologies.slice(0, 7).map((t) => (
              <li key={t} className="rounded-full border border-white/12 px-2.5 py-1 font-mono text-[0.65rem] text-muted">{t}</li>
            ))}
          </ul>
          <div className="mt-7"><Links p={p} /></div>
        </div>
        <div className="relative" style={{ perspective: 1600 }}>
          <div
            aria-hidden
            className="absolute -inset-6 rounded-3xl opacity-60 blur-3xl"
            style={{ background: `${p.accent}33` }}
          />
          <div className="relative [transform:rotateY(-9deg)_rotateX(3deg)] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]">
            <BrowserFrame url={p.liveUrl || p.githubUrl || p.name} accent={p.accent}>
              <Shot p={p} sizes="55vw" />
            </BrowserFrame>
          </div>
          {p.mark ? (
            <div className="absolute -top-9 -right-4 z-20" style={{ transform: "rotate(7deg)" }}>
              <ProjectMark p={p} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const projects = allProjects.filter((p) => !p.hidden);
  const n = projects.length;
  const ref = useRef<HTMLElement>(null);
  const reduce = Boolean(useReducedMotion());
  const [idx, setIdx] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `${-((n - 1) / n) * 100}%`]);
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setIdx(Math.max(0, Math.min(n - 1, Math.round(v * (n - 1))))),
  );

  return (
    <section id="projects" ref={ref} className="relative">
      {/* Desktop: pinned horizontal film strip */}
      {reduce ? (
        <div className="hidden lg:block">
          <p className="mono-label px-14 pt-24 text-muted xl:px-24">04 / Selected work</p>
          {projects.map((p, i) => (
            <div key={p.id} className="min-h-[100svh] border-t border-white/10">
              <Panel p={p} i={i} total={n} />
            </div>
          ))}
        </div>
      ) : (
      <div className="hidden lg:block" style={{ height: `${n * 100}vh` }}>
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div className="absolute left-14 top-[4.75rem] z-20 flex items-center gap-4 xl:left-24">
            <span className="mono-label text-muted">04 / Selected work</span>
          </div>
          <motion.div className="flex h-full" style={{ x, width: `${n * 100}%` }}>
            {projects.map((p, i) => (
              <div key={p.id} className="h-full" style={{ width: `${100 / n}%` }}>
                <Panel p={p} i={i} total={n} />
              </div>
            ))}
          </motion.div>
          <div className="absolute inset-x-14 bottom-8 z-20 flex items-center gap-6 xl:inset-x-24" aria-hidden>
            {projects.map((p, i) => (
              <div key={p.id} className="flex-1">
                <div className="h-px bg-white/15">
                  <div className={cn("h-px bg-accent transition-all duration-500", i <= idx ? "w-full" : "w-0")} />
                </div>
                <p className={cn("mono-label mt-2 !text-[0.6rem] transition-colors", i === idx ? "text-foreground" : "text-subtle")}>{p.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      )}

      {/* Mobile and tablet: poster stack */}
      <div className="lg:hidden">
        <p className="mono-label px-5 pb-6 pt-20 text-muted">04 / Selected work</p>
        {projects.map((p) => (
          <article key={p.id} className="relative border-t border-white/10 pb-12">
            <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10]">
              <Shot p={p} sizes="100vw" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, #05070d 8%, ${p.accent}22 55%, transparent)` }} />
              <span aria-hidden className="serif outline-text absolute right-4 top-2 text-[7rem] leading-none">{p.id}</span>
              {p.mark ? (
                <div className="absolute left-4 top-4 z-10" style={{ transform: "rotate(-7deg)" }}>
                  <ProjectMark p={p} compact />
                </div>
              ) : null}
              <div className="absolute inset-x-5 bottom-3">
                <p className="mono-label text-muted">{p.category} · {p.year}</p>
                <h3 className="serif mt-2 text-[3.1rem] leading-[0.95]">{p.name}</h3>
              </div>
            </div>
            <div className="px-5">
              <p className="serif text-xl italic" style={{ color: p.accent }}>{p.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{p.description}</p>
              <p className="mono-label mt-4 text-subtle">{p.role}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {p.technologies.slice(0, 6).map((t) => (
                  <li key={t} className="rounded-full border border-white/12 px-2.5 py-1 font-mono text-[0.62rem] text-muted">{t}</li>
                ))}
              </ul>
              <div className="mt-5"><Links p={p} /></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
