"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { identityAxes } from "@/data/skills";

export function IdentityOverlay() {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const shown = Boolean(reduceMotion) || visible;

  useEffect(() => {
    const node = rootRef.current;
    if (!node || reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <div ref={rootRef} className="relative">
      <motion.div
        initial={
          reduceMotion
            ? false
            : { opacity: 0, y: 40, filter: "blur(8px)", scale: 0.985 }
        }
        animate={
          shown
            ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
            : undefined
        }
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-5xl"
      >
        <p className="font-display text-[clamp(1.85rem,4.4vw,3.5rem)] leading-[1.12] tracking-[-0.035em] text-foreground">
          <span className="block">Engineer the system.</span>
          <span className="block">Design the experience.</span>
          <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">
            Secure what matters.
          </span>
        </p>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          I build full-stack digital products where engineering, interface
          design, and security work together — from the first interaction to
          the systems underneath.
        </p>
      </motion.div>

      <div className="mt-12 md:mt-16">
        {identityAxes.map((axis, index) => (
          <motion.div
            key={axis.id}
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 32, filter: "blur(6px)" }
            }
            animate={
              shown
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : undefined
            }
            transition={{
              duration: 0.7,
              delay: 0.2 + index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative border-t border-border py-6 last:border-b md:py-8"
          >
            <span
              aria-hidden
              className="absolute left-0 top-0 h-px w-0 bg-accent transition-[width] duration-700 ease-out group-hover:w-full"
            />
            <div className="grid gap-2 md:grid-cols-[4.5rem_1fr_1.15fr] md:items-baseline md:gap-8">
              <span className="font-mono text-xs tracking-[0.14em] text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-xl uppercase tracking-tight transition-colors duration-300 group-hover:text-white md:text-2xl">
                  {axis.title}
                </h3>
                <p className="mt-1 font-serif-accent text-base italic text-foreground/80 md:text-lg">
                  {axis.lead}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-muted md:text-[0.95rem]">
                {axis.copy}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
