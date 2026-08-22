"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { SkillIcon } from "@/components/about/SkillIcon";
import { cn } from "@/lib/utils";
import type { SkillCategory, SkillNode } from "@/types";

const categoryAccent: Record<
  SkillCategory,
  { text: string; glow: string; border: string }
> = {
  design: {
    text: "text-violet-300",
    glow: "rgba(167, 139, 250, 0.18)",
    border: "group-hover:border-violet-300/25",
  },
  frontend: {
    text: "text-cyan-300",
    glow: "rgba(34, 211, 238, 0.18)",
    border: "group-hover:border-cyan-300/25",
  },
  backend: {
    text: "text-sky-300",
    glow: "rgba(56, 189, 248, 0.18)",
    border: "group-hover:border-sky-300/25",
  },
  data: {
    text: "text-teal-300",
    glow: "rgba(45, 212, 191, 0.18)",
    border: "group-hover:border-teal-300/25",
  },
  security: {
    text: "text-rose-300",
    glow: "rgba(251, 113, 133, 0.16)",
    border: "group-hover:border-rose-300/25",
  },
  ai: {
    text: "text-amber-200",
    glow: "rgba(252, 211, 77, 0.16)",
    border: "group-hover:border-amber-300/25",
  },
  devops: {
    text: "text-emerald-300",
    glow: "rgba(52, 211, 153, 0.16)",
    border: "group-hover:border-emerald-300/25",
  },
};

interface SkillChipProps {
  skill: SkillNode;
  className?: string;
  compact?: boolean;
}

export function SkillChip({ skill, className, compact = false }: SkillChipProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 50, y: 50 });
  const currentRef = useRef({ x: 50, y: 50 });
  const rafRef = useRef<number | null>(null);
  const [hovering, setHovering] = useState(false);
  const accent = categoryAccent[skill.category];

  const applyGlow = (x: number, y: number) => {
    const node = rootRef.current;
    if (!node) return;
    node.style.setProperty("--skill-mx", `${x}%`);
    node.style.setProperty("--skill-my", `${y}%`);
  };

  const tick = () => {
    const current = currentRef.current;
    const target = targetRef.current;
    // Smooth follow — lower = softer lag
    current.x += (target.x - current.x) * 0.1;
    current.y += (target.y - current.y) * 0.1;
    applyGlow(current.x, current.y);

    const dx = Math.abs(target.x - current.x);
    const dy = Math.abs(target.y - current.y);

    if (dx > 0.05 || dy > 0.05) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      current.x = target.x;
      current.y = target.y;
      applyGlow(current.x, current.y);
      rafRef.current = null;
    }
  };

  const ensureTick = () => {
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  useEffect(() => {
    applyGlow(50, 50);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const node = rootRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    targetRef.current = {
      x: ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 100,
      y: ((event.clientY - rect.top) / Math.max(rect.height, 1)) * 100,
    };
    ensureTick();
  };

  return (
    <div
      ref={rootRef}
      onMouseEnter={() => {
        setHovering(true);
        ensureTick();
      }}
      onMouseLeave={() => {
        setHovering(false);
        targetRef.current = { x: 50, y: 50 };
        ensureTick();
      }}
      onMouseMove={onMove}
      className={cn(
        "skill-chip group relative overflow-hidden rounded-xl border border-white/10",
        "bg-white/[0.03] backdrop-blur-md",
        "transition-[transform,border-color,background-color,box-shadow,opacity] duration-500 ease-out",
        "hover:-translate-y-px hover:bg-white/[0.045]",
        "hover:shadow-[0_10px_28px_-18px_rgba(0,0,0,0.55)]",
        accent.border,
        compact ? "min-h-[3rem] px-2.5 py-2" : "min-h-[3.15rem] px-3 py-2.5",
        "flex w-full items-center gap-2.5",
        className,
      )}
      style={
        {
          "--skill-mx": "50%",
          "--skill-my": "50%",
          "--skill-glow": accent.glow,
        } as CSSProperties
      }
    >
      <span
        aria-hidden
        className="skill-chip-glow pointer-events-none absolute inset-0"
        style={{
          opacity: hovering ? 1 : 0,
          background: `
            radial-gradient(
              170px circle at var(--skill-mx) var(--skill-my),
              var(--skill-glow),
              transparent 62%
            ),
            radial-gradient(
              240px circle at var(--skill-mx) var(--skill-my),
              rgba(255, 255, 255, 0.05),
              transparent 68%
            )
          `,
        }}
      />

      {/* Soft watermark — fades in from the right; hover drift is eased */}
      <span
        aria-hidden
        className="skill-chip-watermark pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent 0%, transparent 30%, rgba(0,0,0,0.5) 60%, black 88%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, transparent 30%, rgba(0,0,0,0.5) 60%, black 88%)",
        }}
      >
        <SkillIcon
          name={skill.icon}
          className={cn(
            "skill-chip-watermark-icon absolute top-1/2 right-0",
            "opacity-[0.12]",
            "drop-shadow-[0_0_16px_var(--skill-glow)]",
            compact ? "h-[3.4rem] w-[3.4rem]" : "h-[3.85rem] w-[3.85rem]",
          )}
        />
      </span>

      <span
        className={cn(
          "relative z-[1] flex shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/30",
          "transition-colors duration-500 group-hover:border-white/15 group-hover:bg-black/22",
          compact ? "h-8 w-8" : "h-9 w-9",
        )}
      >
        <SkillIcon
          name={skill.icon}
          className={cn(
            compact ? "h-3.5 w-3.5" : "h-4 w-4",
            // Conceptual Lucide icons keep category tint; brand logos keep official colors
            accent.text,
          )}
        />
      </span>

      <span className="relative z-[1] min-w-0 truncate pr-6 text-sm text-foreground/95 transition-colors duration-500 group-hover:text-white/95">
        {skill.label}
      </span>
    </div>
  );
}
