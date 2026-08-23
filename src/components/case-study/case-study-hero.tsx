import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tag } from "@/components/ui/tag";
import type { Project } from "@/content/projects";

export function CaseStudyHero({ project }: { project: Project }) {
  return (
    <header className="border-b border-border pt-12 pb-16 md:pt-16 md:pb-20">
      <Container>
        <Link
          href="/#work"
          className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to work
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <StatusBadge status={project.status} />
          <span className="text-xs uppercase tracking-wide text-fg-faint">
            {project.timeframe}
          </span>
        </div>

        <h1 className="mt-6 max-w-4xl text-balance font-display text-[clamp(2.4rem,6vw,4.6rem)] font-medium leading-[1.04] tracking-tight">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-balance text-lg text-fg-muted md:text-xl">
          {project.subtitle}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        {project.links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-4">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-accent hover:underline"
              >
                {link.label} →
              </a>
            ))}
          </div>
        )}
      </Container>
    </header>
  );
}
