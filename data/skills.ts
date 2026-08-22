import type { SkillCategory, SkillGroup, SkillLayer, SkillNode } from "@/types";

export const skillCategories: Array<{
  id: SkillCategory;
  label: string;
  blurb: string;
}> = [
  {
    id: "design",
    label: "Design",
    blurb: "Structure, clarity, and craft in the product surface.",
  },
  {
    id: "frontend",
    label: "Frontend",
    blurb: "Languages, libraries, and frameworks for building modern web interfaces.",
  },
  {
    id: "backend",
    label: "Backend",
    blurb: "APIs, server-side logic, and services that power the product.",
  },
  {
    id: "data",
    label: "Data",
    blurb: "Persistence, queries, and application data flows.",
  },
  {
    id: "security",
    label: "Security",
    blurb: "Auth, API hardening, and secure-by-default delivery habits.",
  },
  {
    id: "devops",
    label: "DevOps & CI/CD",
    blurb: "Version control, pipelines, and portable runtime environments.",
  },
  {
    id: "ai",
    label: "AI Engineering",
    blurb: "Integrating intelligent capabilities into modern web applications.",
  },
];

export const stackJourney: Array<{ id: SkillLayer; label: string }> = [
  { id: "design", label: "Design" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "data", label: "Data" },
  { id: "security", label: "Security" },
  { id: "devops", label: "DevOps" },
  { id: "ai", label: "AI" },
];

export const frontendGroups: Array<{ id: SkillGroup; label: string }> = [
  { id: "languages", label: "Languages" },
  { id: "libraries", label: "Libraries" },
  { id: "frameworks", label: "Frameworks" },
  { id: "quality", label: "Quality" },
];

/**
 * Desktop map positions kept for compatibility.
 * Visual ecosystem renders category cards from this list.
 *
 * Cloud providers are intentionally omitted — only list a provider
 * once there is clear hands-on experience to speak to in interviews.
 */
