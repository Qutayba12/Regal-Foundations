"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";

const IMG = "/logo-emblem.png?v=3";

/**
 * Interactive 3D presentation of the real emblem — reusable at any size.
 * Perspective tilt on the cursor, a specular + gold sheen masked to the
 * logo shape, optional depth shadow, ambient glow, idle sheen sweep and float.
 *
 * Sizing is controlled by `className` (set a width; the 1080:1234 aspect is
 * kept automatically). `glow`/`float`/`depth` scale the effect down for small
 * placements like the header and footer.
 */
export default function LogoStage({
  className = "w-60 sm:w-72 lg:w-[340px]",
  tiltMax = 24,
  glow = true,
  float = true,
  depth = true,
  sheen = true,
}: {
  className?: string;
  tiltMax?: number;
  glow?: boolean;
  float?: boolean;
  depth?: boolean;
  sheen?: boolean;
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

  const rx = (0.5 - p.y) * tiltMax;
  const ry = (p.x - 0.5) * (tiltMax + 4);
  const sx = (p.x * 100).toFixed(1);
  const sy = (p.y * 100).toFixed(1);

  const mask = {
    WebkitMaskImage: `url(${IMG})`,
    maskImage: `url(${IMG})`,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
  } as const;

  return (
    <div
      ref={ref}
      onMouseMove={reduce ? undefined : onMove}
      onMouseLeave={reset}
      className={`relative aspect-[1080/1234] ${className}`}
      style={{ perspective: "900px" }}
    >
      {glow && (
        <>
          <div className="pointer-events-none absolute inset-[-22%] rounded-full bg-gold/12 blur-[85px]" />
          <div className="pointer-events-none absolute inset-[-6%] rounded-full bg-silver/8 blur-[60px]" />
        </>
      )}

      <div
        className="relative h-full w-full [transform-style:preserve-3d]"
        style={{
          transform: `rotateX(${rx}deg) rotateY(${ry}deg)`,
          transition: p.active ? "transform 120ms ease-out" : "transform 600ms ease-out",
        }}
      >
        <div className={`relative h-full w-full ${float && !reduce ? "animate-float-slow" : ""}`}>
          {depth && (
            <img
              src={IMG}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full select-none object-contain opacity-50 blur-[6px]"
              style={{ filter: "brightness(0)", transform: "translateZ(-45px) translateY(12px) scale(1.03)" }}
            />
          )}

          <img
            src={IMG}
            alt={`${site.name} emblem`}
            draggable={false}
            className="absolute inset-0 h-full w-full select-none object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)]"
          />

          {/* cursor specular highlight */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-screen"
            style={{ ...mask, background: `radial-gradient(circle at ${sx}% ${sy}%, rgba(255,255,255,0.7), rgba(255,255,255,0) 42%)` }}
          />
          {/* gold counter-sheen */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-overlay"
            style={{ ...mask, background: `radial-gradient(circle at ${100 - Number(sx)}% ${Number(sy) * 0.9 + 5}%, rgba(228,199,126,0.55), rgba(228,199,126,0) 50%)` }}
          />
          {/* idle sheen sweep */}
          {sheen && !reduce && (
            <div
              className="pointer-events-none absolute inset-0 animate-shimmer mix-blend-screen"
              style={{
                ...mask,
                backgroundImage: "linear-gradient(115deg, transparent 42%, rgba(255,255,255,0.5) 50%, transparent 58%)",
                backgroundSize: "240% 240%",
                opacity: p.active ? 0 : 1,
                transition: "opacity 400ms ease",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
