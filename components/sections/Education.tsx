import { education } from "@/data/education";

export function Education() {
  return (
    <section id="education" className="paper border-t border-[color:var(--ink-faint)]">
      <div className="mx-auto flex w-[min(1240px,calc(100%-2rem))] flex-col gap-8 py-14 md:w-[min(1240px,calc(100%-7rem))] md:flex-row md:items-center md:justify-between md:py-20">
        <div>
          <p className="mono-label text-[color:var(--ink-soft)]">03 / Education</p>
          <h2 className="serif mt-4 max-w-3xl text-[clamp(1.9rem,4vw,3.4rem)] leading-[1.05]">
            {education.stage}
          </h2>
          <p className="mt-4 max-w-xl text-[color:var(--ink-soft)]">{education.detail}</p>
        </div>
        <div
          className="mono-label shrink-0 -rotate-6 self-start rounded-md border-2 border-[color:var(--ink)] px-5 py-3 text-center text-[color:var(--ink)] md:self-center"
          aria-label={`${education.status}, ${education.year}`}
        >
          {education.status}
          <span className="mt-1 block text-[0.62rem] opacity-70">{education.year}</span>
        </div>
      </div>
    </section>
  );
}
