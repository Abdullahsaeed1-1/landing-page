"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";

/* ─────────────────────────────────────────────────────────
   Client data
───────────────────────────────────────────────────────── */
const CLIENTS = [
  { name: "Apex Group",       category: "Strategy • Systems",        year: "2024", accent: "#3198DA" },
  { name: "Nova Digital",     category: "Web • Branding",            year: "2025", accent: "#7F00D9" },
  { name: "Skyline Tech",     category: "Software • Automation",     year: "2024", accent: "#2A93C8" },
  { name: "Orbit Systems",    category: "Platforms • Integration",   year: "2025", accent: "#6200D9" },
  { name: "PrimeSoft",        category: "SaaS • Development",        year: "2024", accent: "#3198DA" },
  { name: "BluePeak Studio",  category: "Design • Motion",           year: "2025", accent: "#4F37C9" },
  { name: "Vertex Media",     category: "Web • Content Systems",     year: "2024", accent: "#2782B9" },
  { name: "CloudNest",        category: "Infrastructure • DevOps",   year: "2025", accent: "#7F00D9" },
  { name: "Alpha Labs",       category: "R&D • Prototyping",         year: "2024", accent: "#3198DA" },
  { name: "Metro Solutions",  category: "Enterprise • Workflow",     year: "2025", accent: "#6200D9" },
];

/* Slight editorial tilt per card — alternating */
const TILTS = [-2.5, 1.8, -1.2, 2.2, -2, 1.5, -1.8, 2.5, -1.5, 1.2];

/* ─────────────────────────────────────────────────────────
   ClientCard
───────────────────────────────────────────────────────── */
function ClientCard({ client, tilt, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      data-cursor="hover"
      className="client-card group"
      style={{ rotate: `${tilt}deg` }}
    >
      {/* Gradient border via pseudo – replicated inline for JSX */}
      <div className="client-card-inner">
        {/* Top: year + accent dot */}
        <div className="client-card-top">
          <span
            className="client-card-dot"
            style={{ background: client.accent }}
          />
          <span className="client-card-year">{client.year}</span>
        </div>

        {/* Company name */}
        <p
          className="client-card-name"
          style={{
            background: `linear-gradient(135deg, ${client.accent} 0%, #ffffff 100%)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          {client.name}
        </p>

        {/* Category */}
        <p className="client-card-category">{client.category}</p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   ClientShowcase (main export)
───────────────────────────────────────────────────────── */
export default function ClientShowcase() {
  const sectionRef  = useRef(null);
  const triggerRef  = useRef(null);  /* the outer pin wrapper */
  const trackRef    = useRef(null);  /* the scrolling horizontal strip */
  const headingRef  = useRef(null);  /* slight parallax on heading */

  useEffect(() => {
    let ctx;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      /* Short pause so Lenis finishes init */
      await new Promise((r) => setTimeout(r, 120));

      if (!triggerRef.current || !trackRef.current) return;

      const isMobile = window.innerWidth < 768;

      ctx = gsap.context(() => {
        if (isMobile) {
          /* ── Mobile: no pin, just fade in ────────────── */
          gsap.fromTo(
            sectionRef.current,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
          return;
        }

        /* ── Desktop: pinned horizontal scroll ────────── */

        /* How far the track needs to travel (right → left) */
        const trackWidth   = trackRef.current.scrollWidth;
        const viewW        = window.innerWidth;
        const travelDist   = trackWidth - viewW + 80; /* 80px breathing room */

        /* Main horizontal movement — pinned */
        gsap.fromTo(
          trackRef.current,
          { x: 0 },
          {
            x: -travelDist,
            ease: "none",
            scrollTrigger: {
              trigger: triggerRef.current,
              start: "top top",
              /* pin duration proportional to content width */
              end: () => `+=${travelDist * 1.1}`,
              scrub: 1.2,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          }
        );

        /* Subtle heading parallax — moves slightly slower */
        if (headingRef.current) {
          gsap.fromTo(
            headingRef.current,
            { x: 0 },
            {
              x: -travelDist * 0.08,
              ease: "none",
              scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: () => `+=${travelDist * 1.1}`,
                scrub: 1.6,
              },
            }
          );
        }
      });
    };

    init();

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="clients"
      aria-label="Client showcase"
      className="client-showcase-section"
    >
      {/* ── Section entrance wrapper ───────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── Pin trigger wrapper ───────────────────────── */}
        <div ref={triggerRef} className="client-showcase-pin-wrapper">

          {/* Dark background for the pinned view */}
          <div className="client-showcase-bg" aria-hidden="true">
            <div className="client-showcase-bg-orb client-showcase-bg-orb--blue" />
            <div className="client-showcase-bg-orb client-showcase-bg-orb--purple" />
            <div className="client-showcase-bg-grid" />
          </div>

          {/* ── Fixed heading (left column) ────────────── */}
          <div className="client-showcase-header" ref={headingRef}>
            <p className="client-showcase-label">04 / Trusted By</p>
            <h2 className="client-showcase-heading">
              Companies we&apos;ve helped<br />
              <em className="client-showcase-heading-em">move forward.</em>
            </h2>
            <p className="client-showcase-subtext">
              A selection of organisations that trusted TenBit Solutions
              to build, ship, and scale.
            </p>
            {/* Spectrum line */}
            <div className="brand-spectrum" style={{ maxWidth: 120, marginTop: "2rem" }} />
          </div>

          {/* ── Horizontal track ──────────────────────── */}
          <div className="client-showcase-track-outer">
            <div ref={trackRef} className="client-showcase-track">
              {CLIENTS.map((client, i) => (
                <ClientCard
                  key={client.name}
                  client={client}
                  tilt={TILTS[i % TILTS.length]}
                  index={i}
                />
              ))}
            </div>
          </div>

          {/* Bottom gradient separator */}
          <div className="client-showcase-bottom-line" aria-hidden="true" />
        </div>
      </motion.div>
    </section>
  );
}
