"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Shared cinematic villa background used behind every page banner:
 * full-bleed image, slow Ken Burns zoom, cursor parallax (desktop) and
 * device-tilt parallax (touch), plus dark gradients that keep copy legible.
 */
export default function SceneBackground({
  priority = false,
}: {
  priority?: boolean;
}) {
  const reduce = useReducedMotion();
  const [off, setOff] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      setOff({ x: x * -26, y: y * -18 });
    };
    const onTilt = (e: DeviceOrientationEvent) => {
      const g = e.gamma ?? 0;
      const b = e.beta ?? 0;
      setOff({
        x: Math.max(-26, Math.min(26, (g / 45) * -26)),
        y: Math.max(-18, Math.min(18, ((b - 45) / 45) * -18)),
      });
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("deviceorientation", onTilt);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("deviceorientation", onTilt);
    };
  }, [reduce]);

  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-[-8%] transition-transform duration-300 ease-out"
          style={{ transform: `translate3d(${off.x}px, ${off.y}px, 0)` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-villa.jpg"
            alt="Modern luxury home at dusk"
            className="h-full w-full animate-kenburns object-cover"
            fetchPriority={priority ? "high" : "auto"}
          />
        </div>
      </div>

      {/* legibility overlays */}
      <div className="pointer-events-none absolute inset-0 bg-ink/45" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink from-5% via-ink/60 via-45% to-ink/10" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink/90 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
    </>
  );
}
