import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BrowserFrameProps {
  url: string;
  accent: string;
  children: ReactNode;
  className?: string;
  contentAspectRatio?: number;
}

export function BrowserFrame({
  url,
  accent,
  children,
  className,
  contentAspectRatio = 16 / 10,
}: BrowserFrameProps) {
  return (
    <div className={cn("browser-chrome", className)}>
      <div className="browser-bar">
        <span className="browser-dot" style={{ background: "#f87171" }} />
        <span className="browser-dot" style={{ background: "#fbbf24" }} />
        <span className="browser-dot" style={{ background: "#34d399" }} />
        <div className="browser-url">{url.replace(/^https?:\/\//, "")}</div>
        <span
          aria-hidden
          className="ml-2 hidden h-2 w-2 rounded-full sm:block"
          style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
        />
      </div>
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: contentAspectRatio }}
      >
        {children}
      </div>
    </div>
  );
}
