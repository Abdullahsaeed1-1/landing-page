"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

const BASE =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full text-xs font-semibold uppercase tracking-[0.22em] transition-all duration-300 ease-out cursor-pointer";

const variants = {
  primary: {
    className:
      "bg-[#2A93C8] text-white border border-transparent px-6 py-3",
    hover: {
      boxShadow:
        "0 0 0 1px rgba(49,152,218,0.55) inset, 0 20px 60px -30px rgba(49,152,218,0.65)",
    },
  },
  secondary: {
    className:
      "bg-transparent text-white border border-[rgba(49,152,218,0.35)] px-6 py-3",
    hover: {
      boxShadow:
        "0 0 0 1px rgba(127,0,217,0.35) inset, 0 16px 50px -28px rgba(127,0,217,0.4)",
    },
  },
  ghost: {
    className:
      "bg-transparent text-white/75 border border-transparent px-6 py-3",
    hover: {},
  },
};

export default function MagneticButton({
  children,
  className,
  href,
  variant = "primary",
  type = "button",
  style,
  ...props
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 200, damping: 20, mass: 0.2 });

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.14);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.14);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const v = variants[variant] || variants.primary;

  const sharedProps = {
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    style: { x: sx, y: sy, ...style },
    "data-cursor": "hover",
    whileHover: { scale: 1.04 },
    whileTap: { scale: 0.97 },
    className: cn(
      BASE,
      v.className,
      /* Shine sweep */
      "after:absolute after:inset-y-0 after:-left-1/3 after:w-1/3 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:opacity-0 after:transition-all after:duration-600 group-hover:after:translate-x-[250%] group-hover:after:opacity-100",
      /* Inner glow overlay */
      "before:absolute before:inset-0 before:rounded-full before:bg-[radial-gradient(circle_at_top,rgba(49,152,218,0.22),transparent_70%)] before:opacity-0 before:transition-opacity before:duration-400 group-hover:before:opacity-100",
      className
    ),
    ...props,
  };

  if (href) {
    return (
      <motion.a href={href} {...sharedProps}>
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.a>
    );
  }

  return (
    <motion.button type={type} {...sharedProps}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
