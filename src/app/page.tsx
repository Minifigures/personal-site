import { Scene } from "@/components/canvas/scene";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/layout/footer";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { NavBar } from "@/components/ui/navbar";

export default function Home() {
  return (
    <main className="relative">
      <LoadingScreen />
      <CustomCursor />
      <Scene />
      <div className="relative z-10">
        <NavBar />
        <Hero />
        <About />
        <ExperienceSection />
        <ProjectsSection />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
