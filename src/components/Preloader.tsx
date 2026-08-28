"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";

const IMG = "/logo-emblem.png?v=3";
const KEY = "rf_intro_seen";

/**
 * Cinematic brand intro. On the first view of a session the metallic emblem
 * materialises out of darkness, a gold light sweeps across it, then the whole
 * curtain lifts to reveal the site. Shown once per session and skipped entirely
 * for visitors who prefer reduced motion.
 */
export default function Preloader() {
  const reduce = useReducedMotion();
  // `null` = undecided (first paint), avoids a flash before we know the state.
  const [show, setShow] = useState<boolean | null>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* storage blocked — treat as first visit */
    }

    if (seen || reduce) {
      setShow(false);
      return;
    }

    setShow(true);
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }

    // Lock scroll while the curtain is up.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t = setTimeout(() => setShow(false), 2350);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-ink"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
          onAnimationComplete={() => {
            document.body.style.overflow = "";
          }}
        >
          {/* soft radial glow behind the mark */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute h-[60vmin] w-[60vmin] rounded-full bg-gold/10 blur-[90px]"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          <div className="relative flex flex-col items-center">
            {/* emblem materialising */}
            <motion.div
              className="relative w-40 sm:w-48"
              initial={{ opacity: 0, scale: 0.82, filter: "blur(14px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative aspect-[1080/1234] w-full">
                <img
                  src={IMG}
                  alt={`${site.name} emblem`}
                  className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
                />
                {/* gold light sweep across the mark */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 mix-blend-screen"
                  style={{
                    WebkitMaskImage: `url(${IMG})`,
                    maskImage: `url(${IMG})`,
                    WebkitMaskSize: "100% 100%",
                    maskSize: "100% 100%",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    backgroundImage:
                      "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.85) 50%, transparent 60%)",
                    backgroundSize: "260% 260%",
                  }}
                  initial={{ backgroundPosition: "180% 0" }}
                  animate={{ backgroundPosition: "-80% 0" }}
                  transition={{ duration: 1.3, ease: "easeInOut", delay: 0.35 }}
                />
              </div>
            </motion.div>

            {/* wordmark */}
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
            >
              <p className="font-display text-2xl uppercase tracking-[0.3em] text-cream">
                Regal
              </p>
              <p className="mt-1 text-[0.6rem] uppercase tracking-[0.45em] text-gold">
                Foundations
              </p>
            </motion.div>

            {/* progress hairline */}
            <div className="mt-7 h-px w-40 overflow-hidden bg-ink-line sm:w-48">
              <motion.div
                className="h-full bg-gold-sheen"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.9, ease: [0.65, 0, 0.35, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
