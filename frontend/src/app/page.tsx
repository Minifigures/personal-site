import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { NavBar } from "@/components/ui/navbar";
import { UiToggle } from "@/components/ui/ui-toggle";
import { BeachLayer } from "@/components/canvas/beach-layer";
import { IntroGate } from "@/components/intro/intro-gate";

export default function Home() {
  return (
    <main className="relative">
      <CustomCursor />
      <BeachLayer>
        <UiToggle>
          <NavBar />
          <Hero />
          <About />
          <ExperienceSection />
          <ProjectsSection />
          <Contact />
          <Footer />
        </UiToggle>
      </BeachLayer>
      <IntroGate />
    </main>
  );
}
