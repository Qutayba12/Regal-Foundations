"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/**
 * A bespoke gold cursor for pointer-precise, hover-capable devices (desktop).
 * A crisp dot tracks the pointer exactly; a softer ring trails with spring
 * physics and swells over interactive elements — the "magnetic" feel. The
 * native cursor is hidden only while this is active; touch devices and
 * reduced-motion visitors keep the system cursor untouched.
 */
export default function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  // Raw pointer position (dot) and a spring-smoothed copy (ring).
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    const fine =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches &&
      window.matchMedia("(hover: hover)").matches;
    if (!fine) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const interactive = "a, button, input, textarea, select, label, [role='button'], .group, summary";

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
      const t = e.target as Element | null;
      setHovering(Boolean(t?.closest(interactive)));
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90] hidden lg:block"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 200ms ease" }}
    >
      {/* trailing ring */}
      <motion.div
        className="absolute left-0 top-0 rounded-full border border-gold/70"
        style={{
          x: ringX,
          y: ringY,
          width: 40,
          height: 40,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: down ? 0.75 : hovering ? 1.6 : 1,
          borderColor: hovering
            ? "rgba(228,199,126,0.9)"
            : "rgba(201,162,75,0.6)",
          backgroundColor: hovering
            ? "rgba(201,162,75,0.10)"
            : "rgba(201,162,75,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
      {/* precise dot */}
      <motion.div
        className="absolute left-0 top-0 rounded-full bg-gold"
        style={{
          x,
          y,
          width: 6,
          height: 6,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ scale: hovering ? 0 : down ? 0.6 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
    </div>
  );
}
