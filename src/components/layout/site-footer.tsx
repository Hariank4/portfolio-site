import Link from "next/link";
import { Container } from "@/components/ui/container";
import { profile } from "@/content/profile";
import { navLinks } from "./nav-links";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Link href="/" className="font-display text-xl font-medium text-fg">
            {profile.name}
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-fg-muted">{profile.tagline}</p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-wide text-fg-faint">Site</span>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-fg-muted hover:text-fg">
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs uppercase tracking-wide text-fg-faint">Elsewhere</span>
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="text-sm text-fg-muted hover:text-fg"
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-border py-6 text-xs text-fg-faint md:flex-row md:items-center md:justify-between">
        <span>© {year} {profile.name}. Built from scratch with Next.js.</span>
        <span>{profile.location}</span>
      </Container>
    </footer>
  );
}
