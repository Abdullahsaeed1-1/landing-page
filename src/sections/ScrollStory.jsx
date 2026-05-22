"use client";

import { motion } from "motion/react";
import Reveal from "@/components/animations/Reveal";

const chapters = [
  {
    number: "01",
    label: "Strategy",
    headline: "Ideas sharpened\ninto direction.",
    body:
      "We start with depth — your market, your users, your ambitions. Then we translate that into a precise digital roadmap with measurable outcomes.",
    tags: ["Discovery", "Research", "Roadmap"],
  },
  {
    number: "02",
    label: "Design",
    headline: "Interfaces that\ncommunicate intent.",
    body:
      "Every pixel is intentional. We craft experiences that feel inevitable — clean, spacious, and built to earn trust on first glance.",
    tags: ["UI/UX", "Branding", "Motion"],
  },
  {
    number: "03",
    label: "Development",
    headline: "Systems built\nto scale.",
    body:
      "We engineer robust, maintainable software. Fast by default, resilient under pressure, and designed to grow with your business.",
    tags: ["Frontend", "Backend", "Automation"],
  },
];

function ChapterCard({ chapter, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.95,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.12,
      }}
    >
      <div
        className="scroll-story-card premium-hover gradient-border rounded-3xl p-8 md:p-10 h-full"
        data-cursor="hover"
      >
        {/* Chapter header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <span
              className="text-[0.6rem] uppercase tracking-[0.45em]"
              style={{ color: "var(--brand-blue-3)" }}
            >
              {chapter.number}
            </span>
            <span className="h-px w-8 bg-white/15" />
            <span className="text-[0.6rem] uppercase tracking-[0.35em] text-white/35">
              {chapter.label}
            </span>
          </div>
        </div>

        {/* Headline */}
        <h3 className="text-2xl md:text-3xl font-[var(--font-display)] text-white leading-[1.15] mb-6 whitespace-pre-line">
          {chapter.headline}
        </h3>

        {/* Body */}
        <p className="text-sm text-white/55 leading-[1.75] mb-8">
          {chapter.body}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {chapter.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 rounded-full text-[0.6rem] uppercase tracking-[0.3em] border border-white/10 text-white/40"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ScrollStory() {
  return (
    <section className="negative-space-section premium-section-space relative">
      {/* ── Section label ─────────────────────────────────────── */}
      <div className="container-width">
        <Reveal>
          <div className="flex items-center gap-4 mb-20 md:mb-28">
            <span className="h-px flex-1 max-w-[60px] bg-white/15" />
            <p className="text-[0.6rem] uppercase tracking-[0.5em] text-white/30">
              How we work
            </p>
          </div>
        </Reveal>

        {/* ── Large editorial headline ───────────────────────── */}
        <div className="mb-20 md:mb-28 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-[var(--font-display)] text-white leading-[1.05] tracking-tight"
          >
            We build what&nbsp;
            <em className="not-italic" style={{ color: "var(--brand-blue-3)" }}>
              lasts.
            </em>
          </motion.h2>
          <Reveal delay={0.15}>
            <p className="mt-6 text-base text-white/45 max-w-md leading-[1.7]">
              From the first brief to the final deployment — a deliberate
              process designed for quality, speed, and longevity.
            </p>
          </Reveal>
        </div>

        {/* ── Chapter cards ──────────────────────────────────── */}
        <div className="grid gap-6 md:grid-cols-3">
          {chapters.map((chapter, index) => (
            <ChapterCard key={chapter.number} chapter={chapter} index={index} />
          ))}
        </div>

        {/* ── Bottom editorial strip ─────────────────────────── */}
        <Reveal delay={0.2}>
          <div className="mt-20 md:mt-28 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-white/8 pt-10">
            <p className="text-[0.65rem] uppercase tracking-[0.5em] text-white/25">
              TenBit Solutions — Premium Digital Studio
            </p>
            <div className="flex items-center gap-3">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "var(--accent-red-2)" }}
              />
              <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/20">
                Strategy → Design → Build
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
