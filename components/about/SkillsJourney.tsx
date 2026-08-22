"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { SkillIcon } from "@/components/about/SkillIcon";
import { frontendGroups, skillCategories } from "@/data/skills";
import { cn } from "@/lib/utils";
import type { SkillCategory, SkillGroup, SkillNode } from "@/types";

const accents: Record<
  SkillCategory,
  { hex: string; rgb: string; text: string }
> = {
  design: { hex: "#a78bfa", rgb: "167,139,250", text: "text-violet-300" },
  frontend: { hex: "#22d3ee", rgb: "34,211,238", text: "text-cyan-300" },
  backend: { hex: "#38bdf8", rgb: "56,189,248", text: "text-sky-300" },
  data: { hex: "#2dd4bf", rgb: "45,212,191", text: "text-teal-300" },
  security: { hex: "#fb7185", rgb: "251,113,133", text: "text-rose-300" },
  devops: { hex: "#34d399", rgb: "52,211,153", text: "text-emerald-300" },
  ai: { hex: "#fcd34d", rgb: "252,211,77", text: "text-amber-200" },
};

const FRONTEND_GROUPS: SkillGroup[] = ["languages", "libraries", "frameworks"];

const VIEWPORT_GROUPS: Array<{
  id: string;
  eyebrow: string;
  short: string;
  categories: SkillCategory[];
}> = [
  {
    id: "surface",
    eyebrow: "Interface layer",
    short: "Interface",
    categories: ["design", "frontend"],
  },
  {
    id: "systems",
    eyebrow: "System layer",
    short: "Systems",
    categories: ["backend", "data"],
  },
  {
    id: "delivery",
    eyebrow: "Delivery layer",
    short: "Delivery",
    categories: ["security", "devops"],
  },
  {
    id: "intelligence",
    eyebrow: "Intelligence layer",
    short: "AI",
    categories: ["ai"],
  },
];

/** Height in vh added per slide to create the scroll runway. */
const SLIDE_VH = 120;
const EASE = [0.22, 1, 0.36, 1] as const;

interface CategoryBlock {
  id: SkillCategory;
  label: string;
  blurb: string;
  skills: SkillNode[];
}

interface Viewport {
  id: string;
  eyebrow: string;
  short: string;
  categories: CategoryBlock[];
}

function useViewports(skills: SkillNode[]): Viewport[] {
  return useMemo(
    () =>
      VIEWPORT_GROUPS.map((group) => {
        const categories = group.categories
          .map((id) => {
            const meta = skillCategories.find((c) => c.id === id);
            if (!meta) return null;
            const items = skills.filter((s) => s.category === id);
            if (items.length === 0) return null;
            return {
              id,
              label: meta.label,
              blurb: meta.blurb,
              skills: items,
            };
          })
          .filter((category): category is CategoryBlock => category !== null);

        if (categories.length === 0) return null;

        return {
          id: group.id,
          eyebrow: group.eyebrow,
          short: group.short,
          categories,
        };
      }).filter((viewport): viewport is Viewport => viewport !== null),
    [skills],
  );
}

function easeOutQuint(t: number) {
  return 1 - (1 - t) ** 5;
}

/** Butter-smooth document scroll for controller jumps only. */
function smoothScrollTo(targetY: number, duration = 900) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 1) return;

  const html = document.documentElement;
  const prev = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  const start = performance.now();

  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo(0, startY + distance * easeOutQuint(t));
    if (t < 1) requestAnimationFrame(tick);
    else html.style.scrollBehavior = prev;
  };
  requestAnimationFrame(tick);
}

