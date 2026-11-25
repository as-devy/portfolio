"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, Plus, X } from "lucide-react";
import type { Certificate } from "@/types";
import { cn } from "@/lib/utils";

export function Certificates({ certificates }: { certificates: Certificate[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      opener.current?.focus();
    };
  }, [open]);

  if (certificates.length === 0) return null;
  const c = open !== null ? certificates[open] : null;

  return (
    <section id="certificates" className="paper">
      <div className="mx-auto w-[min(1240px,calc(100%-2rem))] py-24 md:w-[min(1240px,calc(100%-7rem))] md:py-36">
        <p className="mono-label flex items-center gap-4 text-[color:var(--ink-soft)]">
          <span>05 / Credentials</span>
          <span aria-hidden className="h-px flex-1 bg-[color:var(--ink-faint)]" />
        </p>
        <h2 className="serif mt-8 max-w-4xl text-[clamp(2.6rem,7.4vw,6.4rem)] leading-[0.96]">
          {certificates.length} certificates, <span className="mark italic">pinned up.</span>
        </h2>

        <ul className="mt-14 grid grid-cols-2 gap-4 md:mt-20 md:grid-cols-4 md:gap-7">
          {certificates.map((cert, i) => (
            <li key={cert.id} className={cn(i === 0 && "col-span-2 md:row-span-2")}>
              <button
                type="button"
                onClick={(e) => {
                  opener.current = e.currentTarget;
                  setOpen(i);
                }}
                aria-haspopup="dialog"
                className="cert-tile group flex h-full w-full flex-col overflow-hidden border border-[color:var(--ink)] bg-[#f6f2e8] text-left text-[color:var(--ink)]"
              >
                <span className={cn("relative block w-full overflow-hidden border-b border-[color:var(--ink)] bg-white", i === 0 ? "aspect-[4/3] md:aspect-auto md:min-h-[18rem] md:flex-1" : "aspect-[4/3]")}>
                  <Image
                    src={cert.image}
                    alt=""
                    fill
                    sizes={i === 0 ? "(min-width:768px) 50vw, 100vw" : "(min-width:768px) 25vw, 50vw"}
                    className="object-contain p-2 transition duration-500 group-hover:scale-[1.04]"
                  />
                </span>
                <span className={cn("flex flex-col justify-between gap-4 p-4 md:p-5", i === 0 ? "flex-none" : "flex-1")}>
                  <span>
                    <span className="mono-label block !text-[0.6rem] text-[color:var(--ink-soft)]">
                      No. {String(i + 1).padStart(2, "0")} · {cert.date}
                    </span>
                    <span className={cn("serif mt-2 block leading-[1.05]", i === 0 ? "text-3xl md:text-5xl" : "text-xl md:text-2xl")}>
                      {cert.title}
                    </span>
                  </span>
                  <span className="mono-label flex items-center justify-between !text-[0.6rem] text-[color:var(--ink-soft)]">
                    {cert.issuer}
                    <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {c ? createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-[#05070d]/70 p-0 backdrop-blur-sm md:items-center md:p-8"
          onClick={() => setOpen(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={c.title}
            onClick={(e) => e.stopPropagation()}
            className="paper relative max-h-[92svh] w-full max-w-5xl overflow-y-auto rounded-t-2xl border border-[color:var(--ink)] md:rounded-md"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--ink)] bg-[color:var(--paper)]"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="grid md:grid-cols-[1.1fr_1fr]">
              <div className="relative aspect-[4/3] border-b border-[color:var(--ink)] bg-white md:aspect-auto md:min-h-[24rem] md:border-b-0 md:border-r">
                <Image src={c.image} alt={`${c.title}, ${c.issuer}`} fill sizes="(min-width:768px) 55vw, 100vw" className="object-contain p-3" />
              </div>
              <div className="p-6 pb-12 md:p-9">
                <p className="mono-label text-[color:var(--ink-soft)]">{c.issuer} · {c.date}</p>
                <h3 className="serif mt-3 text-3xl leading-[1.05] md:text-4xl">{c.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[color:var(--ink-soft)]">{c.summary}</p>
                {c.highlights?.length ? (
                  <ul className="mt-5 space-y-1.5 text-sm">
                    {c.highlights.map((h) => (
                      <li key={h} className="flex gap-2"><span aria-hidden>→</span>{h}</li>
                    ))}
                  </ul>
                ) : null}
                <ul className="mt-5 flex flex-wrap gap-2">
                  {c.skills.map((s) => (
                    <li key={s} className="rounded-full border border-[color:var(--ink)] px-2.5 py-1 font-mono text-[0.62rem]">{s}</li>
                  ))}
                </ul>
                {c.verificationUrl ? (
                  <a
                    href={c.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 bg-[color:var(--ink)] px-5 py-3 font-mono text-xs tracking-wide text-[color:var(--paper)] transition hover:opacity-85"
                  >
                    Verify credential <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>,
        document.body,
      ) : null}
    </section>
  );
}
