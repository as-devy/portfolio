import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { CodeAtmosphere } from "@/components/hero/CodeAtmosphere";
import { Reveal } from "@/components/ui/Reveal";
import { HeroPortrait } from "@/components/hero/HeroPortrait";
import { RotatingPhrase } from "@/components/hero/RotatingPhrase";
import { siteConfig } from "@/data/site";
import {
  getNextEnabledSection,
  sectionFlags,
} from "@/lib/section-flags";

const roles = [
  "Full Stack Developer",
  "UI/UX Designer",
  "Web Security",
];

export function Hero() {
  const primaryTarget = sectionFlags.projects
    ? "projects"
    : getNextEnabledSection("home");
  const secondaryTarget = sectionFlags.contact
    ? "contact"
    : getNextEnabledSection(primaryTarget ?? "home");
  const scrollTarget = getNextEnabledSection("home");

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-16"
    >
      <CodeAtmosphere />

      <div className="section-shell relative z-10 flex w-full flex-1 flex-col !py-0">
        <div className="grid flex-1 items-center gap-10 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:py-10 xl:gap-14">
          <div className="max-w-2xl">
            <Reveal variant="down" durationMs={700}>
              <p className="eyebrow mb-6">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_var(--glow)]" />
                {siteConfig.location}
              </p>
            </Reveal>

            <Reveal variant="up" delayMs={90} durationMs={850}>
              <h1 className="display-title mb-3 text-[clamp(3.2rem,10vw,6.4rem)] leading-none tracking-[-0.05em] text-foreground">
                {siteConfig.name}
              </h1>
            </Reveal>

            <Reveal variant="up" delayMs={180} durationMs={800}>
              <p className="max-w-xl text-[clamp(1.3rem,3vw,2rem)] font-medium leading-tight tracking-[-0.03em] text-foreground/92">
                Interfaces with <RotatingPhrase />
              </p>
            </Reveal>

            <Reveal variant="blur" delayMs={260} durationMs={850}>
              <p className="lede mt-6 max-w-lg">
                I design and build full-stack web products where UI/UX, system architecture, and engineering precision come together — with a strong focus on performance, scalability, and web security.
              </p>
            </Reveal>

            <Reveal variant="up" delayMs={340} durationMs={750}>
              <ul className="mt-7 flex flex-wrap gap-2" aria-label="Focus areas">
                {roles.map((role) => (
                  <li
                    key={role}
                    className="role-pill rounded-full px-3.5 py-1.5 font-mono text-[0.72rem] tracking-wide"
                  >
                    {role}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal variant="up" delayMs={420} durationMs={750}>
              <div className="mt-9 flex flex-wrap gap-3">
                {primaryTarget ? (
                  <a href={`#${primaryTarget}`} className="btn btn-primary">
                    Explore the work
                    <ArrowDownRight className="h-4 w-4" />
                  </a>
                ) : null}
                <a
                  href="/docs/Omar%20Elbedwehy%20-%20CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  View Resume
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal variant="scale" delayMs={220} durationMs={950} className="relative mt-2 lg:mt-0">
            <HeroPortrait />
          </Reveal>
        </div>

        {scrollTarget ? (
          <Reveal variant="up" delayMs={560} durationMs={750}>
            <div className="flex flex-col items-center justify-center gap-3 pb-8 pt-2 md:pb-10">
              <a
                href={`#${scrollTarget}`}
                className="scroll-mouse"
                aria-label={`Scroll to ${scrollTarget} section`}
              >
                <span className="scroll-mouse-wheel" />
              </a>
              <p className="font-mono text-xs tracking-[0.14em] text-subtle uppercase">
                Scroll to enter the system
              </p>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
