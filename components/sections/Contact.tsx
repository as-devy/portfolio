"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { Reveal, RevealItem, RevealStagger } from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site";
import { socialLinks } from "@/data/social";

const socialIcons = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: Mail,
  x: ArrowUpRight,
} as const;

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const honey = String(data.get("_honey") ?? "");

    setStatus("sending");

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${siteConfig.email}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            message,
            _honey: honey,
            _subject: `Portfolio inquiry from ${name}`,
            _template: "table",
          }),
        },
      );

      if (!response.ok) throw new Error("Unable to send message");

      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative">
      <div className="section-shell">
        <div className="border-t border-border pt-10 md:pt-14">
          <Reveal variant="left" durationMs={850}>
            <div className="flex items-center gap-5">
              <p className="eyebrow">05 — Contact</p>
              <span aria-hidden className="hairline-x min-w-8 flex-1" />
            </div>
          </Reveal>

          <Reveal variant="blur" delayMs={80} durationMs={900}>
            <h2 className="display-title mt-6 max-w-4xl text-[clamp(2.4rem,6.5vw,4.6rem)]">
              Have an idea{" "}
              <span className="font-serif-accent italic text-transparent bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text">
                worth building?
              </span>
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <Reveal variant="up" delayMs={180} durationMs={800}>
                <p className="lede">
                  Tell me what you&apos;re imagining. I&apos;m especially drawn
                  to thoughtful product work — clear interfaces, solid systems,
                  and problems that reward careful engineering.
                </p>
              </Reveal>

              <RevealStagger className="mt-8" delayMs={280} staggerMs={80}>
                {socialLinks.map((link) => {
                  const Icon = socialIcons[link.icon];
                  return (
                    <RevealItem key={link.id} variant="left">
                      <a
                        href={link.href}
                        target={link.icon === "email" ? undefined : "_blank"}
                        rel={
                          link.icon === "email"
                            ? undefined
                            : "noopener noreferrer"
                        }
                        className="group flex items-center justify-between border-t border-border py-4 transition-colors last:border-b hover:bg-white/[0.02]"
                      >
                        <span className="flex items-center gap-3">
                          <Icon className="h-4 w-4 text-accent" />
                          <span className="text-sm">{link.label}</span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                      </a>
                    </RevealItem>
                  );
                })}
              </RevealStagger>

              <Reveal variant="up" delayMs={380} durationMs={750}>
                <p className="mt-6 font-mono text-[0.68rem] tracking-[0.14em] text-subtle uppercase">
                  Direct · {siteConfig.email}
                </p>
              </Reveal>
            </div>

            <Reveal variant="right" delayMs={120} durationMs={850}>
              <form onSubmit={onSubmit} noValidate>
                <label className="block border-t border-border py-4">
                  <span className="mb-2 block font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
                    Name
                  </span>
                  <input
                    required
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    className="field-line"
                  />
                </label>

                <label className="block border-t border-border py-4">
                  <span className="mb-2 block font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
                    Email
                  </span>
                  <input
                    required
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@domain.com"
                    className="field-line"
                  />
                </label>

                <label className="block border-y border-border py-4">
                  <span className="mb-2 block font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
                    Message
                  </span>
                  <textarea
                    required
                    name="message"
                    placeholder="What should we build?"
                    className="field-line min-h-28 resize-y"
                  />
                </label>

                {/* Honeypot: invisible to people, traps bots (FormSubmit _honey) */}
                <input
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn btn-primary mt-6 w-full disabled:cursor-wait disabled:opacity-60"
                >
                  {status === "sending" ? "Sending..." : "Send message"}
                  <ArrowUpRight className="h-4 w-4" />
                </button>

                <p
                  className="mt-4 text-center font-mono text-[0.68rem] text-subtle"
                  aria-live="polite"
                >
                  {status === "sent"
                    ? "Message sent successfully."
                    : status === "error"
                      ? "Message could not be sent. Please try again."
                      : "Replies within a day."}
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
