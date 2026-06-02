"use client";

import { useMemo, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

function RevealWord({ word, index, total, progress, reducedMotion, className }) {
  const start = total <= 1 ? 0 : index / total;
  const end = total <= 1 ? 1 : Math.min(start + 1 / total, 1);
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const y = useTransform(progress, [start, end], [20, 0]);

  return (
    <motion.span
      aria-hidden="true"
      className={cn("inline-block", className)}
      style={reducedMotion ? undefined : { opacity, y }}
    >
      {word}
    </motion.span>
  );
}

export default function ScrollRevealText({
  text,
  as: Component = "h2",
  className,
  wordClassName,
  variant = "scroll",
  delay = 0.2,
  stagger = 0.06,
}) {
  const reducedMotion = useReducedMotion();
  const ref = useRef(null);
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);
  const lines = useMemo(() => text.split("\n"), [text]);
  const MotionComponent = motion[Component] || motion.h2;

  if (variant === "scroll") {
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start 0.85", "end 0.2"],
    });

    let wordIndex = 0;

    return (
      <MotionComponent ref={ref} className={cn("whitespace-pre-wrap", className)} aria-label={text}>
        {lines.map((line, lineIndex) => {
          const lineWords = line.split(/\s+/).filter(Boolean);

          return (
            <span key={`line-${lineIndex}`} className="block">
              {lineWords.map((word, index) => {
                const currentIndex = wordIndex++;
                return (
                  <span key={`${word}-${lineIndex}-${index}`} className="mr-[0.28em] inline-block last:mr-0">
                    <RevealWord
                      word={word}
                      index={currentIndex}
                      total={words.length}
                      progress={scrollYProgress}
                      reducedMotion={reducedMotion}
                      className={wordClassName}
                    />
                  </span>
                );
              })}
            </span>
          );
        })}
      </MotionComponent>
    );
  }

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reducedMotion ? 0 : stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 10 : 30 },
    show: { opacity: 1, y: 0 },
  };

  let wordIndex = 0;

  return (
    <MotionComponent
      className={cn("whitespace-pre-wrap", className)}
      aria-label={text}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
    >
      {lines.map((line, lineIndex) => {
        const lineWords = line.split(/\s+/).filter(Boolean);

        return (
          <span key={`line-${lineIndex}`} className="block">
            {lineWords.map((word, index) => {
              const currentIndex = wordIndex++;
              return (
                <motion.span
                  key={`${word}-${lineIndex}-${index}`}
                  aria-hidden="true"
                  className={cn("mr-[0.28em] inline-block last:mr-0", wordClassName)}
                  variants={wordVariants}
                  transition={{ duration: reducedMotion ? 0.35 : 0.85, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </MotionComponent>
  );
}
