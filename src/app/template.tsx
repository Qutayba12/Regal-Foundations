"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Next.js re-mounts this template on every navigation, so it gives each page a
 * gentle choreographed entrance — content rises and fades in as a whole,
 * making route changes feel like one continuous, app-like experience.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
