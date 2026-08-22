"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface IdentityCardProps {
  index: number;
  visible: boolean;
  children: ReactNode;
  className?: string;
}

export function IdentityCard({
  index,
  visible,
  children,
  className,
}: IdentityCardProps) {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const targetRef = useRef({ x: 50, y: 28 });
  const currentRef = useRef({ x: 50, y: 28 });
  const rafRef = useRef<number | null>(null);
  const [hovering, setHovering] = useState(false);

  const applyGlow = (x: number, y: number) => {
    const node = rootRef.current;
    if (!node) return;
    node.style.setProperty("--glass-mx", `${x}%`);
    node.style.setProperty("--glass-my", `${y}%`);
  };

  const tick = () => {
    const current = currentRef.current;
    const target = targetRef.current;
    // Soft lag — feels optical, not sticky
    current.x += (target.x - current.x) * 0.12;
    current.y += (target.y - current.y) * 0.12;
    applyGlow(current.x, current.y);

    const dx = Math.abs(target.x - current.x);
    const dy = Math.abs(target.y - current.y);

    if (dx > 0.04 || dy > 0.04) {
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
    applyGlow(50, 28);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const onMove = (event: MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
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
    <motion.article
      ref={rootRef}
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: 36, filter: "blur(8px)", scale: 0.97 }
      }
      animate={
        visible
          ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }
          : undefined
      }
      transition={{
        duration: 0.7,
        delay: 0.22 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => {
        setHovering(true);
        if (!reduceMotion) ensureTick();
      }}
      onMouseLeave={() => {
        setHovering(false);
        targetRef.current = { x: 50, y: 28 };
        if (!reduceMotion) ensureTick();
      }}
      onMouseMove={onMove}
      className={cn("identity-glass group", className)}
      style={
        {
          "--glass-mx": "50%",
          "--glass-my": "28%",
          "--glass-active": hovering ? 1 : 0,
        } as CSSProperties
      }
      data-hover={hovering ? "true" : "false"}
    >
      <span aria-hidden className="identity-glass-fill" />
      <span aria-hidden className="identity-glass-rim" />
      <span aria-hidden className="identity-glass-spotlight" />
      <span aria-hidden className="identity-glass-sheen" />
      <span aria-hidden className="identity-glass-bloom" />
      <div className="relative z-[1]">{children}</div>
    </motion.article>
  );
}
