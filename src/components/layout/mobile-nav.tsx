"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { navLinks } from "./nav-links";
import { profile } from "@/content/profile";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    const firstLink = dialogRef.current?.querySelector("a");
    (firstLink as HTMLElement | null)?.focus();

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg"
      >
        <Menu className="h-4 w-4" />
      </button>

      {open &&
        createPortal(
          // Rendered via a portal into <body> rather than in place: the header
          // uses backdrop-blur (a backdrop-filter), which establishes a CSS
          // containing block for fixed-position descendants — without the
          // portal, this dialog's "fixed inset-0" would resolve against the
          // header's own box instead of the viewport.
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-[90] flex flex-col bg-bg"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-display text-lg">{profile.name}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-4 font-display text-3xl text-fg transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-wrap gap-4 px-6 py-8 text-xs uppercase tracking-wide text-fg-muted">
              {profile.socials.map((s) => (
                <a key={s.label} href={s.href} className="hover:text-accent">
                  {s.label}
                </a>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
