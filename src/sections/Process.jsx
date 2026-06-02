"use client";

import { motion, useReducedMotion } from "motion/react";
import { Code2, PenTool, Rocket, Search, TrendingUp } from "lucide-react";
import { site } from "@/data/site";

const ICONS = {
  discover: Search,
  design: PenTool,
  develop: Code2,
  launch: Rocket,
  grow: TrendingUp,
};

export default function Process() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="process" className="relative bg-black py-20 md:py-28">
      <div className="mx-auto grid max-w-360 gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 xl:px-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <motion.p
            className="text-xs uppercase tracking-[0.38em] text-[#3198DA]/70 sm:text-sm"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Process
          </motion.p>
          <motion.h2
            className="mt-4 max-w-lg text-4xl font-medium tracking-[-0.04em] text-[#ECE9E9] md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            How we turn ideas into digital products.
          </motion.h2>
          <motion.p
            className="mt-6 max-w-md text-base leading-relaxed text-[#6B6B6B] md:text-lg"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          >
            Clear direction, premium design, disciplined development, and measured growth. Every stage is built to feel calm and intentional.
          </motion.p>
        </div>

        <ol className="space-y-4">
          {site.processSteps.map((step, index) => {
            const Icon = ICONS[step.icon] || Search;

            return (
              <motion.li
                key={step.title}
                className="cinematic-hover-card group rounded-2xl p-6"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  delay: 0.08 * index,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={reduceMotion ? undefined : { y: -4 }}
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#3F82A3]/20 bg-[#0c0c0c] text-[#ECE9E9]/85">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-sm tabular-nums text-[#6B6B6B]">0{index + 1}</p>
                      <h3 className="mt-1 text-2xl font-medium tracking-[-0.04em] text-[#ECE9E9]">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p className="max-w-xl text-sm leading-7 text-[#6B6B6B] md:text-[15px]">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
