import type { SectionId } from "@/lib/section-flags";
import type { NavItem } from "@/types";

export const allNavigation: NavItem[] = [
  { id: "home", label: "Home", href: "#home", icon: "home" },
  { id: "about", label: "About", href: "#about", icon: "user" },
  { id: "education", label: "Education", href: "#education", icon: "graduation" },
  { id: "projects", label: "Work", href: "#projects", icon: "briefcase" },
  { id: "certificates", label: "Credentials", href: "#certificates", icon: "award" },
  { id: "contact", label: "Contact", href: "#contact", icon: "mail" },
];

export function getVisibleNavigation(
  flags: Record<SectionId, boolean>,
): NavItem[] {
  return allNavigation.filter((item) => flags[item.id as SectionId]);
}
