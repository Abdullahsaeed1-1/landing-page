"use client";

import { motion } from "motion/react";
import AnimatedButton from "@/components/ui/AnimatedButton";

export default function FinalCTA() {
  return (
    <section id="contact" className="relative bg-black px-5 py-20 sm:px-8 lg:px-12 xl:px-16 md:py-28">
      <div className="mx-auto max-w-360 overflow-hidden rounded-4xl border border-white/10 bg-black/24 shadow-[0_30px_90px_-48px_rgba(0,0,0,0.92)] backdrop-blur-xl">
        <div className="relative isolate min-h-[70vh] overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-t from-black/72 via-black/38 to-black/20" />
          <div className="noise-overlay absolute inset-0 opacity-30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(49,152,218,0.08),transparent_24%)]" />

          <div className="relative z-10 flex min-h-[70vh] items-center px-6 py-14 sm:px-10 lg:px-16">
            <div className="max-w-4xl">
              <motion.p
                className="text-xs uppercase tracking-[0.38em] text-[#3198DA]/70 sm:text-sm"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                Contact TenBit
              </motion.p>
              <motion.h2
                className="mt-4 max-w-3xl text-4xl font-medium tracking-[-0.04em] text-[#ECE9E9] md:text-6xl lg:text-7xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                Ready to build something better?
              </motion.h2>
              <motion.p
                className="mt-6 max-w-2xl text-base leading-relaxed text-[#6B6B6B] md:text-lg"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                Let’s turn your idea, business, or service into a powerful digital experience.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                <AnimatedButton href="#home">Start a Project</AnimatedButton>
                <AnimatedButton href="mailto:hello@tenbitsolutions.com" variant="secondary">
                  Contact TenBit
                </AnimatedButton>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
