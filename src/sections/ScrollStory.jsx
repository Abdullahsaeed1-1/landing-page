"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const story =
  "From GETSVIEW to TenBit Solutions \u2014 a journey shaped by innovation, growth, and digital transformation.";

const milestones = [
  {
    year: "2016",
    title: "GETSVIEW Launch",
    description: "Technology review platform.",
  },
  {
    year: "2018",
    title: "GETSVIEW Market",
    description: "Multi-vendor marketplace.",
  },
  {
    year: "2020",
    title: "TenBit Solutions",
    description: "IT solutions company established.",
  },
  {
    year: "2024",
    title: "50+ Projects",
    description: "Successful projects delivered.",
  },
];

export default function ScrollStory() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".story-intro",
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".story-stage",
              start: "top 76%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          ".story-word",
          { autoAlpha: 0.15, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: ".story-scroll-window",
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          ".timeline-line",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".timeline-list",
              start: "top 78%",
              end: "bottom 68%",
              scrub: 1,
            },
          }
        );

        gsap.fromTo(
          ".timeline-item",
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".timeline-list",
              start: "top 76%",
              toggleActions: "play none none reverse",
            },
          }
        );

        ScrollTrigger.refresh();
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".story-intro", ".story-word", ".timeline-item"], {
          autoAlpha: 1,
          y: 0,
        });
        gsap.set(".timeline-line", { scaleY: 1 });
      });

      return () => media.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate border-y border-white/10 bg-black"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="noise-overlay absolute inset-0 opacity-35" />
        <div className="absolute left-1/2 top-[28rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[#3198DA]/6 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-360 px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="story-scroll-window min-h-[155vh]">
          <div className="story-stage sticky top-0 flex min-h-screen items-center py-20">
            <div className="max-w-7xl">
              <p className="story-intro text-[0.66rem] font-medium uppercase tracking-[0.38em] text-[#3198DA]/78 sm:text-xs">
                From Vision to Reality
              </p>

              <h2
                className="mt-6 max-w-7xl text-[clamp(3rem,7.4vw,7.6rem)] font-medium leading-[0.98] tracking-[-0.065em] text-[#ECE9E9]"
                aria-label={story}
              >
                {story.split(" ").map((word, index) => (
                  <span
                    key={`${word}-${index}`}
                    aria-hidden="true"
                    className="story-word mr-[0.2em] inline-block text-[#ECE9E9]"
                  >
                    {word}
                  </span>
                ))}
              </h2>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pb-24 pt-16 sm:pb-28 sm:pt-20">
          <div className="mb-9">
            <p className="text-[0.66rem] font-medium uppercase tracking-[0.38em] text-[#3198DA]/74 sm:text-xs">
              Evolution Timeline
            </p>
          </div>

          <div className="timeline-list relative max-w-4xl">
            <span className="timeline-line absolute bottom-5 left-[0.29rem] top-3 w-px origin-top bg-linear-to-b from-[#3198DA] via-[#2782B9]/55 to-[#6200D9]/55" />

            <div className="space-y-4">
              {milestones.map((milestone) => (
                <article
                  key={milestone.year}
                  className="timeline-item relative pl-8"
                >
                  <span className="absolute left-0 top-7 h-2.5 w-2.5 rounded-full border border-[#3198DA]/70 bg-black shadow-[0_0_18px_rgba(49,152,218,0.4)]" />
                  <div className="grid gap-3 rounded-2xl border border-white/8 bg-white/[0.025] px-5 py-5 backdrop-blur-sm transition-colors duration-500 hover:border-[#3198DA]/28 hover:bg-white/[0.04] sm:grid-cols-[6rem_1fr] sm:gap-6 sm:px-6">
                    <p className="text-xs font-semibold tracking-[0.24em] text-[#3198DA]">
                      {milestone.year}
                    </p>
                    <div>
                      <h3 className="text-xl font-medium tracking-[-0.03em] text-[#ECE9E9] sm:text-2xl">
                        {milestone.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-[#ECE9E9]/46">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
