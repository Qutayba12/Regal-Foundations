import Link from "next/link";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { serviceAreas } from "@/lib/site";

// Radar period (s) — waves and marker blinks share it so markers light up
// roughly as a wave front reaches their radius.
const PERIOD = 4.5;
// Continuously-emanating waves, evenly staggered across the period.
const waves = [0, 0.75, 1.5, 2.25, 3.0, 3.75];

// Town markers placed at varied radii (ρ, 0=centre→1=edge) and angles so they
// spread across every wave; the blink delay is derived from ρ so outer markers
// light up later, in step with the expanding wave.
const markerSpecs: [number, number][] = [
  [0.34, 40],
  [0.42, 300],
  [0.5, 112],
  [0.55, 205],
  [0.6, 250],
  [0.68, 158],
  [0.72, 22],
  [0.8, 82],
  [0.85, 330],
  [0.9, 208],
  [0.48, 8],
  [0.64, 128],
];
const markers = markerSpecs.map(([rho, deg]) => {
  const rad = (deg * Math.PI) / 180;
  return {
    left: 50 + rho * 50 * Math.cos(rad),
    top: 50 + rho * 50 * Math.sin(rad),
    delay: Math.max(0, ((rho - 0.1) / 0.9) * PERIOD),
  };
});

function CoverageRadar() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[26rem]">
      {/* soft glow */}
      <div className="pointer-events-none absolute inset-[15%] rounded-full bg-gold/10 blur-3xl" />

      {/* emanating waves */}
      {waves.map((delay) => (
        <span
          key={delay}
          className="animate-pulsering absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold/55"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}

      {/* town markers — location pins that blink into view as a wave passes */}
      {markers.map((m, i) => (
        <span
          key={i}
          className="absolute -translate-x-1/2 -translate-y-full"
          style={{ top: `${m.top}%`, left: `${m.left}%` }}
        >
          <svg
            viewBox="0 0 24 24"
            className="animate-dotblink h-5 w-5 origin-bottom drop-shadow-[0_0_6px_rgba(201,162,75,0.8)]"
            style={{ animationDelay: `${m.delay}s` }}
          >
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
              fill="#E4C77E"
            />
            <circle cx="12" cy="9" r="2.4" fill="#0B0B0D" />
          </svg>
        </span>
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
