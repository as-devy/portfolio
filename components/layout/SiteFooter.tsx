import { ArrowUp, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { getVisibleNavigation } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { socialLinks } from "@/data/social";
import { getSectionFlags } from "@/lib/section-flags";

const socialIcons = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: Mail,
  x: ArrowUp,
} as const;

export function SiteFooter() {
  const navItems = getVisibleNavigation(getSectionFlags()).filter(
    (item) => item.id !== "home",
  );
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer relative mt-2 overflow-hidden">
      <div aria-hidden className="site-footer-edge" />

      <div className="section-shell relative z-10 !pb-28 !pt-12 lg:!pb-14 lg:!pt-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-md">
            <a
              href="#home"
              className="font-display text-[clamp(2.4rem,6vw,3.5rem)] leading-none tracking-[-0.04em] text-foreground transition-colors hover:text-white"
            >
              {siteConfig.name}
            </a>
            <p className="mt-3 text-sm leading-relaxed text-muted md:text-[0.95rem]">
              {siteConfig.role}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.14em] text-subtle uppercase">
              <span
                aria-hidden
                className="site-footer-pulse h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--glow)]"
              />
              {siteConfig.location}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:gap-16">
            {navItems.length > 0 ? (
              <nav aria-label="Footer">
                <p className="font-mono text-[0.65rem] tracking-[0.16em] text-subtle uppercase">
                  Navigate
                </p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                      >
                        <span
                          aria-hidden
                          className="h-px w-3 bg-white/15 transition-all duration-300 group-hover:w-5 group-hover:bg-accent"
                        />
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}

            <div>
              <p className="font-mono text-[0.65rem] tracking-[0.16em] text-subtle uppercase">
                Connect
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {socialLinks.map((link) => {
                  const Icon = socialIcons[link.icon];
                  return (
                    <li key={link.id}>
                      <a
                        href={link.href}
                        target={link.icon === "email" ? undefined : "_blank"}
                        rel={
                          link.icon === "email"
                            ? undefined
                            : "noopener noreferrer"
                        }
                        aria-label={link.label}
                        className="site-footer-social inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] text-muted backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-accent/8 hover:text-accent"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-4 inline-block text-sm text-muted transition-colors hover:text-accent"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>

        <div className="site-footer-bar mt-12 flex flex-col gap-4 pt-6 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <p className="font-mono text-[0.7rem] tracking-wide text-subtle">
              © {year} {siteConfig.fullName}
            </p>
          </div>

          <a
            href="#home"
            className="site-footer-top group inline-flex items-center gap-2 self-start font-mono text-[0.68rem] tracking-[0.14em] text-subtle uppercase transition-colors hover:text-accent sm:self-auto"
          >
            Top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
