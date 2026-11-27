"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

const LINES = [
  "Engineer the system.",
  "Design the experience.",
  "Secure what matters.",
];

function Word({
  word,
  range,
  progress,
  reduce,
  accent,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
  reduce: boolean;
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span
      style={{ opacity: reduce ? 1 : opacity }}
      className={accent ? "mark italic" : undefined}
    >
      {word}{" "}
    </motion.span>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  const words = LINES.flatMap((line, li) =>
    line.split(" ").map((w) => ({ w, li })),
  );
  const total = words.length;

  return (
    <div ref={ref}>
      <p className="serif text-[clamp(2.6rem,8.4vw,7.6rem)] leading-[0.98]">
        {words.map(({ w, li }, i) => (
          <Word
            key={`${li}-${i}`}
            word={w}
            reduce={reduce}
            accent={li === 2 && i === total - 1}
            progress={scrollYProgress}
            range={[i / total, Math.min(1, (i + 1.6) / total)]}
          />
        ))}
      </p>
      <p className="mt-8 max-w-xl text-base leading-relaxed text-[color:var(--ink-soft)] md:text-lg">
        I&apos;ve been building for the web for about three years, across front
        end, back end, and design. I like owning a product end to end, and I
        care as much about how it feels to use as how it holds up under
        pressure.
      </p>
    </div>
  );
}
