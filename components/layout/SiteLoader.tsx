"use client";

import { useEffect, useRef, useState } from "react";

const MIN_MS = 2000;
const MAX_MS = 9000;
const GRANT_MS = 600;
const EXIT_MS = 1000;
const NAME = "Omar Elbedwehy";
const GLYPHS = "01{}<>/\\[]#$%&*+=_ABCDEF";
const RING_R = 74;
const RING_LEN = 2 * Math.PI * RING_R;

const STEPS = [
  { at: 0, text: "Establishing secure connection" },
  { at: 28, text: "Verifying integrity" },
  { at: 56, text: "Compiling interface" },
  { at: 86, text: "Finalizing" },
];

type Phase = "loading" | "granted" | "exit" | "done";

function scramble(progress: number) {
  // resolve letters left to right as progress goes 0 -> 1
  const reveal = Math.floor(progress * NAME.length);
  return NAME.split("")
    .map((c, i) => {
      if (c === " ") return " ";
      if (i < reveal) return c;
      return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    })
    .join("");
}

export function SiteLoader() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState(() => NAME.replace(/[^ ]/g, "·"));
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const start = performance.now();
    let loaded = document.readyState === "complete";
    let finished = false;
    let raf = 0;
    let shown = 0;
    const timers: number[] = [];

    const onLoad = () => {
      loaded = true;
    };
    window.addEventListener("load", onLoad);

    const finish = () => {
      finished = true;
      setProgress(100);
      setTitle(NAME);
      setPhase("granted");
      timers.push(
        window.setTimeout(() => setPhase("exit"), GRANT_MS),
        window.setTimeout(() => setPhase("done"), GRANT_MS + EXIT_MS),
      );
    };

    const frame = (now: number) => {
      const elapsed = now - start;
      const ready = (loaded && elapsed >= MIN_MS) || elapsed >= MAX_MS;
      // ease to 92% across MIN_MS, creep after that, snap to 100 when ready
      const t = Math.min(1, elapsed / MIN_MS);
      const target = ready
        ? 100
        : Math.min(97, 92 * (1 - Math.pow(1 - t, 3)) + Math.max(0, elapsed - MIN_MS) / 2000);
      shown += (target - shown) * 0.14;
      if (ready && shown > 99.4) {
        finish();
        return;
      }
      setProgress(shown);
      setTitle(reduced.current ? NAME : scramble(Math.min(1, shown / 88)));
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("load", onLoad);
      cancelAnimationFrame(raf);
      timers.forEach((t) => window.clearTimeout(t));
      void finished;
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

  const step = [...STEPS].reverse().find((s) => progress >= s.at) ?? STEPS[0];
  const status = phase === "loading" ? step.text : "Access granted";
  const pct = Math.round(progress);

  return (
    <div
      className="site-loader"
      data-phase={phase}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="sl-panel sl-panel-top" aria-hidden />
      <div className="sl-panel sl-panel-bottom" aria-hidden />

      <div className="sl-hud sl-hud-tl" aria-hidden>
        <i /> SECURE SESSION
      </div>
      <div className="sl-hud sl-hud-tr" aria-hidden>
        TLS 1.3 · AES-256
      </div>
      <div className="sl-hud sl-hud-bl" aria-hidden>
        PORTFOLIO / v2026
      </div>
      <div className="sl-hud sl-hud-br" aria-hidden>
        {String(pct).padStart(3, "0")}%
      </div>

      <div className="sl-stage">
        <div className="sl-emblem" aria-hidden>
          <svg viewBox="0 0 180 180" className="sl-ring">
            <circle className="sl-ring-ticks" cx="90" cy="90" r="84" />
            <circle className="sl-ring-track" cx="90" cy="90" r={RING_R} />
            <circle
              className="sl-ring-arc"
              cx="90"
              cy="90"
              r={RING_R}
              strokeDasharray={RING_LEN}
              strokeDashoffset={RING_LEN * (1 - progress / 100)}
              transform="rotate(-90 90 90)"
            />
          </svg>
          <svg viewBox="0 0 120 140" className="sl-shield">
            <defs>
              <linearGradient id="slg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#22d3ee" />
                <stop offset="1" stopColor="#7c6cff" />
              </linearGradient>
            </defs>
            <path
              className="sl-shield-path"
              d="M60 10 L104 27 V68 C104 96 85 116 60 128 C35 116 16 96 16 68 V27 Z"
              pathLength={1}
            />
            <g className="sl-code">
              <path d="M48 56 L34 70 L48 84" />
              <path d="M72 56 L86 70 L72 84" />
              <path d="M65 52 L55 88" />
            </g>
          </svg>
        </div>

        <h1 className="sl-title" aria-label={NAME}>
          {title}
        </h1>
        <p className="sl-role">Full Stack Developer · Web Security</p>

        <p className="sl-status">
          <span className="sl-status-dot" />
          {status}
          <span className="sl-cursor" />
        </p>
        <div className="sl-bar" aria-hidden>
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
      </div>
    </div>
  );
}
