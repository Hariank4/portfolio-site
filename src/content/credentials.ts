// Training credentials from the CV: Google Skills badges and Infosys
// Springboard / Innovation Ambassador course certificates. The VIHAAN '26
// merit certificate lives in creative.ts instead — it evidences a
// competitive win, not course completion, so it sits with that story.
// Employment documents (LOR, offer letter, internship certificate) aren't
// here either — they prove employment, not certification.

export type GoogleBadge = {
  src: string;
  alt: string;
  title: string;
};

/** One real, public link for the whole Google group — individual badges have
    no separate verify URL, only this profile does. */
export const googleProfileUrl =
  "https://www.skills.google/public_profiles/cfba25a5-3bc6-4190-822c-8dbed24ec18d/";

export const googleBadges: GoogleBadge[] = [
  {
    src: "/credentials/google-cloud-computing-foundations.png",
    alt: "Google Cloud Computing Foundations badge",
    title: "Google Cloud Computing Foundations",
  },
  {
    src: "/credentials/google-secure-cloud-network.png",
    alt: "Build a Secure Google Cloud Network skill badge",
    title: "Build a Secure Google Cloud Network",
  },
  {
    src: "/credentials/google-load-balancing.png",
    alt: "Implement Load Balancing on Compute Engine skill badge",
    title: "Implement Load Balancing on Compute Engine",
  },
  {
    src: "/credentials/google-ml-apis.png",
    alt: "Prepare Data for ML APIs on Google Cloud skill badge",
    title: "Prepare Data for ML APIs on Google Cloud",
  },
  {
    src: "/credentials/google-app-dev-environment.png",
    alt: "Set Up an App Dev Environment on Google Cloud skill badge",
    title: "Set Up an App Dev Environment on Google Cloud",
  },
];

export type CertificateImage = {
  src: string;
  alt: string;
  title: string;
  date: string;
};

export const infosysCertificates: CertificateImage[] = [
  {
    src: "/credentials/infosys-computer-fundamentals.png",
    alt: "Infosys Springboard course completion certificate — Computer Fundamentals 101",
    title: "Computer Fundamentals 101",
    date: "Aug 6, 2026",
  },
  {
    src: "/credentials/infosys-c-programming.png",
    alt: "Infosys Springboard course completion certificate — C Programming Course",
    title: "C Programming Course",
    date: "Aug 1, 2026",
  },
  {
    src: "/credentials/infosys-dsa-python.jpg",
    alt: "Infosys Springboard course completion certificate — Data Structures and Algorithms using Python Part 1",
    title: "Data Structures and Algorithms using Python — Part 1",
    date: "Mar 29, 2026",
  },
  {
    src: "/credentials/infosys-python-program.png",
    alt: "Infosys Springboard course completion certificate — Python Program 101",
    title: "Python Program 101",
    date: "Dec 2, 2025",
  },
];

export const innovationAmbassadorCertificates: CertificateImage[] = [
  {
    src: "/credentials/ia-foundation.png",
    alt: "Innovation Ambassador Foundation Level certificate, MoE's Innovation Cell & AICTE, E-cert IA/Foundation/1091359",
    title: "Foundation Level",
    date: "Apr 13, 2026",
  },
  {
    src: "/credentials/ia-advanced.png",
    alt: "Innovation Ambassador Advanced Level certificate, MoE's Innovation Cell & AICTE, E-cert IA/Advanced/1091359",
    title: "Advanced Level",
    date: "Apr 14, 2026",
  },
  {
    src: "/credentials/ia-reskilling.png",
    alt: "Innovation Ambassador Re-skilling certificate, MoE's Innovation Cell & AICTE, E-cert IA/Re-skilling/1091359",
    title: "Re-skilling",
    date: "Aug 26, 2026",
  },
];
