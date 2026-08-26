import type { SiteImage } from "./images";

// Creative side — kept honest and specific-where-possible. Anything without a
// confirmed specific (a title, a venue) is written generically on purpose;
// fill in specifics here if/when you want them named on the site.

export type CreativeItem = {
  title: string;
  description: string;
};

/** Left-hand anchor of the section's photo block, portrait. */
export const creativeAnchor: SiteImage = {
  src: "/creative/guitar-solo.jpg",
  alt: "Hariank singing and playing acoustic guitar on stage at a university event.",
  caption: "Manav Rachna University",
  position: "center 30%",
};

/**
 * Top-right cell. The only carousel in this section: the win and the
 * certificate that evidences it, in one cell rather than two — the claim and
 * its proof belong together, and the layout has no room for a fourth photo.
 */
export const creativeAward: SiteImage[] = [
  {
    src: "/creative/band-bimtech.jpg",
    alt: "Moksh on stage at BIMTECH, in front of the band's name in lights.",
    caption: "1st · War of Bands, VIHAAN '26",
    position: "center 70%",
  },
  {
    src: "/creative/vihaan-certificate.jpg",
    alt: "VIHAAN '26 certificate of merit awarded to Hariank Juneja for first position in War of Bands at Birla Institute of Management Technology, February 2026.",
    caption: "Certificate of Merit · BIMTECH",
  },
];

/** Bottom-right cell. */
export const creativeGroup: SiteImage = {
  src: "/creative/band-group.jpg",
  alt: "Hariank playing electric guitar on stage alongside the rest of the band.",
  position: "center 62%",
};

/** Sits between the photographs and the cards, in display italic. */
export const creativeQuote =
  "Music has a way of finding you even in the darkest of places.";

export const creativeItems: CreativeItem[] = [
  {
    title: "Guitar & Music",
    description:
      "Guitar and vocals with Moksh, my college band. First place in War of Bands at VIHAAN '26, BIMTECH — a ₹10,000 prize — plus campus stages closer to home.",
  },
  {
    title: "Short Film Direction",
    description:
      "Directed and produced a short film project from concept to final cut — scripting, direction, and post, start to finish.",
  },
  {
    title: "Storytelling & Events",
    description:
      "Co-designed the Cyber सारथी workshop deck and handbook — case studies, chapter covers, mascot and branding consistency — with the program's leadership team.",
  },
];
