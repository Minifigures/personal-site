"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Outer ring follows with spring delay
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Detect mobile/touch devices
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    function handleMouseMove(e: MouseEvent) {
      setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    }

    function handleMouseEnter() {
      setIsVisible(true);
    }

    function handleMouseLeave() {
      setIsVisible(false);
    }

    // Track hover state on interactive elements
    function handleElementHover(e: Event) {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a, button, [role='button'], input, textarea, select, .interactive") !== null;
      setIsHovering(isInteractive);
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleElementHover);

    const currentRaf = rafRef.current;
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleElementHover);
      if (currentRaf) cancelAnimationFrame(currentRaf);
      window.removeEventListener("resize", checkMobile);
    };
  }, [cursorX, cursorY]);

  // Don't render on mobile/touch devices
  if (isMobile) return null;

  return (
    <>
      {/* Hide default cursor globally */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Inner dot: follows mouse exactly */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          width: isHovering ? 6 : 8,
          height: isHovering ? 6 : 8,
          translateX: "-50%",
          translateY: "-50%",
          background: isHovering
            ? "linear-gradient(135deg, #7B2FBE, #9B59B6)"
            : "#4A1A7A",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ width: { duration: 0.2 }, height: { duration: 0.2 } }}
      />

      {/* Outer ring: follows with spring delay */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 0.6 : 0,
        }}
        animate={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          borderColor: isHovering
            ? "rgba(123, 47, 190, 0.6)"
            : "rgba(74, 26, 122, 0.4)",
        }}
        transition={{ duration: 0.25 }}
      />
    </>
  );
}
