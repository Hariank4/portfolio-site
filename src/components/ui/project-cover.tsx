import { cn } from "@/lib/cn";
import type { Project } from "@/content/projects";

const accentVar: Record<Project["accent"], string> = {
  coral: "var(--color-accent)",
  cyan: "var(--color-accent-cyan)",
  violet: "var(--color-accent-violet)",
  amber: "var(--color-accent-amber)",
};

/**
 * Generative cover treatment standing in for a product screenshot — no
 * photography was supplied, so each project gets an abstract identity built
 * from its accent color, initials, and a diagram-like grid instead.
 */
export function ProjectCover({ project, className }: { project: Project; className?: string }) {
  const accent = accentVar[project.accent];
  const initials = project.plainTitle
    .split(" ")
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-bg-raised",
        className,
      )}
      style={{ ["--cover-accent" as string]: accent }}
    >
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border-strong) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-strong) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
        aria-hidden
      />
      <div
        className="absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--cover-accent)" }}
        aria-hidden
      />
      <div className="relative flex h-full flex-col justify-between p-6 md:p-8">
        <div className="flex items-center justify-between">
          <span
            className="text-[11px] uppercase tracking-[0.2em]"
            style={{ color: "var(--cover-accent)" }}
          >
            {project.status}
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-fg-faint">
            {project.timeframe.split("·")[0].trim()}
          </span>
        </div>
        <div
          className="font-display text-[clamp(3.5rem,10vw,6rem)] font-medium leading-none"
          style={{ color: "var(--cover-accent)" }}
        >
          {initials}
        </div>
      </div>
    </div>
  );
}
