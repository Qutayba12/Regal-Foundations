"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

const IMG = "/hero-villa.jpg";

const stages = [
  { label: "Foundations", text: "Engineered from the ground up." },
  { label: "Structure", text: "Solid, precise, built to last." },
  { label: "Finish", text: "The regal touches that make it home." },
];

export default function SelfBuildingHouse() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  // Reveal the real villa from the ground up (top inset shrinks 100% → 0%).
  const topPct = useTransform(p, [0.05, 0.95], [100, 0]);
  const clipPath = useMotionTemplate`inset(${topPct}% 0% 0% 0%)`;
  const scanTop = useMotionTemplate`${topPct}%`;
  const scanOpacity = useTransform(p, [0.03, 0.08, 0.93, 0.99], [0, 1, 1, 0]);
  const finishGlow = useTransform(p, [0.85, 1], [0, 1]);

  const [stage, setStage] = useState(0);
  useMotionValueEvent(p, "change", (v) => setStage(v < 0.4 ? 0 : v < 0.75 ? 1 : 2));

  const built = reduce
    ? { clipPath: "inset(0 0 0 0)" }
    : { clipPath };

  return (
    <section
      ref={ref}
      className="relative border-t border-ink-line bg-ink-soft"
      style={{ height: reduce ? "auto" : "230vh" }}
    >
      <div className={reduce ? "py-24" : "sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-14"}>
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">Watch It Rise</span>
            <h2 className="display-title text-4xl text-cream sm:text-5xl">
              Built Before <span className="text-gold-gradient">Your Eyes</span>
            </h2>
          </div>

          <div className="relative mx-auto mt-10 aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-3xl border border-gold/25 shadow-card">
            {/* Ghost / under-construction preview */}
            <div className="absolute inset-0">
              <img
                src={IMG}
                alt=""
                aria-hidden
                className="h-full w-full object-cover"
                style={{ filter: "grayscale(0.7) brightness(0.32) contrast(1.05)" }}
                draggable={false}
              />
              <div className="absolute inset-0 bg-[#0a1526]/40" />
              <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(201,162,75,0.6) 0 1px, transparent 1px 34px), repeating-linear-gradient(90deg, rgba(201,162,75,0.6) 0 1px, transparent 1px 34px)",
                }}
              />
            </div>

            {/* The finished home, revealed from the ground up */}
            <motion.div className="absolute inset-0" style={built}>
              <img
                src={IMG}
                alt="The finished home"
                className="h-full w-full object-cover"
                draggable={false}
              />
            </motion.div>

            {/* Warm bloom as the lights come on */}
            {!reduce && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ opacity: finishGlow }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_62%,rgba(244,197,106,0.22),transparent_70%)]" />
              </motion.div>
            )}

            {/* Gold construction scan line at the build frontier */}
            {!reduce && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-x-0"
                style={{ top: scanTop, opacity: scanOpacity }}
              >
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-gold/15 to-transparent" />
                <div className="h-[2px] w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_18px_3px_rgba(201,162,75,0.6)]" />
              </motion.div>
            )}

            {/* corner label */}
            <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur">
              Sheffield
            </span>
          </div>

          <div className="relative z-10 mt-8 flex flex-wrap items-start justify-center gap-x-10 gap-y-4">
            {stages.map((s, i) => (
              <div key={s.label} className="max-w-[13rem] text-center transition-opacity duration-300" style={{ opacity: stage === i ? 1 : 0.4 }}>
                <div className="flex items-center justify-center gap-2">
                  <span className={`grid h-7 w-7 place-items-center rounded-full border text-xs font-semibold ${stage >= i ? "border-gold bg-gold-sheen text-ink" : "border-ink-line text-silver-muted"}`}>
                    {i + 1}
                  </span>
                  <span className="font-display text-lg uppercase tracking-wide text-gold-gradient">{s.label}</span>
                </div>
                <p className="mt-1 text-xs text-silver">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
