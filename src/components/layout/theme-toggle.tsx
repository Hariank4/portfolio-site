"use client";

import { Moon, Sun } from "lucide-react";
import { usePersistedAttribute } from "@/lib/use-persisted-attribute";

const THEMES = ["dark", "light"] as const;

export function ThemeToggle() {
  const [theme, setTheme] = usePersistedAttribute({
    attribute: "data-theme",
    storageKey: "theme",
    values: THEMES,
    fallback: "dark",
  });

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:border-accent hover:text-accent"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
