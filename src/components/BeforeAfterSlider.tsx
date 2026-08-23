"use client";

import { useRef, useState, useCallback } from "react";

/**
 * Interactive before/after comparison. Drag the handle (or use the arrow keys)
 * to reveal the transformation. Accepts CSS backgrounds so it works with the
 * gradient placeholders now and real photos later (just pass image URLs).
 */
export default function BeforeAfterSlider({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  caption,
  className = "",
}: {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const isUrl = (v: string) => v.startsWith("http") || v.startsWith("/");
  const bg = (v: string) =>
    isUrl(v)
      ? { backgroundImage: `url(${v})`, backgroundSize: "cover", backgroundPosition: "center" }
      : { backgroundImage: v };

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  return (
    <figure className={className}>
      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl border border-ink-line"
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          setFromClientX(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
      >
        {/* After (full) */}
        <div className="absolute inset-0" style={bg(after)}>
          <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-gold backdrop-blur">
            {afterLabel}
          </span>
        </div>

        {/* Before (clipped) */}
        <div
          className="absolute inset-0"
          style={{ ...bg(before), clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-silver backdrop-blur">
            {beforeLabel}
          </span>
        </div>

        {/* Handle */}
        <div
          className="absolute inset-y-0 flex w-0 items-center justify-center"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-gold" />
          <button
            type="button"
            aria-label="Drag to compare before and after"
            className="relative z-10 grid h-11 w-11 -translate-x-1/2 place-items-center rounded-full border-2 border-gold bg-ink text-gold shadow-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
              if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
            }}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
              <path d="M8 7 3 12l5 5V7zm8 0v10l5-5-5-5z" />
            </svg>
          </button>
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-silver-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
