"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { siteConfig } from "@/data/site";

/**
 * Portrait panel for the hero with a gentle scroll-linked parallax.
 * Swap the image via `siteConfig.heroImage` — crop/position without touching layout.
 */
export function HeroPortrait() {
  const { src, alt, objectPosition } = siteConfig.heroImage;
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [36, -36]);

  return (
    <motion.div
      ref={ref}
      style={reduceMotion ? undefined : { y }}
      className="hero-portrait group relative mx-auto w-full max-w-[15rem] lg:max-w-none"
    >
      <div
        aria-hidden
        className="atmosphere-glow pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.2),transparent_65%)] blur-2xl"
      />

      <div className="hero-portrait-frame relative overflow-hidden rounded-[1.4rem] border border-white/10">
        <div className="relative overflow-hidden">
          <Image
            src={src}
            alt={alt}
            width={560}
            height={700}
            priority
            sizes="(max-width: 1024px) 22rem, 28rem"
            className="h-auto w-full object-cover brightness-[1.08] contrast-[1.05] saturate-[0.92] transition-[transform,filter] duration-[1200ms] ease-out group-hover:scale-[1.03] group-hover:saturate-[1.08]"
            style={{ objectPosition }}
          />

          {/* Blend photo into the dark system without editing the asset */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05070d] via-[#05070d]/25 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden bg-gradient-to-l from-transparent via-transparent to-[#05070d]/70 lg:block"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10"
          />
        </div>

        <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/10 bg-[#060a12]/72 px-3 py-2 backdrop-blur-md">
          <p className="font-mono text-[0.62rem] tracking-[0.16em] text-accent uppercase">
            Presence
          </p>
          <p className="mt-0.5 text-sm text-foreground/90">{siteConfig.role}</p>
        </div>
      </div>
    </motion.div>
  );
}
