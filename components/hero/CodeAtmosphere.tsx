"use client";

import { useEffect, useRef } from "react";
import { atmosphereSymbols } from "@/data/hero-atmosphere";

const symbolZones = [
  { top: [6, 28], left: [3, 22] },
  { top: [8, 30], left: [76, 96] },
  { top: [62, 92], left: [4, 25] },
  { top: [64, 94], left: [74, 96] },
  { top: [18, 84], left: [58, 78] },
] as const;

function randomPercent([min, max]: readonly [number, number]) {
  return `${Math.round(min + Math.random() * (max - min))}%`;
}

/** Decorative symbol layer behind the hero content. */
export function CodeAtmosphere() {
  const atmosphereRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const symbolElements = atmosphereRef.current?.querySelectorAll<HTMLElement>(
      "[data-hero-symbol]",
    );
    if (!symbolElements) return;

    symbolElements.forEach((element, index) => {
      const zone = symbolZones[index % symbolZones.length];
      element.style.top = randomPercent(zone.top);
      element.style.left = randomPercent(zone.left);
      element.style.bottom = "auto";
      element.style.right = "auto";
    });
  }, []);

  return (
    <div ref={atmosphereRef} className="code-atmosphere" aria-hidden>
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.16) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }}
      />

      {atmosphereSymbols.map((symbol) => (
        <span
          key={symbol.id}
          data-hero-symbol
          className="float-symbol text-xl md:text-3xl"
          style={{
            top: symbol.top,
            bottom: symbol.bottom,
            left: symbol.left,
            right: symbol.right,
            animationDelay: symbol.delay,
          }}
        >
          {symbol.char}
        </span>
      ))}
    </div>
  );
}
