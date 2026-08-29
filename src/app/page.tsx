import Link from "next/link";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import ProcessTimeline from "@/components/ProcessTimeline";
import GoldenStandard from "@/components/GoldenStandard";
import WhyUsStack from "@/components/WhyUsStack";
import TrustMarquee from "@/components/TrustMarquee";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ProjectGallery from "@/components/ProjectGallery";
import Testimonials from "@/components/Testimonials";
import ServiceAreas from "@/components/ServiceAreas";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <Stats />

      {/* Services */}
      <section className="py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="What We Do"
            title="Craftsmanship for"
            highlight="Every Home"
            subtitle="From bold structural extensions to the finest interior finishes, we cover every stage of your project under one trusted roof."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* The Gold Standard — molten gold */}
      <GoldenStandard />

      {/* Process — Foundation to Finish */}
      <section className="border-t border-ink-line py-24">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="How We Work"
            title="From Foundation"
            highlight="to Finish"
            subtitle="A calm, transparent journey from first conversation to the keys in your hand — you always know exactly what happens next."
          />
          <ProcessTimeline />
        </div>
      </section>

      {/* Before / After feature */}
      <section className="border-y border-ink-line bg-ink-soft py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="The Transformation"
              title="See the"
              highlight="Difference"
              subtitle="Drag the handle to reveal how we turn tired, dated spaces into homes that feel brand new — without losing an ounce of character."
            />
            <ul className="mt-8 space-y-4">
              {[
                "Meticulous, tidy site management",
                "Fixed, transparent pricing",
                "Fully insured with a workmanship guarantee",
              ].map((point) => (
                <li key={point} className="flex items-center gap-3 text-silver">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <Reveal>
            <BeforeAfterSlider
              before="linear-gradient(135deg,#33363d,#1b1d24)"
              after="linear-gradient(135deg,#C9A24B,#6b5326)"
              caption="Full kitchen & rear extension · Ecclesall"
            />
          </Reveal>
        </div>
      </section>

      {/* Why us — wallet stacking cards */}
      <section className="py-24">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Why Regal"
            title="A Standard"
            highlight="Above"
            subtitle="We are not the cheapest builders — we are the ones you call when it has to be done properly."
          />
        </div>
        <div className="container-x">
          <WhyUsStack />
        </div>
      </section>

      {/* Projects preview */}
      <section className="border-t border-ink-line bg-ink-soft py-24">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Recent Work"
              title="Selected"
              highlight="Projects"
            />
            <Link
              href="/projects"
              className="text-sm font-semibold uppercase tracking-wider text-gold hover:text-gold-soft"
            >
              View all projects →
            </Link>
          </div>
          <div className="mt-12">
            <ProjectGallery limit={3} />
          </div>
        </div>
      </section>

      <Testimonials />
      <ServiceAreas />
      <CTA />
    </>
  );
}
