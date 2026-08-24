"use client";

import { useEffect, useRef } from "react";

/**
 * A small pair of eyes that follow the pointer.
 *
 * Reworked from the source component in four ways that mattered:
 * - it was `w-screen h-screen` centred (a full-page demo), now it is a ~26px
 *   pair sized for the header;
 * - it listened on its own `onMouseMove`, so the eyes only tracked while the
 *   pointer was over them — the listener is on `window` here;
 * - it called setState on every mousemove, re-rendering the tree each time.
 *   Pupils are written straight to the DOM inside one rAF instead;
 * - the pupil carries a short CSS transition so gaps between frames ease out
 *   rather than stepping. Without it the motion reads as jitter at this size.
 */

const MAX_MOVE = 6;
/** Pointer distance at which the pupil reaches full deflection. */
const REACH = 260;

function Eye({ pupilRef }: { pupilRef: React.RefObject<HTMLSpanElement | null> }) {
  return (
    <span
      className="relative block h-[26px] w-[26px] rounded-full border bg-bg-raised"
      style={{ borderColor: "var(--border-strong)" }}
    >
      <span
        ref={pupilRef}
        className="absolute top-1/2 left-1/2 block h-2.5 w-2.5 rounded-full bg-fg"
        style={{
          transform: "translate(-50%, -50%)",
          transition: "transform 140ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
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
      const dx = mx - cx;
      const dy = my - cy;
      const angle = Math.atan2(dy, dx);
      // Ease toward full deflection so nearby movement still reads, instead of
      // the pupil pinning the moment the pointer is a little way off.
      const t = Math.min(Math.hypot(dx, dy) / REACH, 1);
      const dist = MAX_MOVE * (t * (2 - t));
      pupil.style.transform = `translate(calc(-50% + ${(Math.cos(angle) * dist).toFixed(2)}px), calc(-50% + ${(Math.sin(angle) * dist).toFixed(2)}px))`;
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
    <span ref={wrapRef} aria-hidden="true" className="hidden items-center gap-1.5 md:inline-flex">
      <Eye pupilRef={leftPupil} />
      <Eye pupilRef={rightPupil} />
    </span>
  );
}
