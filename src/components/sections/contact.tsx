import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RevealOnScroll } from "@/components/ui/reveal";
import { profile } from "@/content/profile";

/**
 * Label + value rows, one per channel. Email is pulled to the front rather than
 * added separately — `profile.socials` already carries it, and listing it twice
 * is the bug this ordering avoids.
 */
const rows = [
  ...[...profile.socials].sort((a, b) =>
    a.label === "Email" ? -1 : b.label === "Email" ? 1 : 0,
  ),
  { label: "Résumé", handle: "Download PDF", href: profile.resume.href },
];

export function Contact() {
  return (
    <section id="contact" aria-label="Contact" className="py-24 md:py-36">
      <Container>
        <Eyebrow index="07">Contact</Eyebrow>

        <RevealOnScroll>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.06] text-balance">
            Let&apos;s build
            <br />
            <span className="italic text-accent">something real.</span>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <p className="mt-8 max-w-xl text-balance text-lg leading-relaxed text-fg-muted">
            I&apos;m always open to talking about AI systems, product ideas, or internships and
            roles where I can build something real. The fastest way to reach me is email.
          </p>
        </RevealOnScroll>

        <ul className="mt-16 border-t border-border">
          {rows.map((row, i) => (
            <RevealOnScroll key={row.label} as="li" delay={i * 0.05}>
              <a
                href={row.href}
                target={row.href.startsWith("http") ? "_blank" : undefined}
                rel={row.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group grid grid-cols-[7rem_1fr_auto] items-center gap-6 border-b border-border py-6 transition-colors hover:text-accent md:grid-cols-[10rem_1fr_auto] md:py-8"
              >
                <span className="eyebrow text-[11px] text-fg-faint">{row.label}</span>
                <span className="font-display text-lg italic md:text-2xl">{row.handle}</span>
                <ArrowRight className="h-4 w-4 text-fg-faint transition-transform group-hover:translate-x-1 group-hover:text-accent" />
              </a>
            </RevealOnScroll>
          ))}
        </ul>
      </Container>
    </section>
  );
}
