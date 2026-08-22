"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { heroRotatorPhrases } from "@/data/hero-rotator";
import { cn } from "@/lib/utils";

interface RotatingPhraseProps {
  className?: string;
  intervalMs?: number;
}

export function RotatingPhrase({
  className,
  intervalMs = 2800,
}: RotatingPhraseProps) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const phrase = heroRotatorPhrases[index] ?? heroRotatorPhrases[0];

  useEffect(() => {
    if (reduceMotion || heroRotatorPhrases.length < 2) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % heroRotatorPhrases.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, reduceMotion]);

  return (
    <span
      className={cn(
        "relative inline-flex h-[1.15em] min-w-[12ch] items-center overflow-hidden align-bottom",
        className,
      )}
      aria-live="polite"
      aria-atomic="true"
      style={{ marginBottom: '3px' }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={phrase}
          initial={
            reduceMotion
              ? false
              : { y: "100%", opacity: 0 }
          }
          animate={{ y: "0%", opacity: 1 }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { y: "-100%", opacity: 0 }
          }
          transition={{
            duration: reduceMotion ? 0.01 : 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-x-0 top-0 bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent"
        >
          {phrase}
        </motion.span>
      </AnimatePresence>

      {/* Reserve width for the longest phrase to reduce layout jump */}
      <span className="invisible whitespace-nowrap" aria-hidden>
        {
          heroRotatorPhrases.reduce((longest, current) =>
            current.length > longest.length ? current : longest,
          )
        }
      </span>
    </span>
  );
}
