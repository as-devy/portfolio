"use client";

import { useEffect, useState } from "react";

const MIN_MS = 1400;
const MAX_MS = 8000;
const EXIT_MS = 650;

const LINES = [
  "> initializing secure session...",
  "> verifying integrity  [ OK ]",
  "> compiling interface...",
];

type Phase = "loading" | "granted" | "exit" | "done";

export function SiteLoader() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let loaded = document.readyState === "complete";
    let finished = false;
    const timers: number[] = [];

    const finish = () => {
      if (finished) return;
      finished = true;
      setProgress(100);
      setPhase("granted");
      timers.push(
        window.setTimeout(() => setPhase("exit"), 650),
        window.setTimeout(() => {
          setPhase("done");
        }, 650 + EXIT_MS),
      );
    };

    const onLoad = () => {
      loaded = true;
    };
    window.addEventListener("load", onLoad);

    const tick = window.setInterval(() => {
      const elapsed = performance.now() - start;
      // ease toward 90% while waiting, jump to 100% when ready
      setProgress((p) => Math.min(90, Math.max(p, (elapsed / MIN_MS) * 90)));
      if ((loaded && elapsed >= MIN_MS) || elapsed >= MAX_MS) {
        window.clearInterval(tick);
        finish();
      }
    }, 60);

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearInterval(tick);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  useEffect(() => {
    if (phase === "done") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className="site-loader"
      data-phase={phase}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="site-loader-scan" aria-hidden />
      <div className="site-loader-core">
        <div className="site-loader-emblem" aria-hidden>
          <span className="site-loader-brace site-loader-brace-l">{"{"}</span>
          <svg viewBox="0 0 120 140" className="site-loader-shield">
            <path
              className="site-loader-shield-path"
              d="M60 8 L108 26 V68 C108 98 88 120 60 132 C32 120 12 98 12 68 V26 Z"
              pathLength={1}
            />
            <g className="site-loader-lock">
              <rect x="40" y="62" width="40" height="32" rx="6" />
              <path d="M47 62 V52 a13 13 0 0 1 26 0 V62" fill="none" />
              <circle cx="60" cy="76" r="3.5" className="site-loader-keyhole" />
            </g>
          </svg>
          <span className="site-loader-brace site-loader-brace-r">{"}"}</span>
        </div>

        <p className="site-loader-name">SWE.OmarElbedwehy</p>

        <div className="site-loader-terminal" aria-hidden>
          {LINES.map((line, i) => (
            <p
              key={line}
              className="site-loader-line"
              style={{ animationDelay: `${0.35 + i * 0.5}s` }}
            >
              {line}
            </p>
          ))}
        </div>

        <div className="site-loader-bar" aria-hidden>
          <span style={{ width: `${progress}%` }} />
        </div>
        <p className="site-loader-status" aria-hidden>
          {phase === "loading" ? `${Math.round(progress)}%` : "ACCESS GRANTED"}
        </p>
      </div>
    </div>
  );
}
