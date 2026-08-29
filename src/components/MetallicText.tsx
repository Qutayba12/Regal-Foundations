"use client";

import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Drives the metallic sheen on gold headings: a single throttled listener maps
 * the cursor's horizontal position to a global `--mx` CSS variable, so the
 * bright band in `.text-gold-gradient` glides across every gold heading as the
 * pointer moves — the same "living metal" feel as the logo. Desktop only; the
 * default centred sheen stays put on touch / reduced-motion.
 */
export default function MetallicText() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    let x = 50;
    const onMove = (e: MouseEvent) => {
      x = (e.clientX / window.innerWidth) * 100;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          document.documentElement.style.setProperty("--mx", `${x.toFixed(1)}%`);
          raf = 0;
        });
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return null;
}
