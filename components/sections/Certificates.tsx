"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ExternalLink, FileBadge2 } from "lucide-react";
import { RevealItem, RevealStagger } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import type { Certificate } from "@/types";

export function Certificates({
  certificates,
}: {
  certificates: Certificate[];
}) {
  const [openId, setOpenId] = useState<string | null>(
    certificates[0]?.id ?? null,
  );
  const reduceMotion = useReducedMotion();

  if (certificates.length === 0) return null;

  return (
    <section id="certificates" className="relative">
      <div className="section-shell">
        <SectionHeading
          eyebrow="04 — Credentials"
          title="Certificates I've earned."
        />

        <RevealStagger className="cert-stack space-y-3" staggerMs={110} delayMs={80}>
          {certificates.map((certificate) => {
            const isOpen = openId === certificate.id;

            return (
              <RevealItem key={certificate.id} variant="blur">
                <article
                  className="cert-doc overflow-hidden rounded-2xl"
                  data-open={isOpen}
                >
                  <button
                    type="button"
                    className="flex w-full items-center gap-4 px-5 py-4 text-left md:px-6 md:py-5"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenId((current) =>
                        current === certificate.id ? null : certificate.id,
                      )
                    }
                  >
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border",
                        isOpen
                          ? "border-accent/40 bg-accent/10 text-accent"
                          : "border-border bg-white/[0.02] text-muted",
                      )}
                    >
                      <FileBadge2 className="h-5 w-5" strokeWidth={1.6} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-lg tracking-tight md:text-xl">
                        {certificate.title}
                      </span>
                      <span className="mt-1 block font-mono text-[0.7rem] tracking-wide text-muted">
                        {certificate.issuer} · {certificate.date}
                      </span>
                    </span>

                    <span className="hidden font-mono text-[0.68rem] text-subtle sm:block">
                      {isOpen ? "Collapse" : "Inspect"}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        key="panel"
                        initial={
                          reduceMotion
                            ? false
                            : { height: 0, opacity: 0 }
                        }
                        animate={{ height: "auto", opacity: 1 }}
                        exit={
                          reduceMotion
                            ? { opacity: 0 }
                            : { height: 0, opacity: 0 }
                        }
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-5 border-t border-border px-5 py-5 md:grid-cols-[1.1fr_0.9fr] md:px-6 md:py-6">
                          <div className="flex h-full min-h-0 flex-col">
                            <p className="font-mono text-[0.68rem] tracking-[0.14em] text-subtle uppercase">
                              Overview
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-muted md:text-[0.95rem]">
                              {certificate.summary}
                            </p>

                            {certificate.effort ? (
                              <p className="mt-3 font-mono text-[0.68rem] tracking-wide text-accent/90">
                                {certificate.effort}
                              </p>
                            ) : null}

                            {certificate.highlights?.length ? (
                              <div className="mt-5">
                                <p className="font-mono text-[0.68rem] tracking-[0.14em] text-subtle uppercase">
                                  What I practiced
                                </p>
                                <ul className="mt-2.5 space-y-2">
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

                            <div className="mt-5">
                              <p className="font-mono text-[0.68rem] tracking-[0.14em] text-subtle uppercase">
                                Topics covered
                              </p>
                              <ul className="mt-3 flex flex-wrap gap-2">
                                {certificate.skills.map((skill) => (
                                  <li
                                    key={skill}
                                    className="rounded-full border border-border bg-white/[0.02] px-2.5 py-1 font-mono text-[0.65rem] text-muted"
                                  >
                                    {skill}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {certificate.credentialId ? (
                              <p className="mt-5 font-mono text-xs text-subtle">
                                ID · {certificate.credentialId}
                              </p>
                            ) : null}

                            {certificate.verificationUrl ? (
                              <a
                                href={certificate.verificationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-secondary mt-6 !min-h-10 !self-start !text-sm"
                              >
                                Verify credential
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            ) : null}
                          </div>

                          <div className="relative overflow-hidden rounded-xl border border-border bg-[linear-gradient(160deg,rgba(255,255,255,0.04),transparent_45%),#0a101c] p-3">
                            <a
                              href={certificate.image}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/preview relative block overflow-hidden rounded-lg border border-white/10 bg-black/30"
                              aria-label={`Open ${certificate.title} certificate image`}
                            >
                              <Image
                                src={certificate.image}
                                alt={`${certificate.title} — ${certificate.issuer}`}
                                width={960}
                                height={720}
                                className="aspect-[4/3] h-auto w-full object-contain object-center transition duration-500 group-hover/preview:scale-[1.02]"
                                sizes="(max-width: 768px) 100vw, 420px"
                              />
                            </a>
                            <p className="mt-3 font-mono text-[0.62rem] text-subtle">
                              Click preview to open full certificate
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </article>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
