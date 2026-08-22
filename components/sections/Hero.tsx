import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { CodeAtmosphere } from "@/components/hero/CodeAtmosphere";
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
  "Web Security learner",
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
            <p className="eyebrow mb-6">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_var(--glow)]" />
              {siteConfig.location}
            </p>

            <h1 className="display-title mb-3 text-[clamp(3.2rem,10vw,6.4rem)] leading-none tracking-[-0.05em] text-foreground">
              {siteConfig.name}
            </h1>

            <p className="max-w-xl text-[clamp(1.3rem,3vw,2rem)] font-medium leading-tight tracking-[-0.03em] text-foreground/92">
              Interfaces with <RotatingPhrase />
            </p>

            <p className="lede mt-6 max-w-lg">
              I design and build full-stack web products where visual craft,
              system architecture, and careful interaction meet — while deepening
              practical web security thinking along the way.
            </p>

            <ul className="mt-7 flex flex-wrap gap-2" aria-label="Focus areas">
              {roles.map((role) => (
                <li
                  key={role}
                  className="rounded-full border border-border bg-white/[0.02] px-3.5 py-1.5 font-mono text-[0.72rem] tracking-wide text-muted"
                >
                  {role}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              {primaryTarget ? (
                <a href={`#${primaryTarget}`} className="btn btn-primary">
                  Explore the work
                  <ArrowDownRight className="h-4 w-4" />
                </a>
              ) : null}
              {secondaryTarget && secondaryTarget !== primaryTarget ? (
                <a href={`#${secondaryTarget}`} className="btn btn-secondary">
                  Start a conversation
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </div>

          <div className="relative mt-2 lg:mt-0">
            <HeroPortrait />
          </div>
        </div>

        {scrollTarget ? (
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
        ) : null}
      </div>
    </section>
  );
}
