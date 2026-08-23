"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { revealUp } from "@/lib/motion";

export function RevealOnScroll({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = as === "li" ? m.li : m.div;

  if (shouldReduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={revealUp}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

/** Splits text into words and reveals them with a clipped rise, like a curtain. */
export function RevealText({
  text,
  className,
  wordClassName,
  delay = 0,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (shouldReduceMotion) {
    // Skip the animation, but keep the same typographic treatment
    // (e.g. italic/muted styling on `wordClassName`) so reduced-motion
    // visitors see the same design, just without the motion.
    return (
      <span className={className}>
        <span className={wordClassName}>{text}</span>
      </span>
    );
  }

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
          <m.span
            className={`inline-block ${wordClassName ?? ""}`}
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * 0.045,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </m.span>
        </span>
      ))}
    </span>
  );
}
