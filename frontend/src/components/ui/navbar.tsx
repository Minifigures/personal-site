"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiDevpost } from "react-icons/si";

const SECTION_IDS = ["hero", "about", "experience", "projects", "contact"] as const;

const NAV_ITEMS = [
  { label: "Home", href: "#hero", id: "hero" },
  { label: "About", href: "#about", id: "about" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/Minifigures",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/marco-anthony-ayuste",
    icon: FaLinkedinIn,
  },
  {
    label: "Devpost",
    href: "https://devpost.com/minifiguresgt",
    icon: SiDevpost,
  },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const prefersReducedMotion = useReducedMotion();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const visibleSections = new Map<string, number>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleSections.delete(entry.target.id);
          }
        }
        if (visibleSections.size > 0) {
          const top = [...visibleSections.entries()].reduce((a, b) =>
            a[1] >= b[1] ? a : b
          );
          setActiveSection(top[0]);
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: "-10% 0px -10% 0px" }
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    }

    return () => observerRef.current?.disconnect();
  }, []);

  const entranceProps = prefersReducedMotion
    ? {}
    : {
        initial: { y: -80, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.8, delay: 0.4 },
      };

  return (
    <motion.nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-thin py-3" : "bg-transparent py-4"
      }`}
      {...entranceProps}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <a
          href="#hero"
          className="interactive font-display text-base font-semibold tracking-tight text-sand/90 hover:text-sand transition-colors"
        >
          MA<span className="text-coral">.</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`interactive font-sans text-[13px] font-medium tracking-wide transition-colors hover:text-sand/90 ${
                    isActive ? "text-coral" : "text-sand/60"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right side: social icons + mobile toggle */}
        <div className="flex items-center gap-1">
          {/* Brand icon links (desktop) */}
          <div className="hidden items-center gap-1 md:flex">
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="interactive flex h-8 w-8 items-center justify-center rounded-md text-sand/50 transition-colors hover:text-sand/90"
                >
                  <Icon size={15} />
                </a>
              );
            })}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="interactive ml-2 flex flex-col gap-1.5 p-2 -mr-2 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <motion.span
              className="block h-[2px] w-6 bg-white"
              style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.8))" }}
              animate={
                prefersReducedMotion
                  ? undefined
                  : mobileOpen
                  ? { rotate: 45, y: 5.5 }
                  : { rotate: 0, y: 0 }
              }
            />
            <motion.span
              className="block h-[2px] w-6 bg-white"
              style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.8))" }}
              animate={
                prefersReducedMotion
                  ? undefined
                  : mobileOpen
                  ? { opacity: 0 }
                  : { opacity: 1 }
              }
            />
            <motion.span
              className="block h-[2px] w-6 bg-white"
              style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.8))" }}
              animate={
                prefersReducedMotion
                  ? undefined
                  : mobileOpen
                  ? { rotate: -45, y: -5.5 }
                  : { rotate: 0, y: 0 }
              }
            />
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            className="glass absolute top-full left-0 right-0 md:hidden"
            initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col gap-4 px-6 py-6">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={`interactive font-sans text-sm font-medium tracking-wide transition-colors hover:text-sand/90 ${
                        isActive ? "text-coral" : "text-sand/70"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            {/* Social links in mobile menu */}
            <div className="flex items-center gap-4 border-t border-sand/10 px-6 py-4">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="interactive text-sand/50 transition-colors hover:text-sand/90"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
