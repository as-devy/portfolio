import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: readonly string[];
  className?: string;
  speedSec?: number;
}

/**
 * Decorative scrolling divider strip. Pure CSS animation, duplicated content,
 * hidden from assistive tech, paused under reduced motion.
 */
export function Marquee({ items, className, speedSec = 36 }: MarqueeProps) {
  return (
    <div className={cn("marquee", className)} aria-hidden="true">
      <div
        className="marquee-track"
        style={{ animationDuration: `${speedSec}s` }}
      >
        {[0, 1, 2, 3, 4, 5].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {items.map((item, index) => (
              <span key={`${half}-${index}`} className="flex items-center">
                <span className="whitespace-nowrap px-6 font-mono text-xs tracking-[0.22em] text-subtle uppercase md:text-sm">
                  {item}
                </span>
                <span className="h-1.5 w-1.5 rotate-45 bg-accent/70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
