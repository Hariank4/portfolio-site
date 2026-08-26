import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealOnScroll } from "@/components/ui/reveal";
import { Photo } from "@/components/ui/photo";
import {
  googleBadges,
  googleProfileUrl,
  infosysCertificates,
  innovationAmbassadorCertificates,
  type CertificateImage,
} from "@/content/credentials";

function CertificateGrid({
  certificates,
  gridClassName,
  aspectClassName,
}: {
  certificates: CertificateImage[];
  gridClassName: string;
  aspectClassName: string;
}) {
  return (
    <div className={gridClassName}>
      {certificates.map((cert, i) => (
        <RevealOnScroll key={cert.title} delay={i * 0.05}>
          <Photo
            image={{ src: cert.src, alt: cert.alt, caption: `${cert.title} · ${cert.date}` }}
            className={aspectClassName}
            sizes="(min-width: 640px) 45vw, 100vw"
          />
        </RevealOnScroll>
      ))}
    </div>
  );
}

export function Credentials() {
  return (
    <section id="credentials" aria-label="Credentials" className="border-b border-border py-24 md:py-32">
      <Container>
        <SectionHeading
          index="06"
          eyebrow="Credentials"
          title="Training I put in outside class."
        />

        <div className="mt-14">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xs uppercase tracking-wide text-fg-faint">Google Skills</h3>
            <a
              href={googleProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1 text-sm text-fg-muted transition-colors hover:text-accent"
            >
              View live profile <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {googleBadges.map((badge, i) => (
              <RevealOnScroll key={badge.title} delay={i * 0.05}>
                <Photo
                  image={{ src: badge.src, alt: badge.alt }}
                  className="aspect-square bg-transparent"
                  fit="contain"
                  sizes="(min-width: 768px) 20vw, 33vw"
                />
              </RevealOnScroll>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-xs uppercase tracking-wide text-fg-faint">Infosys Springboard</h3>
          <CertificateGrid
            certificates={infosysCertificates}
            gridClassName="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
            aspectClassName="aspect-[8/5]"
          />
        </div>

        <div className="mt-16">
          <h3 className="text-xs uppercase tracking-wide text-fg-faint">Innovation Ambassador</h3>
          <CertificateGrid
            certificates={innovationAmbassadorCertificates}
            gridClassName="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3"
            aspectClassName="aspect-[4/3]"
          />
        </div>
      </Container>
    </section>
  );
}
