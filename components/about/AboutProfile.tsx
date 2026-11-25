import Image from "next/image";
import { CountUp } from "@/components/about/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { aboutNow, aboutStats } from "@/data/about";
import { siteConfig } from "@/data/site";

/**
 * Profile panel: portrait card, current-focus list, and headline stats.
 * Sits between the identity cards and the skill journey in the About section.
 */
export function AboutProfile() {
  return (
    <div id="about-profile" className="about-shell relative z-10 mt-14 md:mt-20">
      <div className="grid gap-5 md:grid-cols-5 md:gap-6">
        <Reveal variant="left" className="md:col-span-2">
          <figure className="group relative h-full overflow-hidden rounded-[1.15rem] border border-white/10">
            <div className="relative aspect-[4/3.4] md:aspect-auto md:h-full md:min-h-[22rem]">
              <Image
                src={siteConfig.heroImage.src}
                alt={siteConfig.heroImage.alt}
                fill
                sizes="(min-width: 768px) 38vw, 100vw"
                className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                style={{ objectPosition: siteConfig.heroImage.objectPosition }}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"
              />
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-6">
              <p className="font-display text-xl tracking-tight text-white md:text-2xl">
                {siteConfig.fullName}
              </p>
              <p className="mt-1 font-mono text-[0.7rem] tracking-[0.16em] text-white/70 uppercase">
                {siteConfig.role}
              </p>
              <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/85 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {siteConfig.location}
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal variant="right" delayMs={120} className="md:col-span-3">
          <div className="flex h-full flex-col justify-center rounded-[1.15rem] border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <p className="eyebrow">Right now</p>
            <ul className="mt-5 space-y-5 md:mt-6">
              {aboutNow.map((item, index) => (
                <li key={item.id} className="flex gap-4">
                  <span className="mt-0.5 font-mono text-xs tracking-[0.14em] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-sm font-semibold tracking-wide text-foreground md:text-[0.95rem]">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {item.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-4 md:gap-5">
        {aboutStats.map((stat, index) => (
          <Reveal key={stat.id} variant="up" delayMs={160 + index * 110}>
            <div className="rounded-[1.15rem] border border-white/10 bg-white/[0.02] px-4 py-6 text-center md:py-8">
              <p className="font-display text-3xl tracking-tight text-foreground md:text-5xl">
                <CountUp value={stat.value} suffix={stat.suffix ?? ""} />
              </p>
              <p className="mt-2 text-xs leading-snug text-muted md:text-sm">
                {stat.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
