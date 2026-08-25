import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealOnScroll } from "@/components/ui/reveal";
import { Photo } from "@/components/ui/photo";
import { creativeItems, creativeImages, creativeQuote } from "@/content/creative";

const [anchor, ...rest] = creativeImages;

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

        {/* Anchor portrait left, two stacked shots right. The right column
            stretches to the anchor's height so the two columns end level;
            fixed aspect ratios on both sides would leave them ragged. */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-[1.15fr_1fr]">
          <RevealOnScroll>
            <Photo image={anchor} className="aspect-[4/5]" />
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-6 md:h-full md:grid-rows-2">
            {rest.map((image, i) => (
              <RevealOnScroll
                key={image.src}
                delay={(i + 1) * 0.08}
                className="md:min-h-0"
              >
                <Photo image={image} className="aspect-[16/10] md:aspect-auto md:h-full" />
              </RevealOnScroll>
            ))}
          </div>
        </div>

        <RevealOnScroll delay={0.1}>
          <p className="mx-auto mt-16 max-w-3xl text-balance text-center font-display text-2xl italic leading-snug text-fg-muted md:text-3xl">
            {creativeQuote}
          </p>
        </RevealOnScroll>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
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
