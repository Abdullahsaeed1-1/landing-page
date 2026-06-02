"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useMotionValue, useSpring } from "motion/react";

export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.3 });

  useEffect(() => {
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    if (!canHover) {
      return;
    }

    setEnabled(true);

    const handleMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const handleOver = (event) => {
      const target = event.target.closest("[data-cursor='hover']");
      setHovering(Boolean(target));
    };

    const handleOut = (event) => {
      const nextTarget = event.relatedTarget?.closest("[data-cursor='hover']");
      if (nextTarget) {
        return;
      }
      setHovering(false);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerover", handleOver);
    document.addEventListener("pointerout", handleOut);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerover", handleOver);
      document.removeEventListener("pointerout", handleOut);
    };
  }, [x, y]);

  if (!enabled) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] mix-blend-screen"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        className="relative h-48 w-48 -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: hovering ? 1.25 : 1, opacity: hovering ? 0.9 : 0.65 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(49,152,218,0.35),rgba(63,130,163,0.16),transparent_65%)]" />
        <div className="absolute inset-[32%] rounded-full border border-[#3198DA]/40" />
        <div className="absolute inset-[46%] rounded-full bg-[#ECE9E9]/85" />
      </motion.div>
    </motion.div>
  );
}
