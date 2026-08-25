import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { navLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";
import { ScrollProgress } from "./scroll-progress";
import { MobileNav } from "./mobile-nav";
import { AskJinxButton } from "./ask-jinx-button";
import { MouseEyes } from "@/components/ui/mouse-eyes";
import { profile } from "@/content/profile";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between md:h-20">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo-mark.png"
              alt=""
              width={32}
              height={32}
              priority
              className="rounded-full"
            />
            <span className="font-display text-lg text-fg transition-colors hover:text-accent">
              {profile.name}
            </span>
          </Link>
          <MouseEyes />
        </div>

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
            className="hidden text-sm text-fg-muted transition-colors hover:text-fg lg:inline"
            download
          >
            {profile.resume.label}
          </a>
          <AskJinxButton name={profile.assistantName} />
          <ThemeToggle />
          <MobileNav />
        </div>
      </Container>
      <ScrollProgress />
    </header>
  );
}
