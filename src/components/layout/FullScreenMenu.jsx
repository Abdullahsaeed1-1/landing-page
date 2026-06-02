"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

const menuItems = [
  { number: "01", label: "Home", href: "#home" },
  { number: "02", label: "About", href: "#about" },
  { number: "03", label: "Services", href: "#services" },
  { number: "04", label: "Showcase", href: "#showcase" },
  { number: "05", label: "Process", href: "#process" },
  { number: "06", label: "Contact", href: "#contact" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FullScreenMenu({ open, onClose }) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="menu"
          className="fixed inset-0 z-[70]"
          id="full-screen-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Full screen navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="absolute inset-0 bg-black/90" />
          <div className="absolute -top-32 left-10 h-72 w-72 rounded-full glow-blue blur-3xl opacity-80" />
          <div className="absolute bottom-10 right-8 h-80 w-80 rounded-full glow-purple blur-3xl opacity-70" />
          <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full glow-blue blur-[120px] opacity-40" />

          <motion.div
            className="relative z-10 flex h-full flex-col"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            exit={{ y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container-width flex items-center justify-between py-10">
              <p className="text-xs uppercase tracking-[0.4em] text-[#3198DA]/55">
                Navigation
              </p>
              <button
                type="button"
                onClick={onClose}
                data-cursor="hover"
                className="rounded-full border border-[#3F82A3]/20 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#ECE9E9]/70 transition-colors hover:border-[#3198DA]/45 hover:text-[#ECE9E9]"
              >
                Close
              </button>
            </div>

            <div className="container-width flex flex-1 flex-col justify-center">
              <motion.ul
                className="space-y-8"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {menuItems.map((item) => (
                  <motion.li key={item.label} variants={itemVariants}>
                    <a
                      href={item.href}
                      data-cursor="hover"
                      onClick={onClose}
                      className="group flex items-center gap-6 text-3xl font-[var(--font-display)] text-white transition-colors md:text-5xl"
                    >
                      <span className="text-sm uppercase tracking-[0.4em] text-[color:var(--brand-blue-3)]">
                        {item.number}
                      </span>
                      <span className="relative">
                        {item.label}
                        <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#3198DA]/70 transition-all duration-300 group-hover:w-full" />
                      </span>
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            <div className="container-width pb-12">
              <div className="brand-spectrum" />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
