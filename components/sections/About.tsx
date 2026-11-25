import { Manifesto } from "@/components/about/Manifesto";
import { Pillars } from "@/components/about/Pillars";

export function About() {
  return (
    <section id="about" className="paper">
      <div className="mx-auto w-[min(1240px,calc(100%-2rem))] pt-24 md:w-[min(1240px,calc(100%-7rem))] md:pt-36">
        <p className="mono-label flex items-center gap-4 text-[color:var(--ink-soft)]">
          <span>01 / About</span>
          <span aria-hidden className="h-px flex-1 bg-[color:var(--ink-faint)]" />
        </p>
        <div className="mt-10 md:mt-16">
          <Manifesto />
        </div>
        <div className="mt-24 pb-10 md:mt-40">
          <Pillars />
        </div>
      </div>
    </section>
  );
}
