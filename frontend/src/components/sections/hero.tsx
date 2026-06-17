"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiDevpost } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { ProfilePhoto } from "@/components/ui/profile-photo";

const SOCIAL_LINKS = [
  {
    href: "https://github.com/Minifigures",
    label: "GitHub",
    icon: FaGithub,
    external: true,
  },
  {
    href: "https://linkedin.com/in/marco-anthony-ayuste",
    label: "LinkedIn",
    icon: FaLinkedinIn,
    external: true,
  },
  {
    href: "https://devpost.com/minifiguresgt",
    label: "Devpost",
    icon: SiDevpost,
    external: true,
  },
  {
    href: "mailto:marco.ayuste@mail.utoronto.ca",
    label: "Email",
    icon: MdEmail,
    external: false,
  },
] as const;

export function Hero() {
  const prefersReduced = useReducedMotion();

  const hidden = { opacity: 0, y: 30 } as const;
  const visible = { opacity: 1, y: 0 } as const;
  const noMotion = { opacity: 1, y: 0 } as const;
  const instantTransition = { duration: 0 } as const;

  return (
    <section
      id="hero"
      className="flex h-screen flex-col items-center justify-center px-4 text-center"
    >
      <motion.div
        className="text-outlined font-mono text-xs uppercase tracking-[0.3em]"
        initial={prefersReduced ? noMotion : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={prefersReduced ? instantTransition : { duration: 1, delay: 1.2 }}
      >
        Portfolio 2026
      </motion.div>

      {/* Profile photo */}
      <motion.div
        className="mt-4"
        initial={prefersReduced ? noMotion : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={prefersReduced ? instantTransition : { duration: 0.9, delay: 1.3, ease: "easeOut" }}
      >
        <ProfilePhoto />
      </motion.div>

      <motion.h1
        className="mt-4 font-display text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl"
        initial={prefersReduced ? noMotion : hidden}
        animate={visible}
        transition={prefersReduced ? instantTransition : { duration: 1.2, delay: 1.4, ease: "easeOut" }}
      >
        <span className="text-bubble-wrap" data-text="Marco Anthony">
          <span className="text-bubble">Marco Anthony</span>
        </span>
        <br />
        <span className="text-bubble-wrap" data-text="Ayuste">
          <span
            className="text-bubble"
            style={{
              background: "linear-gradient(180deg, rgba(255,180,150,0.95) 0%, rgba(232,115,90,0.9) 30%, rgba(200,80,50,0.85) 50%, rgba(232,115,90,0.9) 70%, rgba(255,180,150,0.95) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              filter: "drop-shadow(0 4px 12px rgba(232,115,90,0.5)) drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
            }}
          >
            Ayuste
          </span>
        </span>
      </motion.h1>

      <motion.p
        className="text-outlined mt-6 max-w-lg text-base font-medium sm:text-lg"
        initial={prefersReduced ? noMotion : { opacity: 0, y: 20 }}
        animate={visible}
        transition={prefersReduced ? instantTransition : { duration: 1.2, delay: 1.8, ease: "easeOut" }}
      >
        I build AI-powered tools that solve real problems for real people.
      </motion.p>

      <motion.div
        className="mt-8 flex gap-4"
        initial={prefersReduced ? noMotion : { opacity: 0, y: 10 }}
        animate={visible}
        transition={prefersReduced ? instantTransition : { duration: 0.8, delay: 2.2 }}
      >
        <a
          href="#projects"
          className="interactive glass-thin min-h-[44px] rounded-full px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-coral shadow-lg shadow-coral/20 transition-all hover:border-coral/40"
        >
          View Work
        </a>
        <a
          href="#contact"
          className="interactive glass-thin min-h-[44px] rounded-full px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:border-white/30"
        >
          Contact
        </a>
      </motion.div>

      {/* Social links */}
      <motion.div
        className="mt-6 flex items-center gap-5"
        initial={prefersReduced ? noMotion : { opacity: 0, y: 8 }}
        animate={visible}
        transition={prefersReduced ? instantTransition : { duration: 0.8, delay: 2.45 }}
      >
        {SOCIAL_LINKS.map(({ href, label, icon: Icon, external }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="interactive flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-all hover:scale-110 hover:text-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-coral"
          >
            <Icon size={20} aria-hidden="true" />
          </a>
        ))}
      </motion.div>

      <motion.div
        initial={prefersReduced ? noMotion : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={prefersReduced ? instantTransition : { delay: 2.8, duration: 1 }}
        className="mt-20"
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  );
}
