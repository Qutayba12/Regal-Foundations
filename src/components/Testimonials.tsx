import SectionHeading from "./SectionHeading";
import { testimonials } from "@/lib/site";

type Item = (typeof testimonials)[number];

function Stars() {
  return (
    <div className="flex gap-0.5 text-gold" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
          <path d="m12 2 3 6.5 7 .9-5.1 4.8 1.3 7L12 17.8 5.5 21.2l1.3-7L1.7 9.4l7-.9L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function Card({ t }: { t: Item }) {
  return (
    <figure className="card-surface flex w-[280px] shrink-0 flex-col gap-3 whitespace-normal p-6 sm:w-[330px]">
      <Stars />
      <blockquote className="flex-1 text-sm leading-relaxed text-silver">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-1 border-t border-ink-line pt-4">
        <span className="block text-sm font-semibold text-cream">{t.name}</span>
        <span className="text-xs text-silver-muted">{t.location}</span>
      </figcaption>
    </figure>
  );
}

/** One infinitely-scrolling row; items are duplicated so the -50% loop is seamless. */
function Row({ items, reverse }: { items: Item[]; reverse?: boolean }) {
  return (
    <div className="marquee-row marquee-mask overflow-hidden py-1">
      <div
        className={`flex w-max gap-5 ${
          reverse ? "animate-marquee-rev" : "animate-marquee"
        }`}
      >
        {[...items, ...items].map((t, i) => (
          <Card key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const mid = Math.ceil(testimonials.length / 2);
  const rowA = testimonials.slice(0, mid);
  const rowB = testimonials.slice(mid);

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
      </div>

      {/* Two full-bleed rows drifting in opposite directions */}
      <div className="mt-14 flex flex-col gap-5">
        <Row items={rowA} />
        <Row items={rowB} reverse />
      </div>
    </section>
  );
}
