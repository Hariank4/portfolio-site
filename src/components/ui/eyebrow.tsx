import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  index,
  className,
}: {
  children: React.ReactNode;
  index?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-fg-muted",
        className,
      )}
    >
      {index && <span className="text-accent">{index}</span>}
      <span>{children}</span>
    </div>
  );
}
