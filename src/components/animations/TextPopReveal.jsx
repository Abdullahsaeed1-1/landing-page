"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const tagMap = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
};

export default function TextPopReveal({
  text,
  as = "p",
  className,
  wordClassName,
  delay = 0,
  stagger = 0.045,
  once = true,
  by = "word",
}) {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(media.matches);

    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  const tokens = useMemo(() => {
    if (!text) {
      return [];
    }

    if (by === "char") {
      return Array.from(text);
    }

    return text.split(/(\s+)/);
  }, [text, by]);

  if (!text) {
    return null;
  }

  const MotionTag = tagMap[as] || motion.p;
  const depth = reduceMotion ? 0 : isMobile ? -40 : -80;
  const offsetY = reduceMotion ? 8 : isMobile ? 46 : 80;
  const rotateX = reduceMotion ? 0 : isMobile ? 40 : 65;
  const blur = reduceMotion ? "blur(2px)" : isMobile ? "blur(8px)" : "blur(12px)";

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: offsetY,
      rotateX,
      z: depth,
      filter: blur,
    },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      z: 0,
      filter: "blur(0px)",
    },
  };

  return (
    <MotionTag
      className={cn("perspective-text preserve-3d whitespace-pre-wrap", className)}
      aria-label={text}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.35 }}
    >
      {tokens.map((token, index) => {
        const isSpace = token.trim() === "";

        if (isSpace) {
          return (
            <span key={`space-${index}`} aria-hidden="true">
              {token}
            </span>
          );
        }

        return (
          <span key={`${token}-${index}`} className="mask-reveal" aria-hidden="true">
            <motion.span
              className={cn("inline-block preserve-3d", wordClassName)}
              variants={itemVariants}
              transition={{ duration: reduceMotion ? 0.4 : 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 900 }}
            >
              {token}
            </motion.span>
          </span>
        );
      })}
    </MotionTag>
  );
}
