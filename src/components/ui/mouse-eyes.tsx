"use client";

import { useEffect, useRef } from "react";

/**
 * A small pair of eyes that follow the pointer.
 *
 * Reworked from the source component in three ways that mattered:
 * - it was `w-screen h-screen` centred (a full-page demo), now it is a ~26px
 *   pair sized for the header;
 * - it listened on its own `onMouseMove`, so the eyes only tracked while the
 *   pointer was over them — the listener is on `window` here;
 * - it called setState on every mousemove, re-rendering the tree each time.
 *   Pupils are written straight to the DOM inside one rAF instead.
 */

const EYE_PX = 26;
const MAX_MOVE = 5;

function Eye({ pupilRef }: { pupilRef: React.RefObject<HTMLSpanElement | null> }) {
  return (
    <span className="relative block h-[26px] w-[26px] rounded-full border border-border-strong bg-bg-raised">
      <span
        ref={pupilRef}
        className="absolute top-1/2 left-1/2 block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg"
      />
    </span>
  );
}

export function MouseEyes() {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const leftPupil = useRef<HTMLSpanElement>(null);
  const rightPupil = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;
    let mx = 0;
    let my = 0;

    const aim = (pupil: HTMLSpanElement | null, eye: Element | undefined) => {
      if (!pupil || !eye) return;
      const r = eye.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const angle = Math.atan2(my - cy, mx - cx);
      const dist = Math.min(Math.hypot(mx - cx, my - cy) / 12, MAX_MOVE);
      pupil.style.transform = `translate(calc(-50% + ${Math.cos(angle) * dist}px), calc(-50% + ${Math.sin(angle) * dist}px))`;
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const eyes = wrapRef.current?.children;
        aim(leftPupil.current, eyes?.[0]);
        aim(rightPupil.current, eyes?.[1]);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <span
      ref={wrapRef}
      aria-hidden="true"
      className="hidden items-center gap-1 md:inline-flex"
      style={{ height: EYE_PX }}
    >
      <Eye pupilRef={leftPupil} />
      <Eye pupilRef={rightPupil} />
    </span>
  );
}
