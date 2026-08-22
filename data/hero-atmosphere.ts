import type { AtmosphereSnippet, AtmosphereSymbol } from "@/types";

/**
 * JS / TypeScript snippets scattered across the hero background.
 * Positions are absolute — tweak top/left/right/bottom to rearrange.
 */
export const atmosphereSnippets: AtmosphereSnippet[] = [
  {
    id: "types",
    lang: "ts",
    file: "types.ts",
    top: "10%",
    left: "3%",
    delay: "0s",
    duration: "13s",
    lines: [
      "type Route = {",
      "  path: string;",
      "  secure: boolean;",
      "};",
    ],
  },
  {
    id: "component",
    lang: "js",
    file: "Shell.jsx",
    top: "12%",
    right: "3%",
    delay: "0.8s",
    duration: "13s",
    lines: [
      "export function Shell({ children }) {",
      "  return <Layout secure>{children}</Layout>",
      "}",
    ],
  },
  {
    id: "api-ts",
    lang: "ts",
    file: "api.ts",
    top: "38%",
    left: "2%",
    delay: "1.6s",
    duration: "14s",
    lines: [
      "export async function getUser(",
      "  id: string",
      "): Promise<User> {",
      "  return db.user.find(id);",
      "}",
    ],
  },
  {
    id: "fetch",
    lang: "js",
    file: "client.js",
    top: "42%",
    right: "2%",
    delay: "2.2s",
    duration: "14s",
    lines: [
      "const res = await fetch('/api/v1');",
      "const data = await res.json();",
      "console.log(data.ok);",
    ],
  },
  {
    id: "hooks",
    lang: "ts",
    file: "useSession.ts",
    bottom: "24%",
    left: "5%",
    delay: "2.8s",
    duration: "15s",
    lines: [
      "export function useSession() {",
      "  const [user, setUser] =",
      "    useState<User | null>(null);",
      "  return { user, setUser };",
      "}",
    ],
  },
  {
    id: "utils",
    lang: "js",
    file: "utils.js",
    bottom: "20%",
    right: "4%",
    delay: "3.4s",
    duration: "12s",
    lines: [
      "export const cn = (...c) =>",
      "  c.filter(Boolean).join(' ');",
    ],
  },
  {
    id: "guard",
    lang: "ts",
    file: "guard.ts",
    top: "58%",
    left: "28%",
    delay: "1.2s",
    duration: "14s",
    lines: [
      "const isAuthed = (u: User | null)",
      "  : u is User => Boolean(u);",
    ],
  },
  {
    id: "config",
    lang: "js",
    file: "config.js",
    top: "64%",
    right: "22%",
    delay: "3.8s",
    duration: "13s",
    lines: [
      "export const API_URL = '/api/v1';",
      "export const TIMEOUT = 8000;",
    ],
  },
];

export const atmosphereSymbols: AtmosphereSymbol[] = [
  { id: "s1", char: "{ }", top: "28%", left: "22%", delay: "0s" },
  { id: "s2", char: "</>", top: "56%", right: "26%", delay: "1.4s" },
  { id: "s3", char: "=>", top: "34%", right: "32%", delay: "2.2s" },
  { id: "s4", char: "[]", bottom: "32%", left: "32%", delay: "0.8s" },
  { id: "s5", char: "()", top: "70%", left: "48%", delay: "1.8s" },
];

export const fallingGlyphs = [
  { id: "f1", char: "{", left: "8%", delay: "0s", duration: "12s" },
  { id: "f2", char: ";", left: "18%", delay: "2s", duration: "14s" },
  { id: "f3", char: "/", left: "32%", delay: "4s", duration: "13s" },
  { id: "f4", char: ">", left: "48%", delay: "1s", duration: "15s" },
  { id: "f5", char: "=", left: "62%", delay: "3s", duration: "12s" },
  { id: "f6", char: "}", left: "74%", delay: "5s", duration: "14s" },
  { id: "f7", char: "*", left: "86%", delay: "2.5s", duration: "13s" },
  { id: "f8", char: ":", left: "40%", delay: "6s", duration: "16s" },
];
