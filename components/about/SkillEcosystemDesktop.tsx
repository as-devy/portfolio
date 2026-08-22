"use client";

import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
} from "react";
import { motion, useInView } from "motion/react";
import { SkillChip } from "@/components/about/SkillChip";
import { skillCategories, skills, stackJourney } from "@/data/skills";
import { cn } from "@/lib/utils";
import type { SkillCategory, SkillNode } from "@/types";

const ease = [0.22, 1, 0.36, 1] as const;

const CardRevealContext = createContext(false);

const chipVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
} as const;

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.08,
    },
  },
} as const;

const categoryTone: Record<
  SkillCategory,
  { bar: string; text: string; soft: string; ring: string }
> = {
  design: {
    bar: "from-violet-400/70 to-transparent",
    text: "text-violet-300",
    soft: "bg-violet-400/[0.06]",
    ring: "border-violet-400/25",
  },
  frontend: {
    bar: "from-cyan-400/70 to-transparent",
    text: "text-cyan-300",
    soft: "bg-cyan-400/[0.06]",
    ring: "border-cyan-400/25",
  },
  backend: {
    bar: "from-sky-400/70 to-transparent",
    text: "text-sky-300",
    soft: "bg-sky-400/[0.06]",
    ring: "border-sky-400/25",
  },
  data: {
    bar: "from-teal-400/70 to-transparent",
    text: "text-teal-300",
    soft: "bg-teal-400/[0.06]",
    ring: "border-teal-400/25",
  },
  security: {
    bar: "from-rose-300/60 to-transparent",
    text: "text-rose-300",
    soft: "bg-rose-400/[0.05]",
    ring: "border-rose-300/25",
  },
  ai: {
    bar: "from-amber-300/70 to-transparent",
    text: "text-amber-200",
    soft: "bg-amber-400/[0.06]",
    ring: "border-amber-300/25",
  },
  devops: {
    bar: "from-emerald-400/70 to-transparent",
    text: "text-emerald-300",
    soft: "bg-emerald-400/[0.05]",
    ring: "border-emerald-400/25",
  },
};

interface SkillEcosystemDesktopProps {
  reduceMotion: boolean;
}

export function SkillEcosystemDesktop({
  reduceMotion,
}: SkillEcosystemDesktopProps) {
  const byCategory = (id: SkillCategory) =>
    skills.filter((skill) => skill.category === id);

  const design = skillCategories.find((c) => c.id === "design")!;
  const frontend = skillCategories.find((c) => c.id === "frontend")!;
  const backend = skillCategories.find((c) => c.id === "backend")!;
  const data = skillCategories.find((c) => c.id === "data")!;
  const security = skillCategories.find((c) => c.id === "security")!;
  const devops = skillCategories.find((c) => c.id === "devops")!;
  const ai = skillCategories.find((c) => c.id === "ai")!;

  return (
    <div className="hidden lg:block">
      <ol className="mb-7 flex items-center justify-between gap-1 rounded-2xl border border-white/8 bg-white/[0.02] px-3 py-3">
        {stackJourney.map((step, index) => (
          <motion.li
            key={step.id}
            className="flex flex-1 items-center gap-1"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6, margin: "0px 0px -6% 0px" }}
            transition={{
              duration: 0.45,
              delay: index * 0.05,
              ease,
            }}
          >
            <div className="flex w-full flex-col items-center rounded-xl px-1.5 py-1.5 text-center">
              <span className="font-mono text-[0.58rem] tracking-[0.14em] text-subtle uppercase">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mt-0.5 text-[0.7rem] font-medium text-muted md:text-xs">
                {step.label}
              </span>
            </div>
            {index < stackJourney.length - 1 ? (
              <span
                aria-hidden
                className="h-px w-2 shrink-0 bg-white/15 md:w-3"
              />
            ) : null}
          </motion.li>
        ))}
      </ol>

      <div className="flex flex-col gap-4">
        <CategoryCard
          category={design}
          items={byCategory("design")}
          reduceMotion={reduceMotion}
          delay={0}
        >
          <SkillGrid items={byCategory("design")} columns={3} />
        </CategoryCard>

        <div className="grid grid-cols-12 items-stretch gap-4">
          <CategoryCard
            category={frontend}
            items={byCategory("frontend")}
            className="col-span-7"
            reduceMotion={reduceMotion}
            delay={0}
            fill
          >
            <div className="flex h-full flex-col justify-between gap-3">
              <div>
                <GroupLabel index={1} label="Languages" showDown />
                <SkillGrid
                  items={byCategory("frontend").filter(
                    (s) => s.group === "languages",
                  )}
                  columns={2}
                />
              </div>
              <div>
                <GroupLabel index={2} label="Libraries" showDown />
                <SkillGrid
                  items={byCategory("frontend").filter(
                    (s) => s.group === "libraries",
                  )}
                  columns={2}
                />
              </div>
              <div>
                <GroupLabel index={3} label="Frameworks" showDown />
                <SkillGrid
                  items={byCategory("frontend").filter(
                    (s) => s.group === "frameworks",
                  )}
                  columns={2}
                />
              </div>
              <div>
                <GroupLabel index={4} label="Quality" />
                <SkillGrid
                  items={byCategory("frontend").filter(
                    (s) => s.group === "quality",
                  )}
                  columns={2}
                />
              </div>
            </div>
          </CategoryCard>

          <CategoryCard
            category={backend}
            items={byCategory("backend")}
            className="col-span-5"
            reduceMotion={reduceMotion}
            delay={0.14}
            fill
          >
            <SkillStack items={byCategory("backend")} fill />
          </CategoryCard>
        </div>

        <div className="grid grid-cols-3 items-stretch gap-4">
          <CategoryCard
            category={data}
            items={byCategory("data")}
            reduceMotion={reduceMotion}
            delay={0}
            fill
          >
            <SkillStack items={byCategory("data")} fill />
          </CategoryCard>

          <CategoryCard
            category={security}
            items={byCategory("security")}
            reduceMotion={reduceMotion}
            delay={0.12}
            fill
          >
            <SkillStack items={byCategory("security")} fill />
          </CategoryCard>

          <CategoryCard
            category={devops}
            items={byCategory("devops")}
            reduceMotion={reduceMotion}
            delay={0.24}
            fill
          >
            <SkillStack items={byCategory("devops")} fill />
          </CategoryCard>
        </div>

        <CategoryCard
          category={ai}
          items={byCategory("ai")}
          reduceMotion={reduceMotion}
          delay={0}
        >
          <SkillGrid items={byCategory("ai")} columns={3} />
        </CategoryCard>
      </div>
    </div>
  );
}

