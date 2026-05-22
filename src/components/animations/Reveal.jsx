"use client";

/**
 * Reveal — generic scroll-triggered fade-up-blur reveal.
 * Upgraded to use the same cinematic depth language as ScrollReveal.
 */

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export default function Reveal({
  children,
  delay = 0,
  className,
  y = 52,
  amount = 0.2,
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: reduced ? 0 : y,
        filter: reduced ? "blur(0px)" : "blur(10px)",
        scale: reduced ? 1 : 0.97,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        scale: 1,
      }}
      viewport={{ once: true, amount }}
      transition={{
        duration: reduced ? 0.4 : 0.9,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
