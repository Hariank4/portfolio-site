import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects, getProjectBySlug } from "@/content/projects";
import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import { CaseStudySection } from "@/components/case-study/case-study-section";
import { ArchitectureDiagram } from "@/components/case-study/architecture-diagram";
import { SpecList, ChallengeList } from "@/components/case-study/spec-list";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.plainTitle,
    description: project.summary,
    openGraph: {
      title: `${project.plainTitle} — Case Study`,
      description: project.summary,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.plainTitle} — Case Study`,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <article>
      <CaseStudyHero project={project} />

      <CaseStudySection index="01" title="Problem">
        <p className="text-balance text-lg leading-relaxed text-fg md:text-xl">
          {project.problem}
        </p>
      </CaseStudySection>

      <CaseStudySection index="02" title="Why it matters">
        <p className="leading-relaxed text-fg-muted">{project.whyItMatters}</p>
      </CaseStudySection>

      {project.whatIBuilt.length > 0 && (
        <CaseStudySection index="03" title="What I built">
          <ul className="flex flex-col gap-4">
            {project.whatIBuilt.map((line, i) => (
              <li key={i} className="flex gap-3 leading-relaxed text-fg-muted">
                <span className="font-mono text-xs text-fg-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </CaseStudySection>
      )}

      {project.architecture.length > 0 && (
        <CaseStudySection index="04" title="Architecture">
          <ArchitectureDiagram steps={project.architecture} />
        </CaseStudySection>
      )}

      {project.features.length > 0 && (
        <CaseStudySection index="05" title="Key features">
          <SpecList items={project.features} />
        </CaseStudySection>
      )}

      {project.challenges.length > 0 && (
        <CaseStudySection index="06" title="Challenges">
          <ChallengeList items={project.challenges} />
        </CaseStudySection>
      )}

      <CaseStudySection index="07" title="Status">
        <p className="leading-relaxed text-fg-muted">{project.resultsStatus}</p>
      </CaseStudySection>

      <section className="py-20 md:py-28">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-fg-faint">Next up</p>
            <Link
              href={`/work/${nextProject.slug}`}
              className="mt-3 inline-flex items-center gap-2 font-display text-2xl font-medium transition-colors hover:text-accent md:text-3xl"
            >
              {nextProject.title}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <Button href="/#contact" variant="outline">
            Get in touch
          </Button>
        </Container>
      </section>
    </article>
  );
}
