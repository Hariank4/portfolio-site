import { cn } from "@/lib/cn";
import { Eyebrow } from "./eyebrow";

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
}: {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <Eyebrow index={index}>{eyebrow}</Eyebrow>
      <h2 className="text-balance font-display text-[clamp(1.9rem,4vw,3.2rem)] font-medium leading-[1.08] tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="max-w-[60ch] text-balance text-base leading-relaxed text-fg-muted md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
