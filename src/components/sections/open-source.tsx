import { ArrowUpRight, GitBranch, Terminal } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealOnScroll } from "@/components/ui/reveal";
import { profile } from "@/content/profile";

const workflow = [
  "Claude Code & Cursor for day-to-day development",
  "Git & GitHub for everything, always",
  "Vercel for shipping fast, safely",
];

export function OpenSource() {
  const github = profile.socials.find((s) => s.label === "GitHub");

  return (
    <section id="code" aria-label="Code & open source" className="border-b border-border py-24 md:py-32">
      <Container>
        <SectionHeading
          index="06"
          eyebrow="Code"
          title="Most of what I build lives in the open."
        />

        <RevealOnScroll className="mt-12 flex flex-col items-start gap-6 rounded-lg border border-border bg-bg-raised p-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <GitBranch className="mt-1 h-6 w-6 shrink-0 text-accent" aria-hidden />
            <div>
              <p className="font-display text-xl font-medium">{github?.handle}</p>
              <p className="mt-1 max-w-md text-sm text-fg-muted">
                Repositories, experiments, and the code behind the projects on this site.
              </p>
            </div>
          </div>
          {github && (
            <a
              href={github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border-strong px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              View profile <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="mt-6 flex items-start gap-4">
          <Terminal className="mt-1 h-5 w-5 shrink-0 text-fg-faint" aria-hidden />
          <ul className="flex flex-col gap-1.5 text-sm text-fg-muted">
            {workflow.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
