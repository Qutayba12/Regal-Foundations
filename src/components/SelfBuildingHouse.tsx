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
const S = 40;
const COS = 0.8660254;
const OX = 300;
const OY = 320;
const pt = (x: number, y: number, z: number) => ({
  X: OX + (x - z) * COS * S,
  Y: OY + (x + z) * 0.5 * S - y * S,
});
const P = (x: number, y: number, z: number) => {
  const p = pt(x, y, z);
  return `${p.X.toFixed(1)},${p.Y.toFixed(1)}`;
};
const poly = (...c: [number, number, number][]) => c.map(([x, y, z]) => P(x, y, z)).join(" ");

function box(x: number, y: number, z: number, w: number, h: number, d: number) {
  return {
    top: poly([x, y + h, z], [x + w, y + h, z], [x + w, y + h, z + d], [x, y + h, z + d]),
    front: poly([x, y, z + d], [x + w, y, z + d], [x + w, y + h, z + d], [x, y + h, z + d]),
    right: poly([x + w, y, z], [x + w, y, z + d], [x + w, y + h, z + d], [x + w, y + h, z]),
  };
}
const rect = (xa: number, xb: number, ya: number, yb: number, z: number) =>
  poly([xa, ya, z], [xb, ya, z], [xb, yb, z], [xa, yb, z]);

// horizontal cladding/seam lines on a front face (constant z)
const seamsFront = (xa: number, xb: number, ys: number[], z: number) =>
  ys.map((y) => [pt(xa, y, z), pt(xb, y, z)]);
// horizontal cladding lines on a right face (constant x)
const seamsRight = (za: number, zb: number, ys: number[], x: number) =>
  ys.map((y) => [pt(x, y, za), pt(x, y, zb)]);

/* ---------- materials (top / front / side) ---------- */
const STONE = { t: "#40454f", f: "#2d313a", s: "#1f222a" };
const WOOD = { t: "#835f34", f: "#664824", s: "#48331a" };
const CAP = { t: "#2c2f38", f: "#1c1e26", s: "#141620" };

/* ---------- geometry ---------- */
const plinth = box(-0.45, -0.3, -0.45, 5.9, 0.45, 3.9);
const baseV = box(0, 0.15, 0.3, 5, 2.35, 2.7); // stone, front z=3.0
const upperV = box(0.4, 2.5, 0.6, 3.4, 1.8, 3.2); // wood, front z=3.8 (overhang 0.8)
const baseCap = box(0, 2.5, 0.3, 5, 0.14, 2.7);
const upperCap = box(0.4, 4.3, 0.6, 3.4, 0.14, 3.2);
const under = poly([0.4, 2.5, 3.0], [3.8, 2.5, 3.0], [3.8, 2.5, 3.8], [0.4, 2.5, 3.8]);

const LR = { xa: 0.35, xb: 2.8, ya: 0.4, yb: 2.3, z: 3.0 };
const BR = { xa: 0.75, xb: 3.45, ya: 2.78, yb: 4.05, z: 3.8 };
const mull = (g: typeof LR, n: number) =>
  Array.from({ length: n - 1 }, (_, i) => {
    const x = g.xa + ((g.xb - g.xa) * (i + 1)) / n;
    return [pt(x, g.ya, g.z), pt(x, g.yb, g.z)];
  });

const pool = poly([0.3, 0.18, 3.95], [4.7, 0.18, 3.95], [4.7, 0.18, 5.7], [0.3, 0.18, 5.7]);
const poolReflect = poly([0.9, 0.19, 4.2], [2.5, 0.19, 4.2], [2.4, 0.19, 5.4], [0.8, 0.19, 5.4]);
const poolShimmer = [
  poly([3.0, 0.19, 4.3], [4.4, 0.19, 4.3], [4.35, 0.19, 4.45], [2.95, 0.19, 4.45]),
  poly([3.2, 0.19, 5.0], [4.2, 0.19, 5.0], [4.15, 0.19, 5.15], [3.15, 0.19, 5.15]),
];
const treeSpots: [number, number][] = [
  [-0.15, 4.7],
  [5.0, 4.9],
];

const stages = [
  { label: "Foundations", text: "Engineered from the ground up." },
  { label: "Structure", text: "Solid, precise, built to last." },
  { label: "Finish", text: "The regal touches that make it home." },
];

