import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealOnScroll } from "@/components/ui/reveal";
import { profile } from "@/content/profile";

export function About() {
  return (
    <section id="about" aria-label="About" className="border-b border-border py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-[1fr_1.1fr]">
          <SectionHeading
            index="01"
            eyebrow="About"
            title={profile.aboutLead}
          />

          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              {profile.aboutBody.map((paragraph, i) => (
                <RevealOnScroll key={i} delay={i * 0.05}>
                  <p className="max-w-[65ch] text-balance leading-relaxed text-fg-muted md:text-lg">
                    {paragraph}
                  </p>
                </RevealOnScroll>
              ))}
              <RevealOnScroll delay={0.1} className="pt-2 text-sm text-fg-faint">
                {profile.education.degree} · {profile.education.school} ·{" "}
                {profile.education.detail}
              </RevealOnScroll>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {profile.pillars.map((pillar, i) => (
                <RevealOnScroll
                  key={pillar.key}
                  delay={i * 0.08}
                  className="rounded-lg border border-border bg-bg-raised p-5"
                >
                  <h3 className="font-display text-lg font-medium text-accent">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {pillar.description}
                  </p>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
