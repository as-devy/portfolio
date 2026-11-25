"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * Thin scroll-progress bar pinned to the top of the viewport.
 * Purely decorative; hidden when the user prefers reduced motion.
 */
export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.4,
  });

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400"
      style={{ scaleX }}
    />
  );
}
