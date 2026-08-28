"use client";

import { useEffect } from "react";

/**
 * Best-effort zoom lock across devices. The viewport meta stops zoom on most
 * browsers, but iOS Safari ignores it — so this also blocks the pinch gesture
 * events, multi-touch pinch, double-tap zoom, trackpad ctrl+wheel zoom and the
 * ctrl/⌘ +/-/0 keyboard shortcuts. (Native browser-menu zoom can't be blocked.)
 */
export default function NoZoom() {
  useEffect(() => {
    const prevent = (e: Event) => e.preventDefault();

    // iOS Safari pinch gestures
    document.addEventListener("gesturestart", prevent);
    document.addEventListener("gesturechange", prevent);
    document.addEventListener("gestureend", prevent);

    // Pinch via two or more fingers
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    };
    document.addEventListener("touchmove", onTouchMove, { passive: false });

    // Double-tap to zoom
    let lastTouchEnd = 0;
    const onTouchEnd = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) e.preventDefault();
      lastTouchEnd = now;
    };
    document.addEventListener("touchend", onTouchEnd, { passive: false });

    // Desktop trackpad / ctrl+wheel zoom
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) e.preventDefault();
    };
    window.addEventListener("wheel", onWheel, { passive: false });

    // Desktop keyboard zoom (ctrl/⌘ with +, -, =, 0)
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && ["+", "-", "=", "0"].includes(e.key)) {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("gesturestart", prevent);
      document.removeEventListener("gesturechange", prevent);
      document.removeEventListener("gestureend", prevent);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return null;
}
