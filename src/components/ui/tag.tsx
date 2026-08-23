import { cn } from "@/lib/cn";

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-wide text-fg-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
