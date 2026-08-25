import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealOnScroll } from "@/components/ui/reveal";
import { creativeItems, creativeImages, type CreativeImage } from "@/content/creative";

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
            <Figure image={anchor} className="aspect-[4/5]" />
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-6 md:h-full md:grid-rows-2">
            {rest.map((image, i) => (
              <RevealOnScroll
                key={image.src}
                delay={(i + 1) * 0.08}
                className="md:min-h-0"
              >
                <Figure image={image} className="aspect-[16/10] md:aspect-auto md:h-full" />
              </RevealOnScroll>
            ))}
          </div>
        </div>

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

function Figure({ image, className }: { image: CreativeImage; className?: string }) {
  return (
    <figure
      className={`relative h-full overflow-hidden rounded-lg bg-bg-raised-2 ${className ?? ""}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 768px) 45vw, 100vw"
        className="object-cover"
        style={image.position ? { objectPosition: image.position } : undefined}
      />
      {image.caption && (
        <figcaption className="eyebrow absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-10 text-[11px] text-white">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}
