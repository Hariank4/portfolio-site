import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RevealOnScroll } from "@/components/ui/reveal";
import type { ReactNode } from "react";

export function CaseStudySection({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-border py-16 md:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[220px_1fr] md:gap-14">
          <Eyebrow index={index}>{title}</Eyebrow>
          <RevealOnScroll className="max-w-3xl">{children}</RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
