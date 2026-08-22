"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { cn } from "@/lib/utils";

export type RevealVariant =
  | "up"
  | "down"
  | "left"
  | "right"
  | "scale"
  | "blur"
  | "rise"
  | "clip";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  durationMs?: number;
  variant?: RevealVariant;
  once?: boolean;
  amount?: number;
}

const ease = [0.22, 1, 0.36, 1] as const;

const variantMap: Record<RevealVariant, Variants> = {
  up: {
    hidden: { opacity: 0, y: 42 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -28 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -48 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 48 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  rise: {
    hidden: { opacity: 0, y: 56, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  clip: {
    hidden: {
      opacity: 0,
      y: 32,
      clipPath: "inset(0 0 100% 0)",
    },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0 0 0% 0)",
    },
  },
};

export function Reveal({
  children,
  className,
  delayMs = 0,
  durationMs = 750,
  variant = "up",
  once = true,
  amount = 0.2,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, {
    once,
    amount,
    margin: "0px 0px -8% 0px",
  });

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn("will-change-transform", className)}
      variants={variantMap[variant]}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{
        duration: durationMs / 1000,
        delay: delayMs / 1000,
        ease,
      }}
    >
      {children}
    </motion.div>
  );
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
}

/** Child item for use inside RevealStagger */
export function RevealItem({
  children,
  className,
  variant = "up",
}: RevealItemProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn("will-change-transform", className)}
      variants={variantMap[variant]}
      transition={{
        duration: 0.7,
        ease,
      }}
    >
      {children}
    </motion.div>
  );
}

interface RevealStaggerProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  staggerMs?: number;
  once?: boolean;
  amount?: number;
}

/** Staggers RevealItem children when the group enters view */
export function RevealStagger({
  children,
  className,
  delayMs = 0,
  staggerMs = 90,
  once = true,
  amount = 0.15,
}: RevealStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, {
    once,
    amount,
    margin: "0px 0px -6% 0px",
  });

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delayMs / 1000,
            staggerChildren: staggerMs / 1000,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

interface RevealWordsProps {
  text: string;
  className?: string;
  delayMs?: number;
  staggerMs?: number;
  align?: "left" | "center";
  as?: "h2" | "h3" | "p" | "span";
}

/** Cascading word reveal for display titles */
export function RevealWords({
  text,
  className,
  delayMs = 80,
  staggerMs = 55,
  align = "left",
  as: Tag = "h2",
}: RevealWordsProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, {
    once: true,
    amount: 0.35,
    margin: "0px 0px -6% 0px",
  });
  const words = text.split(" ");

  if (reduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag
      ref={ref as never}
      className={cn("overflow-hidden", className)}
      aria-label={text}
    >
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        className={cn(
          "flex flex-wrap",
          align === "center" && "justify-center",
        )}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {
            transition: {
              delayChildren: delayMs / 1000,
              staggerChildren: staggerMs / 1000,
            },
          },
        }}
      >
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="mr-[0.28em] inline-block overflow-hidden pb-[0.12em]"
          >
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: { y: "110%", opacity: 0, filter: "blur(6px)" },
                visible: { y: "0%", opacity: 1, filter: "blur(0px)" },
              }}
              transition={{ duration: 0.7, ease }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
