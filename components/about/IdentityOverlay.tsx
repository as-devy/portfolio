"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { IdentityCard } from "@/components/about/IdentityCard";
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

      <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-5">
        {identityAxes.map((axis, index) => (
          <IdentityCard key={axis.id} index={index} visible={shown}>
            <span className="font-mono text-xs tracking-[0.14em] text-accent">
              0{index + 1}
            </span>
            <h3 className="font-display mt-3 text-xl tracking-tight uppercase transition-colors duration-500 group-hover:text-white md:text-2xl">
              {axis.title}
            </h3>
            <p className="mt-3 text-sm font-medium leading-snug text-foreground/90 md:text-[0.95rem]">
              {axis.lead}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted transition-colors duration-500 group-hover:text-foreground/70 md:text-[0.95rem]">
              {axis.copy}
            </p>
          </IdentityCard>
        ))}
      </div>
    </div>
  );
}
