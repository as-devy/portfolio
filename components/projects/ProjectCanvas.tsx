import Image from "next/image";
import { Activity, ExternalLink, ShieldCheck } from "lucide-react";
import type { Project } from "@/types";

interface ProjectCanvasProps {
  project: Project;
}

export function ProjectCanvas({ project }: ProjectCanvasProps) {
  if (project.slug === "mfa-security-testing-lab" && project.image) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#080b12]">
        <div
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,158,11,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <Image
          src={project.image}
          alt={`${project.name} architecture and detection response diagram`}
          fill
          sizes="(min-width: 1024px) 42vw, 92vw"
          className="object-contain object-center px-4 pb-3 pt-10 md:px-8 md:pb-5 md:pt-12"
          priority
        />
      </div>
    );
  }

  if (project.image) {
    return (
      <div className="group/preview relative h-full w-full bg-[#061018]">
        <Image
          src={project.image}
          alt={`${project.name} interface preview`}
          fill
          sizes="(min-width: 1024px) 42vw, 92vw"
          className="object-contain object-center transition duration-500 group-hover/preview:scale-[1.025]"
          priority={project.slug === "paws-safe"}
        />
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex items-center justify-center bg-black/0 text-sm font-medium text-white opacity-0 transition duration-300 hover:bg-black/45 hover:opacity-100 focus-visible:bg-black/45 focus-visible:opacity-100"
          aria-label={`Open ${project.name} live preview`}
        >
          <span className="inline-flex translate-y-2 items-center gap-2 rounded-full border border-white/20 bg-black/65 px-4 py-2 backdrop-blur-md transition-transform duration-300 group-hover/preview:translate-y-0 group-focus-within/preview:translate-y-0">
            Open live preview
            <ExternalLink className="h-3.5 w-3.5" />
          </span>
        </a>
      </div>
    );
  }

  return (
    <div
      className="relative h-full w-full"
      style={{
        background: `
          radial-gradient(ellipse 70% 60% at 20% 20%, ${project.accent}33, transparent 55%),
          radial-gradient(ellipse 50% 50% at 80% 70%, rgba(59,130,246,0.18), transparent 50%),
          linear-gradient(160deg, #0b1220, #070b14 60%, #0a1020)
        `,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center p-5 md:p-8">
        <div className="grid w-full max-w-lg gap-3">
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3 py-2 backdrop-blur-sm">
            <div className="flex gap-1.5">
              <span className="h-2 w-10 rounded-full bg-white/15" />
              <span className="h-2 w-6 rounded-full bg-white/10" />
            </div>
            <span
              className="rounded-full px-2 py-0.5 font-mono text-[0.6rem]"
              style={{
                color: project.accent,
                background: `${project.accent}22`,
              }}
            >
              {project.category}
            </span>
          </div>

          <div className="grid grid-cols-[0.9fr_1.1fr] gap-3">
            <div className="space-y-2 rounded-xl border border-white/10 bg-white/[0.03] p-3">
              {[0.9, 0.65, 0.8, 0.5].map((width, index) => (
                <div
                  key={index}
                  className="h-2 rounded-full bg-white/10"
                  style={{ width: `${width * 100}%` }}
                />
              ))}
              <div
                className="mt-3 h-16 rounded-lg border border-white/10"
                style={{
                  background: `linear-gradient(135deg, ${project.accent}33, transparent)`,
                }}
              />
            </div>
            <div className="space-y-2">
              <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                <p className="font-display text-lg tracking-tight text-white/90">
                  {project.name}
                </p>
                <p className="mt-1 line-clamp-2 text-[0.7rem] leading-relaxed text-white/45">
                  {project.tagline}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-14 rounded-xl border border-white/10 bg-white/[0.03]" />
                <div
                  className="h-14 rounded-xl border border-white/10"
                  style={{ background: `${project.accent}18` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
