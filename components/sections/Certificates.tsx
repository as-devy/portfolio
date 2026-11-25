import Image from "next/image";
import { ExternalLink, FileBadge2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Certificate } from "@/types";

export function Certificates({
  certificates,
}: {
  certificates: Certificate[];
}) {
  if (certificates.length === 0) return null;

  return (
    <section id="certificates" className="relative">
      <div className="section-shell">
        <SectionHeading
          eyebrow="04 — Credentials"
          title="Certificates I've earned."
        />

        <div>
          {certificates.map((certificate, index) => (
            <Reveal
              key={certificate.id}
              variant="up"
              delayMs={Math.min(index, 3) * 70}
              amount={0.15}
            >
              <article
                id={`certificate-${certificate.id}`}
                className="group scroll-mt-28 border-t border-border py-7 last:border-b md:py-9"
              >
                <div className="grid gap-5 md:grid-cols-[3.5rem_1fr_auto] md:items-start md:gap-8">
                  <span className="font-mono text-xs tracking-[0.14em] text-accent md:pt-2">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <div className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-white/[0.02] text-accent"
                      >
                        <FileBadge2 className="h-4 w-4" strokeWidth={1.6} />
                      </span>
                      <div>
                        <h3 className="font-display text-xl tracking-tight transition-colors duration-300 group-hover:text-white md:text-2xl">
                          {certificate.title}
                        </h3>
                        <p className="mt-1 font-mono text-[0.7rem] tracking-wide text-muted">
                          {certificate.issuer} · {certificate.date}
                          {certificate.verificationUrl ? (
                            <span className="text-accent/90">
                              {" "}
                              · Verified
                            </span>
                          ) : null}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-[0.95rem]">
                      {certificate.summary}
                    </p>

                    {certificate.highlights?.length ? (
                      <ul className="mt-4 grid max-w-2xl gap-x-6 gap-y-1.5 sm:grid-cols-2">
                        {certificate.highlights.map((item) => (
                          <li
                            key={item}
                            className="flex items-baseline gap-2 text-[0.83rem] leading-snug text-muted"
                          >
                            <span
                              aria-hidden
                              className="h-1 w-1 shrink-0 translate-y-[-2px] rounded-full bg-accent/80"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      {certificate.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-border bg-white/[0.02] px-2.5 py-1 font-mono text-[0.65rem] text-muted"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {certificate.verificationUrl ? (
                      <a
                        href={certificate.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary mt-5 !min-h-10 !text-sm"
                      >
                        Verify credential
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : null}
                  </div>

                  <a
                    href={certificate.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${certificate.title} certificate image`}
                    className="block overflow-hidden rounded-xl border border-border bg-white/[0.02] transition-colors duration-300 hover:border-accent/40 md:w-52"
                  >
                    <Image
                      src={certificate.image}
                      alt={`${certificate.title} — ${certificate.issuer}`}
                      width={960}
                      height={720}
                      className="h-auto w-full object-contain transition duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 208px"
                    />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
