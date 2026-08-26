import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealOnScroll } from "@/components/ui/reveal";
import { PhotoCarousel } from "@/components/ui/photo-carousel";
import { creativeItems, creativeImages, creativeQuote } from "@/content/creative";

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

        <RevealOnScroll className="mt-14">
          <PhotoCarousel
            images={creativeImages}
            ariaLabel="Music and performance photographs"
            className="aspect-[3/2]"
          />
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          {/* Accent, matching the hero's italic second line — the one place
              the palette's 10% colour is allowed to carry a whole sentence. */}
          <p className="mx-auto mt-16 max-w-3xl text-balance text-center font-display text-2xl italic leading-snug text-accent md:text-3xl">
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
