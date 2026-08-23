"use client";

import { useSyncExternalStore } from "react";

/**
 * Reads a `data-*` attribute off <html> as React state and writes it back with
 * localStorage persistence. Uses a MutationObserver via useSyncExternalStore
 * rather than useState+useEffect so it never trips
 * react-hooks/set-state-in-effect or hydration mismatches.
 */
export function usePersistedAttribute<T extends string>({
  attribute,
  storageKey,
  values,
  fallback,
}: {
  attribute: string;
  storageKey: string;
  values: readonly T[];
  fallback: T;
}): [T, (next: T) => void] {
  function subscribe(callback: () => void) {
    const observer = new MutationObserver(callback);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attribute],
    });
    return () => observer.disconnect();
  }

  function getSnapshot(): T {
    const current = document.documentElement.getAttribute(attribute);
    return values.includes(current as T) ? (current as T) : fallback;
  }

  // The inline init script in the root layout only ever sets a stored value, so
  // the server always renders the fallback.
  const value = useSyncExternalStore(subscribe, getSnapshot, () => fallback);

  function set(next: T) {
    document.documentElement.setAttribute(attribute, next);
    try {
      localStorage.setItem(storageKey, next);
    } catch {
      // ignore storage failures (private browsing, etc.)
    }
  }

  return [value, set];
}
