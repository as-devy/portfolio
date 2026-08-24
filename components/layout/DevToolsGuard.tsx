"use client";

import { useEffect } from "react";

export function DevToolsGuard({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (enabled) return;

    const prevent = (event: Event) => event.preventDefault();
    const blockDevToolsShortcuts = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const modifier = event.ctrlKey || event.metaKey;
      const blocked =
        key === "f12" ||
        (modifier && event.shiftKey && ["i", "j", "c"].includes(key)) ||
        (modifier && key === "u");

      if (blocked) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    document.addEventListener("contextmenu", prevent);
    window.addEventListener("keydown", blockDevToolsShortcuts, true);

    return () => {
      document.removeEventListener("contextmenu", prevent);
      window.removeEventListener("keydown", blockDevToolsShortcuts, true);
    };
  }, [enabled]);

  return null;
}
