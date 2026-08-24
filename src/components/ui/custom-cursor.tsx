"use client";

import { useEffect, useSyncExternalStore } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

const QUERY = "(pointer: fine) and (prefers-reduced-motion: no-preference)";

/**
 * Subscribes to the media query rather than setting state in an effect — same
 * reason as use-persisted-attribute.ts: setState-in-effect causes a cascading
 * render, and React 19's lint rules reject it.
 */
function useCursorAllowed() {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(QUERY);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

/**
 * Dot tracks the pointer exactly; the ring trails it on a spring.
 *
 * Renders nothing unless there is a real pointer and motion is welcome —
 * hiding the native cursor on touch or under prefers-reduced-motion removes an
 * affordance and gives nothing back. The `has-custom-cursor` class on <html>
 * is what actually hides it (globals.css), so it is only set while this runs.
 */
export function CustomCursor() {
  const allowed = useCursorAllowed();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.45 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.45 });

  useEffect(() => {
    if (!allowed) return;

    document.documentElement.classList.add("has-custom-cursor");

    let frame = 0;
    let nextX = 0;
    let nextY = 0;

    // Coalesce into one frame: pointermove can outpace the display, and each
    // update writes two motion values.
    const onMove = (e: PointerEvent) => {
      nextX = e.clientX;
      nextY = e.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        x.set(nextX);
        y.set(nextY);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [allowed, x, y]);

  if (!allowed) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
      <m.span
        style={{ x, y }}
        className="absolute -ml-[3px] -mt-[3px] block h-1.5 w-1.5 rounded-full bg-accent"
      />
      <m.span
        style={{ x: ringX, y: ringY }}
        className="absolute -ml-4 -mt-4 block h-8 w-8 rounded-full border border-accent/60"
      />
    </div>
  );
}
