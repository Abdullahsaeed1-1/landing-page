"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import MobileMenu from "@/components/layout/MobileMenu";
import { site } from "@/data/site";

const ease = [0.16, 1, 0.3, 1];

const navVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.18,
      staggerChildren: 0.055,
    },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -7 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

function MagneticLink({ children, className, href, label }) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 19, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 180, damping: 19, mass: 0.25 });

  const handlePointerMove = (event) => {
    if (reduceMotion || event.pointerType !== "mouse") {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.08);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.08);
  };

  const resetPosition = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      aria-label={label}
      data-cursor="hover"
      className={className}
      style={reduceMotion ? undefined : { x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPosition}
      onBlur={resetPosition}
      whileHover={reduceMotion ? undefined : { scale: 1.015 }}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.4, ease }}
    >
      {children}
    </motion.a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 28);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const islandClass = scrolled
    ? "border-white/10 bg-black/32 shadow-[0_18px_55px_-32px_rgba(0,0,0,0.92)] backdrop-blur-xl"
    : "border-transparent bg-transparent";

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ${
          scrolled ? "pt-3" : "pt-5"
        }`}
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="mx-auto max-w-360 px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between gap-3">
            <MagneticLink
              href="#home"
              label="TenBit Solutions home"
              className={`group inline-flex items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-3 transition-all duration-500 ${islandClass}`}
            >
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#3F82A3]/30 bg-black/35 text-[0.59rem] font-semibold tracking-[0.16em] text-[#ECE9E9] transition-all duration-500 group-hover:border-[#3198DA]/65 group-hover:text-white group-hover:shadow-[0_0_22px_rgba(49,152,218,0.2)]">
                TB
                <span className="absolute inset-1 rounded-full border border-white/5" />
              </span>
              <span className="text-[0.66rem] font-medium uppercase tracking-[0.2em] text-[#ECE9E9]/90 transition-colors duration-300 group-hover:text-white sm:text-[0.7rem]">
                TenBit Solutions
              </span>
            </MagneticLink>

            <motion.nav
              aria-label="Primary navigation"
              className={`hidden items-center gap-6 rounded-full border px-5 py-2.5 transition-all duration-500 lg:flex ${islandClass}`}
              variants={navVariants}
              initial="hidden"
              animate="visible"
            >
              {site.navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  data-cursor="hover"
                  className="group relative text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[#ECE9E9]/58 transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:outline-none"
                  variants={navItemVariants}
                >
                  {link.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-[#3198DA]/85 transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                  <span className="absolute -right-2.5 top-1/2 h-1 w-1 -translate-y-1/2 scale-0 rounded-full bg-[#3198DA] opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100" />
                </motion.a>
              ))}
            </motion.nav>

            <div className="flex items-center gap-2">
              <motion.div
                className="hidden sm:block"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.65, delay: 0.32, ease }}
              >
                <MagneticLink
                  href="#contact"
                  label="Start a project"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/70 bg-[#ECE9E9] px-4 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-black shadow-[0_18px_44px_-25px_rgba(236,233,233,0.58)] transition-colors duration-500 hover:border-white hover:bg-white"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.8}
                    className="transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </MagneticLink>
              </motion.div>

              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-navigation"
                onClick={() => setOpen((value) => !value)}
                className={`group inline-flex items-center gap-2 rounded-full border px-3 py-2.5 text-[0.67rem] font-medium uppercase tracking-[0.16em] text-[#ECE9E9]/82 backdrop-blur-md transition-all duration-500 hover:border-[#3198DA]/45 hover:text-white lg:hidden ${
                  scrolled
                    ? "border-white/10 bg-black/32"
                    : "border-white/12 bg-black/15"
                }`}
              >
                <Menu
                  size={15}
                  strokeWidth={1.6}
                  className="transition-transform duration-500 group-hover:rotate-6"
                />
                <span className="hidden sm:inline">Menu</span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={open} onClose={() => setOpen(false)} links={site.navLinks} />
    </>
  );
}