function Part({
  p,
  from,
  to,
  rise = 42,
  children,
}: {
  p: MotionValue<number>;
  from: number;
  to: number;
  rise?: number;
  children: React.ReactNode;
}) {
  const opacity = useTransform(p, [from, from + (to - from) * 0.5], [0, 1]);
  const y = useTransform(p, [from, to], [rise, 0]);
  return <motion.g style={{ opacity, y }}>{children}</motion.g>;
}

function Face({ points, fill, o = 0.4 }: { points: string; fill: string; o?: number }) {
  return <polygon points={points} fill={fill} stroke="#C9A24B" strokeOpacity={o} strokeWidth="0.8" strokeLinejoin="round" />;
}

function Lines({ segs, color, w = 0.7, o = 1 }: { segs: { X: number; Y: number }[][]; color: string; w?: number; o?: number }) {
  return (
    <>
      {segs.map((s, i) => (
        <line key={i} x1={s[0].X} y1={s[0].Y} x2={s[1].X} y2={s[1].Y} stroke={color} strokeWidth={w} strokeOpacity={o} />
      ))}
    </>
  );
}

export default function SelfBuildingHouse() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const raw = useSpring(scrollYProgress, { stiffness: 90, damping: 22, restDelta: 0.001 });
  const built = useTransform(raw, () => 1);
  const p = reduce ? built : raw;
  const glow = useTransform(p, [0.8, 0.98], [0, 1]);

  const [stage, setStage] = useState(0);
  useMotionValueEvent(p, "change", (v) => setStage(v < 0.4 ? 0 : v < 0.72 ? 1 : 2));

  const glass = (g: typeof LR, n: number) => (
    <g>
      <polygon points={rect(g.xa, g.xb, g.ya, g.yb, g.z)} fill="#132430" />
      <Lines segs={mull(g, n)} color="#0a141c" w={1.4} />
      <polygon points={rect(g.xa, g.xb, g.ya, g.yb, g.z)} fill="none" stroke="#E4C77E" strokeOpacity="0.55" strokeWidth="0.9" />
    </g>
  );

  const scene = (
    <svg viewBox="100 140 400 345" className="mx-auto w-full max-w-xl overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="winGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FBDD9A" />
          <stop offset="1" stopColor="#D99A34" />
        </linearGradient>
        <radialGradient id="floorGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#C9A24B" stopOpacity="0.16" />
          <stop offset="1" stopColor="#C9A24B" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="spill" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#F4C56A" stopOpacity="0.32" />
          <stop offset="1" stopColor="#F4C56A" stopOpacity="0" />
        </radialGradient>
        <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      <ellipse cx="300" cy="440" rx="195" ry="48" fill="url(#floorGlow)" />

      {/* Foundations: plinth + empty pool */}
      <Part p={p} from={0.04} to={0.24} rise={26}>
        <Face points={plinth.right} fill={CAP.s} />
        <Face points={plinth.front} fill={CAP.f} o={0.45} />
        <Face points={plinth.top} fill="#2c2f38" o={0.5} />
        <polygon points={pool} fill="#0c1a2b" stroke="#C9A24B" strokeOpacity="0.35" strokeWidth="0.8" />
      </Part>

      {/* Structure: stone base */}
      <Part p={p} from={0.22} to={0.46}>
        <Face points={baseV.right} fill={STONE.s} />
        <Face points={baseV.front} fill={STONE.f} o={0.5} />
        <Face points={baseV.top} fill={STONE.t} o={0.55} />
        <Lines segs={seamsFront(0, 5, [1.0, 1.75], 3.0)} color="#151820" o={0.7} />
        <Lines segs={seamsRight(0.3, 3.0, [1.0, 1.75], 5)} color="#0f1117" o={0.7} />
        {glass(LR, 3)}
      </Part>

      {/* Structure: wood cantilever */}
      <Part p={p} from={0.44} to={0.66} rise={46}>
        <polygon points={under} fill="#0b0d12" />
        <Face points={upperV.right} fill={WOOD.s} />
        <Face points={upperV.front} fill={WOOD.f} o={0.5} />
        <Face points={upperV.top} fill={WOOD.t} o={0.55} />
        <Lines segs={seamsFront(0.4, 3.8, [2.9, 3.25, 3.6, 3.95], 3.8)} color="#3a2916" o={0.8} />
        <Lines segs={seamsRight(0.6, 3.8, [2.9, 3.25, 3.6, 3.95], 3.8)} color="#2c1f10" o={0.8} />
        {glass(BR, 3)}
      </Part>

      {/* Roof caps */}
      <Part p={p} from={0.64} to={0.8} rise={18}>
        <Face points={baseCap.right} fill={CAP.s} />
        <Face points={baseCap.front} fill={CAP.f} o={0.45} />
        <Face points={baseCap.top} fill={CAP.t} o={0.5} />
        <Face points={upperCap.right} fill={CAP.s} />
        <Face points={upperCap.front} fill={CAP.f} o={0.45} />
        <Face points={upperCap.top} fill={CAP.t} o={0.5} />
      </Part>

      {/* Finish: landscaping */}
      <Part p={p} from={0.8} to={1} rise={12}>
        {treeSpots.map(([tx, tz], i) => {
          const g = pt(tx, 0.15, tz);
          const top = pt(tx, 1.35, tz);
          return (
            <g key={i}>
              <ellipse cx={g.X} cy={g.Y} rx="14" ry="4.5" fill="#000" opacity="0.28" />
              <line x1={g.X} y1={g.Y} x2={top.X} y2={top.Y} stroke="#4a3620" strokeWidth="2.6" />
              <ellipse cx={top.X} cy={top.Y - 12} rx="15" ry="20" fill="#2f3d27" stroke="#C9A24B" strokeOpacity="0.35" strokeWidth="0.8" />
              <ellipse cx={top.X - 5} cy={top.Y - 17} rx="7" ry="9" fill="#3c4d31" opacity="0.75" />
            </g>
          );
        })}
      </Part>

      {/* Warm glow (windows, spill, pool) — fades in at finish */}
      <motion.g style={{ opacity: glow }}>
        <ellipse cx={pt(1.4, 0.35, 3.0).X} cy={pt(1.4, 0.35, 3.0).Y + 4} rx="78" ry="22" fill="url(#spill)" />
        {/* soft halo */}
        <polygon points={rect(LR.xa, LR.xb, LR.ya, LR.yb, LR.z)} fill="url(#winGlow)" filter="url(#softGlow)" opacity="0.4" />
        <polygon points={rect(BR.xa, BR.xb, BR.ya, BR.yb, BR.z)} fill="url(#winGlow)" filter="url(#softGlow)" opacity="0.4" />
        {/* crisp lit glass */}
        <polygon points={rect(LR.xa, LR.xb, LR.ya, LR.yb, LR.z)} fill="url(#winGlow)" opacity="0.82" />
        <polygon points={rect(BR.xa, BR.xb, BR.ya, BR.yb, BR.z)} fill="url(#winGlow)" opacity="0.82" />
        <Lines segs={mull(LR, 3)} color="#8a641f" w={1} />
        <Lines segs={mull(BR, 3)} color="#8a641f" w={1} />
        <polygon points={rect(LR.xa, LR.xb, LR.ya, LR.yb, LR.z)} fill="none" stroke="#FFE8B0" strokeOpacity="0.5" strokeWidth="0.8" />
        <polygon points={rect(BR.xa, BR.xb, BR.ya, BR.yb, BR.z)} fill="none" stroke="#FFE8B0" strokeOpacity="0.5" strokeWidth="0.8" />
        <polygon points={poolReflect} fill="#E4C77E" opacity="0.14" />
        {poolShimmer.map((s, i) => (
          <polygon key={i} points={s} fill="#E4C77E" opacity={0.3 - i * 0.12} />
        ))}
      </motion.g>
    </svg>
  );

  const indicator = (
    <div className="relative z-10 mt-6 flex flex-wrap items-start justify-center gap-x-10 gap-y-4">
      {stages.map((s, i) => (
        <div key={s.label} className="max-w-[13rem] text-center transition-opacity duration-300" style={{ opacity: stage === i ? 1 : 0.4 }}>
          <div className="flex items-center justify-center gap-2">
            <span className={`grid h-7 w-7 place-items-center rounded-full border text-xs font-semibold ${stage >= i ? "border-gold bg-gold-sheen text-ink" : "border-ink-line text-silver-muted"}`}>
              {i + 1}
            </span>
            <span className="font-display text-lg uppercase tracking-wide text-gold-gradient">{s.label}</span>
          </div>
          <p className="mt-1 text-xs text-silver">{s.text}</p>
        </div>
      ))}
    </div>
  );

  return (
    <section ref={ref} className="relative border-t border-ink-line bg-ink-soft" style={{ height: reduce ? "auto" : "240vh" }}>
      <div className={reduce ? "py-24" : "sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-14"}>
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center">Watch It Rise</span>
            <h2 className="display-title text-4xl text-cream sm:text-5xl">
              Built Before <span className="text-gold-gradient">Your Eyes</span>
            </h2>
          </div>
          {scene}
          {indicator}
        </div>
      </div>
    </section>
  );
}
