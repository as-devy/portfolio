/**
 * Skills & certificates data loaded from env (server-only).
 *
 * Catalog source (first hit wins):
 *   1. SKILLS_JSON / CERTIFICATES_JSON — inline JSON array
 *   2. Bundled content/*.json (edit those files to add/remove items)
 *
 * Then optionally merge extras & filter:
 *   SKILLS_EXTRA / CERTIFICATES_EXTRA — JSON array appended (or upsert by id)
 *   SKILLS / CERTIFICATES             — comma ids = ordered allowlist
 *   SKILLS_HIDE / CERTIFICATES_HIDE   — comma ids to remove
 *   SKILL_CATEGORY_*                  — toggle whole categories
 *
 * Restart `next dev` after changing env or JSON files.
 */

import bundledCertificates from "@/content/certificates.json";
import bundledSkills from "@/content/skills.json";
import type { Certificate, SkillCategory, SkillNode } from "@/types";

const SKILL_CATEGORIES: SkillCategory[] = [
  "design",
  "frontend",
  "backend",
  "data",
  "security",
  "devops",
  "ai",
];

function parseFlag(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined || value.trim() === "") return fallback;
  const normalized = value.trim().toLowerCase();
  if (["true", "1", "yes", "on"].includes(normalized)) return true;
  if (["false", "0", "no", "off"].includes(normalized)) return false;
  return fallback;
}

function readEnv(...keys: string[]): string | undefined {
  for (const key of keys) {
    const value = process.env[key];
    if (value !== undefined && value.trim() !== "") return value;
  }
  return undefined;
}

function parseIdList(value: string | undefined): string[] | null {
  if (value === undefined || value.trim() === "") return null;
  const ids = value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  return ids.length > 0 ? ids : null;
}

function parseJsonArray<T>(raw: string | undefined, label: string): T[] | null {
  if (raw === undefined || raw.trim() === "") return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      console.warn(`[content-data] ${label} must be a JSON array — ignored`);
      return null;
    }
    return parsed as T[];
  } catch (error) {
    console.warn(`[content-data] Failed to parse ${label}:`, error);
    return null;
  }
}

function upsertById<T extends { id: string }>(base: T[], extras: T[]): T[] {
  const map = new Map(base.map((item) => [item.id, item]));
  for (const item of extras) {
    map.set(item.id, item);
  }
  const seen = new Set<string>();
  const result: T[] = [];
  for (const item of base) {
    const next = map.get(item.id);
    if (next) {
      result.push(next);
      seen.add(item.id);
    }
  }
  for (const item of extras) {
    if (!seen.has(item.id)) {
      result.push(item);
      seen.add(item.id);
    }
  }
  return result;
}

function applyIdFilters<T extends { id: string }>(
  items: T[],
  allow: string[] | null,
  deny: string[] | null,
): T[] {
  const byId = new Map(items.map((item) => [item.id, item]));

  if (allow) {
    return allow
      .map((id) => byId.get(id))
      .filter((item): item is T => item !== undefined);
  }

  if (deny) {
    const hidden = new Set(deny);
    return items.filter((item) => !hidden.has(item.id));
  }

  return items;
}

function isCategoryEnabled(category: SkillCategory): boolean {
  const key = category.toUpperCase();
  return parseFlag(
    readEnv(`SKILL_CATEGORY_${key}`, `NEXT_PUBLIC_SKILL_CATEGORY_${key}`),
    true,
  );
}

function loadSkillsCatalog(): SkillNode[] {
  const inline = parseJsonArray<SkillNode>(
    readEnv("SKILLS_JSON", "NEXT_PUBLIC_SKILLS_JSON"),
    "SKILLS_JSON",
  );
  if (inline) return inline;
  return bundledSkills as SkillNode[];
}

function loadCertificatesCatalog(): Certificate[] {
  const inline = parseJsonArray<Certificate>(
    readEnv("CERTIFICATES_JSON", "NEXT_PUBLIC_CERTIFICATES_JSON"),
    "CERTIFICATES_JSON",
  );
  if (inline) return inline;
  return bundledCertificates as Certificate[];
}

/** Resolved skills after env extras + filters. */
export function getVisibleSkills(): SkillNode[] {
  let catalog = loadSkillsCatalog();

  const extras = parseJsonArray<SkillNode>(
    readEnv("SKILLS_EXTRA", "NEXT_PUBLIC_SKILLS_EXTRA"),
    "SKILLS_EXTRA",
  );
  if (extras?.length) {
    catalog = upsertById(catalog, extras);
  }

  const allow = parseIdList(readEnv("SKILLS", "NEXT_PUBLIC_SKILLS"));
  const deny = parseIdList(readEnv("SKILLS_HIDE", "NEXT_PUBLIC_SKILLS_HIDE"));
  const filtered = applyIdFilters(catalog, allow, deny);

  return filtered.filter((skill) => {
    const category = skill.category as SkillCategory;
    if (!SKILL_CATEGORIES.includes(category)) return true;
    return isCategoryEnabled(category);
  });
}

/** Resolved certificates after env extras + filters. */
export function getVisibleCertificates(): Certificate[] {
  let catalog = loadCertificatesCatalog();

  const extras = parseJsonArray<Certificate>(
    readEnv("CERTIFICATES_EXTRA", "NEXT_PUBLIC_CERTIFICATES_EXTRA"),
    "CERTIFICATES_EXTRA",
  );
  if (extras?.length) {
    catalog = upsertById(catalog, extras);
  }

  const allow = parseIdList(
    readEnv("CERTIFICATES", "NEXT_PUBLIC_CERTIFICATES"),
  );
  const deny = parseIdList(
    readEnv("CERTIFICATES_HIDE", "NEXT_PUBLIC_CERTIFICATES_HIDE"),
  );

  return applyIdFilters(catalog, allow, deny);
}
