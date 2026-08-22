"use client";

import { useEffect, useState } from "react";
import {
  Award,
  Briefcase,
  GraduationCap,
  Home,
  Mail,
  User,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

const iconMap: Record<NavItem["icon"], LucideIcon> = {
  home: Home,
  user: User,
  graduation: GraduationCap,
  briefcase: Briefcase,
  award: Award,
  mail: Mail,
};

interface FloatingNavProps {
  items: NavItem[];
}

export function FloatingNav({ items }: FloatingNavProps) {
  const [active, setActive] = useState(items[0]?.id ?? "home");

  useEffect(() => {
    if (items.length === 0) return;

    const sections = items
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "fixed z-50 glass",
        "bottom-4 left-1/2 w-[min(92vw,26rem)] -translate-x-1/2 rounded-2xl px-2 py-2",
        "lg:bottom-auto lg:left-auto lg:right-5 lg:top-1/2 lg:w-auto lg:-translate-y-1/2 lg:translate-x-0 lg:rounded-[1.35rem] lg:px-2 lg:py-3",
      )}
    >
      <ul className="flex items-center justify-between gap-1 lg:flex-col lg:justify-center lg:gap-1.5">
        {items.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = active === item.id;

          return (
            <li key={item.id}>
              <a
                href={item.href}
                aria-label={item.label}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "group relative flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-200",
                  isActive
                    ? "bg-accent/15 text-accent"
                    : "text-muted hover:bg-white/5 hover:text-foreground",
                )}
              >
                <Icon
                  className={cn(
                    "h-[1.15rem] w-[1.15rem] transition-transform duration-200",
                    isActive && "scale-110",
                  )}
                  strokeWidth={1.75}
                />
                <span
                  className={cn(
                    "pointer-events-none absolute whitespace-nowrap rounded-md border border-border bg-[#0b1220] px-2 py-1 font-mono text-[0.65rem] tracking-wide text-foreground opacity-0 shadow-lg transition-opacity duration-150",
                    "left-1/2 top-0 -translate-x-1/2 -translate-y-[120%]",
                    "lg:left-auto lg:right-full lg:top-1/2 lg:translate-x-0 lg:-translate-y-1/2 lg:mr-3",
                    "group-hover:opacity-100 group-focus-visible:opacity-100",
                  )}
                >
                  {item.label}
                </span>
                {isActive ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-accent/80 lg:inset-y-3 lg:-left-0.5 lg:inset-x-auto lg:bottom-auto lg:w-px"
                  />
                ) : null}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
