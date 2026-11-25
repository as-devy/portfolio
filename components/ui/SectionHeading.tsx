"use client";

import { Reveal, RevealWords } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-14",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Reveal variant="left" delayMs={0} durationMs={700}>
        <div className={cn("flex items-center gap-5", align === "center" && "justify-center")}>
          <p className="eyebrow">
            {eyebrow}
          </p>
          <span aria-hidden className="hairline-x min-w-8 flex-1" />
        </div>
      </Reveal>

      <RevealWords
        text={title}
        align={align}
        className="display-title mt-5 text-[clamp(2.2rem,5.2vw,4rem)] text-foreground"
        delayMs={70}
        staggerMs={48}
      />

      {description ? (
        <Reveal variant="blur" delayMs={220} durationMs={850}>
          <p
            className={cn(
              "lede mt-5",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
