import Link from "next/link";
import { Container } from "@/components/ui/container";
import { navLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { profile } from "@/content/profile";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="font-display text-lg font-medium tracking-tight text-fg transition-colors hover:text-accent"
        >
          {profile.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-fg-muted transition-colors hover:text-fg"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={profile.resume.href}
            className="hidden text-sm text-fg-muted transition-colors hover:text-fg md:inline"
            download
          >
            {profile.resume.label}
          </a>
          <ThemeToggle />
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