function CategoryCard({
  category,
  items,
  children,
  className,
  reduceMotion,
  delay = 0,
  fill = false,
}: {
  category: { id: SkillCategory; label: string; blurb: string };
  items: SkillNode[];
  children: ReactNode;
  className?: string;
  reduceMotion: boolean;
  delay?: number;
  fill?: boolean;
}) {
  const tone = categoryTone[category.id];
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.18,
    margin: "0px 0px -12% 0px",
  });
  const show = reduceMotion || inView;

  return (
    <motion.section
      ref={ref}
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: 36, scale: 0.975, filter: "blur(10px)" }
      }
      animate={
        show
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : undefined
      }
      transition={{
        duration: 0.7,
        delay,
        ease,
      }}
      className={cn(
        "overflow-hidden rounded-2xl border border-white/8 p-4",
        fill && "flex h-full min-h-0 flex-col",
        tone.soft,
        className,
      )}
    >
      <div className="mb-3 shrink-0">
        <div className="flex min-h-[1.75rem] items-center justify-between gap-2">
          <h4 className={cn("font-display text-lg tracking-tight", tone.text)}>
            {category.label}
          </h4>
          <span className="font-mono text-[0.62rem] text-subtle">
            {String(items.length).padStart(2, "0")}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 min-h-[2.5rem] text-xs leading-relaxed text-muted">
          {category.blurb}
        </p>
        <div
          aria-hidden
          className={cn("mt-3 h-px bg-gradient-to-r", tone.bar)}
        />
      </div>
      <CardRevealContext.Provider value={show}>
        <div className={cn(fill && "flex min-h-0 flex-1 flex-col")}>
          {children}
        </div>
      </CardRevealContext.Provider>
    </motion.section>
  );
}

function GroupLabel({
  index,
  label,
  showDown = false,
}: {
  index: number;
  label: string;
  showDown?: boolean;
}) {
  return (
    <div className="mb-1.5 flex items-center gap-2">
      <span className="font-mono text-[0.58rem] tracking-[0.16em] text-cyan-300/80 uppercase">
        {String(index).padStart(2, "0")} · {label}
      </span>
      <span
        aria-hidden
        className="h-px flex-1 bg-gradient-to-r from-cyan-400/25 to-transparent"
      />
      {showDown ? (
        <span aria-hidden className="font-mono text-[0.58rem] text-cyan-400/45">
          ↓
        </span>
      ) : null}
    </div>
  );
}

function SkillStack({
  items,
  fill = false,
}: {
  items: SkillNode[];
  fill?: boolean;
}) {
  const show = useContext(CardRevealContext);

  return (
    <motion.ul
      className={cn("flex flex-col gap-2", fill && "h-full flex-1")}
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      variants={listVariants}
    >
      {items.map((skill) => (
        <SkillRow key={skill.id} skill={skill} fill={fill} />
      ))}
    </motion.ul>
  );
}

function SkillGrid({
  items,
  columns,
}: {
  items: SkillNode[];
  columns: 2 | 3 | 4 | 5;
}) {
  const show = useContext(CardRevealContext);

  return (
    <motion.ul
      className={cn(
        "grid gap-2",
        columns === 2 && "grid-cols-2",
        columns === 3 && "grid-cols-3",
        columns === 4 && "grid-cols-4",
        columns === 5 && "grid-cols-5",
      )}
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      variants={listVariants}
    >
      {items.map((skill) => (
        <SkillRow key={skill.id} skill={skill} />
      ))}
    </motion.ul>
  );
}

function SkillRow({
  skill,
  fill = false,
}: {
  skill: SkillNode;
  fill?: boolean;
}) {
  return (
    <motion.li
      variants={chipVariants}
      transition={{ duration: 0.45, ease }}
      className={cn(fill && "flex min-h-0 flex-1")}
    >
      <SkillChip
        skill={skill}
        compact
        className={cn(fill && "h-full min-h-[3rem]")}
      />
    </motion.li>
  );
}
