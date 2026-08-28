"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Genuine 3D tilt on hover with a cursor-tracked gold/white glare — turns a
 * flat card into a physical, light-catching surface. Children can push
 * themselves forward in Z (e.g. `[transform:translateZ(40px)]`) for real
 * parallax depth. Reduced-motion visitors get a plain, static card.
 */
export default function TiltCard({
  children,
  className = "",
  max = 9,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState({ x: 0.5, y: 0.5, active: false });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setP({
      x: (e.clientX - r.left) / r.width,
      y: (e.clientY - r.top) / r.height,
      active: true,
    });
  }
  const reset = () => setP({ x: 0.5, y: 0.5, active: false });

  const rx = (0.5 - p.y) * max;
  const ry = (p.x - 0.5) * max;

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`group/tilt ${className}`}
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative h-full [transform-style:preserve-3d]"
        style={{
          transform: `rotateX(${rx}deg) rotateY(${ry}deg)`,
          transition: p.active
            ? "transform 100ms ease-out"
            : "transform 500ms ease-out",
        }}
      >
        {children}
        {glare && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
            style={{
              background: `radial-gradient(240px circle at ${p.x * 100}% ${
                p.y * 100
              }%, rgba(228,199,126,0.18), rgba(255,255,255,0.06) 30%, transparent 60%)`,
              transform: "translateZ(1px)",
            }}
          />
        )}
      </div>
    </div>
  );
}
