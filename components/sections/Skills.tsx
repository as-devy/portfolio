"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { SkillIcon } from "@/components/about/SkillIcon";
import { skillCategories, stackJourney } from "@/data/skills";
import type { SkillNode } from "@/types";
import { cn } from "@/lib/utils";

export function Skills({ skills }: { skills: SkillNode[] }) {
  const layers = stackJourney
    .map((layer) => ({
      ...layer,
      blurb: skillCategories.find((c) => c.id === layer.id)?.blurb ?? "",
      items: skills.filter((s) => s.layer === layer.id),
    }))
    .filter((l) => l.items.length > 0);
  const n = layers.length;
  const ref = useRef<HTMLElement>(null);
  const reduce = Boolean(useReducedMotion());
  const [idx, setIdx] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setIdx(Math.max(0, Math.min(n - 1, Math.floor(p * n * 0.999))));
  });

  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((i + 0.5) / n) * span, behavior: reduce ? "auto" : "smooth" });
  };

  const layer = layers[idx];

  if (reduce) {
    return (
      <section id="skills" className="dark-grid relative px-5 py-24 md:px-14">
        <div className="mx-auto max-w-[1240px]">
          <p className="mono-label text-muted">02 / Toolkit</p>
          {layers.map((l, i) => (
            <div key={l.id} className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
              <div>
                <p className="serif text-[clamp(2.6rem,7vw,4.6rem)] italic leading-none">
                  <span className="mono-label mr-3 align-middle not-italic text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {l.label}
                </p>
                <p className="mt-3 max-w-md text-sm text-muted">{l.blurb}</p>
              </div>
              <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 sm:grid-cols-3">
                {l.items.map((s) => (
                  <li key={s.id} className="flex flex-col justify-between gap-5 bg-[#070b14] p-4">
                    <SkillIcon name={s.icon} className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{s.label}</p>
                      <p className="mono-label !text-[0.58rem] text-subtle">{s.role}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="skills"
      ref={ref}
      className="dark-grid relative"
      style={{ height: `calc(${n} * 62vh + 100vh)` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden px-5 pb-24 pt-20 md:px-14 lg:pb-10">
        <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between">
          <p className="mono-label text-muted">02 / Toolkit</p>
          <p className="mono-label text-muted">
            <span className="text-accent">{String(idx + 1).padStart(2, "0")}</span> / {String(n).padStart(2, "0")}
          </p>
        </div>

        <div className="mx-auto mt-5 grid w-full max-w-[1240px] flex-1 content-center gap-6 lg:mt-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          <ul className="hidden lg:block">
            {layers.map((l, i) => (
              <li key={l.id}>
                <button
                  type="button"
                  onClick={() => jump(i)}
                  aria-current={idx === i ? "true" : undefined}
                  className={cn(
                    "serif flex w-full items-baseline gap-4 py-1 text-left text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[1.02] transition-all duration-500",
                    idx === i ? "translate-x-3 text-foreground italic" : "text-foreground/40 hover:text-foreground/75",
                  )}
                >
                  <span className="mono-label !text-[0.62rem] not-italic text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="lg:hidden">
            <p className="serif text-[clamp(3rem,15vw,4.5rem)] italic leading-none">{layer.label}</p>
            <div className="mt-4 flex gap-1.5" aria-hidden>
              {layers.map((l, i) => (
                <span key={l.id} className={cn("h-[3px] flex-1 rounded-full", i <= idx ? "bg-accent" : "bg-white/10")} />
              ))}
            </div>
          </div>

          <div className="relative min-h-[20rem] self-center">
              <motion.div
                key={layer.id}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <p data-layer={layer.id} className="max-w-md text-sm leading-relaxed text-muted md:text-base">{layer.blurb}</p>
                <ul className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 sm:grid-cols-3">
                  {layer.items.map((s) => (
                    <li key={s.id} className="group flex flex-col justify-between gap-5 bg-[#070b14] p-4 transition-colors hover:bg-[#0c1424] md:min-h-[6.5rem]">
                      <SkillIcon name={s.icon} className="h-5 w-5 text-accent" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{s.label}</p>
                        <p className="mono-label !text-[0.58rem] text-subtle">{s.role}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
