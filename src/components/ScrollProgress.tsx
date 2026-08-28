"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A whisper-thin gold reading-progress bar pinned to the very top of the
 * viewport. Spring-smoothed so it glides rather than snaps.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gold-sheen"
      style={{ scaleX }}
    />
  );
}
