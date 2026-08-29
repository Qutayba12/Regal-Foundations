"use client";

import { Fragment, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/**
 * Reveals a heading as it scrolls into view by "building up" letter by letter —
 * each glyph rises into place with a stagger, like courses being laid. A single
 * container-level in-view trigger drives every letter (so none can get stuck
 * hidden), letters are grouped per word so words never break mid-way, and the
 * full text is exposed to screen readers. Reduced-motion renders it plainly.
 */
export default function BuildUpText({
  text,
  className = "",
  startDelay = 0,
  per = 0.028,
}: {
  text: string;
  className?: string;
  startDelay?: number;
  per?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const on = inView || !!reduce;

  if (reduce) return <span className={className}>{text}</span>;

  const words = text.split(" ");
  let g = 0;

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <span className="inline-block whitespace-nowrap" aria-hidden="true">
            {Array.from(word).map((ch, ci) => {
              const delay = startDelay + g * per;
              g += 1;
              return (
                <motion.span
                  key={ci}
                  className="inline-block"
                  initial={false}
                  animate={{ opacity: on ? 1 : 0, y: on ? 0 : "65%" }}
                  transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
                >
                  {ch}
                </motion.span>
              );
            })}
          </span>
          {wi < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}
