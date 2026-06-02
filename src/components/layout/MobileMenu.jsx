"use client";

import { useEffect } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const ease = [0.16, 1, 0.3, 1];

export default function MobileMenu({ open, onClose, links = [] }) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-[60] overflow-hidden bg-[#030303] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.18 : 0.5, ease }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(49,152,218,0.13),transparent_28%),radial-gradient(circle_at_0%_82%,rgba(98,0,217,0.1),transparent_32%),linear-gradient(145deg,#060606_0%,#000_72%)]" />
          <div className="noise-overlay absolute inset-0 opacity-35" />

          <motion.div
            className="relative z-10 mx-auto flex h-full max-w-360 flex-col px-5 pb-6 pt-5 sm:px-8"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 22 }}
            transition={{ duration: reduceMotion ? 0.18 : 0.6, ease }}
          >
            <div className="flex items-center justify-between">
              <a
                href="#home"
                onClick={onClose}
                className="group inline-flex items-center gap-2.5"
              >
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#3F82A3]/38 bg-black/35 text-[0.59rem] font-semibold tracking-[0.16em] text-[#ECE9E9]">
                  TB
                  <span className="absolute inset-1 rounded-full border border-white/5" />
                </span>
                <span className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-[#ECE9E9]/88">
                  TenBit Solutions
                </span>
              </a>

              <button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-black/22 text-[#ECE9E9]/78 backdrop-blur-md transition-all duration-500 hover:border-[#3198DA]/50 hover:text-white"
              >
                <X
                  size={16}
                  strokeWidth={1.6}
                  className="transition-transform duration-500 group-hover:rotate-90"
                />
              </button>
            </div>

            <nav
              aria-label="Mobile navigation links"
              className="flex flex-1 flex-col justify-center py-12"
            >
              <div className="border-t border-white/10">
                {links.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={onClose}
                    data-cursor="hover"
                    className="group flex items-center justify-between border-b border-white/10 py-4 text-[clamp(2.1rem,11vw,4.5rem)] font-medium leading-none tracking-[-0.07em] text-[#ECE9E9]/92 transition-colors duration-500 hover:text-white sm:py-5"
                    initial={
                      reduceMotion ? { opacity: 0 } : { opacity: 0, x: 18 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    exit={
                      reduceMotion ? { opacity: 0 } : { opacity: 0, x: 18 }
                    }
                    transition={{
                      duration: reduceMotion ? 0.18 : 0.58,
                      delay: reduceMotion ? 0 : 0.08 + index * 0.055,
                      ease,
                    }}
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="text-[0.58rem] font-medium tracking-[0.2em] text-[#3198DA]/72">
                        0{index + 1}
                      </span>
                      <span>{link.label}</span>
                    </span>
                    <ArrowUpRight
                      size={20}
                      strokeWidth={1.35}
                      className="translate-y-2 text-[#3198DA] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                    />
                  </motion.a>
                ))}
              </div>
            </nav>

            <motion.div
              className="flex flex-col gap-5 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              transition={{
                duration: reduceMotion ? 0.18 : 0.55,
                delay: reduceMotion ? 0 : 0.28,
                ease,
              }}
            >
              <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#ECE9E9]/42">
                Software / Strategy / Growth
              </p>

              <a
                href="#contact"
                onClick={onClose}
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/70 bg-[#ECE9E9] px-5 py-3 text-[0.67rem] font-semibold uppercase tracking-[0.16em] text-black transition-colors duration-500 hover:border-white hover:bg-white"
              >
                <span>Start a Project</span>
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.8}
                  className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
