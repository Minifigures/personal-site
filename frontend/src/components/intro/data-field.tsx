"use client";

import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/stores/use-app-store";

/** Blue/cyan data tiles with occasional purple/magenta accents. */
const COLORS = ["#1e6fff", "#00bfff", "#2a9d8f", "#00e5ff", "#3b82f6"];
const ACCENTS = ["#7a5cff", "#ff3fa4", "#a855f7"];

interface Tile {
  x: number;
  y: number;
  size: number;
  color: string;
  blur: number;
  baseAlpha: number;
  phase: number;
  speed: number;
  drift: number;
}

/**
 * DOM Canvas2D field of glowing square tiles with depth-of-field bokeh: small
 * sharp tiles in the distance, larger soft ones near. The dark data backdrop
 * behind the transparent neural canvas.
 */
export function DataField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phase = useAppStore((s) => s.phase);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (phase === "entering") setVisible(false);
  }, [phase]);

  useEffect(() => {
    const node = canvasRef.current;
    if (!node) return;
    const context = node.getContext("2d");
    if (!context) return;
    const el: HTMLCanvasElement = node;
    const ctx: CanvasRenderingContext2D = context;

    let raf = 0;
    let tiles: Tile[] = [];
    let start = 0;

    function build() {
      el.width = window.innerWidth;
      el.height = window.innerHeight;
      const count = Math.min(240, Math.floor((el.width * el.height) / 9000));
      tiles = Array.from({ length: count }, () => {
        const depth = Math.random();
        const palette = Math.random() > 0.82 ? ACCENTS : COLORS;
        return {
          x: Math.random() * el.width,
          y: Math.random() * el.height,
          size: 2 + Math.pow(depth, 1.5) * 16,
          color: palette[Math.floor(Math.random() * palette.length)],
          blur: depth * 11,
          baseAlpha: 0.14 + Math.random() * 0.5,
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 1.5,
          drift: (Math.random() - 0.5) * 6,
        };
      });
    }

    function frame(now: number) {
      if (!start) start = now;
      const t = (now - start) / 1000;
      ctx.fillStyle = "#05060a";
      ctx.fillRect(0, 0, el.width, el.height);
      for (const tile of tiles) {
        const a = tile.baseAlpha * (0.5 + 0.5 * Math.sin(t * tile.speed + tile.phase));
        if (a <= 0.02) continue;
        ctx.globalAlpha = a;
        ctx.shadowBlur = tile.blur;
        ctx.shadowColor = tile.color;
        ctx.fillStyle = tile.color;
        const y = tile.y + Math.sin(t * 0.2 + tile.phase) * tile.drift;
        ctx.fillRect(tile.x, y, tile.size, tile.size);
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(frame);
    }

    build();
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", build);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-20 transition-opacity duration-700"
      style={{ opacity: visible ? 1 : 0, backgroundColor: "#05060a" }}
    />
  );
}
