import { Scene } from "@/components/canvas/scene";
import { Hero } from "@/components/sections/hero";
import { LoadingScreen } from "@/components/ui/loading-screen";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <LoadingScreen />
      <Scene />
      <div className="relative z-10">
        <Hero />
      </div>
    </main>
  );
}
