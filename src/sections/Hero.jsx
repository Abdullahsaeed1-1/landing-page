"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "@/components/ui/AnimatedButton";
import Navbar from "@/components/layout/Navbar";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const headingLines = ["TenBit", "Solutions"];

export default function Hero() {
  const sectionRef = useRef(null);
  const [videoError, setVideoError] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .from(".hero-label", { autoAlpha: 0, y: 16, duration: 0.8 })
          .from(
            ".hero-heading-word",
            {
              autoAlpha: 0,
              yPercent: 112,
              duration: 1.12,
              stagger: 0.1,
            },
            "-=0.5"
          )
          .from(
            ".hero-support",
            { autoAlpha: 0, y: 20, duration: 0.85 },
            "-=0.64"
          )
          .from(
            ".hero-actions",
            { autoAlpha: 0, y: 16, duration: 0.8 },
            "-=0.58"
          );

        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.1,
            },
          })
          .to(
            ".hero-glass",
            {
              backgroundColor: "rgba(20, 91, 132, 0.3)",
              ease: "none",
              duration: 0.52,
            },
            0
          )
          .to(".hero-glass", {
            backgroundColor: "rgba(65, 42, 128, 0.28)",
            ease: "none",
            duration: 0.48,
          })
          .to(".hero-heading", { autoAlpha: 0.62, y: -48, ease: "none" }, 0)
          .to(
            ".hero-support-scroll",
            { autoAlpha: 0.16, y: -24, ease: "none" },
            0
          )
          .to(
            ".hero-actions-scroll",
            { autoAlpha: 0.3, y: -16, ease: "none" },
            0
          )
          .to(
            ".hero-label-scroll",
            { autoAlpha: 0.28, y: -12, ease: "none" },
            0
          )
          .to(".hero-video-shell", { scale: 1.1, ease: "none" }, 0);

        ScrollTrigger.refresh();
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [".hero-label", ".hero-heading-word", ".hero-support", ".hero-actions"],
          { autoAlpha: 1, y: 0 }
        );
      });

      return () => media.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen overflow-hidden bg-black"
    >
      <Navbar />

      <div className="absolute inset-0">
        <div className="hero-video-shell absolute inset-0 scale-[1.04]">
          {!videoError ? (
            <video
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                videoReady ? "opacity-100" : "opacity-0"
              }`}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              onCanPlay={() => setVideoReady(true)}
              onError={() => setVideoError(true)}
            >
              <source src="/videos/hero%20video.mp4" type="video/mp4" />
            </video>
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(49,152,218,0.22),transparent_34%),radial-gradient(circle_at_78%_18%,rgba(63,130,163,0.16),transparent_26%),linear-gradient(180deg,#101820_0%,#050709_68%,#000_100%)]" />
          )}
        </div>

        <div
          className="hero-glass absolute inset-0 backdrop-blur-[3px] backdrop-saturate-[0.82]"
          style={{ backgroundColor: "rgba(3, 18, 28, 0.3)" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(49,152,218,0.12),transparent_32%),radial-gradient(circle_at_82%_26%,rgba(39,130,185,0.1),transparent_22%)]" />
        <div className="absolute inset-0 bg-linear-to-t from-black/82 via-black/16 to-black/10" />
        <div className="noise-overlay absolute inset-0 opacity-25" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-linear-to-t from-[#0b2230] via-[#0b2230]/48 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-360 flex-col justify-end px-5 pb-10 pt-28 sm:px-8 sm:pb-12 lg:px-12 xl:px-16">
        <div className="max-w-6xl">
          <div className="hero-label-scroll">
            <p className="hero-label text-[0.66rem] font-medium uppercase tracking-[0.38em] text-[#3198DA]/86 sm:text-xs">
              TenBit Solutions
            </p>
          </div>

          <h1
            className="hero-heading mt-5 text-[clamp(4.5rem,15vw,13.5rem)] font-medium leading-[0.82] tracking-[-0.09em] text-[#ECE9E9]"
            aria-label="TenBit Solutions"
          >
            {headingLines.map((line) => (
              <span
                key={line}
                className="block overflow-hidden pb-[0.08em]"
                aria-hidden="true"
              >
                <span className="hero-heading-word inline-block">{line}</span>
              </span>
            ))}
          </h1>

          <div className="hero-support-scroll">
            <p className="hero-support mt-5 text-xs uppercase tracking-[0.24em] text-[#ECE9E9]/54 sm:text-sm">
              Digital solutions for modern growth.
            </p>
          </div>

          <div className="hero-actions-scroll">
            <div className="hero-actions mt-6">
              <AnimatedButton
                href="#contact"
                className="px-4 py-2.5 text-xs shadow-[0_18px_50px_-24px_rgba(49,152,218,0.35)]"
              >
                Start a Project
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
