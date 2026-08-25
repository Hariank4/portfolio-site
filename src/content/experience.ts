// Experience & leadership timeline — deliberately short. Only items directly
// confirmed by the CV are included (no TEDx / MUN / CTF entries — the brief
// mentioned these as possibilities, but the source CV doesn't confirm them,
// so they're left out rather than assumed).

import type { SiteImage } from "./images";

export type TimelineItem = {
  period: string;
  title: string;
  org: string;
  description: string;
  tags?: string[];
  /** Optional supporting photo, shown beside the row on desktop. */
  image?: SiteImage;
};

export const experience: TimelineItem[] = [
  {
    period: "Jun – Jul 2026",
    title: "AI & Full-Stack Development Intern",
    org: "MeraPath Education Ltd.",
    description:
      "45-day internship across two initiatives: the AI Tender Command Centre (research, architecture, and an MVP with AI-powered tender analysis) and Cyber सारथी, where I helped design workshop content and built most of the production platform end to end.",
    tags: ["Next.js", "FastAPI", "Supabase", "RAG"],
    image: {
      src: "/work/merapath-office.jpg",
      alt: "Hariank working with the team at the MeraPath office in Noida.",
      position: "center 40%",
    },
  },
  {
    period: "Current",
    title: "Vice Chairperson",
    org: "IEEE Computer Society, Manav Rachna University SB",
    description:
      "Previously General Secretary. Helped organize technical events including DSA Quest (with HackerRank) and IEEE Got Talent.",
    tags: ["Leadership", "Community"],
  },
  {
    period: "Current",
    title: "Student Ambassador",
    org: "Innovation & Incubation Center (IIC)",
    description: "Representing the IIC's innovation and incubation initiatives on campus.",
  },
];

export const activities = [
  "Organiser, DSA Quest (with HackerRank)",
  "Organiser, IEEE Got Talent",
  "Directed and produced a short film project from concept to final cut",
];
