"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import MagneticButton from "@/components/ui/MagneticButton";
import AnimatedLightField from "@/components/animations/AnimatedLightField";

/* ─────────────────────────────────────────────────────────
   CinematicHero
   ─────────────────────────────────────────────────────────
   Layout:
     - Full-screen section (100svh)
     - AnimatedLightField fills the entire background
     - Centred hero text (TENBIT / SOLUTIONS) with
       gradient fill, controlled font-size
     - Top-left brand label
     - Bottom-left intro copy + CTA buttons
     - Bottom-right scroll indicator
   
   GSAP ScrollTrigger:
     - Pin the section for ~1.3× viewport height
     - Text scales 1 → 1.45, drifts upward
     - Background parallaxes downward
     - Bottom content fades
   ───────────────────────────────────────────────────────── */
export default function CinematicHero() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const bgParallaxRef = useRef(null);
  const topLabelRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    let ctx;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      /* Short delay so Lenis is ready */
      await new Promise((r) => setTimeout(r, 100));

      if (!heroRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        /* Desktop: pin + parallax */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=130%",
            scrub: 1,
            pin: true,
            pinSpacing: true,
          },
        });

        tl.fromTo(
          bgParallaxRef.current,
          { y: 0, scale: 1.05 },
          { y: -90, scale: 1, ease: "none" },
          0
        )
          .fromTo(
            textRef.current,
            { scale: 1, y: 0 },
            { scale: 1.45, y: -70, ease: "none" },
            0
          )
          .fromTo(
            topLabelRef.current,
            { opacity: 1, y: 0 },
            { opacity: 0, y: -18, ease: "none" },
            0
          )
          .fromTo(
            bottomRef.current,
            { opacity: 1, y: 0 },
            { opacity: 0, y: 22, ease: "none" },
            0
          );

        return () => tl.kill();
      });

      mm.add("(max-width: 767px)", () => {
        /* Mobile: no pin, lighter movement */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=80%",
            scrub: 1,
          },
        });

        tl.fromTo(
          textRef.current,
          { scale: 1, y: 0 },
          { scale: 1.15, y: -30, ease: "none" },
          0
        ).fromTo(
          bottomRef.current,
          { opacity: 1 },
          { opacity: 0, ease: "none" },
          0
        );

        return () => tl.kill();
      });

      ctx = { revert: () => mm.revert() };
    };

    init();

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex flex-col overflow-hidden"
      style={{ height: "100svh", minHeight: 600 }}
    >
      {/* ── Animated light-field background ──────────────── */}
      <div
        ref={bgParallaxRef}
        className="absolute inset-0 will-change-transform"
        style={{ transform: "scale(1.05)" }}
      >
        <AnimatedLightField />
      </div>

      {/* ── Glow halo centred behind text ────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center"
      >
        <div
          style={{
            width: "60vw",
            height: "40vh",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(49,152,218,0.16) 0%, rgba(127,0,217,0.10) 50%, transparent 75%)",
            filter: "blur(48px)",
          }}
        />
      </div>

      {/* ── Top brand label ───────────────────────────────── */}
      <div
        ref={topLabelRef}
        className="absolute left-0 right-0 top-0 z-20 will-change-transform"
      >
        <div className="container-width flex items-center justify-between pt-28 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          >
            <p
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.45em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              TenBit Solutions
            </p>
            <p
              className="mt-1.5"
              style={{
                fontSize: "0.55rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.22)",
              }}
            >
              Digital Systems&nbsp;•&nbsp;Websites&nbsp;•&nbsp;Software&nbsp;•&nbsp;Automation
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="hidden sm:flex items-center gap-2"
          >
            <span
              className="rounded-full"
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                background: "#bb0707",
              }}
            />
            <span
              style={{
                fontSize: "0.55rem",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.28)",
              }}
            >
              Est. Digital Studio
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── Hero text ─────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-10 flex items-center justify-center will-change-transform"
        ref={textRef}
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="select-none text-center"
          style={{
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            /* Controlled sizes — see request */
            fontSize: "clamp(3rem, 16vw, 7rem)",
            /* Gradient text fill */
            background:
              "linear-gradient(135deg, #3F82A3 0%, #3198DA 28%, #2A93C8 48%, #7F00D9 72%, #4F37C9 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            /* Soft controlled glow */
            filter:
              "drop-shadow(0 0 32px rgba(49,152,218,0.32)) drop-shadow(0 0 80px rgba(127,0,217,0.18))",
          }}
        >
          {/* Responsive sizes — mobile vs desktop via inline style */}
          <style>{`
            @media (min-width: 768px) {
              .hero-text-inner {
                font-size: clamp(4.5rem, 11vw, 13rem) !important;
              }
            }
          `}</style>
          <div className="hero-text-inner" style={{ fontSize: "inherit" }}>
            TENBIT
          </div>
          <div className="hero-text-inner" style={{ fontSize: "inherit" }}>
            SOLUTIONS
          </div>
        </motion.div>
      </div>

      {/* ── Bottom content ────────────────────────────────── */}
      <div
        ref={bottomRef}
        className="absolute bottom-0 left-0 right-0 z-20 will-change-transform"
      >
        <div className="container-width pb-10 md:pb-14">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            {/* Left: copy + CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.75 }}
              className="max-w-sm space-y-5"
            >
              <p
                style={{
                  fontSize: "0.78rem",
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.48)",
                }}
              >
                Premium digital experiences built with strategy, design, and
                scalable technology.
              </p>
              <div className="flex flex-wrap gap-3">
                <MagneticButton href="#contact">Start a Project</MagneticButton>
                <MagneticButton href="#services" variant="secondary">
                  View Services
                </MagneticButton>
              </div>
            </motion.div>

            {/* Right: scroll indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.95 }}
              className="flex items-center gap-3 self-end sm:self-auto"
            >
              <div
                style={{
                  width: 40,
                  height: 1,
                  background:
                    "linear-gradient(90deg, transparent, rgba(49,152,218,0.55), rgba(127,0,217,0.45), transparent)",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.45em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.28)",
                }}
              >
                Scroll to explore
              </span>
            </motion.div>
          </div>
        </div>

        {/* Bottom divider */}
        <div
          style={{
            height: 1,
            width: "100%",
            background:
              "linear-gradient(90deg, transparent, rgba(49,152,218,0.35) 30%, rgba(127,0,217,0.30) 70%, transparent)",
          }}
        />
      </div>
    </section>
  );
}
