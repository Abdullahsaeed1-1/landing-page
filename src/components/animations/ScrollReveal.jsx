"use client";

/**
 * ScrollReveal — unified cinematic scroll-triggered reveal primitive.
 *
 * Props
 * ─────
 * type        "heading" | "text" | "card" | "button" | "section" | "media"
 * delay       number (seconds)
 * duration    number (seconds)
 * y           number (px, override)
 * scale       number (override)
 * blur        boolean (default true)
 * once        boolean (default true)
 * stagger     — not used here; apply on parent via staggered delay props
 * className   string
 * children    ReactNode
 */

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/* ── Per-type animation presets ─────────────────────────────────────────── */
const PRESETS = {
  heading: {
    hidden: { opacity: 0, y: 72,  scale: 0.92, rotateX: 10, filter: "blur(14px)" },
    show:   { opacity: 1, y: 0,   scale: 1,    rotateX: 0,  filter: "blur(0px)"  },
    duration: 1.05,
    ease: [0.16, 1, 0.3, 1],
  },
  text: {
    hidden: { opacity: 0, y: 44,  scale: 0.97, filter: "blur(10px)" },
    show:   { opacity: 1, y: 0,   scale: 1,    filter: "blur(0px)"  },
    duration: 0.95,
    ease: [0.16, 1, 0.3, 1],
  },
  card: {
    hidden: { opacity: 0, y: 80,  scale: 0.94, rotateX: 8, filter: "blur(10px)" },
    show:   { opacity: 1, y: 0,   scale: 1,    rotateX: 0, filter: "blur(0px)"  },
    duration: 0.95,
    ease: [0.16, 1, 0.3, 1],
  },
  button: {
    hidden: { opacity: 0, y: 28, scale: 0.94 },
    show:   { opacity: 1, y: 0,  scale: 1    },
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
  },
  section: {
    hidden: { opacity: 0, y: 36, scale: 0.98 },
    show:   { opacity: 1, y: 0,  scale: 1    },
    duration: 1,
    ease: [0.22, 1, 0.36, 1],
  },
  media: {
    hidden: { opacity: 0, scale: 0.96, filter: "blur(8px)" },
    show:   { opacity: 1, scale: 1,    filter: "blur(0px)" },
    duration: 1.1,
    ease: [0.16, 1, 0.3, 1],
  },
};

/* ── Mobile reduced overrides ───────────────────────────────────────────── */
function mobilify(preset) {
  return {
    hidden: {
      ...preset.hidden,
      y:       (preset.hidden.y || 0) * 0.5,
      rotateX: 0,
    },
    show: preset.show,
    duration: preset.duration * 0.85,
    ease: preset.ease,
  };
}

/* ── Reduced-motion overrides ───────────────────────────────────────────── */
function reducify(preset) {
  return {
    hidden: { opacity: 0 },
    show:   { opacity: 1 },
    duration: 0.45,
    ease: "linear",
  };
}

/* ─────────────────────────────────────────────────────────────────────────
   ScrollReveal
───────────────────────────────────────────────────────────────────────── */
export default function ScrollReveal({
  children,
  className,
  type = "text",
  delay = 0,
  duration,       /* override */
  y,              /* override y offset */
  scale,          /* override scale */
  blur = true,
  once = true,
  amount = 0.18,  /* viewport amount to trigger */
  style,
  ...rest
}) {
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  /* Detect mobile once on client */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const h = (e) => setIsMobile(e.matches);
    mq.addEventListener?.("change", h);
    return () => mq.removeEventListener?.("change", h);
  }, []);

  /* Pick the right preset */
  let preset = PRESETS[type] || PRESETS.text;
  if (prefersReduced) preset = reducify(preset);
  else if (isMobile)  preset = mobilify(preset);

  /* Apply prop overrides */
  const hidden = { ...preset.hidden };
  const show   = { ...preset.show };

  if (y     !== undefined) { hidden.y     = y; show.y     = 0; }
  if (scale !== undefined) { hidden.scale = scale; show.scale = 1; }
  if (!blur) {
    delete hidden.filter;
    delete show.filter;
  }

  const finalDuration = duration ?? preset.duration;

  /* Use perspective wrapper for card/heading/media */
  const needsPerspective = ["heading", "card", "media"].includes(type) && !prefersReduced;

  return (
    <motion.div
      className={cn(
        "will-change-transform",
        needsPerspective && "reveal-perspective",
        className
      )}
      style={{ transformStyle: needsPerspective ? "preserve-3d" : undefined, ...style }}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden,
        show: {
          ...show,
          transition: {
            duration: finalDuration,
            ease: preset.ease,
            delay,
          },
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
