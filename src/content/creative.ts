// Creative side — kept honest and specific-where-possible. Anything without a
// confirmed specific (a title, a venue) is written generically on purpose;
// fill in specifics here if/when you want them named on the site.

export type CreativeItem = {
  title: string;
  description: string;
};

export type CreativeImage = {
  src: string;
  alt: string;
  /** Optional overlay label. Keep these to what is verifiable — the venue
      names below are read directly off signage visible in each photo. */
  caption?: string;
  /** object-position, for shots where the subject isn't dead centre. */
  position?: string;
};

// The only raster photography on this site. `guitar-solo` is the anchor
// (portrait 4:5); the other two stack beside it. Sources live in
// public/creative/, resized to ~1400px on the long edge — next/image serves
// scaled variants from there anyway, so shipping the originals was pointless.
export const creativeImages: CreativeImage[] = [
  {
    src: "/creative/guitar-solo.jpg",
    alt: "Hariank singing and playing acoustic guitar on stage at a university event.",
    caption: "Manav Rachna University",
    position: "center 30%",
  },
  {
    src: "/creative/band-bimtech.jpg",
    alt: "Moksh on stage at BIMTECH Noida, in front of the band's name in lights.",
    caption: "1st place · BIMTECH Noida",
    position: "center 70%",
  },
  {
    src: "/creative/band-group.jpg",
    alt: "Hariank playing electric guitar on stage alongside the rest of the band.",
    position: "center 62%",
  },
];

export const creativeItems: CreativeItem[] = [
  {
    title: "Guitar & Music",
    description:
      "Guitar and vocals with Moksh, my college band — first place and a ₹10,000 prize at BIMTECH Noida, plus campus stages closer to home.",
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
