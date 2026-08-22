export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: "home" | "user" | "graduation" | "briefcase" | "award" | "mail";
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: "github" | "linkedin" | "email" | "x";
}

export type SkillCategory =
  | "design"
  | "frontend"
  | "backend"
  | "data"
  | "security"
  | "devops"
  | "ai";

/** Architecture layer used for the stack journey rail */
export type SkillLayer =
  | "design"
  | "frontend"
  | "backend"
  | "data"
  | "security"
  | "devops"
  | "ai";

/** Optional Frontend grouping for Languages → Libraries → Frameworks → Quality */
export type SkillGroup = "languages" | "libraries" | "frameworks" | "quality";

export type SkillIcon =
  | "typescript"
  | "react"
  | "next"
  | "html"
  | "css"
  | "tailwind"
  | "bootstrap"
  | "figma"
  | "node"
  | "express"
  | "mongo"
  | "postgres"
  | "sql"
  | "prisma"
  | "rest"
  | "api"
  | "graphql"
  | "websocket"
  | "security"
  | "auth"
  | "owasp"
  | "git"
  | "github"
  | "docker"
  | "kubernetes"
  | "linux"
  | "ux"
  | "a11y"
  | "javascript"
  | "testing"
  | "performance"
  | "ai"
  | "agents"
  | "rag"
  | "vector"
  | "prompt"
  | "openrouter"
  | "huggingface";

export interface SkillNode {
  id: string;
  label: string;
  category: SkillCategory;
  layer: SkillLayer;
  /** Small role label under the technology name */
  role: string;
  /** Prefer a known SkillIcon id; unknown strings still render with a fallback. */
  icon: SkillIcon | string;
  description: string;
  related: string[];
  emphasis?: "primary" | "secondary";
  /** Frontend-only subcategory grouping */
  group?: SkillGroup;
  /** Desktop map position in % of the ecosystem canvas */
  map: { x: number; y: number };
}

export interface EducationMilestone {
  id: string;
  stage: string;
  status: string;
  detail: string;
  year: string;
}

export type ProjectCategory =
  | "Full Stack"
  | "Frontend"
  | "UI/UX"
  | "Experiment"
  | "Security"
  | "E-Commerce";

export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  accent: string;
  year: string;
  role: string;
  /** Optional screenshot shown inside the browser frame */
  image?: string;
  /** Optional public project brief */
  briefUrl?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  /** Short summary shown in the expanded panel */
  summary: string;
  /** Optional workload / effort note (e.g. "≈ 300 hours") */
  effort?: string;
  /** Concrete outcomes or project focus points */
  highlights?: string[];
  skills: string[];
  image: string;
  verificationUrl?: string;
  credentialId?: string;
}

export interface HeroImageConfig {
  src: string;
  alt: string;
  /** CSS object-position — tweak if you crop a new portrait */
  objectPosition: string;
}

export interface SiteConfig {
  name: string;
  fullName: string;
  role: string;
  title: string;
  description: string;
  email: string;
  location: string;
  url: string;
  heroImage: HeroImageConfig;
}

export type AtmosphereLang = "ts" | "js";

export interface AtmosphereSnippet {
  id: string;
  lang: AtmosphereLang;
  /** Shown as a small file label above the snippet */
  file: string;
  lines: string[];
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  delay: string;
  duration: string;
}

export interface AtmosphereSymbol {
  id: string;
  char: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  delay: string;
}
