"use client";

import { cn } from "@/lib/cn";
import { usePersistedAttribute } from "@/lib/use-persisted-attribute";

const STYLES = ["sharp", "fluid", "minimal"] as const;

const LABELS: Record<(typeof STYLES)[number], string> = {
  sharp: "Sharp",
  fluid: "Fluid",
  minimal: "Minimal",
};

export function VisualStyleToggle({ className }: { className?: string }) {
  const [style, setStyle] = usePersistedAttribute({
    attribute: "data-style",
    storageKey: "visualStyle",
    values: STYLES,
    fallback: "sharp",
  });

  return (
    <div
      role="radiogroup"
      aria-label="Visual style"
      className={cn(
        "flex items-center gap-0.5 rounded-full border border-border p-0.5",
        className,
      )}
    >
      {STYLES.map((value) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={style === value}
          onClick={() => setStyle(value)}
          className={cn(
            // Only `color` transitions: animating the active pill's background
            // lets it be caught part-applied (a throttled tab freezes the
            // transition), leaving two buttons looking equally selected.
            "rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wider transition-[color]",
            style === value
              ? "bg-accent text-accent-fg"
              : "text-fg-muted hover:text-fg",
          )}
        >
          {LABELS[value]}
        </button>
      ))}
    </div>
  );
}
