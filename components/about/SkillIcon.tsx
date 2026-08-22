import {
  Accessibility,
  Binary,
  Bot,
  Boxes,
  Brain,
  CircuitBoard,
  Gauge,
  Globe,
  KeyRound,
  LayoutTemplate,
  MessageSquareCode,
  Network,
  Radio,
  Share2,
  Shield,
  ShieldCheck,
  Sparkles,
  Table2,
  TestTube2,
  type LucideIcon,
} from "lucide-react";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import {
  BootstrapBrandIcon,
  CssBrandIcon,
  DockerBrandIcon,
  ExpressBrandIcon,
  FigmaBrandIcon,
  GitBrandIcon,
  GraphQLBrandIcon,
  HtmlBrandIcon,
  JavaScriptBrandIcon,
  KubernetesBrandIcon,
  MongoBrandIcon,
  NextBrandIcon,
  NodeBrandIcon,
  PostgresBrandIcon,
  PrismaBrandIcon,
  ReactBrandIcon,
  TailwindBrandIcon,
  TypeScriptBrandIcon,
} from "@/components/ui/TechBrandIcons";
import type { SkillIcon as SkillIconId } from "@/types";
import { cn } from "@/lib/utils";
import type { ComponentType, SVGProps } from "react";

type BrandIcon = ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;

/** Real brand marks for languages / libraries / frameworks / core tools */
const brandIconMap: Partial<Record<SkillIconId, BrandIcon>> = {
  html: HtmlBrandIcon,
  css: CssBrandIcon,
  javascript: JavaScriptBrandIcon,
  typescript: TypeScriptBrandIcon,
  react: ReactBrandIcon,
  next: NextBrandIcon,
  tailwind: TailwindBrandIcon,
  bootstrap: BootstrapBrandIcon,
  node: NodeBrandIcon,
  express: ExpressBrandIcon,
  graphql: GraphQLBrandIcon,
  prisma: PrismaBrandIcon,
  figma: FigmaBrandIcon,
  mongo: MongoBrandIcon,
  postgres: PostgresBrandIcon,
  docker: DockerBrandIcon,
  kubernetes: KubernetesBrandIcon,
  git: GitBrandIcon,
  github: GitHubIcon,
};

/** Lucide fallbacks for conceptual / non-brand skills */
const lucideIconMap: Partial<Record<SkillIconId, LucideIcon>> = {
  rest: Globe,
  api: Share2,
  websocket: Radio,
  security: Shield,
  auth: KeyRound,
  owasp: ShieldCheck,
  linux: Boxes,
  ux: LayoutTemplate,
  a11y: Accessibility,
  testing: TestTube2,
  performance: Gauge,
  sql: Table2,
  ai: Sparkles,
  agents: Bot,
  rag: Network,
  vector: Binary,
  prompt: MessageSquareCode,
  openrouter: CircuitBoard,
  huggingface: Brain,
};

interface SkillIconProps {
  /** Known brand/lucide ids, or any string from env/JSON data (falls back to Sparkles). */
  name: SkillIconId | string;
  className?: string;
}

export function SkillIcon({ name, className }: SkillIconProps) {
  const key = name as SkillIconId;
  const Brand = brandIconMap[key];
  if (Brand) {
    return <Brand className={cn("h-4 w-4", className)} aria-hidden />;
  }

  const Icon = lucideIconMap[key] ?? Sparkles;
  return (
    <Icon className={cn("h-4 w-4", className)} strokeWidth={1.7} aria-hidden />
  );
}
