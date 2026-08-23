import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
// Weight-only build, not `full`: Fraunces ships optical-size, SOFT and WONK
// axes we never vary, and dropping them cuts the latin display font from
// ~268KB to ~84KB. Same family name, so nothing else changes.
import "@fontsource-variable/fraunces/wght.css";
import "@fontsource-variable/fraunces/wght-italic.css";
import "./globals.css";
import { MotionProvider } from "@/components/motion-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ChatWidget } from "@/components/chat/chat-widget";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { skillGroups } from "@/content/skills";
import { SITE_URL } from "@/lib/constants";

// Fonts are fully self-hosted (the `geist` package and Fontsource's Fraunces
// build both ship local woff2 files) so the build never depends on reaching
// Google Fonts at build or request time.

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} — AI Engineer & Full-Stack Developer`,
    template: `%s — ${profile.name}`,
  },
  description: profile.tagline,
  keywords: [
    "Hariank Juneja",
    "Generative AI Engineer",
    "AI Developer",
    "Full Stack Developer",
    "Manav Rachna University",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${profile.name} — AI Engineer & Full-Stack Developer`,
    description: profile.tagline,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — AI Engineer & Full-Stack Developer`,
    description: profile.tagline,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      document.documentElement.setAttribute("data-theme", stored);
    }
    var style = localStorage.getItem("visualStyle");
    if (style === "fluid" || style === "minimal" || style === "sharp") {
      document.documentElement.setAttribute("data-style", style);
    }
  } catch (e) {}
})();
`;

// Built here (a server component) so the chat widget's client bundle never
// pulls in the content files. See the note in chat-widget.tsx.
const chatStarters = [
  `What did ${profile.name.split(" ")[0]} build at ${experience[0].org.replace(/ Ltd\.$/, "")}?`,
  `Tell me about ${projects[0].plainTitle}`,
  `What's his experience with ${skillGroups[2].items[1]}?`,
];

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.roles.join(", "),
  email: `mailto:${profile.email}`,
  url: SITE_URL,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: profile.education.school,
  },
  sameAs: profile.socials
    .filter((s) => s.href.startsWith("http"))
    .map((s) => s.href),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
        >
          Skip to content
        </a>
        <div className="grain-overlay" aria-hidden="true" />
        <MotionProvider>
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
            <ChatWidget
            name={profile.name}
            assistantName={profile.assistantName}
            starters={chatStarters}
          />
        </MotionProvider>
      </body>
    </html>
  );
}
