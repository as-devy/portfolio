import { Reveal } from "@/components/ui/Reveal";
import { education } from "@/data/education";

export function Education() {
  return (
    <section id="education" className="relative">
      <div className="section-shell !py-8 md:!py-12">
        <Reveal variant="scale" durationMs={800}>
          <div className="overflow-hidden rounded-2xl border border-border bg-white/[0.015]">
            <div className="grid gap-6 p-6 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10 md:p-7">
              <Reveal variant="left" delayMs={120}>
                <div>
                  <p className="eyebrow mb-3">02 — Education</p>
                  <p className="font-mono text-[0.7rem] tracking-[0.16em] text-accent uppercase">
                    Milestone
                  </p>
                </div>
              </Reveal>

              <Reveal variant="up" delayMs={200}>
                <div className="md:border-l md:border-border md:pl-10">
                  <h2 className="font-display text-2xl tracking-tight md:text-3xl">
                    {education.stage}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                    {education.detail}
                  </p>
                </div>
              </Reveal>

              <Reveal variant="right" delayMs={280}>
                <div className="flex items-center gap-3 md:flex-col md:items-end md:text-right">
                  <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 font-mono text-[0.7rem] text-emerald-300">
                    {education.status}
                  </span>
                  <span className="font-mono text-xs text-subtle">
                    {education.year}
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
