"use client";

import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback, useMemo } from "react";

/** Random code/math fragments for the hacker aesthetic */
const CODE_FRAGMENTS = [
  "const render = () => requestAnimationFrame(render);",
  "vec3 sunDir = normalize(sunPosition);",
  "float wave = sin(uv.x * 6.28 + time) * 0.5;",
  "gl_FragColor = vec4(color, alpha);",
  "async fn compile(shader: &str) -> Result<()>",
  "nabla f(x,y) = (df/dx, df/dy)",
  "E = mc^2 // energy-mass equivalence",
  "O(n log n) // merge sort complexity",
  "transform: matrix3d(1,0,0,0,0,1,0,0)",
  "const phi = (1 + Math.sqrt(5)) / 2;",
  "// golden ratio: 1.618033988749...",
  "fourier(f) = integral f(t)e^(-iwt) dt",
  "bloom.threshold = luminance > 0.7;",
  "camera.lookAt(new Vector3(0, 0, -1));",
  "npm run build && vercel --prod",
  "git push origin main // deploying...",
];

export function LoadingScreen() {
  const { progress } = useProgress();
  const [show, setShow] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  // Shuffled code lines
  const shuffledFragments = useMemo(() => {
    const arr = [...CODE_FRAGMENTS];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, []);

  // Animate counter
  useEffect(() => {
    const target = Math.round(progress);
    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev >= target) {
          clearInterval(interval);
          return target;
        }
        return prev + 1;
      });
    }, 12);
    return () => clearInterval(interval);
  }, [progress]);

  // Reveal code lines progressively
  useEffect(() => {
    const lineCount = Math.floor((progress / 100) * shuffledFragments.length);
    setVisibleLines(shuffledFragments.slice(0, Math.max(1, lineCount)));
  }, [progress, shuffledFragments]);

  const handleDismiss = useCallback(() => {
    if (progress >= 100) setShow(false);
  }, [progress]);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => setShow(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, #1A1A2E 0%, #2D1B3D 40%, #4A1942 70%, #E8735A 100%)",
          }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          onClick={handleDismiss}
        >
          {/* Scanline overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(232,115,90,0.03) 2px, rgba(232,115,90,0.03) 4px)",
            }}
          />

          {/* Left: Code terminal */}
          <div className="hidden flex-1 overflow-hidden p-8 font-mono text-[11px] leading-relaxed md:block">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-coral/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-amber/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-teal/60" />
              <span className="ml-2 text-[10px] text-sand/20">
                marco@portfolio ~ build
              </span>
            </div>
            {visibleLines.map((line, i) => (
              <motion.div
                key={i}
                className="text-coral/40"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.05 }}
              >
                <span className="text-sand/15 select-none">
                  {String(i + 1).padStart(2, "0")}{"  "}
                </span>
                {line}
              </motion.div>
            ))}
            <motion.span
              className="inline-block text-coral/60"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              _
            </motion.span>
          </div>

          {/* Right: Main loading content */}
          <div className="flex flex-1 flex-col items-center justify-center p-8">
            {/* Top gradient line */}
            <motion.div
              className="absolute top-0 left-0 h-[2px]"
              style={{
                background:
                  "linear-gradient(90deg, #E8735A, #F4A942, #FF8C69, #2A9D8F)",
              }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />

            {/* Logo with matrix-inspired treatment */}
            <motion.div
              className="relative mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span
                className="font-display text-7xl font-bold tracking-tighter sm:text-9xl"
                style={{
                  background:
                    "linear-gradient(135deg, #E8735A 0%, #F4A942 30%, #FF8C69 70%, #2A9D8F 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Marco A
              </span>
              {/* Glitch shadow */}
              <span
                className="pointer-events-none absolute inset-0 font-display text-7xl font-bold tracking-tighter opacity-10 sm:text-9xl"
                style={{
                  color: "#E8735A",
                  transform: "translate(2px, -2px)",
                  filter: "blur(1px)",
                }}
              >
                Marco A
              </span>
            </motion.div>

            {/* Progress */}
            <div className="flex items-baseline gap-1 font-mono text-sm tracking-widest text-sand/30">
              <motion.span className="text-3xl tabular-nums text-amber/60">
                {String(displayProgress).padStart(3, "0")}
              </motion.span>
              <span className="text-amber/30">%</span>
            </div>

            {/* Loading bar */}
            <div className="mt-4 h-[1px] w-48 overflow-hidden bg-sand/5">
              <motion.div
                className="h-full"
                style={{
                  background:
                    "linear-gradient(90deg, #E8735A, #F4A942, #FF8C69)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            {/* Status text */}
            <motion.p
              className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-sand/20"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {progress < 30
                ? "initializing shaders..."
                : progress < 60
                  ? "compiling ocean normals..."
                  : progress < 90
                    ? "rendering palm trees..."
                    : progress < 100
                      ? "applying post-processing..."
                      : "ready"}
            </motion.p>

            {/* Click to enter */}
            <AnimatePresence>
              {progress >= 100 && (
                <motion.p
                  className="mt-8 cursor-pointer font-mono text-xs uppercase tracking-[0.3em] text-coral/40"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: [0, 1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  onClick={handleDismiss}
                >
                  [ click to enter ]
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-4 right-4 font-mono text-[9px] text-coral/15">
            v0.1.0
          </div>
          <div className="absolute bottom-4 left-4 font-mono text-[9px] text-sand/10">
            next.js 15 + r3f + three.js
          </div>
          <div className="absolute bottom-4 right-4 font-mono text-[9px] text-sand/10">
            {new Date().getFullYear()}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
