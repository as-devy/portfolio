import {
  atmosphereSnippets,
  atmosphereSymbols,
  fallingGlyphs,
} from "@/data/hero-atmosphere";
import { highlightCodeLine } from "@/lib/highlight-code";

/**
 * Pure background layer — JS/TS snippets scattered across the hero.
 * Edit data/hero-atmosphere.ts to change copy or positions.
 */
export function CodeAtmosphere() {
  return (
    <div className="code-atmosphere" aria-hidden>
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.16) 1px, transparent 0)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }}
      />

      {fallingGlyphs.map((glyph) => (
        <span
          key={glyph.id}
          className="code-fall"
          style={{
            left: glyph.left,
            animationDelay: glyph.delay,
            animationDuration: glyph.duration,
          }}
        >
          {glyph.char}
        </span>
      ))}

      {atmosphereSnippets.map((snippet) => (
        <div
          key={snippet.id}
          className="code-snippet code-snippet-typing"
          style={{
            top: snippet.top,
            bottom: snippet.bottom,
            left: snippet.left,
            right: snippet.right,
            ["--snippet-delay" as string]: snippet.delay,
            ["--snippet-duration" as string]: snippet.duration,
          }}
        >
          <div className="code-file-label">
            <span className={`code-lang-badge ${snippet.lang}`}>
              {snippet.lang}
            </span>
            {snippet.file}
          </div>
          {snippet.lines.map((line, index) => (
            <div
              key={`${snippet.id}-${index}`}
              className="code-type-line"
              style={{
                animationDelay: `calc(var(--snippet-delay) + ${index * 0.45}s)`,
                animationDuration: "var(--snippet-duration)",
              }}
              dangerouslySetInnerHTML={{ __html: highlightCodeLine(line) }}
            />
          ))}
        </div>
      ))}

      {atmosphereSymbols.map((symbol) => (
        <span
          key={symbol.id}
          className="float-symbol text-lg md:text-2xl"
          style={{
            top: symbol.top,
            bottom: symbol.bottom,
            left: symbol.left,
            right: symbol.right,
            animationDelay: symbol.delay,
          }}
        >
          {symbol.char}
        </span>
      ))}
    </div>
  );
}
