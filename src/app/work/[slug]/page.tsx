import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects, getProjectBySlug } from "@/content/projects";
import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import { CaseStudySection } from "@/components/case-study/case-study-section";
import { ArchitectureDiagram } from "@/components/case-study/architecture-diagram";
import { SpecList, ChallengeList } from "@/components/case-study/spec-list";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";
import { PhotoCarousel } from "@/components/ui/photo-carousel";

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

  const hasGallery = project.gallery && project.gallery.length > 0;

  // Everything in the gallery below the lead image, plus the carousel if
  // there is one, shares a single row — 2 across, or 3 when there are that
  // many. Only meaningful when there's a separate gallery lead; a project
  // with just a carousel (no gallery) renders that carousel alone, below.
  const details = project.gallery?.slice(1) ?? [];
  const detailCount = details.length + (hasGallery && project.carousel ? 1 : 0);

  return (
    <article>
      <CaseStudyHero project={project} />

      {/* Deliberately unnumbered — it sits above "01 Problem" as a lead image.
          Folding it into the numbering would renumber every section below it,
          for the projects that happen to have photographs. */}
      {hasGallery && (
        <Container className="pt-12 md:pt-16">
          <Photo
            image={project.gallery![0]}
            className={project.heroClassName ?? "aspect-[16/10] md:aspect-[2/1]"}
            sizes="(min-width: 768px) 1120px, 100vw"
            priority
          />
          {/* items-start: Photo is h-full, so a stretched row — which is what
              expanding the stack creates — would blow the sibling up with it. */}
          {detailCount > 0 && (
            <div
              className={cn(
                "mt-4 grid grid-cols-1 items-start gap-4",
                detailCount >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
              )}
            >
              {details.map((image) => (
                <Photo
                  key={image.src}
                  image={image}
                  className="aspect-[3/2]"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              ))}
              {project.carousel && (
                <PhotoCarousel
                  images={project.carousel}
                  caption="The team"
                  ariaLabel="Team photographs"
                  className="self-start"
                  frameClassName="aspect-[3/2]"
                />
              )}
            </div>
          )}
        </Container>
      )}

      {/* A project with a carousel but no separate gallery lead — the
          carousel itself is the lead, at heroClassName's shape rather than
          the shared 2-up/3-up detail-row size. */}
      {!hasGallery && project.carousel && (
        <Container className="pt-12 md:pt-16">
          <PhotoCarousel
            images={project.carousel}
            ariaLabel="Prototype photographs"
            className={project.heroWrapperClassName}
            frameClassName={project.heroClassName ?? "aspect-[16/10] md:aspect-[2/1]"}
            priority
          />
        </Container>
      )}

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
                <span className="text-xs text-fg-faint">
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

      {project.priorArt && project.priorArt.length > 0 && (
        <CaseStudySection index="07" title="Prior art">
          {/* Same statement → response shape as Challenges, so ChallengeList
              renders it as-is rather than needing its own component. */}
          <ChallengeList
            items={project.priorArt.map((p) => ({
              challenge: p.approach,
              resolution: p.difference,
            }))}
          />
        </CaseStudySection>
      )}

      <CaseStudySection index={project.priorArt?.length ? "08" : "07"} title="Status">
        <p className="leading-relaxed text-fg-muted">{project.resultsStatus}</p>
      </CaseStudySection>

      <section className="py-20 md:py-28">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-xs uppercase tracking-wide text-fg-faint">Next up</p>
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
