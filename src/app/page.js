import TextPopReveal from "@/components/animations/TextPopReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import CinematicHero from "@/sections/CinematicHero";
import ColorTransitionBreak from "@/sections/ColorTransitionBreak";
import ClientShowcase from "@/sections/ClientShowcase";
import { site } from "@/data/site";

/* ─────────────────────────────────────────────────────────────────────────
   Animated section divider — width grows from 0 to 100% on scroll
───────────────────────────────────────────────────────────────────────── */
function AnimDivider() {
  return (
    <div className="container-width">
      <ScrollReveal type="section" amount={0.6} className="overflow-hidden">
        <div className="section-divider" />
      </ScrollReveal>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Home page
───────────────────────────────────────────────────────────────────────── */
export default function Home() {
  const { about, services, projects, process, cta } = site;

  return (
    <main className="flex flex-col">

      {/* ══ HERO ═══════════════════════════════════════════════════════════ */}
      <CinematicHero />

      {/* ══ COLOR TRANSITION BRIDGE ════════════════════════════════════════ */}
      <ColorTransitionBreak />

      <AnimDivider />

      {/* ══ ABOUT ══════════════════════════════════════════════════════════ */}
      <section id="about" className="section-padding scroll-depth-section">
        <div className="container-width">
          <div className="grid gap-10 lg:grid-cols-[160px_1fr]">

            {/* Section number */}
            <ScrollReveal type="text" amount={0.5}>
              <span className="text-sm uppercase tracking-[0.3em] text-[color:var(--brand-blue-3)]">
                01
              </span>
            </ScrollReveal>

            <div className="glass-panel space-y-10 rounded-3xl p-6 md:p-8">
              {/* Heading */}
              <TextPopReveal
                text={about.title}
                as="h2"
                className="text-3xl leading-tight text-white md:text-5xl font-[var(--font-display)]"
                wordClassName="text-pop-glow"
              />

              {/* Body */}
              <ScrollReveal type="text" delay={0.1}>
                <p className="mt-6 max-w-2xl text-lg text-white/70">
                  {about.copy}
                </p>
              </ScrollReveal>

              {/* Highlight cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                {about.highlights.map((item, index) => (
                  <ScrollReveal
                    key={item}
                    type="card"
                    delay={0.08 * index}
                    amount={0.15}
                  >
                    <div
                      className="glass-card premium-hover gradient-border rounded-2xl px-5 py-4 text-sm text-white/70 h-full"
                      data-cursor="hover"
                    >
                      {item}
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <AnimDivider />

      {/* ══ SERVICES ═══════════════════════════════════════════════════════ */}
      <section id="services" className="section-padding scroll-depth-section">
        <div className="container-width">
          <div className="grid gap-10 lg:grid-cols-[160px_1fr]">

            <ScrollReveal type="text" amount={0.5}>
              <span className="text-sm uppercase tracking-[0.3em] text-[color:var(--brand-blue-3)]">
                02
              </span>
            </ScrollReveal>

            <div className="glass-panel space-y-10 rounded-3xl p-6 md:p-8">
              <TextPopReveal
                text="Software services built for scale."
                as="h2"
                className="text-3xl text-white md:text-5xl font-[var(--font-display)]"
                wordClassName="text-pop-glow"
              />

              <ScrollReveal type="text" delay={0.1}>
                <p className="mt-6 max-w-2xl text-lg text-white/70">
                  Product, platform, and infrastructure support that keeps teams shipping.
                </p>
              </ScrollReveal>

              <div className="grid gap-6 md:grid-cols-3">
                {services.map((service, index) => (
                  <ScrollReveal
                    key={service.title}
                    type="card"
                    delay={0.1 * index}
                    amount={0.12}
                  >
                    <div
                      className="glass-card premium-card-hover gradient-border h-full rounded-2xl p-6"
                      data-cursor="hover"
                    >
                      <h3 className="text-xl text-white">{service.title}</h3>
                      <p className="mt-4 text-sm text-white/70">{service.description}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <AnimDivider />

      {/* ══ SHOWCASE ═══════════════════════════════════════════════════════ */}
      <section id="showcase" className="section-padding scroll-depth-section">
        <div className="container-width">
          <div className="grid gap-10 lg:grid-cols-[160px_1fr]">

            <ScrollReveal type="text" amount={0.5}>
              <span className="text-sm uppercase tracking-[0.3em] text-[color:var(--brand-blue-3)]">
                03
              </span>
            </ScrollReveal>

            <div className="glass-panel space-y-10 rounded-3xl p-6 md:p-8">
              <TextPopReveal
                text="Software delivery highlights."
                as="h2"
                className="text-3xl text-white md:text-5xl font-[var(--font-display)]"
                wordClassName="text-pop-glow"
              />

              <ScrollReveal type="text" delay={0.1}>
                <p className="mt-6 max-w-2xl text-lg text-white/70">
                  A snapshot of the systems and platforms we build for growing teams.
                </p>
              </ScrollReveal>

              <div className="grid gap-6 lg:grid-cols-3">
                {projects.map((project, index) => (
                  <ScrollReveal
                    key={project.title}
                    type="card"
                    delay={0.1 * index}
                    amount={0.12}
                  >
                    <div
                      className="glass-card premium-card-hover gradient-border overflow-hidden rounded-2xl h-full"
                      data-cursor="hover"
                    >
                      <div className="aspect-[4/3] bg-premium-gradient opacity-80" />
                      <div className="space-y-3 p-6">
                        <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                          {project.type}
                        </p>
                        <h3 className="text-lg text-white">{project.title}</h3>
                        <p className="text-sm text-white/70">{project.description}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <AnimDivider />

      {/* ══ CLIENT SHOWCASE — pinned horizontal scroll ══════════════════════ */}
      <ClientShowcase />

      <AnimDivider />

      {/* ══ PROCESS ════════════════════════════════════════════════════════ */}
      <section id="process" className="section-padding scroll-depth-section">
        <div className="container-width">
          <div className="grid gap-10 lg:grid-cols-[160px_1fr]">

            <ScrollReveal type="text" amount={0.5}>
              <span className="text-sm uppercase tracking-[0.3em] text-[color:var(--brand-blue-3)]">
                04
              </span>
            </ScrollReveal>

            <div className="glass-panel space-y-10 rounded-3xl p-6 md:p-8">
              <TextPopReveal
                text="A reliable delivery process."
                as="h2"
                className="text-3xl text-white md:text-5xl font-[var(--font-display)]"
                wordClassName="text-pop-glow"
              />

              <ScrollReveal type="text" delay={0.1}>
                <p className="mt-6 max-w-2xl text-lg text-white/70">
                  Clear milestones, tight feedback loops, and a predictable engineering rhythm.
                </p>
              </ScrollReveal>

              <ol className="space-y-6">
                {process.map((step, index) => (
                  <ScrollReveal
                    key={step.title}
                    type="card"
                    delay={0.09 * index}
                    amount={0.12}
                  >
                    <li
                      className="glass-card premium-card-hover gradient-border rounded-2xl p-6"
                      data-cursor="hover"
                    >
                      <div className="flex items-start gap-6">
                        <span className="text-lg text-[color:var(--brand-blue-4)] tabular-nums">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="text-xl text-white">{step.title}</h3>
                          <p className="mt-3 text-sm text-white/70">{step.description}</p>
                        </div>
                      </div>
                    </li>
                  </ScrollReveal>
                ))}
              </ol>
            </div>

          </div>
        </div>
      </section>

      <AnimDivider />

      {/* ══ CONTACT / CTA ══════════════════════════════════════════════════ */}
      <section id="contact" className="section-padding scroll-depth-section">
        <div className="container-width">
          <ScrollReveal type="section" amount={0.1}>
            <div className="glass-card gradient-border rounded-3xl p-10 md:p-16 section-glow-bg">
              <div className="grid gap-10 lg:grid-cols-[160px_1fr]">

                <ScrollReveal type="text" amount={0.4}>
                  <span className="text-sm uppercase tracking-[0.3em] text-[color:var(--brand-blue-3)]">
                    05
                  </span>
                </ScrollReveal>

                <div className="space-y-6">
                  <TextPopReveal
                    text={cta.title}
                    as="h2"
                    className="text-3xl text-white md:text-5xl font-[var(--font-display)]"
                    wordClassName="text-pop-glow"
                  />

                  <ScrollReveal type="text" delay={0.12}>
                    <p className="mt-4 max-w-2xl text-lg text-white/70">
                      {cta.subtext}
                    </p>
                  </ScrollReveal>

                  <ScrollReveal type="section" delay={0.18}>
                    <div className="brand-spectrum max-w-sm" />
                  </ScrollReveal>

                  <ScrollReveal type="button" delay={0.24}>
                    <MagneticButton href="mailto:hello@tenbitsolutions.com">
                      {cta.button}
                    </MagneticButton>
                  </ScrollReveal>
                </div>

              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </main>
  );
}
