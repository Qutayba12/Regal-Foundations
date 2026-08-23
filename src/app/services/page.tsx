import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ServiceCard from "@/components/ServiceCard";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CTA from "@/components/CTA";
import { services, process, faqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Home extensions, full renovations & restorations, and bespoke interior finishes — delivered by one trusted, fully-insured team across the UK.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Services"
        title="Everything Under"
        highlight="One Roof"
        subtitle="From the first footing to the final finish, Regal Foundations handles every stage of your project — so you deal with one accountable team, not a dozen subcontractors."
      />

      <section className="py-24">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-ink-line bg-ink-soft py-24">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="How We Work"
            title="A Clear,"
            highlight="Simple Process"
            subtitle="No jargon, no surprises. Just a proven path from first idea to finished home."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.08}>
                <div className="card-surface relative h-full p-7">
                  <span className="font-display text-4xl text-gold-gradient">
                    {step.step}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-cream">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-silver">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="container-x max-w-3xl">
          <SectionHeading
            center
            eyebrow="Good to Know"
            title="Frequently Asked"
            highlight="Questions"
          />
          <div className="mt-12 space-y-4">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05}>
                <details className="card-surface group p-6 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-cream">
                    {f.q}
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-gold/30 text-gold transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-silver">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
