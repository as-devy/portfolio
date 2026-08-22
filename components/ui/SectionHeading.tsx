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
        <p className={cn("eyebrow mb-4", align === "center" && "justify-center")}>
          {eyebrow}
        </p>
      </Reveal>

      <RevealWords
        text={title}
        align={align}
        className="display-title text-[clamp(2.1rem,5vw,3.6rem)] text-foreground"
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
