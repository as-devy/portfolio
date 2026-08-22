/**
 * Section visibility flags from env (server-only).
 *
 * Prefer these in `.env.local` (no NEXT_PUBLIC_ needed):
 *   SECTION_HOME=true
 *   SECTION_ABOUT=false
 *
 * NEXT_PUBLIC_SECTION_* is still accepted for compatibility.
 *
 * Accepted truthy: true | 1 | yes | on
 * Accepted falsy:  false | 0 | no | off
 * Missing vars default to enabled.
 */

export type SectionId =
  | "home"
  | "about"
  | "education"
  | "projects"
  | "certificates"
  | "contact";

const SECTION_ENV_KEYS: Record<SectionId, readonly [string, string]> = {
  home: ["SECTION_HOME", "NEXT_PUBLIC_SECTION_HOME"],
  about: ["SECTION_ABOUT", "NEXT_PUBLIC_SECTION_ABOUT"],
  education: ["SECTION_EDUCATION", "NEXT_PUBLIC_SECTION_EDUCATION"],
  projects: ["SECTION_PROJECTS", "NEXT_PUBLIC_SECTION_PROJECTS"],
  certificates: ["SECTION_CERTIFICATES", "NEXT_PUBLIC_SECTION_CERTIFICATES"],
  contact: ["SECTION_CONTACT", "NEXT_PUBLIC_SECTION_CONTACT"],
};

function parseFlag(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined || value.trim() === "") return fallback;

  const normalized = value.trim().toLowerCase();

  if (["true", "1", "yes", "on"].includes(normalized)) return true;
  if (["false", "0", "no", "off"].includes(normalized)) return false;

  return fallback;
}

function readSectionFlag(id: SectionId, fallback = true): boolean {
  const [primary, legacy] = SECTION_ENV_KEYS[id];
  const value = process.env[primary] ?? process.env[legacy];
  return parseFlag(value, fallback);
}

export function getSectionFlags(): Record<SectionId, boolean> {
  return {
    home: readSectionFlag("home"),
    about: readSectionFlag("about"),
    education: readSectionFlag("education"),
    projects: readSectionFlag("projects"),
    certificates: readSectionFlag("certificates"),
    contact: readSectionFlag("contact"),
  };
}

/** Evaluated on the server per request/build — do not import into client modules. */
export const sectionFlags = getSectionFlags();

export function isSectionEnabled(id: SectionId): boolean {
  return sectionFlags[id];
}

/** First enabled section after `after` — useful for scroll CTAs */
export function getNextEnabledSection(
  after: SectionId = "home",
  flags: Record<SectionId, boolean> = sectionFlags,
): SectionId | null {
  const order: SectionId[] = [
    "home",
    "about",
    "education",
    "projects",
    "certificates",
    "contact",
  ];
  const start = order.indexOf(after);

  for (let i = start + 1; i < order.length; i += 1) {
    const id = order[i];
    if (id && flags[id]) return id;
  }

  return null;
}
