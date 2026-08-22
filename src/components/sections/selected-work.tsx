import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeaturedProjectCard, BuildCard } from "@/components/ui/project-card";
import { flagshipProjects, otherBuilds } from "@/content/projects";

export function SelectedWork() {
  return (
    <section id="work" aria-label="Selected work" className="border-b border-border py-24 md:py-32">
      <Container>
        <SectionHeading
          index="02"
          eyebrow="Selected work"
          title="Two products built end to end, from a proposal to something people actually use."
          description="Real internship work at MeraPath — not tutorials, not clones. Each case study covers the problem, the architecture, and what shipped."
        />

        <div className="mt-4">
          {flagshipProjects.map((project, i) => (
            <FeaturedProjectCard
              key={project.slug}
              project={project}
              index={i + 1}
              reverse={i % 2 === 1}
            />
          ))}
        </div>

        <div className="mt-20 border-t border-border pt-14">
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-fg-muted">
            Also building
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {otherBuilds.map((project) => (
              <BuildCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
