"use client";

import { Moon, Sun } from "lucide-react";
import { m } from "framer-motion";
import { usePersistedAttribute } from "@/lib/use-persisted-attribute";

const THEMES = ["dark", "light"] as const;

/**
 * Both icons are always mounted and cross-rotate past each other, so the swap
 * reads as one continuous motion instead of a swap. No AnimatePresence — there
 * is nothing to unmount, and keeping both avoids a layout jump mid-transition.
 */
export function ThemeToggle() {
  const [theme, setTheme] = usePersistedAttribute({
    attribute: "data-theme",
    storageKey: "theme",
    values: THEMES,
    fallback: "light",
  });

  const isDark = theme === "dark";
  const spring = { type: "spring", stiffness: 260, damping: 22 } as const;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border text-fg-muted transition-colors hover:border-accent hover:text-accent"
    >
      <m.span
        className="absolute flex items-center justify-center"
        initial={false}
        animate={{
          rotate: isDark ? 0 : -90,
          scale: isDark ? 1 : 0.4,
          opacity: isDark ? 1 : 0,
        }}
        transition={spring}
      >
        <Sun className="h-4 w-4" />
      </m.span>

      <m.span
        className="absolute flex items-center justify-center"
        initial={false}
        animate={{
          rotate: isDark ? 90 : 0,
          scale: isDark ? 0.4 : 1,
          opacity: isDark ? 0 : 1,
        }}
        transition={spring}
      >
        <Moon className="h-4 w-4" />
      </m.span>
    </button>
  );
}
