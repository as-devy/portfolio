"use client";

import { useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { SkillChip } from "@/components/about/SkillChip";
import {
  frontendGroups,
  skillCategories,
  skills,
  stackJourney,
} from "@/data/skills";
import { cn } from "@/lib/utils";
import type { SkillCategory, SkillNode } from "@/types";

const ease = [0.22, 1, 0.36, 1] as const;

const chipVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.98, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
} as const;

interface SkillEcosystemMobileProps {
  reduceMotion: boolean;
}

export function SkillEcosystemMobile({
  reduceMotion,
}: SkillEcosystemMobileProps) {
  const [openId, setOpenId] = useState<SkillCategory | null>("frontend");

  return (
    <div className="lg:hidden">
      <div className="mb-4 flex gap-1 overflow-x-auto pb-1">
        {stackJourney.map((step, index) => (
          <motion.span
            key={step.id}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4, delay: index * 0.04, ease }}
            className="shrink-0 rounded-full border border-white/8 bg-white/[0.02] px-2.5 py-1 font-mono text-[0.62rem] tracking-wide text-subtle uppercase"
          >
            {step.label}
          </motion.span>
        ))}
      </div>

      <div className="space-y-3">
        {skillCategories.map((category, categoryIndex) => {
          const items = skills.filter(
            (skill) => skill.category === category.id,
          );
          const isOpen = openId === category.id;

          return (
            <MobileCategoryCard
              key={category.id}
              category={category}
              items={items}
              isOpen={isOpen}
              reduceMotion={reduceMotion}
              delay={categoryIndex * 0.06}
              onToggle={() => {
                setOpenId((current) =>
                  current === category.id ? null : category.id,
                );
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function MobileCategoryCard({
  category,
  items,
  isOpen,
  reduceMotion,
  delay,
  onToggle,
}: {
  category: { id: SkillCategory; label: string; blurb: string };
  items: SkillNode[];
  isOpen: boolean;
  reduceMotion: boolean;
  delay: number;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.2,
    margin: "0px 0px -10% 0px",
  });
  const show = reduceMotion || inView;

  return (
    <motion.section
      ref={ref}
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: 28, scale: 0.98, filter: "blur(8px)" }
      }
      animate={
        show
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : undefined
      }
      transition={{ duration: 0.6, delay, ease }}
      className="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.025]"
    >
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <div>
          <p className="font-display text-lg tracking-tight">{category.label}</p>
          <p className="mt-0.5 text-xs text-muted">{category.blurb}</p>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key="panel"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/6 px-3 py-3">
              <MobileSkillList
                items={items}
                categoryId={category.id}
                reduceMotion={reduceMotion}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.section>
  );
}

function MobileSkillList({
  items,
  categoryId,
  reduceMotion,
}: {
  items: SkillNode[];
  categoryId: SkillCategory;
  reduceMotion: boolean;
}) {
  if (categoryId !== "frontend") {
    return (
      <motion.ul
        className="grid grid-cols-1 gap-2 sm:grid-cols-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: reduceMotion ? 0 : 0.05,
              delayChildren: reduceMotion ? 0 : 0.04,
            },
          },
        }}
      >
        {items.map((skill) => (
          <MobileSkillItem key={skill.id} skill={skill} />
        ))}
      </motion.ul>
    );
  }

  return (
    <div className="space-y-3">
      {frontendGroups.map((group, groupIndex) => {
        const groupItems = items.filter((skill) => skill.group === group.id);
        if (groupItems.length === 0) return null;

        return (
          <div key={group.id}>
            {groupIndex > 0 ? (
              <div
                aria-hidden
                className="mb-2 h-px bg-gradient-to-r from-cyan-400/25 to-transparent"
              />
            ) : null}
            <p className="mb-1.5 font-mono text-[0.58rem] tracking-[0.16em] text-subtle uppercase">
              {group.label}
            </p>
            <motion.ul
              className="grid grid-cols-1 gap-2 sm:grid-cols-2"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: reduceMotion ? 0 : 0.05,
                    delayChildren: reduceMotion ? 0 : 0.04,
                  },
                },
              }}
            >
              {groupItems.map((skill) => (
                <MobileSkillItem key={skill.id} skill={skill} />
              ))}
            </motion.ul>
          </div>
        );
      })}
    </div>
  );
}

function MobileSkillItem({ skill }: { skill: SkillNode }) {
  return (
    <motion.li
      variants={chipVariants}
      transition={{ duration: 0.4, ease }}
    >
      <SkillChip skill={skill} />
    </motion.li>
  );
}