function SkillPills({
  items,
  accent,
  active,
  orderOffset = 0,
}: {
  items: SkillNode[];
  accent: (typeof accents)[SkillCategory];
  active: boolean;
  orderOffset?: number;
}) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((skill, i) => {
        const order = orderOffset + i;
        return (
          <motion.li
            key={skill.id}
            className="journey-pill"
            style={{
              borderColor: `rgba(${accent.rgb},0.32)`,
              boxShadow: `0 6px 20px rgba(0,0,0,0.25), 0 0 0 1px rgba(${accent.rgb},0.06)`,
            }}
            initial={false}
            animate={
              active
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0.22, y: 12, scale: 0.96 }
            }
            transition={{
              duration: 0.5,
              delay: active ? 0.12 + order * 0.05 : 0,
              ease: EASE,
            }}
          >
            <span
              className="journey-pill-icon"
              style={{
                background: `rgba(${accent.rgb},0.14)`,
                borderColor: `rgba(${accent.rgb},0.28)`,
              }}
            >
              <SkillIcon
                name={skill.icon}
                className={cn("h-4 w-4", accent.text)}
              />
            </span>
            <span className="journey-pill-label">{skill.label}</span>
          </motion.li>
        );
      })}
    </ul>
  );
}

function CategoryPanel({
  category,
  slot,
  solo = false,
  active,
  panelDelay = 0,
}: {
  category: CategoryBlock;
  slot: number;
  solo?: boolean;
  active: boolean;
  panelDelay?: number;
}) {
  const accent = accents[category.id];
  const isFrontend = category.id === "frontend";

  const frontendGroupMeta = useMemo(
    () =>
      frontendGroups.filter((g) => FRONTEND_GROUPS.includes(g.id as SkillGroup)),
    [],
  );

  const frontendSections = useMemo(() => {
    const sections = frontendGroupMeta
      .map((group) => ({
        group,
        skills: category.skills.filter((s) => s.group === group.id),
      }))
      .filter((section) => section.skills.length > 0);

    return sections.map((section, index) => ({
      ...section,
      orderOffset: sections
        .slice(0, index)
        .reduce((sum, item) => sum + item.skills.length, 0),
    }));
  }, [category.skills, frontendGroupMeta]);

  return (
    <motion.div
      className={cn("min-w-0", solo && "max-w-2xl")}
      initial={false}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0.35, y: 10 }}
      transition={{
        duration: 0.5,
        delay: active ? panelDelay : 0,
        ease: EASE,
      }}
    >
      <p className="font-mono text-[0.65rem] tracking-[0.2em] text-subtle uppercase">
        {String(slot).padStart(2, "0")}
      </p>
      <h3
        className="font-display mt-2 text-[clamp(2rem,5vw,3.25rem)] leading-[0.95] tracking-[-0.045em]"
        style={{
          color: accent.hex,
          textShadow: `0 0 48px rgba(${accent.rgb},0.22)`,
        }}
      >
        {category.label}
      </h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
        {category.blurb}
      </p>

      {isFrontend ? (
        <div className="mt-6 space-y-5">
          {frontendSections.map(({ group, skills: groupSkills, orderOffset }) => (
              <motion.div
                key={group.id}
                initial={false}
                animate={
                  active ? { opacity: 1, y: 0 } : { opacity: 0.25, y: 8 }
                }
                transition={{
                  duration: 0.45,
                  delay: active ? 0.08 + orderOffset * 0.05 : 0,
                  ease: EASE,
                }}
              >
                <p
                  className="mb-2.5 font-mono text-[0.62rem] tracking-[0.18em] uppercase"
                  style={{ color: accent.hex }}
                >
                  {group.label}
                </p>
                <SkillPills
                  items={groupSkills}
                  accent={accent}
                  active={active}
                  orderOffset={orderOffset}
                />
              </motion.div>
            ))}
        </div>
      ) : (
        <div className="mt-6">
          <SkillPills
            items={category.skills}
            accent={accent}
            active={active}
            orderOffset={0}
          />
        </div>
      )}
    </motion.div>
  );
}

