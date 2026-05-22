"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import MagneticButton from "@/components/ui/MagneticButton";
import FullScreenMenu from "@/components/layout/FullScreenMenu";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Showcase", href: "#showcase" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 30);
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          width: "calc(100% - 48px)",
          maxWidth: 1440,
          zIndex: 50,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            padding: "10px 20px",
            borderRadius: 14,
            background: scrolled
              ? "rgba(0,0,0,0.55)"
              : "rgba(0,0,0,0.28)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: scrolled
              ? "0 8px 40px -16px rgba(0,0,0,0.85)"
              : "0 4px 24px -10px rgba(0,0,0,0.5)",
            transition: "background 0.4s ease, box-shadow 0.4s ease",
          }}
        >
          {/* Left — logo */}
          <a
            href="#home"
            data-cursor="hover"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#bb0707",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.75)",
                fontWeight: 500,
                transition: "color 0.25s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#fff")}
              onMouseLeave={(e) =>
                (e.target.style.color = "rgba(255,255,255,0.75)")
              }
            >
              TenBit Solutions
            </span>
          </a>

          {/* Centre — nav links (hidden on mobile) */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: 28,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            className="hidden md:flex"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                data-cursor="hover"
                className="nav-link-item"
                style={{
                  fontSize: "0.62rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  position: "relative",
                  paddingBottom: 2,
                  transition: "color 0.25s",
                }}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right — CTA + menu */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <MagneticButton
              href="#contact"
              variant="secondary"
              className="hidden sm:inline-flex"
              style={{ padding: "7px 16px", fontSize: "0.58rem" }}
            >
              Start a Project
            </MagneticButton>

            <button
              type="button"
              onClick={() => setOpen((p) => !p)}
              data-cursor="hover"
              aria-expanded={open}
              aria-controls="full-screen-menu"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 14px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "transparent",
                color: "rgba(255,255,255,0.65)",
                fontSize: "0.6rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "border-color 0.25s, color 0.25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.color = "rgba(255,255,255,0.65)";
              }}
            >
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3.5,
                  width: 14,
                  height: 10,
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    display: "block",
                    height: 1,
                    background: "currentColor",
                    borderRadius: 1,
                  }}
                />
                <span
                  style={{
                    display: "block",
                    height: 1,
                    width: "66%",
                    background: "currentColor",
                    borderRadius: 1,
                  }}
                />
              </span>
              Menu
            </button>
          </div>
        </div>
      </motion.header>

      <FullScreenMenu open={open} onClose={() => setOpen(false)} />

      {/* Nav link hover style */}
      <style>{`
        .nav-link-item:hover {
          color: rgba(255,255,255,0.9) !important;
        }
        .nav-link-item::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #3198DA, #7F00D9);
          transition: width 0.3s ease;
          border-radius: 1px;
        }
        .nav-link-item:hover::after {
          width: 100%;
        }
      `}</style>
    </>
  );
}
