"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const IMG = "/hero-villa.jpg";
const INIT_MASK =
  "radial-gradient(circle at 50% 50%, #000 0, #000 24%, transparent 30%)";

/**
 * "Blueprint → Reality": the same view is shown twice — a technical blueprint
 * underneath and the finished, full-colour build on top, revealed only inside a
 * light lens. On desktop the lens follows the cursor; on touch it follows a
 * drag; when idle it drifts on a gentle path so the effect is always alive.
 * Reduced-motion keeps a static centred reveal that still responds to input.
 */
export default function BlueprintReveal() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const realRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const real = realRef.current;
    const ring = ringRef.current;
    if (!wrap || !real || !ring) return;

    let cw = wrap.clientWidth;
    let ch = wrap.clientHeight;
    let R = Math.max(80, Math.min(cw, ch) / 3);
    let cx = cw / 2;
    let cy = ch / 2;
    let tx = cx;
    let ty = cy;
    let pointer = false;
    let inView = true;
    let raf = 0;
    const t0 = performance.now();

    const measure = () => {
      cw = wrap.clientWidth;
      ch = wrap.clientHeight;
      R = Math.max(80, Math.min(cw, ch) / 3);
    };

    const apply = () => {
      const grad = `radial-gradient(circle ${R}px at ${cx}px ${cy}px, #000 0, #000 ${
        R - 26
      }px, transparent ${R}px)`;
      real.style.webkitMaskImage = grad;
      real.style.maskImage = grad;
      ring.style.width = `${R * 2}px`;
      ring.style.height = `${R * 2}px`;
      ring.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    };

    const setTarget = (clientX: number, clientY: number) => {
      const r = wrap.getBoundingClientRect();
      tx = clientX - r.left;
      ty = clientY - r.top;
      pointer = true;
    };

    const onMouse = (e: MouseEvent) => setTarget(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) setTarget(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onLeave = () => {
      pointer = false;
    };

    wrap.addEventListener("mousemove", onMouse);
    wrap.addEventListener("mouseleave", onLeave);
    wrap.addEventListener("touchmove", onTouch, { passive: true });
    wrap.addEventListener("touchend", onLeave);
    window.addEventListener("resize", measure);
    measure();

    if (reduce) {
      // Static: follow input directly, no continuous motion.
      cx = cw / 2;
      cy = ch / 2;
      apply();
      const direct = () => {
        cx = tx;
        cy = ty;
        apply();
      };
      wrap.addEventListener("mousemove", direct);
      wrap.addEventListener("touchmove", direct, { passive: true });
      return () => {
        wrap.removeEventListener("mousemove", onMouse);
        wrap.removeEventListener("mouseleave", onLeave);
        wrap.removeEventListener("touchmove", onTouch);
        wrap.removeEventListener("touchend", onLeave);
        wrap.removeEventListener("mousemove", direct);
        wrap.removeEventListener("touchmove", direct);
        window.removeEventListener("resize", measure);
      };
    }

    const loop = (now: number) => {
      raf = 0;
      if (!inView) return;
      if (!pointer) {
        const e = (now - t0) / 1000;
        tx = cw * 0.5 + Math.cos(e * 0.7) * cw * 0.3;
        ty = ch * 0.5 + Math.sin(e * 1.1) * ch * 0.24;
      }
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      apply();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(
      (es) => {
        inView = es[0].isIntersecting;
        if (inView) start();
        else stop();
      },
      { threshold: 0.08 }
    );
    io.observe(wrap);
    start();

    return () => {
      stop();
      io.disconnect();
      wrap.removeEventListener("mousemove", onMouse);
      wrap.removeEventListener("mouseleave", onLeave);
      wrap.removeEventListener("touchmove", onTouch);
      wrap.removeEventListener("touchend", onLeave);
      window.removeEventListener("resize", measure);
    };
  }, [reduce]);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-3xl border border-gold/25 bg-[#08183a] shadow-card"
    >
      {/* Blueprint layer */}
      <div className="absolute inset-0">
        <img
          src={IMG}
          alt=""
          aria-hidden
          draggable={false}
          className="h-full w-full select-none object-cover"
          style={{ filter: "grayscale(1) contrast(1.1) brightness(0.5)" }}
        />
        <div className="absolute inset-0 bg-[#0b2b6b] mix-blend-color" />
        <div className="absolute inset-0 bg-[#04122e]/40" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(120,180,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(120,180,255,0.5) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute inset-3 rounded-lg border border-cyan-200/20" />
      </div>

      {/* Finished build, revealed within the lens */}
      <div
        ref={realRef}
        className="absolute inset-0"
        style={{
          WebkitMaskImage: INIT_MASK,
          maskImage: INIT_MASK,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        <img
          src={IMG}
          alt="The finished home"
          draggable={false}
          className="h-full w-full select-none object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
      </div>

      {/* Lens ring */}
      <div
        ref={ringRef}
        className="pointer-events-none absolute left-0 top-0 rounded-full border-2 border-gold/80 shadow-[0_0_36px_6px_rgba(201,162,75,0.3)]"
      />

      {/* Labels */}
      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-[#04122e]/70 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-cyan-200 backdrop-blur">
        Blueprint
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur">
        Reality
      </span>
    </div>
  );
}
