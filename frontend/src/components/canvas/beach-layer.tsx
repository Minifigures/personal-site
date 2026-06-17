"use client";

import { useAppStore } from "@/stores/use-app-store";
import { Scene } from "./scene";

/**
 * The beach experience. The HTML content stays in the SSR DOM (so it remains
 * crawlable) but is hidden and inert until the visitor enters; the WebGL Scene
 * mounts only once entered, so only one canvas context is ever live.
 */
export function BeachLayer({ children }: { children: React.ReactNode }) {
  const entered = useAppStore((s) => s.phase) === "entered";

  return (
    <>
      {entered && <Scene />}
      <div
        inert={!entered}
        aria-hidden={!entered}
        className={
          entered
            ? "transition-opacity duration-700"
            : "pointer-events-none select-none opacity-0"
        }
      >
        {children}
      </div>
    </>
  );
}
