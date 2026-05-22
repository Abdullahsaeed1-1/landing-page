"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";

/* ─────────────────────────────────────────────────────────
   ColorTransitionBreak
   Visual bridge between the cinematic hero and page content.
   Features:
     - Flowing animated colour wave layers
     - Sweeping blue/purple glow
     - Light streaks passing across
     - Small text reveal: "Strategy. Design. Systems. Growth."
   ───────────────────────────────────────────────────────── */
export default function ColorTransitionBreak() {
  const sectionRef = useRef(null);
  const wave1Ref = useRef(null);
  const wave2Ref = useRef(null);
  const wave3Ref = useRef(null);
  const streakRef = useRef(null);

  useEffect(() => {
    let ctx;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      ctx = gsap.context(() => {
        /* ── Wave 1: slow horizontal drift ─────────────── */
        gsap.to(wave1Ref.current, {
          x: "15%",
          duration: 14,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        /* ── Wave 2: opposite drift ─────────────────────── */
        gsap.to(wave2Ref.current, {
          x: "-12%",
          duration: 11,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.5,
        });

        /* ── Wave 3: subtle scale pulse ─────────────────── */
        gsap.to(wave3Ref.current, {
          scale: 1.12,
          opacity: 0.9,
          duration: 9,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 0.8,
        });

        /* ── Streak: repeating sweep ─────────────────────── */
        if (streakRef.current) {
          gsap.fromTo(
            streakRef.current,
            { x: "-100%", opacity: 0 },
            {
              x: "120%",
              opacity: 0,
              duration: 4.5,
              ease: "power1.inOut",
              repeat: -1,
              repeatDelay: 3,
              keyframes: [
                { x: "-100%", opacity: 0 },
                { x: "-20%", opacity: 0.55 },
                { x: "60%", opacity: 0.3 },
                { x: "120%", opacity: 0 },
              ],
            }
          );
        }

        /* ── Scroll-linked entrance ──────────────────────── */
        gsap.fromTo(
          sectionRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "top 55%",
              scrub: true,
            },
          }
        );
      }, sectionRef);
    };

    init();

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  const words = ["Strategy.", "Design.", "Systems.", "Growth."];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ padding: "9rem 0", opacity: 0 }}
    >
      {/* ── Dark base ─────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{ background: "#03060d" }}
      />

      {/* ── Wave 1 — wide blue band ───────────────────────── */}
      <div
        ref={wave1Ref}
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 60% at 20% 50%, rgba(49,152,218,0.20) 0%, transparent 65%)",
          filter: "blur(48px)",
        }}
      />

      {/* ── Wave 2 — purple band ──────────────────────────── */}
      <div
        ref={wave2Ref}
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 55% at 80% 50%, rgba(127,0,217,0.18) 0%, transparent 65%)",
          filter: "blur(52px)",
        }}
      />

      {/* ── Wave 3 — centre glow ──────────────────────────── */}
      <div
        ref={wave3Ref}
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: 0.75 }}
      >
        <div
          style={{
            width: "70vw",
            height: "50vh",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(79,55,201,0.15) 0%, rgba(49,152,218,0.08) 50%, transparent 75%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* ── Light streak ──────────────────────────────────── */}
      <div
        ref={streakRef}
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-full pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: 0,
            width: "45vw",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(49,152,218,0.6), rgba(127,0,217,0.4), transparent)",
            filter: "blur(1px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "60%",
            left: 0,
            width: "35vw",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(127,0,217,0.4), rgba(49,152,218,0.3), transparent)",
            filter: "blur(1.5px)",
            transform: "translateY(8px)",
          }}
        />
      </div>

      {/* ── Horizontal thin separator lines ──────────────── */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0"
        style={{
          top: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(49,152,218,0.3) 30%, rgba(127,0,217,0.25) 70%, transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute left-0 right-0"
        style={{
          bottom: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(49,152,218,0.3) 30%, rgba(127,0,217,0.25) 70%, transparent)",
        }}
      />

      {/* ── Text content ──────────────────────────────────── */}
      <div
        className="container-width relative text-center"
        style={{ zIndex: 10 }}
      >
        {/* Small label above */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.55em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.28)",
            marginBottom: "2rem",
          }}
        >
          The TenBit Way
        </motion.p>

        {/* Main words */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:gap-x-6"
        >
          {words.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.12,
              }}
              style={{
                fontWeight: 700,
                fontSize: "clamp(1.4rem, 4vw, 3rem)",
                lineHeight: 1,
                letterSpacing: "-0.01em",
                /* alternating gradient per word for visual rhythm */
                background:
                  i % 2 === 0
                    ? "linear-gradient(135deg, #3198DA, #2A93C8)"
                    : "linear-gradient(135deg, #7F00D9, #4F37C9)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Bottom line */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.12em",
            color: "rgba(255,255,255,0.32)",
            marginTop: "2.5rem",
            lineHeight: 1.6,
          }}
        >
          Every project we take on is built to outlast the brief.
        </motion.p>
      </div>
    </section>
  );
}
