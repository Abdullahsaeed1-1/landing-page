"use client";

/**
 * AnimatedLightField — Premium liquid-tech hero background
 *
 * Architecture:
 *   1. Static dark base (#03060d)
 *   2. 3 slow-drifting CSS-animated gradient blobs (blue + purple)
 *   3. 2 fixed soft directional light sources
 *   4. Canvas overlay for mouse-following water ripple rings
 *   5. Ultra-subtle grain (opacity 0.032)
 *   6. Bottom/top vignettes
 *
 * No streaks, no beams, no grid, no red splashes.
 * All colours strictly from TenBit palette.
 */

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────
   Ripple canvas controller
   Draws expanding, fading concentric rings at mouse position.
───────────────────────────────────────────────────────── */
class RippleManager {
  constructor(canvas) {
    this.canvas  = canvas;
    this.ctx     = canvas.getContext("2d");
    this.ripples = [];
    this.raf     = null;
    this.running = false;
  }

  resize() {
    this.canvas.width  = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  spawn(x, y) {
    this.ripples.push({
      x,
      y,
      r:       0,
      maxR:    clamp(Math.max(this.canvas.width, this.canvas.height) * 0.14, 80, 220),
      opacity: 0.36,
      speed:   1.6,
    });
    /* Cap to 6 simultaneous ripples for performance */
    if (this.ripples.length > 6) this.ripples.shift();
  }

  tick() {
    const { ctx, canvas } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.ripples = this.ripples.filter((rp) => rp.opacity > 0.004);

    for (const rp of this.ripples) {
      rp.r       += rp.speed;
      rp.opacity *= 0.956; /* exponential fade */
      rp.speed   *= 0.985; /* decelerate gently */

      /* Outer ring */
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(49,152,218,${rp.opacity * 0.55})`;
      ctx.lineWidth   = 1.5;
      ctx.stroke();

      /* Inner ring (slightly smaller, purple tint) */
      if (rp.r > 18) {
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r * 0.62, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(127,0,217,${rp.opacity * 0.30})`;
        ctx.lineWidth   = 1;
        ctx.stroke();
      }
    }

    this.raf = requestAnimationFrame(() => this.tick());
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.tick();
    }
  }

  stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
  }
}

function clamp(v, lo, hi) {
  return Math.min(Math.max(v, lo), hi);
}

/* ─────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────── */
export default function AnimatedLightField({ className = "" }) {
  const wrapRef    = useRef(null);
  const canvasRef  = useRef(null);
  const rippleRef  = useRef(null);   /* RippleManager instance */
  const gsapCtxRef = useRef(null);

  /* ── 1. GSAP blob drift ─────────────────────────────── */
  useEffect(() => {
    let ctx;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      if (!wrapRef.current) return;

      const blobs = wrapRef.current.querySelectorAll(".alf-blob");

      ctx = gsap.context(() => {
        blobs.forEach((blob, i) => {
          const dur    = 18 + i * 6;           /* 18s, 24s, 30s */
          const dx     = [48, -38, 28][i] ?? 30;
          const dy     = [32, 40, -24][i] ?? 20;

          /* Positional drift — very slow */
          gsap.to(blob, {
            x: dx,
            y: dy,
            duration: dur,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 3,
          });

          /* Subtle scale breathe */
          gsap.to(blob, {
            scale: 1.08,
            duration: dur * 0.65,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 2,
          });

          /* Very gentle opacity pulse */
          gsap.to(blob, {
            opacity: "+=" + [0.06, 0.05, 0.04][i],
            duration: dur * 0.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 1.5,
          });
        });
      }, wrapRef);

      gsapCtxRef.current = ctx;
    };

    init();

    return () => {
      if (gsapCtxRef.current) gsapCtxRef.current.revert();
    };
  }, []);

  /* ── 2. Canvas ripple — mouse tracking ──────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* Skip on touch-only devices */
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    const manager = new RippleManager(canvas);
    rippleRef.current = manager;

    /* Size canvas to parent */
    const ro = new ResizeObserver(() => manager.resize());
    ro.observe(canvas.parentElement);
    manager.resize();
    manager.start();

    /* Throttled mouse handler — one ripple per 120ms max */
    let last = 0;
    const onMove = (e) => {
      const now = Date.now();
      if (now - last < 120) return;
      last = now;

      const rect = canvas.getBoundingClientRect();
      manager.spawn(e.clientX - rect.left, e.clientY - rect.top);
    };

    /* Listen on the section (parent of canvas) */
    const section = canvas.closest("section") || document.body;
    section.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      section.removeEventListener("mousemove", onMove);
      manager.stop();
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* ── Base dark layer ─────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{ background: "#030811" }}
      />

      {/* ── Blob 1 — primary blue, top-left ─────────── */}
      <div
        className="alf-blob absolute rounded-full"
        style={{
          width: "72vw",
          height: "72vw",
          top: "-22%",
          left: "-14%",
          background:
            "radial-gradient(circle, rgba(42,147,200,0.16) 0%, rgba(49,152,218,0.07) 45%, transparent 72%)",
          filter: "blur(72px)",
          opacity: 0.58,
          willChange: "transform, opacity",
        }}
      />

      {/* ── Blob 2 — deep purple, right-center ──────── */}
      <div
        className="alf-blob absolute rounded-full"
        style={{
          width: "60vw",
          height: "60vw",
          top: "5%",
          right: "-12%",
          background:
            "radial-gradient(circle, rgba(98,0,217,0.13) 0%, rgba(127,0,217,0.06) 50%, transparent 72%)",
          filter: "blur(80px)",
          opacity: 0.52,
          willChange: "transform, opacity",
        }}
      />

      {/* ── Blob 3 — soft mid-blue, bottom-center ───── */}
      <div
        className="alf-blob absolute rounded-full"
        style={{
          width: "48vw",
          height: "48vw",
          bottom: "-8%",
          left: "28%",
          background:
            "radial-gradient(circle, rgba(63,130,163,0.11) 0%, rgba(42,147,200,0.05) 50%, transparent 72%)",
          filter: "blur(64px)",
          opacity: 0.48,
          willChange: "transform, opacity",
        }}
      />

      {/* ── Fixed light 1 — soft blue from bottom-left  */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          bottom: "-5%",
          left: "-4%",
          width: "55vw",
          height: "55vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(49,152,218,0.09) 0%, transparent 68%)",
          filter: "blur(56px)",
          pointerEvents: "none",
        }}
      />

      {/* ── Fixed light 2 — deep purple from right      */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          top: "18%",
          right: "-6%",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(79,55,201,0.10) 0%, transparent 68%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* ── Tiny red micro-accent (1 point, very dim) ── */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          bottom: "22%",
          right: "14%",
          width: "12vw",
          height: "12vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(187,7,7,0.06) 0%, transparent 70%)",
          filter: "blur(36px)",
          pointerEvents: "none",
        }}
      />

      {/* ── Canvas ripple layer (pointer-events: none) ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ pointerEvents: "none", zIndex: 4 }}
      />

      {/* ── Extremely fine grain texture ─────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 mix-blend-overlay"
        style={{
          opacity: 0.032,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "140px 140px",
          pointerEvents: "none",
        }}
      />

      {/* ── Bottom vignette ──────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "42%",
          background:
            "linear-gradient(to top, #030811 0%, rgba(3,8,17,0.65) 45%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />

      {/* ── Top vignette ─────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0"
        style={{
          height: "22%",
          background:
            "linear-gradient(to bottom, rgba(3,8,17,0.55) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />
    </div>
  );
}
