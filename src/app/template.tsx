import type { ReactNode } from "react";

/**
 * Subtle route-level transition. A CSS animation rather than Framer Motion so
 * this stays a Server Component — it wraps every page's content, and there is
 * nothing here worth a hydration boundary. The global
 * prefers-reduced-motion rule in globals.css collapses it.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="route-enter">{children}</div>;
}
