"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { process } from "@/lib/site";

const LINE = 1.5; // seconds for the gold line to draw across

/**
 * "Foundation to Finish" — the four-step process rendered as a cinematic
 * timeline. A gold line draws itself across (horizontal on desktop, vertical
 * on mobile) while each numbered node lights up in sequence as the line
 * reaches it. A single container-level trigger keeps every element in sync;
 * static and instant for reduced-motion visitors.
 */
export default function ProcessTimeline() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const on = inView || !!reduce;

  const n = process.length;
  const nodeDelay = (i: number) => (reduce ? 0 : (i / (n - 1)) * LINE);

  return (
    <div ref={ref} className="mt-16">
      {/* ---------- Desktop: horizontal ---------- */}
      <div className="relative hidden lg:block">
        <div className="absolute left-[12.5%] right-[12.5%] top-[27px] h-px bg-ink-line" />
        <motion.div
          className="absolute left-[12.5%] right-[12.5%] top-[27px] h-px origin-left bg-gold-sheen"
          initial={false}
          animate={{ scaleX: on ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : LINE, ease: [0.65, 0, 0.35, 1] }}
        />

        <div className="grid grid-cols-4 gap-6">
          {process.map((s, i) => (
            <div key={s.step} className="text-center">
              <TimelineNode index={i} delay={nodeDelay(i)} on={on} />
              <motion.div
                initial={false}
                animate={{ opacity: on ? 1 : 0, y: on ? 0 : 16 }}
                transition={{ duration: 0.5, delay: nodeDelay(i) + 0.1 }}
              >
                <h3 className="mt-6 text-lg font-semibold text-cream">
                  {s.title}
                </h3>
                <p className="mx-auto mt-2 max-w-[15rem] text-sm leading-relaxed text-silver">
                  {s.text}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Mobile / tablet: vertical ---------- */}
      <div className="relative lg:hidden">
        <div className="absolute bottom-6 left-[26px] top-6 w-px bg-ink-line" />
        <motion.div
          className="absolute left-[26px] top-6 w-px origin-top bg-gold-sheen"
          style={{ bottom: "1.5rem" }}
          initial={false}
          animate={{ scaleY: on ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : LINE, ease: [0.65, 0, 0.35, 1] }}
        />

        <div className="space-y-8">
          {process.map((s, i) => (
            <div key={s.step} className="flex items-start gap-5">
              <TimelineNode index={i} delay={nodeDelay(i)} on={on} />
              <motion.div
                className="pt-1.5"
                initial={false}
                animate={{ opacity: on ? 1 : 0, x: on ? 0 : 16 }}
                transition={{ duration: 0.5, delay: nodeDelay(i) + 0.1 }}
              >
                <h3 className="text-lg font-semibold text-cream">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-silver">
                  {s.text}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineNode({
  index,
  delay,
  on,
}: {
  index: number;
  delay: number;
  on: boolean;
}) {
  return (
    <motion.div
      className="relative z-10 grid h-[54px] w-[54px] shrink-0 place-items-center rounded-full border border-gold/40 bg-ink font-display text-xl text-gold lg:mx-auto"
      initial={false}
      animate={{
        scale: on ? 1 : 0.6,
        opacity: on ? 1 : 0,
        boxShadow: on
          ? "0 0 16px 2px rgba(201,162,75,0.28)"
          : "0 0 0 0 rgba(201,162,75,0)",
      }}
      transition={{ duration: 0.5, delay, ease: [0.34, 1.56, 0.64, 1] }}
    >
      0{index + 1}
    </motion.div>
  );
}
