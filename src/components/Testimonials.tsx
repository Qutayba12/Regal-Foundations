import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { testimonials } from "@/lib/site";

function Stars() {
  return (
    <div className="flex gap-0.5 text-gold" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
          <path d="m12 2 3 6.5 7 .9-5.1 4.8 1.3 7L12 17.8 5.5 21.2l1.3-7L1.7 9.4l7-.9L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24">
      <div className="container-x">
        <SectionHeading
          center
          eyebrow="What Our Clients Say"
          title="Trusted by"
          highlight="Homeowners"
          subtitle="Real transformations, real relationships. Here is what our clients think of working with Regal Foundations."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="card-surface flex h-full flex-col p-8">
                <Stars />
                <blockquote className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-silver">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-ink-line pt-5">
                  <span className="block font-semibold text-cream">{t.name}</span>
                  <span className="text-sm text-silver-muted">{t.location}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
