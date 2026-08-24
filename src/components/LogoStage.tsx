"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";

const IMG = "/logo-emblem.png?v=3";

/**
 * Premium, interactive 3D presentation of the real emblem.
 * - Perspective tilt that follows the cursor (with a soft spring-back).
 * - A specular highlight + gold sheen that track the cursor, masked to the
 *   logo's exact shape, so the metal looks like it is catching the light.
 * - A depth shadow copy behind for real 3D thickness, plus a slow idle
 *   sheen sweep and float. Uses the real logo image — no quality loss.
 */
export default function LogoStage() {
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

  const rx = (0.5 - p.y) * 24; // tilt X (deg)
  const ry = (p.x - 0.5) * 28; // tilt Y (deg)
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
      className="relative mx-auto flex aspect-[1080/1234] w-60 items-center justify-center sm:w-72 lg:w-[340px]"
      style={{ perspective: "1000px" }}
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-[-22%] rounded-full bg-gold/12 blur-[85px]" />
      <div className="pointer-events-none absolute inset-[-6%] rounded-full bg-silver/8 blur-[60px]" />

      {/* tilt layer */}
      <div
        className="relative h-full w-full [transform-style:preserve-3d]"
        style={{
          transform: `rotateX(${rx}deg) rotateY(${ry}deg)`,
          transition: p.active ? "transform 120ms ease-out" : "transform 600ms ease-out",
        }}
      >
        <div className={`relative h-full w-full ${reduce ? "" : "animate-float-slow"}`}>
          {/* depth shadow copy (gives thickness on tilt) */}
          <img
            src={IMG}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full select-none opacity-50 blur-[6px]"
            style={{ filter: "brightness(0)", transform: "translateZ(-45px) translateY(12px) scale(1.03)" }}
          />

          {/* the real emblem */}
          <img
            src={IMG}
            alt={`${site.name} emblem`}
            draggable={false}
            className="absolute inset-0 h-full w-full select-none drop-shadow-[0_22px_48px_rgba(0,0,0,0.6)]"
          />

          {/* cursor specular highlight (white), clipped to the logo shape */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-screen"
            style={{
              ...mask,
              background: `radial-gradient(circle at ${sx}% ${sy}%, rgba(255,255,255,0.7), rgba(255,255,255,0) 42%)`,
            }}
          />
          {/* gold counter-sheen */}
          <div
            className="pointer-events-none absolute inset-0 mix-blend-overlay"
            style={{
              ...mask,
              background: `radial-gradient(circle at ${100 - Number(sx)}% ${Number(sy) * 0.9 + 5}%, rgba(228,199,126,0.55), rgba(228,199,126,0) 50%)`,
            }}
          />
          {/* slow idle sheen sweep */}
          {!reduce && (
            <div
              className="pointer-events-none absolute inset-0 animate-shimmer mix-blend-screen"
              style={{
                ...mask,
                backgroundImage:
                  "linear-gradient(115deg, transparent 42%, rgba(255,255,255,0.5) 50%, transparent 58%)",
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
