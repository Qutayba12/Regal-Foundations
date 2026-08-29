"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/* ---------- isometric projection ---------- */
const S = 26; // px per grid unit
const COS = 0.8660254;
const OX = 300; // screen centre x
const OY = 360; // screen baseline y
const P = (x: number, y: number, z: number) =>
  `${(OX + (x - z) * COS * S).toFixed(1)},${(OY + (x + z) * 0.5 * S - y * S).toFixed(1)}`;

// A box's three visible faces (top, front(z+d), right(x+w)) as polygon points.
function box(x: number, y: number, z: number, w: number, h: number, d: number) {
  const top = [P(x, y + h, z), P(x + w, y + h, z), P(x + w, y + h, z + d), P(x, y + h, z + d)].join(" ");
  const front = [P(x, y, z + d), P(x + w, y, z + d), P(x + w, y + h, z + d), P(x, y + h, z + d)].join(" ");
  const right = [P(x + w, y, z), P(x + w, y, z + d), P(x + w, y + h, z + d), P(x + w, y + h, z)].join(" ");
  return { top, front, right };
}
// A window rectangle on the front face (constant z).
const win = (xa: number, xb: number, ya: number, yb: number, z: number) =>
  [P(xa, ya, z), P(xb, ya, z), P(xb, yb, z), P(xa, yb, z)].join(" ");

/* ---------- geometry ---------- */
const slab = box(-0.35, 0, -0.35, 5.7, 0.4, 4.2);
const lower = box(0, 0.4, 0.3, 5, 2.2, 3);
const upper = box(0.2, 2.6, -0.3, 3.4, 1.9, 3); // cantilevered toward the front
const roof = box(0.2, 4.5, -0.3, 3.4, 0.16, 3);
const LOWER_Z = 3.3; // front face of lower volume
const UPPER_Z = 2.7; // front face of upper volume
const lowerWindows = [
  win(0.35, 1.25, 0.85, 1.85, LOWER_Z),
  win(1.5, 2.4, 0.85, 1.85, LOWER_Z),
  win(2.65, 3.05, 0.7, 2.0, LOWER_Z),
  win(3.35, 4.65, 0.7, 2.0, LOWER_Z),
];
const upperWindows = [
  win(0.5, 1.55, 3.05, 4.15, UPPER_Z),
  win(1.75, 2.5, 3.05, 4.15, UPPER_Z),
  win(2.7, 3.25, 3.05, 4.15, UPPER_Z),
];

const FACE = { top: "#262832", front: "#191b22", right: "#111319" };

const stages = [
  { label: "Foundations", text: "Engineered from the ground up." },
  { label: "Structure", text: "Solid, precise, built to last." },
  { label: "Finish", text: "The regal touches that make it home." },
];

/* ---------- a build-in group ---------- */
function Part({
  p,
  from,
  to,
  children,
  rise = 46,
}: {
  p: MotionValue<number>;
  from: number;
  to: number;
  children: React.ReactNode;
  rise?: number;
}) {
  const opacity = useTransform(p, [from, from + (to - from) * 0.5], [0, 1]);
  const y = useTransform(p, [from, to], [rise, 0]);
  return (
    <motion.g style={{ opacity, y }}>{children}</motion.g>
  );
}

function Volume({
  faces,
  windows,
  winReveal,
  p,
}: {
  faces: { top: string; front: string; right: string };
  windows?: string[];
  winReveal?: [number, number];
  p: MotionValue<number>;
}) {
  const glow = useTransform(p, winReveal ?? [0.82, 1], [0, 1]);
  return (
    <g>
      <polygon points={faces.right} fill={FACE.right} stroke="#C9A24B" strokeOpacity="0.45" strokeWidth="1" strokeLinejoin="round" />
      <polygon points={faces.front} fill={FACE.front} stroke="#C9A24B" strokeOpacity="0.55" strokeWidth="1" strokeLinejoin="round" />
      <polygon points={faces.top} fill={FACE.top} stroke="#C9A24B" strokeOpacity="0.6" strokeWidth="1" strokeLinejoin="round" />
      {windows?.map((w, i) => (
        <g key={i}>
          <motion.polygon points={w} fill="url(#winGlow)" style={{ opacity: glow }} filter="url(#softGlow)" />
          <polygon points={w} fill="none" stroke="#E4C77E" strokeOpacity="0.5" strokeWidth="0.75" />
        </g>
      ))}
    </g>
  );
}

export default function SelfBuildingHouse() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const raw = useSpring(scrollYProgress, { stiffness: 90, damping: 22, restDelta: 0.001 });
  // Hooks must run unconditionally; pick which value to use afterwards.
  const built = useTransform(raw, () => 1);
  const p = reduce ? built : raw;

  const [stage, setStage] = useState(0);
  useMotionValueEvent(p, "change", (v) => {
    setStage(v < 0.4 ? 0 : v < 0.75 ? 1 : 2);
  });

  const defs = (
    <defs>
      <linearGradient id="winGlow" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFE7A6" />
        <stop offset="1" stopColor="#E0A23A" />
      </linearGradient>
      <radialGradient id="floorGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor="#C9A24B" stopOpacity="0.18" />
        <stop offset="1" stopColor="#C9A24B" stopOpacity="0" />
      </radialGradient>
      <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="2.4" />
      </filter>
    </defs>
  );

  const scene = (
    <svg viewBox="0 0 600 560" className="mx-auto w-full max-w-2xl overflow-visible" aria-hidden>
      {defs}
      <ellipse cx="300" cy="470" rx="240" ry="70" fill="url(#floorGlow)" />
      <Part p={p} from={0.04} to={0.26} rise={30}>
        <Volume faces={slab} p={p} />
      </Part>
      <Part p={p} from={0.24} to={0.5}>
        <Volume faces={lower} windows={lowerWindows} winReveal={[0.8, 1]} p={p} />
      </Part>
      <Part p={p} from={0.46} to={0.7}>
        <Volume faces={upper} windows={upperWindows} winReveal={[0.84, 1]} p={p} />
      </Part>
      <Part p={p} from={0.66} to={0.82} rise={30}>
        <Volume faces={roof} p={p} />
      </Part>
    </svg>
  );

  const indicator = (
    <div className="mt-6 flex flex-wrap items-start justify-center gap-x-10 gap-y-4">
      {stages.map((s, i) => (
        <div key={s.label} className="max-w-[13rem] text-center transition-opacity duration-300" style={{ opacity: stage === i ? 1 : 0.4 }}>
          <div className="flex items-center justify-center gap-2">
            <span className={`grid h-7 w-7 place-items-center rounded-full border text-xs font-semibold ${stage >= i ? "border-gold bg-gold-sheen text-ink" : "border-ink-line text-silver-muted"}`}>
              {i + 1}
            </span>
            <span className="font-display text-lg uppercase tracking-wide text-gold-gradient">
              {s.label}
            </span>
          </div>
          <p className="mt-1 text-xs text-silver">{s.text}</p>
        </div>
      ))}
    </div>
  );

  return (
    <section
      ref={ref}
      className="relative border-t border-ink-line bg-ink-soft"
      style={{ height: reduce ? "auto" : "240vh" }}
    >
      <div className={`${reduce ? "py-24" : "sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-16"}`}>
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">Watch It Rise</span>
            <h2 className="display-title text-4xl text-cream sm:text-5xl">
              Built Before{" "}
              <span className="text-gold-gradient">Your Eyes</span>
            </h2>
          </div>
          {scene}
          {indicator}
        </div>
      </div>
    </section>
  );
}
