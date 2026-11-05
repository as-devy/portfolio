"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import { ExternalLink, FileBadge2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Certificate } from "@/types";

export function Certificates({
  certificates,
}: {
  certificates: Certificate[];
}) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  if (certificates.length === 0) return null;

  return (
    <section id="certificates" className="relative">
      <div className="section-shell">
        <SectionHeading
          eyebrow="04 — Credentials"
          title="Certificates I've earned."
        />

        <div className="cert-journey">
          <aside className="cert-rail" aria-label="Certificate progress">
            <div className="cert-rail-line" aria-hidden />
            <ol>
              {certificates.map((certificate, index) => (
                <li key={certificate.id}>
                  <a
                    href={`#certificate-${certificate.id}`}
                    className={`cert-rail-link${activeIndex === index ? " is-active" : ""}`}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span className="sr-only">{certificate.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="cert-slides">
            {certificates.map((certificate, index) => (
              <CertificateSlide
                key={certificate.id}
                certificate={certificate}
                index={index}
                total={certificates.length}
                reduceMotion={Boolean(reduceMotion)}
                onActive={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CertificateSlide({
  certificate,
  index,
  total,
  reduceMotion,
  onActive,
}: {
  certificate: Certificate;
  index: number;
  total: number;
  reduceMotion: boolean;
  onActive: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const cardScale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.92, 1, 1, 0.92]);
  const cardY = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [42, 0, 0, -42]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.35, 1, 1, 0.35]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.12]);

  return (
    <motion.article
      ref={ref}
      id={`certificate-${certificate.id}`}
      className="cert-slide scroll-mt-24"
      style={
        reduceMotion
          ? undefined
          : { scale: cardScale, y: cardY, opacity: cardOpacity }
      }
      onViewportEnter={onActive}
      viewport={{ amount: 0.55 }}
    >
                <div className="cert-slide-heading">
                  <span className="cert-index">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(total).padStart(2, "0")}
                  </span>
                  <span className="cert-status">
                    <span aria-hidden className="cert-status-dot" />
                    Verified learning
                  </span>
                </div>

                <div className="cert-slide-grid">
                  <div className="cert-slide-copy">
                    <div className="cert-title-row">
                      <span className="cert-icon" aria-hidden>
                        <FileBadge2 className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <div>
                        <h3 className="font-display text-2xl tracking-tight md:text-3xl">
                          {certificate.title}
                        </h3>
                        <p className="mt-1 font-mono text-[0.7rem] tracking-wide text-muted">
                          {certificate.issuer} · {certificate.date}
                        </p>
                      </div>
                    </div>

                    <p className="mt-6 text-sm leading-relaxed text-muted md:text-[0.95rem]">
                      {certificate.summary}
                    </p>

                    {certificate.effort ? (
                      <p className="mt-4 font-mono text-[0.68rem] tracking-wide text-accent/90">
                        {certificate.effort}
                      </p>
                    ) : null}

                    {certificate.highlights?.length ? (
                      <div className="mt-6">
                        <p className="font-mono text-[0.68rem] tracking-[0.14em] text-subtle uppercase">
                          What I practiced
                        </p>
                        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                          {certificate.highlights.map((item) => (
                            <li
                              key={item}
                              className="flex gap-2.5 text-sm leading-snug text-foreground/85"
                            >
                              <span
                                aria-hidden
                                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Topics covered">
                      {certificate.skills.map((skill) => (
                        <li
                          key={skill}
                          className="rounded-full border border-border bg-white/[0.02] px-2.5 py-1 font-mono text-[0.65rem] text-muted"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>

                    {certificate.verificationUrl ? (
                      <a
                        href={certificate.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary mt-7 !min-h-10 !self-start !text-sm"
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
                    className="cert-preview group/preview"
                    aria-label={`Open ${certificate.title} certificate image`}
                  >
                    <Image
                      src={certificate.image}
                      alt={`${certificate.title} — ${certificate.issuer}`}
                      width={960}
                      height={720}
                      className="h-full w-full object-contain object-center transition duration-700 group-hover/preview:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 460px"
                      style={reduceMotion ? undefined : { scale: imageScale }}
                    />
                    <span className="cert-preview-label">Open full certificate</span>
                  </a>
                </div>
    </motion.article>
  );
}
