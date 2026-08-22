"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

function subscribeMedia(query: string, onChange: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => subscribeMedia(query, onChange),
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * Soft glass ring cursor — desktop / fine pointer only.
 * Expands slightly over interactive targets.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const finePointer = useMediaQuery("(pointer: fine)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = finePointer && !reduceMotion;

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-custom-cursor");

    const isInteractive = (el: EventTarget | null) => {
      if (!(el instanceof Element)) return false;
      return Boolean(
        el.closest(
          "a, button, input, textarea, select, label, [role='button'], summary, .skill-chip",
        ),
      );
    };

    const onMove = (event: MouseEvent) => {
      target.current = { x: event.clientX, y: event.clientY };
      setVisible(true);
      setActive(isInteractive(event.target));
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setActive(true);
    const onUp = (event: MouseEvent) => setActive(isInteractive(event.target));

    const tick = () => {
      const t = target.current;
      const c = current.current;
      c.x += (t.x - c.x) * 0.22;
      c.y += (t.y - c.y) * 0.22;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${t.x}px, ${t.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${c.x}px, ${c.y}px, 0) translate(-50%, -50%)`;
      }

      if (Math.abs(t.x - c.x) > 0.1 || Math.abs(t.y - c.y) > 0.1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] hidden lg:block"
      aria-hidden
    >
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        data-visible={visible ? "true" : "false"}
        data-active={active ? "true" : "false"}
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        data-visible={visible ? "true" : "false"}
        data-active={active ? "true" : "false"}
      />
    </div>
  );
}
