"use client";

import { motion, useReducedMotion } from "motion/react";
import { Code2, Layers3, PenTool, Smartphone, Sparkles, Workflow } from "lucide-react";
import { site } from "@/data/site";

const ICONS = {
  web: Code2,
  app: Smartphone,
  uiux: PenTool,
  automation: Workflow,
  saas: Layers3,
  ai: Sparkles,
};

export default function Services() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" className="relative bg-black py-20 md:py-28">
      <div className="mx-auto max-w-360 px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 md:pb-10">
          <motion.p
            className="text-xs uppercase tracking-[0.38em] text-[#3198DA]/70 sm:text-sm"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Services
          </motion.p>
          <motion.h2
            className="max-w-4xl text-4xl font-medium tracking-[-0.04em] text-[#ECE9E9] md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            Everything your business needs to go digital.
          </motion.h2>
          <motion.p
            className="max-w-2xl text-base leading-relaxed text-[#6B6B6B] md:text-lg"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            Premium product, design, and automation work built to feel sharp in the room and perform in the market.
          </motion.p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {site.services.map((service, index) => {
            const Icon = ICONS[service.icon] || Code2;

            return (
              <motion.article
                key={service.title}
                className="cinematic-hover-card group relative overflow-hidden rounded-2xl p-6"
                style={{ transformStyle: "preserve-3d" }}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  delay: 0.07 * index,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={reduceMotion ? undefined : { y: -8, rotateX: 4, rotateY: -4 }}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#3198DA]/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#3F82A3]/20 bg-[#0c0c0c] text-[#ECE9E9]/85">
                    <Icon size={18} />
                  </div>
                  <span className="text-sm tabular-nums text-[#6B6B6B]">0{index + 1}</span>
                </div>

                <h3 className="mt-8 text-2xl font-medium tracking-[-0.04em] text-[#ECE9E9]">
                  {service.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-7 text-[#6B6B6B] md:text-[15px]">
                  {service.description}
                </p>

                <div className="mt-8 h-px w-full bg-[#3A3A3A]/55" />
                <p className="mt-4 text-xs uppercase tracking-[0.32em] text-[#6B6B6B]">
                  TenBit Solutions
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
