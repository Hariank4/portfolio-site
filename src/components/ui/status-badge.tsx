import { cn } from "@/lib/cn";

const dotColor: Record<string, string> = {
  Live: "bg-emerald-400",
  "Internal MVP": "bg-accent-amber",
  Concept: "bg-accent-violet",
  Prototype: "bg-accent-cyan",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-bg-raised px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-fg-muted",
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", dotColor[status] ?? "bg-fg-muted")} />
      {status}
    </span>
  );
}