function ViewportSlide({
  viewport,
  index,
  total,
  active,
  slideProgress,
}: {
  viewport: Viewport;
  index: number;
  total: number;
  active: boolean;
  /** Smoothed 0 → count-1 motion value (no React re-renders). */
  slideProgress: MotionValue<number>;
}) {
  const solo = viewport.categories.length === 1;

  const opacity = useTransform(slideProgress, (p) => {
    const abs = Math.abs(p - index);
    return Math.max(0, 1 - abs * 0.82);
  });

  const y = useTransform(slideProgress, (p) => (p - index) * 30);

  const scale = useTransform(slideProgress, (p) => {
    const abs = Math.abs(p - index);
    return 1 - Math.min(0.028, abs * 0.016);
  });

  return (
    <section
      className="relative flex h-[100svh] w-full shrink-0 items-center justify-center"
      aria-hidden={!active}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.2) 1px, transparent 0)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse 70% 55% at 50% 48%, black, transparent)",
        }}
      />

      <motion.div
        className="relative z-[1] w-full max-w-[1080px] px-5 md:px-10 lg:px-12"
        style={{
          opacity,
          y,
          scale,
          willChange: "transform, opacity",
        }}
      >
        <div className="mb-8 flex items-end justify-between gap-4 md:mb-10">
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.22em] text-muted uppercase">
              02 — Stack journey
            </p>
            <p className="mt-2 font-display text-lg tracking-tight text-foreground/90 md:text-xl">
              {viewport.eyebrow}
            </p>
          </div>
          <p className="font-mono text-[0.65rem] tracking-[0.16em] text-subtle uppercase">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </p>
        </div>

        <div
          className={cn(
            "grid gap-10 md:gap-14",
            solo ? "grid-cols-1" : "md:grid-cols-2",
          )}
        >
          {viewport.categories.map((category, i) => (
            <CategoryPanel
              key={category.id}
              category={category}
              slot={i + 1}
              solo={solo}
              active={active}
              panelDelay={i * 0.08}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function JourneyController({
  viewports,
  active,
  progress,
  visible,
  onSelect,
}: {
  viewports: Viewport[];
  active: number;
  progress: MotionValue<number>;
  visible: boolean;
  onSelect: (index: number) => void;
}) {
  const scaleX = useTransform(progress, (v) => Math.max(0.08, Math.min(1, v)));

  return (
    <nav
      aria-label="Skill journey controller"
      className={cn(
        "journey-controller fixed left-3 top-1/2 z-40 hidden w-[8.5rem] -translate-y-1/2 flex-col gap-1 transition-all duration-300 lg:left-5 lg:flex",
        visible
          ? "pointer-events-auto translate-x-0 opacity-100"
          : "pointer-events-none -translate-x-3 opacity-0",
      )}
    >
      <p className="mb-1 px-2 font-mono text-[0.58rem] tracking-[0.16em] text-subtle uppercase">
        Journey
      </p>

      <motion.div
        aria-hidden
        className="journey-progress mb-2 ml-2 h-px w-[calc(100%-1rem)] origin-left"
        style={{ scaleX }}
      />

      {viewports.map((viewport, index) => {
        const isActive = index === active;
        const accent = accents[viewport.categories[0]?.id ?? "frontend"];
        const labels = viewport.categories.map((c) => c.label).join(" · ");

        return (
          <button
            key={viewport.id}
            type="button"
            onClick={() => onSelect(index)}
            aria-current={isActive ? "true" : undefined}
            aria-label={`Go to ${viewport.eyebrow}`}
            className={cn(
              "group flex w-full flex-col items-start rounded-xl border px-2.5 py-2 text-left transition-all duration-300",
              isActive
                ? "border-white/15 bg-white/[0.07] shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
                : "border-transparent hover:border-white/10 hover:bg-white/[0.03]",
            )}
          >
            <span className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full transition-transform duration-300"
                style={{
                  background: isActive ? accent.hex : "rgba(255,255,255,0.25)",
                  boxShadow: isActive ? `0 0 10px ${accent.hex}` : "none",
                  transform: isActive ? "scale(1.3)" : "scale(1)",
                }}
              />
              <span
                className={cn(
                  "font-mono text-[0.62rem] tracking-[0.12em] uppercase transition-colors",
                  isActive ? "text-foreground" : "text-subtle",
                )}
                style={isActive ? { color: accent.hex } : undefined}
              >
                {String(index + 1).padStart(2, "0")} {viewport.short}
              </span>
            </span>
            <span className="mt-1 pl-3.5 text-[0.62rem] leading-snug text-subtle">
              {labels}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

function AmbientGlow({
  viewports,
  active,
}: {
  viewports: Viewport[];
  active: number;
}) {
  const accent = accents[viewports[active]?.categories[0]?.id ?? "frontend"];

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      animate={{
        background: `radial-gradient(ellipse 55% 40% at 50% 42%, rgba(${accent.rgb},0.12), transparent 72%)`,
      }}
      transition={{ duration: 0.9, ease: EASE }}
    />
  );
}

export function SkillsJourney({ skills }: { skills: SkillNode[] }) {
  const reduceMotion = useReducedMotion();
  const viewports = useViewports(skills);
  const count = viewports.length;
  const rootRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end end"],
  });

  const rawProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, Math.max(count - 1, 0)],
  );

  const slideProgress = useSpring(rawProgress, {
    stiffness: 300,
    damping: 40,
    mass: 1,
    restDelta: 0.001,
  });

  const trackY = useTransform(
    slideProgress,
    [0, Math.max(count - 1, 1)],
    ["0%", `${-((count - 1) / Math.max(count, 1)) * 100}%`],
  );

  const barProgress = useTransform(slideProgress, (v) =>
    count <= 1 ? 1 : (v + 1) / count,
  );

  useMotionValueEvent(slideProgress, "change", (value) => {
    setActive(Math.round(value));
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.1 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const root = rootRef.current;
      if (!root) return;
      const next = Math.max(0, Math.min(count - 1, index));
      const sectionTop = root.getBoundingClientRect().top + window.scrollY;
      const travel = Math.max(count - 1, 0) * (window.innerHeight * (SLIDE_VH / 100));
      const target = sectionTop + (next / Math.max(count - 1, 1)) * travel;
      smoothScrollTo(target, 920);
    },
    [count],
  );

  if (count === 0) return null;

  if (reduceMotion) {
    return (
      <section className="skills-journey relative py-16" aria-label="Skill journey">
        <div className="mx-auto w-full max-w-[1080px] space-y-16 px-5 md:px-10">
          {viewports.map((viewport, index) => (
            <div key={viewport.id}>
              <p className="font-mono text-[0.65rem] text-muted uppercase">
                {String(index + 1).padStart(2, "0")} — {viewport.eyebrow}
              </p>
              <div
                className={cn(
                  "mt-6 grid gap-10",
                  viewport.categories.length > 1 && "md:grid-cols-2 md:gap-14",
                )}
              >
                {viewport.categories.map((category, i) => (
                  <CategoryPanel
                    key={category.id}
                    category={category}
                    slot={i + 1}
                    solo={viewport.categories.length === 1}
                    active
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={rootRef}
      id="skills-journey-root"
      className="skills-journey relative"
      style={{ height: `calc(100svh + ${Math.max(count - 1, 0) * SLIDE_VH}vh)` }}
      aria-label="Skill journey"
    >
      <div className="sr-only">
        {viewports.map((viewport) => (
          <div key={viewport.id}>
            <h3>{viewport.eyebrow}</h3>
            {viewport.categories.map((category) => (
              <div key={category.id}>
                <h4>
                  {category.label}: {category.blurb}
                </h4>
                <ul>
                  {category.skills.map((skill) => (
                    <li key={skill.id}>{skill.label}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>

      <JourneyController
        viewports={viewports}
        active={active}
        progress={barProgress}
        visible={visible}
        onSelect={goTo}
      />

      <div className="sticky top-0 h-[100svh] overflow-hidden [transform:translateZ(0)]">
        <AmbientGlow viewports={viewports} active={active} />
        <motion.div
          className="flex w-full flex-col will-change-transform"
          style={{ y: trackY }}
        >
          {viewports.map((viewport, index) => (
            <ViewportSlide
              key={viewport.id}
              viewport={viewport}
              index={index}
              total={count}
              active={index === active}
              slideProgress={slideProgress}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
