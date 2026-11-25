"use client";

import { useEffect, useRef, useState } from "react";
import { identityAxes } from "@/data/skills";
import { cn } from "@/lib/utils";

export function Pillars() {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = window.innerHeight * 0.5;
      let best = 0;
      let bestDist = Infinity;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
      <div className="relative hidden lg:block">
        <div className="sticky top-[18vh]">
          <div className="relative h-[22rem]">
            {identityAxes.map((axis, i) => (
              <div
                key={axis.id}
                aria-hidden
                className={cn(
                  "absolute inset-0 transition-all duration-700 ease-out",
                  active === i
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-6 opacity-0",
                )}
              >
                <span className="serif block text-[18rem] leading-[0.8] text-[color:var(--ink)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mono-label mt-6 block text-[color:var(--ink-soft)]">
                  {axis.title}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-2" aria-hidden>
            {identityAxes.map((axis, i) => (
              <span
                key={axis.id}
                className={cn(
                  "h-[3px] w-10 rounded-full transition-colors duration-500",
                  active === i ? "bg-[color:var(--ink)]" : "bg-[color:var(--ink-faint)]",
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <div>
        {identityAxes.map((axis, i) => (
          <article
            key={axis.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={cn(
              "border-t border-[color:var(--ink-faint)] py-12 transition-opacity duration-500 lg:flex lg:min-h-[62vh] lg:flex-col lg:justify-center",
              active === i ? "lg:opacity-100" : "lg:opacity-35",
            )}
          >
            <span className="mono-label text-[color:var(--ink-soft)] lg:hidden">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mono-label text-[color:var(--ink-soft)]">
              {axis.title}
            </h3>
            <p className="serif mt-4 text-[clamp(2.1rem,4.6vw,3.9rem)] italic leading-[1.02]">
              {axis.lead}
            </p>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[color:var(--ink-soft)]">
              {axis.copy}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
