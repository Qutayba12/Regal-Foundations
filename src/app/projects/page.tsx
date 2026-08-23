import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProjectGallery from "@/components/ProjectGallery";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A selection of recent extensions, renovations and interior projects delivered by Regal Foundations across London and the South East.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        title="Projects We're"
        highlight="Proud Of"
        subtitle="Every project tells a story of craftsmanship, care and lasting quality. Explore a selection of our recent transformations."
      />

      <section className="py-24">
        <div className="container-x">
          <ProjectGallery />
        </div>
      </section>

      {/* Featured before/after */}
      <section className="border-y border-ink-line bg-ink-soft py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <BeforeAfterSlider
              before="linear-gradient(135deg,#34373e,#1c1e25)"
              after="linear-gradient(135deg,#E4C77E,#7c5f28)"
              caption="Period restoration · Windsor"
            />
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Featured Project"
              title="Character Kept,"
              highlight="Standards Raised"
              subtitle="This Victorian property was sensitively restored — original features preserved, while every system was brought fully up to modern standards."
            />
            <dl className="mt-8 grid grid-cols-2 gap-6">
              {[
                ["Scope", "Full restoration"],
                ["Duration", "16 weeks"],
                ["Location", "Windsor, Berkshire"],
                ["Result", "A forever home"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs uppercase tracking-wider text-silver-muted">
                    {k}
                  </dt>
                  <dd className="mt-1 font-semibold text-cream">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
