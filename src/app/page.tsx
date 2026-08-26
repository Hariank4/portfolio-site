import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { SelectedWork } from "@/components/sections/selected-work";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Creative } from "@/components/sections/creative";
import { Credentials } from "@/components/sections/credentials";
import { OpenSource } from "@/components/sections/open-source";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <SelectedWork />
      <Skills />
      <Experience />
      <Creative />
      <Credentials />
      <OpenSource />
      <Contact />
    </>
  );
}
