"use client";

import { motion } from "motion/react";
import { site } from "@/data/site";

export default function About() {
  return (
    <section id="about" className="relative bg-black py-20 md:py-28">
      <div className="mx-auto grid max-w-360 gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 xl:px-16">
        <div>
          <motion.p
            className="text-xs uppercase tracking-[0.38em] text-[#3198DA]/70 sm:text-sm"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            About
          </motion.p>
          <motion.h2
            className="mt-4 max-w-4xl text-4xl font-medium tracking-[-0.04em] text-[#ECE9E9] md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            {site.about.title}
          </motion.h2>
          <motion.p
            className="mt-6 max-w-2xl text-base leading-relaxed text-[#6B6B6B] md:text-lg"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {site.about.copy}
          </motion.p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {site.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="cinematic-hover-card rounded-2xl p-6"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: 0.08 * index,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p className="text-3xl font-medium tracking-[-0.04em] text-[#ECE9E9] md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.32em] text-[#6B6B6B]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
