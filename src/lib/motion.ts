import type { Variants } from "framer-motion";

/** Shared "rise into view" variant used across sections. */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

