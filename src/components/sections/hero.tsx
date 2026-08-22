"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic-button";
import { RevealText } from "@/components/ui/reveal";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/content/profile";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative overflow-hidden border-b border-border pt-20 pb-20 md:pt-28 md:pb-28"
    >
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_40%,transparent_100%)]" />

      <Container className="relative">
        <motion.p
          initial={shouldReduceMotion ? undefined : { opacity: 0 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.25em] text-fg-muted"
        >
          {profile.roles.join(" · ")}
        </motion.p>

        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.6rem,7vw,5.6rem)] font-medium leading-[1.02] tracking-tight text-balance">
          <RevealText text={profile.name} />
          <br />
          <RevealText
            text={profile.tagline}
            delay={0.15}
            wordClassName="italic text-fg-muted"
          />
        </h1>

        <motion.p
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 max-w-2xl text-balance text-lg leading-relaxed text-fg-muted"
        >
          {profile.heroSubline}
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <Button href="/#work" size="md">
              Explore my work
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Magnetic>
          <Button href="/#contact" variant="outline" size="md">
            Let&apos;s talk
          </Button>
          <a
            href={profile.socials[0].href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            View GitHub <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
