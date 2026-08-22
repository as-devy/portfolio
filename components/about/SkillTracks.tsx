"use client";

import { SkillsJourney } from "@/components/about/SkillsJourney";
import type { SkillNode } from "@/types";

export function SkillTracks({ skills }: { skills: SkillNode[] }) {
  return <SkillsJourney skills={skills} />;
}
