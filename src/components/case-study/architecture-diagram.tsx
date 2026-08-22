import { ArrowRight } from "lucide-react";
import type { ArchitectureStep } from "@/content/projects";

export function ArchitectureDiagram({ steps }: { steps: ArchitectureStep[] }) {
  if (steps.length === 0) return null;

  return (
    <ol className="flex flex-col gap-0 md:flex-row md:flex-wrap md:items-stretch md:gap-0">
      {steps.map((step, i) => (
        <li key={step.label} className="flex items-stretch md:flex-1 md:min-w-[180px]">
          <div className="flex w-full flex-col gap-1.5 rounded-lg border border-border bg-bg-raised p-4">
            <span className="font-mono text-[11px] uppercase tracking-wide text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-base font-medium">{step.label}</span>
            <span className="text-xs leading-relaxed text-fg-muted">{step.detail}</span>
          </div>
          {i < steps.length - 1 && (
            <div className="flex shrink-0 items-center justify-center px-2 text-fg-faint md:px-3">
              <ArrowRight className="h-4 w-4 rotate-90 md:rotate-0" aria-hidden />
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
