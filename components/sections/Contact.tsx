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
        <div className="overflow-hidden rounded-[1.75rem] border border-border bg-[radial-gradient(ellipse_80%_60%_at_10%_0%,rgba(34,211,238,0.12),transparent_50%),radial-gradient(ellipse_60%_50%_at_90%_100%,rgba(124,108,255,0.12),transparent_55%),rgba(8,12,20,0.75)]">
          <div className="grid gap-10 p-6 md:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:p-14">
            <div>
              <Reveal variant="left" durationMs={850}>
                <p className="eyebrow mb-5">05 — Contact</p>
              </Reveal>
              <Reveal variant="blur" delayMs={80} durationMs={900}>
                <h2 className="display-title text-[clamp(2.4rem,6vw,4.4rem)]">
                  Have an idea
                  <span className="block text-transparent bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text">
                    worth building?
                  </span>
                </h2>
              </Reveal>
              <Reveal variant="up" delayMs={180} durationMs={800}>
                <p className="lede mt-5">
                  Tell me what you&apos;re imagining. I&apos;m especially drawn
                  to thoughtful product work — clear interfaces, solid systems,
                  and problems that reward careful engineering.
                </p>
              </Reveal>

              <RevealStagger
                className="mt-8 space-y-3"
                delayMs={280}
                staggerMs={80}
              >
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
                        className="group flex items-center justify-between rounded-xl border border-border bg-white/[0.02] px-4 py-3 transition-colors hover:border-accent/30 hover:bg-accent/5"
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
            </div>

            <Reveal variant="right" delayMs={120} durationMs={850}>
              <form
                onSubmit={onSubmit}
                className="glass rounded-2xl p-5 md:p-6"
                noValidate
              >
                <label className="mb-4 block">
                  <span className="mb-2 block font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
                    Name
                  </span>
                  <input
                    required
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    className="field"
                  />
                </label>

                <label className="mb-4 block">
                  <span className="mb-2 block font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
                    Email
                  </span>
                  <input
                    required
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@domain.com"
                    className="field"
                  />
                </label>

                <label className="mb-6 block">
                  <span className="mb-2 block font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">
                    Message
                  </span>
                  <textarea
                    required
                    name="message"
                    placeholder="What should we build?"
                    className="field"
                  />
                </label>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn btn-primary w-full disabled:cursor-wait disabled:opacity-60"
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
                      : `Direct: ${siteConfig.email}`}
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
