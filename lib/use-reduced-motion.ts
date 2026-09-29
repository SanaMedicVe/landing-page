"use client";

import * as React from "react";

/**
 * Suscripción a (prefers-reduced-motion: reduce) usando
 * useSyncExternalStore (API recomendada en React 18/19).
 */
function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useReducedMotion(): boolean {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Indica si el componente ya se montó en el cliente.
 * Útil para diferir animaciones / renderizados condicionales
 * que dependen de APIs del browser (motion, prefers-reduced-motion,
 * IntersectionObserver, etc.) y evitar mismatches de hidratación.
 *
 * El primer render (SSR + hidratación) devuelve `false`.
 * Tras el primer `useEffect`, devuelve `true`.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}
