import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TimelineRow } from "@/components/ui/timeline-row";
import { experience, activities } from "@/content/experience";

export function Experience() {
  return (
    <section id="experience" aria-label="Experience" className="border-b border-border py-24 md:py-32">
      <Container>
        <SectionHeading
          index="04"
          eyebrow="Experience"
          title="Where the work happened."
        />

        <ul className="mt-4">
          {experience.map((item) => (
            <TimelineRow key={`${item.title}-${item.org}`} item={item} />
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-border pt-8">
          {activities.map((activity) => (
            <span key={activity} className="text-sm text-fg-muted">
              {activity}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
