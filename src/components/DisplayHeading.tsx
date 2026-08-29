"use client";

import { motion, useReducedMotion } from "framer-motion";
import BuildUpText from "./BuildUpText";

/**
 * A section's <h2>: the plain title builds up letter by letter, then the gold
 * highlight arrives as one polished, sheen-lit piece (kept whole so its
 * cursor-tracked metal gradient stays continuous across the word).
 */
export default function DisplayHeading({
  title,
  highlight,
  className = "",
}: {
  title: string;
  highlight?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const goldDelay = reduce ? 0 : title.replace(/\s/g, "").length * 0.028 + 0.15;

  return (
    <h2 className={className}>
      <BuildUpText text={title} />
      {highlight && (
        <>
          {" "}
          <motion.span
            className="inline-block text-gold-gradient"
            initial={reduce ? false : { opacity: 0, y: "35%" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: goldDelay, ease: [0.22, 1, 0.36, 1] }}
          >
            {highlight}
          </motion.span>
        </>
      )}
    </h2>
  );
}
