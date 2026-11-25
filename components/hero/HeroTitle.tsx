"use client";

import { motion, useReducedMotion } from "motion/react";

interface HeroTitleProps {
  first: string;
  last: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Hero name rendered as stacked, masked line reveals:
 * outlined first name over a solid family name.
 */
export function HeroTitle({ first, last }: HeroTitleProps) {
  const reduceMotion = useReducedMotion();

  const line = (text: string, delay: number, className: string) => (
    <span className="hero-line">
      <motion.span
        initial={reduceMotion ? false : { y: "112%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.95, delay, ease }}
        className={className}
      >
        {text}
      </motion.span>
    </span>
  );

  return (
    <h1 className="display-title leading-[0.94] tracking-[-0.04em]">
      {line(
        first,
        0.15,
        "text-outline text-[clamp(2.5rem,6.8vw,5rem)] uppercase",
      )}
      {line(
        last,
        0.28,
        "text-[clamp(2.5rem,6.8vw,5rem)] uppercase text-foreground",
      )}
    </h1>
  );
}
