"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Reveals a heading as it scrolls into view by "building up" letter by letter —
 * each glyph rises into place with a stagger, like courses being laid. Letters
 * are grouped per word so words never break mid-way, and the full text is
 * exposed to screen readers via aria-label. Reduced-motion renders it plainly.
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
  if (reduce) return <span className={className}>{text}</span>;

  const words = text.split(" ");
  let g = 0;

  return (
    <span className={className} aria-label={text}>
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
                  initial={{ opacity: 0, y: "65%" }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
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
