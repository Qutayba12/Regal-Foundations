"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { goldenThread } from "@/lib/site";

const DRAW = 1.6;
const vp = { once: true, margin: "-100px" } as const;

const icons: Record<string, React.ReactNode> = {
  trowel: <path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v6M15 9v6M9 15v6M15 15v6" />,
  shield: <path d="M12 3l7 3v6c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3z" />,
  crown: <path d="M4 19h16M4 19l-1.2-9L8 14l4-8 4 8 5.2-4L20 19" />,
};

function PillarIcon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
}

/** The three tagline pillars linked by a self-drawing golden thread with a
 *  continuously flowing light pulse. */
export default function GoldenThreadPillars() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, vp);
  const on = inView || !!reduce;

  const pillars = goldenThread.pillars;
  const n = pillars.length;
  const nodeDelay = (i: number) => (reduce ? 0 : 0.5 + (i / (n - 1)) * (DRAW - 0.4));

  const node = (i: number) => (
    <motion.div
      className="relative z-10 grid h-16 w-16 shrink-0 place-items-center rounded-full border-2 border-gold bg-ink text-gold"
      initial={false}
      animate={{
        scale: on ? 1 : 0.5,
        opacity: on ? 1 : 0,
        boxShadow: on ? "0 0 24px 5px rgba(201,162,75,0.4)" : "0 0 0 0 rgba(201,162,75,0)",
      }}
      transition={{ duration: 0.5, delay: nodeDelay(i), ease: [0.34, 1.56, 0.64, 1] }}
    >
      <PillarIcon name={pillars[i].icon} />
    </motion.div>
  );

  const copy = (i: number) => (
    <motion.div
      initial={false}
      animate={{ opacity: on ? 1 : 0, y: on ? 0 : 12 }}
      transition={{ duration: 0.5, delay: nodeDelay(i) + 0.12 }}
    >
      <h3 className="font-display text-xl uppercase tracking-wide text-gold-gradient">{pillars[i].title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-silver">{pillars[i].text}</p>
    </motion.div>
  );

  return (
    <div ref={ref} className="mt-16">
      {/* Desktop: horizontal thread */}
      <div className="relative hidden lg:block">
        <svg className="absolute inset-x-0 top-0 h-16 w-full overflow-visible" viewBox="0 0 1000 64" preserveAspectRatio="none" fill="none" aria-hidden>
          <defs>
            <linearGradient id="gtGradH" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#9C7A2E" />
              <stop offset="0.5" stopColor="#E4C77E" />
              <stop offset="1" stopColor="#9C7A2E" />
            </linearGradient>
            <filter id="gtGlowH" x="-5%" y="-400%" width="110%" height="900%">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <line x1="0" y1="32" x2="1000" y2="32" stroke="#22242C" strokeWidth="2" />
          <motion.line
            x1="0" y1="32" x2="1000" y2="32" stroke="url(#gtGradH)" strokeWidth="2.5" strokeLinecap="round"
            pathLength={1} filter="url(#gtGlowH)" initial={false}
            animate={{ pathLength: on ? 1 : 0 }} transition={{ duration: reduce ? 0 : DRAW, ease: [0.22, 1, 0.36, 1] }}
          />
          {on && !reduce && (
            <line x1="0" y1="32" x2="1000" y2="32" stroke="#FFF7E6" strokeWidth="3" strokeLinecap="round"
              pathLength={1} strokeDasharray="0.05 0.95" className="animate-threadflow" filter="url(#gtGlowH)" opacity="0.9" />
          )}
        </svg>
        <div className="grid grid-cols-3 gap-8">
          {pillars.map((p, i) => (
            <div key={p.title} className="flex flex-col items-center text-center">
              {node(i)}
              <div className="mt-6 max-w-[15rem]">{copy(i)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical thread */}
      <div className="relative lg:hidden">
        <svg className="absolute left-0 top-8 h-[calc(100%-4rem)] w-16 overflow-visible" viewBox="0 0 64 1000" preserveAspectRatio="none" fill="none" aria-hidden>
          <defs>
            <linearGradient id="gtGradV" x1="0" y1="0" x2="0" y2="1000" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#9C7A2E" />
              <stop offset="0.5" stopColor="#E4C77E" />
              <stop offset="1" stopColor="#9C7A2E" />
            </linearGradient>
            <filter id="gtGlowV" x="-400%" y="-5%" width="900%" height="110%">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <line x1="32" y1="0" x2="32" y2="1000" stroke="#22242C" strokeWidth="2" />
          <motion.line
            x1="32" y1="0" x2="32" y2="1000" stroke="url(#gtGradV)" strokeWidth="2.5" strokeLinecap="round"
            pathLength={1} filter="url(#gtGlowV)" initial={false}
            animate={{ pathLength: on ? 1 : 0 }} transition={{ duration: reduce ? 0 : DRAW, ease: [0.22, 1, 0.36, 1] }}
          />
          {on && !reduce && (
            <line x1="32" y1="0" x2="32" y2="1000" stroke="#FFF7E6" strokeWidth="3" strokeLinecap="round"
              pathLength={1} strokeDasharray="0.05 0.95" className="animate-threadflow" filter="url(#gtGlowV)" opacity="0.9" />
          )}
        </svg>
        <div className="space-y-10">
          {pillars.map((p, i) => (
            <div key={p.title} className="flex items-start gap-5">
              {node(i)}
              <div className="pt-2">{copy(i)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