export const skills: SkillNode[] = [
  // Design
  {
    id: "figma",
    label: "Figma",
    category: "design",
    layer: "design",
    role: "Design",
    icon: "figma",
    emphasis: "primary",
    description: "Where product surfaces are shaped before they become code.",
    related: ["ux", "a11y", "tailwind", "react"],
    map: { x: 9, y: 28 },
  },
  {
    id: "ux",
    label: "UI/UX Design",
    category: "design",
    layer: "design",
    role: "Design",
    icon: "ux",
    description: "Flows, hierarchy, and decisions that make interfaces feel intentional.",
    related: ["figma", "a11y", "css", "react"],
    map: { x: 9, y: 48 },
  },
  {
    id: "a11y",
    label: "Accessibility",
    category: "design",
    layer: "design",
    role: "Design",
    icon: "a11y",
    description: "Inclusive patterns so products work for more people, not fewer.",
    related: ["ux", "html", "react", "css"],
    map: { x: 9, y: 68 },
  },

  // Frontend — Languages
  {
    id: "html",
    label: "HTML",
    category: "frontend",
    layer: "frontend",
    role: "Language",
    group: "languages",
    icon: "html",
    description: "Semantic structure that keeps interfaces durable and accessible.",
    related: ["css", "a11y", "react", "next"],
    map: { x: 27, y: 16 },
  },
  {
    id: "css",
    label: "CSS",
    category: "frontend",
    layer: "frontend",
    role: "Language",
    group: "languages",
    icon: "css",
    description: "Layout, rhythm, and visual systems that hold under real use.",
    related: ["html", "tailwind", "bootstrap", "react"],
    map: { x: 27, y: 26 },
  },
  {
    id: "js",
    label: "JavaScript",
    category: "frontend",
    layer: "frontend",
    role: "Language",
    group: "languages",
    icon: "javascript",
    description: "The language underneath interactive product behavior in the browser.",
    related: ["ts", "react", "node", "express"],
    map: { x: 27, y: 36 },
  },
  {
    id: "ts",
    label: "TypeScript",
    category: "frontend",
    layer: "frontend",
    role: "Language",
    group: "languages",
    icon: "typescript",
    emphasis: "primary",
    description: "Typed contracts across UI and services — fewer surprises, clearer systems.",
    related: ["js", "react", "next", "node", "express"],
    map: { x: 27, y: 46 },
  },

  // Frontend — Libraries
  {
    id: "tailwind",
    label: "Tailwind CSS",
    category: "frontend",
    layer: "frontend",
    role: "Library",
    group: "libraries",
    icon: "tailwind",
    emphasis: "primary",
    description: "Utility-first styling for fast, consistent interface systems.",
    related: ["css", "react", "next", "figma"],
    map: { x: 38, y: 28 },
  },
  {
    id: "bootstrap",
    label: "Bootstrap",
    category: "frontend",
    layer: "frontend",
    role: "Library",
    group: "libraries",
    icon: "bootstrap",
    description: "Component-oriented CSS toolkit for rapid, responsive layouts.",
    related: ["css", "html", "js"],
    map: { x: 38, y: 40 },
  },

  // Frontend — Frameworks
  {
    id: "react",
    label: "React",
    category: "frontend",
    layer: "frontend",
    role: "Framework",
    group: "frameworks",
    icon: "react",
    emphasis: "primary",
    description: "Component model for building interfaces as composable systems.",
    related: ["next", "ts", "tailwind", "testing-fe", "rest"],
    map: { x: 38, y: 56 },
  },
  {
    id: "next",
    label: "Next.js",
    category: "frontend",
    layer: "frontend",
    role: "Framework",
    group: "frameworks",
    icon: "next",
    emphasis: "primary",
    description: "Full-stack React framework bridging interface and server concerns.",
    related: ["react", "ts", "tailwind", "rest", "node"],
    map: { x: 38, y: 68 },
  },

  // Frontend — Quality
  {
    id: "testing-fe",
    label: "Testing (Jest / Vitest)",
    category: "frontend",
    layer: "frontend",
    role: "Testing",
    group: "quality",
    icon: "testing",
    description: "Unit and component tests that lock in UI behavior as the product evolves.",
    related: ["react", "ts", "next", "web-vitals"],
    map: { x: 38, y: 80 },
  },
  {
    id: "web-vitals",
    label: "Web Performance",
    category: "frontend",
    layer: "frontend",
    role: "Performance",
    group: "quality",
    icon: "performance",
    description: "Measuring and improving load, interactivity, and visual stability in real UIs.",
    related: ["next", "react", "testing-fe"],
    map: { x: 38, y: 90 },
  },

  // Backend
  {
    id: "node",
    label: "Node.js",
    category: "backend",
    layer: "backend",
    role: "Runtime",
    icon: "node",
    emphasis: "primary",
    description: "JavaScript runtime for APIs, services, and server-side logic.",
    related: ["express", "ts", "rest", "docker", "js"],
    map: { x: 55, y: 14 },
  },
  {
    id: "express",
    label: "Express.js",
    category: "backend",
    layer: "backend",
    role: "Framework",
    icon: "express",
    emphasis: "primary",
    description: "Lightweight HTTP layer for routing, middleware, and API shape.",
    related: ["node", "rest", "mongo", "pg", "graphql"],
    map: { x: 55, y: 24 },
  },
  {
    id: "rest",
    label: "REST APIs",
    category: "backend",
    layer: "backend",
    role: "API",
    icon: "rest",
    emphasis: "primary",
    description: "Clear request/response contracts between clients and services.",
    related: ["express", "next", "graphql", "pg", "jwt-oauth"],
    map: { x: 55, y: 34 },
  },
  {
    id: "graphql",
    label: "GraphQL",
    category: "backend",
    layer: "backend",
    role: "API",
    icon: "graphql",
    description: "Flexible query APIs when clients need precise, composable data shapes.",
    related: ["rest", "node", "express", "pg"],
    map: { x: 55, y: 54 },
  },
  {
    id: "websockets",
    label: "WebSockets / Event-driven",
    category: "backend",
    layer: "backend",
    role: "Realtime",
    icon: "websocket",
    description: "Realtime and event-driven patterns for live updates and async workflows.",
    related: ["node", "express", "rest", "graphql"],
    map: { x: 55, y: 64 },
  },
  {
    id: "prisma",
    label: "Prisma ORM",
    category: "backend",
    layer: "backend",
    role: "ORM",
    icon: "prisma",
    description: "Type-safe ORM for modeling schemas and querying databases from Node apps.",
    related: ["pg", "sql", "node", "express"],
    map: { x: 55, y: 74 },
  },

  // Data
  {
    id: "mongo",
    label: "MongoDB",
    category: "data",
    layer: "data",
    role: "Database",
    icon: "mongo",
    description: "Document database for flexible product data models.",
    related: ["express", "node", "rest", "docker"],
    map: { x: 70, y: 20 },
  },
  {
    id: "pg",
    label: "PostgreSQL",
    category: "data",
    layer: "data",
    role: "Database",
    icon: "postgres",
    emphasis: "primary",
    description: "Relational foundation for structured, queryable application data.",
    related: ["sql", "prisma", "express", "rest"],
    map: { x: 70, y: 34 },
  },
  {
    id: "sql",
    label: "SQL",
    category: "data",
    layer: "data",
    role: "Language",
    icon: "sql",
    description: "Query language for reading and shaping relational data precisely.",
    related: ["pg", "prisma", "rest", "express"],
    map: { x: 70, y: 48 },
  },

  // Security
  {
    id: "jwt-oauth",
    label: "JWT / OAuth2",
    category: "security",
    layer: "security",
    role: "Auth",
    icon: "auth",
    emphasis: "primary",
    description: "Token-based identity and delegated access patterns used in modern APIs.",
    related: ["api-security", "express", "rest", "owasp"],
    map: { x: 86, y: 24 },
  },
  {
    id: "api-security",
    label: "API Security",
    category: "security",
    layer: "security",
    role: "Security",
    icon: "security",
    description: "Hardening endpoints — validation, rate limits, and threat-aware defaults.",
    related: ["jwt-oauth", "owasp", "rest", "express"],
    map: { x: 86, y: 42 },
  },
  {
    id: "owasp",
    label: "OWASP Fundamentals",
    category: "security",
    layer: "security",
    role: "Security",
    icon: "owasp",
    description: "Core web risk patterns and mitigations from the OWASP lens.",
    related: ["api-security", "jwt-oauth", "rest", "express"],
    map: { x: 86, y: 78 },
  },

  // DevOps & CI/CD
  {
    id: "git",
    label: "Git",
    category: "devops",
    layer: "devops",
    role: "Version Control",
    icon: "git",
    description: "Version control for disciplined collaboration and change history.",
    related: ["github", "docker", "kubernetes"],
    map: { x: 30, y: 88 },
  },
  {
    id: "github",
    label: "GitHub",
    category: "devops",
    layer: "devops",
    role: "Platform",
    icon: "github",
    description: "Collaboration platform for repositories, reviews, and delivery.",
    related: ["git", "docker", "kubernetes"],
    map: { x: 40, y: 88 },
  },
  {
    id: "docker",
    label: "Docker",
    category: "devops",
    layer: "devops",
    role: "Containerization",
    icon: "docker",
    description: "Containerized environments that keep services portable and repeatable.",
    related: ["kubernetes", "node", "git", "github"],
    map: { x: 60, y: 88 },
  },
  {
    id: "kubernetes",
    label: "Kubernetes",
    category: "devops",
    layer: "devops",
    role: "Orchestration",
    icon: "kubernetes",
    description: "Container orchestration basics for deploying and scaling services.",
    related: ["docker", "github", "git"],
    map: { x: 70, y: 88 },
  },

  // AI Engineering
  {
    id: "ai-agents",
    label: "Agentic AI / AI Agents",
    category: "ai",
    layer: "ai",
    role: "AI",
    icon: "agents",
    emphasis: "primary",
    description: "Building agent-style workflows that plan, tool-call, and complete tasks.",
    related: ["rag", "vector-search", "openrouter", "prompt"],
    map: { x: 48, y: 18 },
  },
  {
    id: "rag",
    label: "RAG",
    category: "ai",
    layer: "ai",
    role: "AI",
    icon: "rag",
    description: "Retrieval-augmented generation for grounded, context-aware answers.",
    related: ["vector-search", "ai-agents", "openrouter", "pg"],
    map: { x: 48, y: 32 },
  },
  {
    id: "vector-search",
    label: "Vector Search",
    category: "ai",
    layer: "ai",
    role: "AI",
    icon: "vector",
    description: "Semantic retrieval over embeddings — the retrieval half of modern AI apps.",
    related: ["rag", "huggingface", "pg", "ai-agents"],
    map: { x: 48, y: 46 },
  },
  {
    id: "prompt",
    label: "Prompt Engineering",
    category: "ai",
    layer: "ai",
    role: "AI",
    icon: "prompt",
    description: "Structuring prompts and tool instructions so model output stays reliable.",
    related: ["ai-agents", "openrouter", "rag"],
    map: { x: 48, y: 60 },
  },
  {
    id: "openrouter",
    label: "OpenRouter",
    category: "ai",
    layer: "ai",
    role: "AI API",
    icon: "openrouter",
    description: "Multi-model API access for integrating LLMs into application backends.",
    related: ["ai-agents", "rag", "prompt"],
    map: { x: 48, y: 74 },
  },
  {
    id: "huggingface",
    label: "Hugging Face",
    category: "ai",
    layer: "ai",
    role: "AI",
    icon: "huggingface",
    description: "Models and tooling for experimenting with and shipping AI features.",
    related: ["vector-search", "rag", "ai-agents"],
    map: { x: 48, y: 88 },
  },
];

