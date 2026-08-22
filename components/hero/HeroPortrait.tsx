import Image from "next/image";
import { siteConfig } from "@/data/site";

/**
 * Portrait panel for the hero.
 * Swap the image via `siteConfig.heroImage` — crop/position without touching layout.
 */
export function HeroPortrait() {
  const { src, alt, objectPosition } = siteConfig.heroImage;

  return (
    <div className="hero-portrait relative mx-auto w-full max-w-[22rem] lg:max-w-none">
      <div
        aria-hidden
        className="atmosphere-glow pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.2),transparent_65%)] blur-2xl"
      />

      <div className="hero-portrait-frame relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0a101c] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(max-width: 1024px) 22rem, 28rem"
            className="object-cover"
            style={{ objectPosition }}
          />

          {/* Blend photo into the dark system without editing the asset */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05070d] via-[#05070d]/25 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#05070d]/55 lg:to-[#05070d]/70"
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
    </div>
  );
}
