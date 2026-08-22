import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealOnScroll } from "@/components/ui/reveal";
import { creativeItems } from "@/content/creative";

export function Creative() {
  return (
    <section id="creative" aria-label="Creative side" className="border-b border-border py-24 md:py-32">
      <Container>
        <SectionHeading
          index="05"
          eyebrow="Creative side"
          title="The same instinct for structure, pointed somewhere else."
          description="Music and film aren't a side note here — they run on the same instinct for clarity and pacing as the engineering work."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {creativeItems.map((item, i) => (
            <RevealOnScroll
              key={item.title}
              delay={i * 0.08}
              className="border-t border-border pt-6"
            >
              <h3 className="font-display text-xl font-medium">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{item.description}</p>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