export const identityAxes = [
  {
    id: "fullstack",
    title: "Full-stack thinking",
    lead: "From interface to infrastructure.",
    copy: "I connect frontend, APIs, data, and infrastructure into products that work as one system.",
  },
  {
    id: "product-ux",
    title: "Product & UI/UX",
    lead: "Technology should feel intuitive.",
    copy: "I combine engineering with UI/UX thinking to create interfaces that are clear, responsive, and purposeful.",
  },
  {
    id: "security",
    title: "Security mindset",
    lead: "Build it. Then challenge it.",
    copy: "I bring security thinking into development by exploring web vulnerabilities, authentication, and defensive practices.",
  },
] as const;

export function getSkillById(id: string): SkillNode | undefined {
  return skills.find((skill) => skill.id === id);
}

/** Unique undirected edges from related[] for SVG connections */
export function getSkillEdges(): Array<{ id: string; from: string; to: string }> {
  const seen = new Set<string>();
  const edges: Array<{ id: string; from: string; to: string }> = [];

  for (const skill of skills) {
    for (const relatedId of skill.related) {
      if (!getSkillById(relatedId)) continue;
      const key = [skill.id, relatedId].sort().join("::");
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ id: key, from: skill.id, to: relatedId });
    }
  }

  return edges;
}
