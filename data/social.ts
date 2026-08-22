import type { SocialLink } from "@/types";
import { siteConfig } from "./site";

export const socialLinks: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/as-devy",
    icon: "github",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/omar-elbedwehy-981a65328/",
    icon: "linkedin",
  },
  {
    id: "email",
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    icon: "email",
  },
];
