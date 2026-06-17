"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiDevpost } from "react-icons/si";

const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
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

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-thin py-3"
          : "bg-transparent py-4"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.8 }}
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
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="interactive font-sans text-[13px] font-medium tracking-wide text-sand/60 transition-colors hover:text-sand/90"
              >
                {item.label}
              </a>
            </li>
          ))}
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
            className="interactive ml-2 flex flex-col gap-1.5 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block h-[2px] w-6 bg-white"
              style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.8))" }}
              animate={mobileOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block h-[2px] w-6 bg-white"
              style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.8))" }}
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block h-[2px] w-6 bg-white"
              style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.8))" }}
              animate={mobileOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="glass absolute top-full left-0 right-0 md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col gap-4 px-6 py-6">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="interactive font-sans text-sm font-medium tracking-wide text-sand/70 transition-colors hover:text-sand/90"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
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
