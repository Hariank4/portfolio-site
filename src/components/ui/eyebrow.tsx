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
        "eyebrow flex items-center gap-3 text-xs text-fg-muted",
        className,
      )}
    >
      {index && <span className="text-accent">{index}</span>}
      <span>{children}</span>
    </div>
  );
}
