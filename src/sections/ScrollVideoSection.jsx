"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const videos = [
  "/videos/hero%20video.mp4",
  "/videos/video2.mp4",
  "/videos/video3.mp4",
];

const story =
  "From GETSVIEW to TenBit Solutions \u2014 a journey shaped by innovation, growth, and digital transformation.";

const milestones = [
  { year: "2016", title: "GETSVIEW Launch", note: "Technology review platform." },
  { year: "2018", title: "GETSVIEW Market", note: "Multi-vendor marketplace." },
  { year: "2020", title: "TenBit Solutions", note: "IT solutions company established." },
  { year: "2024", title: "50+ Projects", note: "Successful projects delivered." },
];

export default function ScrollVideoSection({ children }) {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.15,
            },
          });

        const blendTo = (from, to, at, tint, blur, saturation) => {
          timeline
            .to(
              `.scroll-video-${to}`,
              { autoAlpha: 1, duration: 0.1, ease: "none" },
              at
            )
            .to(
              `.scroll-video-${from}`,
              { autoAlpha: 0, duration: 0.14, ease: "none" },
              at + 0.035
            )
            .to(
              ".scroll-video-glass",
              {
                backgroundColor: tint,
                backdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
                webkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
                duration: 0.16,
                ease: "none",
              },
              at
            );
        };

        timeline
          .fromTo(
            ".scroll-video-1",
            { scale: 1.035, yPercent: 0 },
            { scale: 1.11, yPercent: -3.6, duration: 1, ease: "none" },
            0
          )
          .fromTo(
            ".scroll-video-2",
            { scale: 1.04, yPercent: 1.4 },
            { scale: 1.105, yPercent: -3.1, duration: 1, ease: "none" },
            0
          )
          .fromTo(
            ".scroll-video-3",
            { scale: 1.04, yPercent: 1.2 },
            { scale: 1.095, yPercent: -2.8, duration: 1, ease: "none" },
            0
          );

        blendTo(1, 2, 0.1, "rgba(49, 152, 218, 0.18)", 30, 124);
        blendTo(2, 3, 0.25, "rgba(79, 55, 201, 0.14)", 28, 120);
        blendTo(3, 1, 0.4, "rgba(39, 130, 185, 0.17)", 31, 122);
        blendTo(1, 2, 0.55, "rgba(49, 152, 218, 0.19)", 29, 126);
        blendTo(2, 3, 0.7, "rgba(79, 55, 201, 0.14)", 30, 120);
        blendTo(3, 1, 0.85, "rgba(39, 130, 185, 0.17)", 28, 122);

        gsap.fromTo(
          ".scroll-video-copy",
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".scroll-video-intro",
              start: "top 84%",
              end: "top 35%",
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          ".scroll-video-word",
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: ".scroll-video-intro",
              start: "top 74%",
              end: "top 18%",
              scrub: 1,
            },
          }
        );

        gsap.to(".scroll-video-copy", {
          autoAlpha: 0,
          y: -26,
          ease: "none",
          scrollTrigger: {
            trigger: ".scroll-video-intro",
            start: "bottom 18%",
            end: "bottom -20%",
            scrub: 1,
          },
        });

        gsap.fromTo(
          ".cinematic-story-label",
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".cinematic-story",
              start: "top 78%",
              end: "top 46%",
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          ".cinematic-story-word",
          { autoAlpha: 0.14, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: ".cinematic-story",
              start: "top 72%",
              end: "center 46%",
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          ".cinematic-timeline-line",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".cinematic-timeline-list",
              start: "top 72%",
              end: "bottom 72%",
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          ".cinematic-timeline-item",
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.78,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".cinematic-timeline-list",
              start: "top 76%",
              toggleActions: "play none none reverse",
            },
          }
        );

        ScrollTrigger.refresh();
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ".scroll-video-copy",
            ".scroll-video-word",
            ".cinematic-story-label",
            ".cinematic-story-word",
            ".cinematic-timeline-item",
          ],
          { autoAlpha: 1, y: 0 }
        );
        gsap.set(".cinematic-timeline-line", { scaleY: 1 });
      });

      return () => media.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate -mt-px bg-[#0b2230]"
      aria-label="TenBit cinematic systems"
    >
      <div className="pointer-events-none absolute inset-x-0 -top-32 z-20 h-64 bg-[linear-gradient(180deg,transparent_0%,rgba(11,34,48,0.68)_24%,rgba(11,34,48,0.98)_46%,rgba(11,34,48,0.98)_54%,rgba(11,34,48,0.58)_76%,transparent_100%)]" />

      <div className="sticky top-0 h-screen overflow-hidden">
        {videos.map((src, index) => (
          <video
            key={src}
            className={`scroll-video-${index + 1} absolute inset-0 h-full w-full object-cover ${
              index === 0 ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            loop
            muted
            playsInline
            preload={index === 0 ? "auto" : "metadata"}
          >
            <source src={src} type="video/mp4" />
          </video>
        ))}

        <div
          className="scroll-video-glass absolute inset-0"
          style={{
            backgroundColor: "rgba(39, 130, 185, 0.14)",
            backdropFilter: "blur(24px) saturate(116%)",
            WebkitBackdropFilter: "blur(24px) saturate(116%)",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/72 via-black/18 to-black/18" />
        <div className="noise-overlay absolute inset-0 opacity-32" />
      </div>

      <div className="relative z-10 -mt-[100vh]">
        <div className="scroll-video-intro mx-auto flex min-h-screen max-w-360 items-end px-5 pb-12 sm:px-8 sm:pb-16 lg:px-12 xl:px-16">
          <div className="scroll-video-copy max-w-5xl">
            <p className="text-[0.66rem] font-medium uppercase tracking-[0.38em] text-[#3198DA]/86 sm:text-xs">
              TenBit Systems
            </p>

            <h2
              className="mt-5 text-[clamp(3.5rem,8.8vw,9.5rem)] font-medium leading-[0.9] tracking-[-0.075em] text-[#ECE9E9]"
              aria-label="Technology that moves with your business."
            >
              {"Technology that moves with your business."
                .split(" ")
                .map((word, index, words) => (
                  <span
                    key={`${word}-${index}`}
                    aria-hidden="true"
                    className={`scroll-video-word inline-block ${
                      index === words.length - 1 ? "" : "mr-[0.22em]"
                    }`}
                  >
                    {word}
                  </span>
                ))}
            </h2>
          </div>
        </div>

        <div className="min-h-[82vh]" aria-hidden="true" />

        <div className="cinematic-story mx-auto flex min-h-screen max-w-360 items-center px-5 py-20 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-7xl">
            <p className="cinematic-story-label text-[0.66rem] font-medium uppercase tracking-[0.38em] text-[#3198DA]/82 sm:text-xs">
              From Vision to Reality
            </p>

            <h2
              className="mt-6 text-[clamp(3rem,7.4vw,7.6rem)] font-medium leading-[0.98] tracking-[-0.065em] text-[#ECE9E9]"
              aria-label={story}
            >
              {story.split(" ").map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  aria-hidden="true"
                  className="cinematic-story-word mr-[0.2em] inline-block"
                >
                  {word}
                </span>
              ))}
            </h2>
          </div>
        </div>

        <div className="cinematic-timeline mx-auto flex min-h-[165vh] max-w-360 items-center px-5 py-20 sm:px-8 lg:px-12 xl:px-16">
          <div className="w-full max-w-4xl">
            <p className="mb-9 text-[0.66rem] font-medium uppercase tracking-[0.38em] text-[#3198DA]/78 sm:text-xs">
              Evolution Timeline
            </p>

            <div className="cinematic-timeline-list relative">
              <span className="cinematic-timeline-line absolute bottom-5 left-[0.29rem] top-3 w-px origin-top bg-linear-to-b from-[#3198DA] via-[#2782B9]/60 to-[#6200D9]/65" />

              <div className="space-y-4">
                {milestones.map((milestone) => (
                  <article
                    key={milestone.year}
                    className="cinematic-timeline-item relative pl-8"
                  >
                    <span className="absolute left-0 top-7 h-2.5 w-2.5 rounded-full border border-[#3198DA]/78 bg-black/70 shadow-[0_0_22px_rgba(49,152,218,0.5)]" />
                    <div className="cinematic-hover-card grid gap-3 rounded-2xl px-5 py-5 sm:grid-cols-[6rem_1fr] sm:gap-6 sm:px-6">
                      <p className="text-xs font-semibold tracking-[0.24em] text-[#3198DA]">
                        {milestone.year}
                      </p>
                      <div>
                        <h3 className="text-xl font-medium tracking-[-0.03em] text-[#ECE9E9] sm:text-2xl">
                          {milestone.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-[#ECE9E9]/52">
                          {milestone.note}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="min-h-[36vh]" aria-hidden="true" />

        <div className="cinematic-page-content relative">
          {children}
        </div>
      </div>
    </section>
  );
}
