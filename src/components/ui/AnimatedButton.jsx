"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export default function AnimatedButton({
  href,
  onClick,
  children,
  variant = "primary",
  className,
  icon: Icon = ArrowRight,
  type = "button",
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const Component = href ? motion.a : motion.button;

  const styles =
    variant === "primary"
      ? "bg-[linear-gradient(135deg,#3198DA_0%,#2A93C8_100%)] text-white shadow-[0_18px_50px_-24px_rgba(49,152,218,0.45)] hover:brightness-110"
      : "border border-[#3F82A3]/25 bg-black/35 text-[#ECE9E9] backdrop-blur-md hover:border-[#3198DA]/45 hover:bg-white/6";

  return (
    <Component
      href={href}
      onClick={onClick}
      type={href ? undefined : type}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-0",
        styles,
        className
      )}
      whileHover={reduceMotion ? undefined : { y: -2, scale: 1.01 }}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      <span>{children}</span>
      <span className="relative flex h-5 w-5 items-center justify-center overflow-hidden rounded-full">
        <Icon size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Component>
  );
}
