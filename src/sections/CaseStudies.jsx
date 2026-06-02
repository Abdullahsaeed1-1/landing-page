"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/data/site";

export default function CaseStudies() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="work" className="relative bg-black py-20 md:py-28">
      <div className="mx-auto max-w-360 px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 md:pb-10">
          <motion.p
            className="text-xs uppercase tracking-[0.38em] text-[#3198DA]/70 sm:text-sm"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Work
          </motion.p>
          <motion.h2
            className="max-w-4xl text-4xl font-medium tracking-[-0.04em] text-[#ECE9E9] md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            Premium case studies built to feel cinematic.
          </motion.h2>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {site.caseStudies.map((study, index) => (
            <motion.article
              key={study.title}
              className="cinematic-hover-card group overflow-hidden rounded-3xl"
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.85,
                delay: 0.08 * index,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={reduceMotion ? undefined : { y: -6 }}
            >
              <div className="relative aspect-4/3 overflow-hidden border-b border-white/10">
                <div
                  className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: study.visual }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0.62)_100%)]" />
                <div
                  className="absolute inset-0 opacity-35"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                  }}
                />
                <motion.a
                  href="#contact"
                  className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-[#3F82A3]/25 bg-black/35 px-4 py-2 text-sm text-[#ECE9E9] backdrop-blur-md"
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  View Project
                  <ArrowUpRight size={15} />
                </motion.a>
              </div>

              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.34em] text-[#6B6B6B]">Case Study 0{index + 1}</p>
                <h3 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-[#ECE9E9]">
                  {study.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#6B6B6B] md:text-[15px]">
                  {study.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
