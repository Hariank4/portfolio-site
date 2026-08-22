import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic-button";
import { RevealOnScroll } from "@/components/ui/reveal";
import { profile } from "@/content/profile";

export function Contact() {
  return (
    <section id="contact" aria-label="Contact" className="py-24 md:py-36">
      <Container>
        <Eyebrow index="07">Contact</Eyebrow>
        <RevealOnScroll>
          <h2 className="mt-6 max-w-3xl text-balance font-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-medium leading-[1.05] tracking-tight">
            Have something worth building?
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-fg-muted">
            I&apos;m always open to talking about AI systems, product ideas, or internships and
            roles where I can build something real. The fastest way to reach me is email.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2} className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <Button href={`mailto:${profile.email}`}>
              Email me <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Magnetic>
          <Button href={profile.resume.href} variant="outline">
            Download résumé
          </Button>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3} className="mt-14 flex flex-wrap gap-x-10 gap-y-3 border-t border-border pt-8">
          {profile.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <span>{s.label}</span>
              <span className="text-fg-faint">{s.handle}</span>
            </a>
          ))}
        </RevealOnScroll>
      </Container>
    </section>
  );
}
