import { create } from "zustand";

interface AppState {
  currentSection: number;
  scrollProgress: number;
  isLoaded: boolean;
  reducedMotion: boolean;
  setCurrentSection: (section: number) => void;
  setScrollProgress: (progress: number) => void;
  setIsLoaded: (loaded: boolean) => void;
  setReducedMotion: (reduced: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentSection: 0,
  scrollProgress: 0,
  isLoaded: false,
  reducedMotion: false,
  setCurrentSection: (section) => set({ currentSection: section }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
  setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
}));
