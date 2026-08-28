import Link from "next/link";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { serviceAreas } from "@/lib/site";

// Decorative dots sprinkled on the rings to suggest surrounding towns.
const dots = [
  { top: "20%", left: "60%" },
  { top: "34%", left: "27%" },
  { top: "63%", left: "22%" },
  { top: "70%", left: "68%" },
  { top: "46%", left: "82%" },
  { top: "80%", left: "44%" },
];

function CoverageRadar() {
  const rings = [100, 74, 50, 28]; // % diameters, outer → inner
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[26rem]">
      {/* soft glow */}
      <div className="pointer-events-none absolute inset-[15%] rounded-full bg-gold/10 blur-3xl" />

      {/* static concentric rings */}
      {rings.map((d, i) => (
        <div
          key={d}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold"
          style={{ width: `${d}%`, height: `${d}%`, opacity: 0.1 + i * 0.06 }}
        />
      ))}

      {/* pulsing radar rings */}
      {[0, 1.25, 2.5].map((delay) => (
        <span
          key={delay}
          className="animate-pulsering absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/50"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}

      {/* town dots */}
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/70 shadow-[0_0_10px_2px_rgba(201,162,75,0.5)]"
          style={{ top: d.top, left: d.left }}
        />
      ))}

      {/* Sheffield hub */}
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-gold bg-ink text-gold shadow-gold">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11z" />
            <circle cx="12" cy="10" r="2.4" />
          </svg>
        </span>
        <span className="mt-2 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cream backdrop-blur">
          {serviceAreas.hub}
        </span>
      </div>
    </div>
  );
}

export default function ServiceAreas() {
  return (
    <section className="border-t border-ink-line py-24">
      <div className="container-x">
        <SectionHeading
          center
          eyebrow="Where We Work"
          title="Proudly Serving"
          highlight="Sheffield & Beyond"
        />

        <div className="mt-16 grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <CoverageRadar />
          </Reveal>

          <div>
            <Reveal>
              <p className="text-lg leading-relaxed text-silver">
                {serviceAreas.intro}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {serviceAreas.areas.map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-ink-line bg-ink-card px-4 py-2 text-sm text-silver transition-colors hover:border-gold/50 hover:text-gold"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link href="/contact" className="btn-gold">
                  Check Your Area
                </Link>
                <p className="text-sm text-silver-muted">
                  Don&apos;t see your area? We travel — just ask.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
