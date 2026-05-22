"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

export default function ScrollDepthText({ children, className }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const z = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -12]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(6px)", "blur(0px)"]);

  const zSpring = useSpring(z, { stiffness: 120, damping: 22, mass: 0.4 });
  const scaleSpring = useSpring(scale, { stiffness: 120, damping: 22, mass: 0.4 });
  const ySpring = useSpring(y, { stiffness: 120, damping: 22, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={cn("perspective-text preserve-3d", className)}
      style={{
        z: zSpring,
        scale: scaleSpring,
        y: ySpring,
        opacity,
        filter: blur,
        transformPerspective: 900,
      }}
    >
      {children}
    </motion.div>
  );
}
