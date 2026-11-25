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
import { siteConfig } from "@/data/site";
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

    let frame = 0;
    const update = () => {
      frame = 0;
      // The "reading line" sits 40% down the viewport; the active section
      // is the last one whose top has passed it. Works for sections of any
      // height, including ones much taller than the viewport.
      const line = window.scrollY + window.innerHeight * 0.4;
      let current = sections[0].id;
      for (const section of sections) {
        const top = section.getBoundingClientRect().top + window.scrollY;
        if (top <= line) current = section.id;
      }
      setActive((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <>
      {/* Desktop: top command bar */}
      <nav
        aria-label="Primary"
        className="floating-nav-enter fixed inset-x-0 top-0 z-50 hidden border-b border-border/60 bg-[#05070d]/75 backdrop-blur-md lg:block"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <a
            href="#home"
            aria-label={siteConfig.fullName}
            className="outline-name text-[1.6rem] leading-none"
          >
            {siteConfig.fullName.split(" ")[0]}
          </a>
          <ul className="flex items-center gap-6">
            {items.map((item, index) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group flex items-baseline gap-1.5 font-mono text-[0.7rem] tracking-[0.14em] uppercase transition-colors duration-200",
                      isActive
                        ? "text-accent"
                        : "text-muted hover:text-foreground",
                    )}
                  >
                    <span className="text-[0.58rem] text-accent/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="relative">
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute -bottom-1 left-0 h-px bg-accent transition-[width] duration-300",
                          isActive ? "w-full" : "w-0 group-hover:w-full",
                        )}
                      />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile: outlined name, top-left */}
      <a
        href="#home"
        aria-label={siteConfig.fullName}
        className="outline-name fixed left-5 top-4 z-50 text-[1.35rem] leading-none lg:hidden"
      >
        {siteConfig.fullName.split(" ")[0]}
      </a>

      {/* Mobile: bottom icon pill */}
      <nav
        aria-label="Primary"
        className="floating-nav-enter glass fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-50 w-[min(92vw,26rem)] -translate-x-1/2 rounded-2xl px-2 py-2 lg:hidden"
      >
        <ul className="flex items-center justify-between gap-1">
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
                  {isActive ? (
                    <span
                      aria-hidden
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-accent/80"
                    />
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
