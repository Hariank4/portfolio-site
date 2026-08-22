// Creative side — kept honest and specific-where-possible. Anything without a
// confirmed specific (a title, a venue) is written generically on purpose;
// fill in specifics here if/when you want them named on the site.

export type CreativeItem = {
  title: string;
  description: string;
};

export const creativeItems: CreativeItem[] = [
  {
    title: "Guitar & Music",
    description:
      "Guitar and singing, listed among the things I actually spend time on outside of code — not a resume line.",
  },
  {
    title: "Short Film Direction",
    description:
      // TODO: add the film's title/details here if you'd like it named specifically.
      "Directed and produced a short film project from concept to final cut — scripting, direction, and post, start to finish.",
  },
  {
    title: "Storytelling & Events",
    description:
      "Co-designed the Cyber सारथी workshop deck and handbook — case studies, chapter covers, mascot and branding consistency — with the program's leadership team.",
  },
];
