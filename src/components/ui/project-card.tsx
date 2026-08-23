import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { ProjectCover } from "./project-cover";
import { StatusBadge } from "./status-badge";
import { Tag } from "./tag";
import { RevealOnScroll } from "./reveal";
import { TiltCard } from "./tilt-card";

export function FeaturedProjectCard({ project, index, reverse }: { project: Project; index: number; reverse?: boolean }) {
  return (
    <RevealOnScroll className="group grid grid-cols-1 items-center gap-8 border-t border-border py-14 first:border-t-0 md:grid-cols-2 md:gap-14">
      <div className={reverse ? "md:order-2" : ""}>
        <Link href={`/work/${project.slug}`} className="block" aria-hidden tabIndex={-1}>
          <TiltCard>
            <ProjectCover project={project} />
          </TiltCard>
        </Link>
      </div>
      <div className={reverse ? "md:order-1" : ""}>
        <div className="flex items-center gap-3">
          <span className="text-xs text-fg-faint">0{index}</span>
          <StatusBadge status={project.status} />
        </div>
        <h3 className="mt-4 font-display text-[clamp(1.7rem,3.2vw,2.6rem)] font-medium leading-[1.1] tracking-tight text-balance">
          <Link
            href={`/work/${project.slug}`}
            className="transition-colors hover:text-accent focus-visible:text-accent"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-fg-muted">{project.subtitle}</p>
        <p className="mt-4 max-w-[55ch] leading-relaxed text-fg-muted">{project.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.slice(0, 5).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <Link
          href={`/work/${project.slug}`}
          className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-accent"
        >
          Read the case study
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </RevealOnScroll>
  );
}

export function BuildCard({ project }: { project: Project }) {
  return (
    <TiltCard max={4}>
      <RevealOnScroll className="group relative flex h-full flex-col gap-4 rounded-lg border border-border bg-bg-raised p-6 transition-colors hover:border-border-strong">
        <div className="flex items-center justify-between">
          <StatusBadge status={project.status} />
          <ArrowUpRight className="h-4 w-4 text-fg-faint transition-colors group-hover:text-accent" aria-hidden />
        </div>
        <div>
          <h3 className="font-display text-xl font-medium">
            <Link href={`/work/${project.slug}`} className="focus-visible:text-accent">
              <span className="absolute inset-0" aria-hidden />
              {project.title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-fg-muted">{project.subtitle}</p>
        </div>
        <p className="text-sm leading-relaxed text-fg-muted">{project.summary}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {project.tech.slice(0, 3).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </RevealOnScroll>
    </TiltCard>
  );
}
