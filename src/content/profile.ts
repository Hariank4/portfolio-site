// Central profile data. Edit this file to update anything that appears in the
// hero, about, contact, and footer sections. Every field here is sourced from
// Hariank's CV / internship report — nothing here is invented. `avatar` is
// intentionally null: no photo was supplied, so the site is designed to work
// without one. Drop an image path in later if you want a portrait in the hero.

export const profile = {
  name: "Hariank Juneja",
  initials: "HJ",
  /** Name of the site's chat assistant — see components/chat/chat-widget.tsx. */
  assistantName: "Jinx",
  avatar: null as string | null,
  roles: [
    "AI Engineer",
    "Full-Stack Developer",
    "Creative Technologist",
  ],
  location: "Delhi, India",
  email: "hariankjuneja4@gmail.com",
  education: {
    degree: "B.Tech, Computer Science Engineering — Generative AI",
    school: "Manav Rachna University",
    detail: "2nd year, expected 2029",
  },
  tagline:
    "Building intelligent systems at the intersection of AI, software, and craft.",
  heroSubline:
    "I design and ship production software — from LLM-grounded analysis pipelines to platforms used by thousands of people — then step off the keyboard to write, direct, and play guitar.",
  aboutLead:
    "I'm a Computer Science student specializing in Generative AI, but most of what I've learned came from building things that had to work in production, not just in a notebook.",
  aboutBody: [
    "Over a 45-day internship at MeraPath, I worked across two very different problems: making sense of dense government tender documents with LLMs and RAG, and shipping a full cybersecurity-awareness platform — auth, admin systems, certificate generation, email automation, security hardening — end to end, alongside a two-person dev team.",
    "I care about the same things whether I'm writing a RAG pipeline, a Next.js admin panel, or a short film script: does the structure hold up, and does it actually communicate. That's the thread between the engineering work and the creative work — both are exercises in building something clear out of something complicated.",
  ],
  resume: {
    href: "/resume/hariank-juneja-resume.pdf",
    label: "Resume",
  },
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/Hariank4",
      handle: "@Hariank4",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/hariank-juneja",
      handle: "in/hariank-juneja",
    },
    {
      label: "Email",
      href: "mailto:hariankjuneja4@gmail.com",
      handle: "hariankjuneja4@gmail.com",
    },
  ],
  pillars: [
    {
      key: "engineer",
      title: "Engineer",
      description:
        "AI systems, backend architecture, and the unglamorous parts — auth, data models, security — done properly.",
    },
    {
      key: "builder",
      title: "Builder",
      description:
        "I ship. Live products with real users, not just repos with a README and a demo GIF.",
    },
    {
      key: "creative",
      title: "Creative",
      description:
        "Guitar, short film, storytelling — the same instinct for structure and clarity, pointed at a different medium.",
    },
  ],
} as const;
