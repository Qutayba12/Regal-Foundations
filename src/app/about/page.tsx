import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import Stats from "@/components/Stats";
import Reveal from "@/components/Reveal";
import CTA from "@/components/CTA";
import LogoStage from "@/components/LogoStage";
import { site, whyUs } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Regal Foundations is a UK construction and renovation company built on craftsmanship, honesty and lasting quality. Meet the team behind the work.",
};

const values = [
  {
    title: "Integrity",
    text: "Honest advice and transparent pricing. We tell you what you need, not what sells.",
  },
  {
    title: "Craftsmanship",
    text: "We treat every home as if it were our own — because standards are everything.",
  },
  {
    title: "Reliability",
    text: "We turn up, we communicate, and we finish what we start, on time.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="The Team Behind"
        highlight="Regal"
        subtitle="Founded on a simple belief: that a home should be built to last for generations — today, tomorrow, and forever."
      />

      {/* Story */}
      <section className="py-24">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-ink-line bg-ink-soft">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(201,162,75,0.18),transparent_60%)]" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <LogoStage className="mx-auto w-52" />
                  <p className="mt-4 text-xs uppercase tracking-[0.35em] text-gold">
                    Est. Excellence
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Our Story"
              title="Built on"
              highlight="Solid Ground"
            />
            <div className="mt-6 space-y-4 text-silver">
              <p>
                {site.name} was founded to raise the standard of home building in
                the UK. Too many homeowners had been let down by unreliable trades,
                unclear pricing and corners cut where they matter most.
              </p>
              <p>
                We do things differently. From the foundations up, we build with
                precision and pride — combining traditional craftsmanship with modern
                methods to create spaces that are as sound as they are beautiful.
              </p>
              <p>
                Whether it is a light-filled extension, a full renovation or the
                finest finishing touches, our promise never changes:{" "}
                <span className="text-cream">
                  Building Today, Supporting Tomorrow, Standing Forever.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Stats />

      {/* Values */}
      <section className="py-24">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="What We Stand For"
            title="Our"
            highlight="Values"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="card-surface h-full p-8 text-center">
                  <h3 className="font-display text-2xl uppercase tracking-wide text-gold-gradient">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-silver">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Assurances */}
      <section className="border-t border-ink-line bg-ink-soft py-24">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="flex items-start gap-4">
                  <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-semibold text-cream">{item.title}</h3>
                    <p className="mt-1 text-sm text-silver">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
