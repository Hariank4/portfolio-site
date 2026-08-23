import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealOnScroll } from "@/components/ui/reveal";
import { skillGroups } from "@/content/skills";

export function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="border-b border-border py-24 md:py-32">
      <Container>
        <SectionHeading
          index="03"
          eyebrow="Skills & stack"
          title="The tools I actually reach for."
        />

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => (
            <RevealOnScroll key={group.title} delay={i * 0.06}>
              <h3 className="text-xs uppercase tracking-wide text-fg-faint">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.items.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-fg md:text-base">
                    {item}
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
