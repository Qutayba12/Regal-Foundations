"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { whyUs } from "@/lib/site";

/** One icon per reason, in the same order as `whyUs`. */
const icons = [
  // Built to Last — layered foundation
  <path key="a" d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6" />,
  // Fully Insured — shield check
  <path key="b" d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3zM9 12l2 2 4-4" />,
  // One Trusted Team — people
  <path key="c" d="M17 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 20v-2a4 4 0 0 0-3-3.87M16 4.13A4 4 0 0 1 16 11.5" />,
  // Transparent Pricing — tag
  <path key="d" d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0l-7-7A2 2 0 0 1 3 12.2V5a2 2 0 0 1 2-2h7.2a2 2 0 0 1 1.4.6l7 7a2 2 0 0 1 0 2.8zM7.5 7.5h.01" />,
];

function StackCard({
  i,
  total,
  progress,
  item,
}: {
  i: number;
  total: number;
  progress: MotionValue<number>;
  item: { title: string; text: string };
}) {
  // Earlier cards shrink more as they get buried; the last card never shrinks.
  const targetScale = 1 - (total - 1 - i) * 0.05;
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);

  return (
    <div className="sticky top-0 flex h-screen items-center justify-center px-4">
      <motion.div
        style={{ scale, top: `calc(-4vh + ${i * 32}px)` }}
        className="relative w-full max-w-3xl origin-top overflow-hidden rounded-[2rem] border border-gold/20 bg-ink-card shadow-card"
      >
        {/* gold corner glow (radial gradient, no blur filter → no iOS
            square flash) + hairline top edge */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56"
          style={{ background: "radial-gradient(circle, rgba(201,162,75,0.12), transparent 62%)" }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

        <div className="relative p-8 sm:p-12">
          <div className="flex items-start justify-between gap-6">
            <span className="font-display text-6xl leading-none text-gold-gradient sm:text-7xl">
              0{i + 1}
            </span>
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-gold/25 bg-ink text-gold">
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7 fill-none stroke-current"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {icons[i % icons.length]}
              </svg>
            </span>
          </div>

          <h3 className="mt-8 font-display text-3xl uppercase tracking-wide text-cream sm:text-4xl">
            {item.title}
          </h3>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-silver sm:text-lg">
            {item.text}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * "Wallet" stacking cards: each reason pins to the centre of the viewport and
 * scales down as the next card slides up over it, leaving a fanned deck. Works
 * on every screen; reduced-motion visitors get a clean static grid instead.
 */
export default function WhyUsStack() {
  const reduce = useReducedMotion();
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  if (reduce) {
    return (
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {whyUs.map((item, i) => (
          <div key={item.title} className="card-surface h-full p-7">
            <span className="font-display text-3xl text-gold-gradient">
              0{i + 1}
            </span>
            <h3 className="mt-4 text-lg font-semibold text-cream">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-silver">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={container} className="mt-10">
      {whyUs.map((item, i) => (
        <StackCard
          key={item.title}
          i={i}
          total={whyUs.length}
          progress={scrollYProgress}
          item={item}
        />
      ))}
    </div>
  );
}
