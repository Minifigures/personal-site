import { create } from "zustand";

export type IntroPhase = "idle" | "entering" | "entered";

interface AppState {
  currentSection: number;
  scrollProgress: number;
  isLoaded: boolean;
  reducedMotion: boolean;
  phase: IntroPhase;
  introDegraded: boolean;
  setCurrentSection: (section: number) => void;
  setScrollProgress: (progress: number) => void;
  setIsLoaded: (loaded: boolean) => void;
  setReducedMotion: (reduced: boolean) => void;
  setPhase: (phase: IntroPhase) => void;
  setIntroDegraded: (degraded: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentSection: 0,
  scrollProgress: 0,
  isLoaded: false,
  reducedMotion: false,
  phase: "idle",
  introDegraded: false,
  setCurrentSection: (section) => set({ currentSection: section }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
  setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
  setPhase: (phase) => set({ phase }),
  setIntroDegraded: (degraded) => set({ introDegraded: degraded }),
}));
