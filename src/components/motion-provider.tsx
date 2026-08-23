"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Loads only Framer Motion's DOM animation + gesture features instead of the
 * full bundle. That covers animate/variants/whileInView/hover — everything
 * this site uses — and excludes drag and layout animations, which it doesn't.
 *
 * Every animated component must use `m.*`, not `motion.*`: importing `motion`
 * pulls the full feature set back in and defeats this entirely.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
