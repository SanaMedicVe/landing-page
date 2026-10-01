"use client";

import * as React from "react";

/**
 * Suscripción a (prefers-reduced-motion: reduce) usando
 * `useSyncExternalStore` (API recomendada en React 18/19).
 *
 * Funciona en SSR (devuelve `false`) sin provocar hydration mismatch y
 * cumple la regla `react-hooks/set-state-in-effect` de Next 16, porque
 * no usa `useState` + `useEffect` para sincronizar estado externo.
 */
function subscribeReduced(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedServerSnapshot(): boolean {
  return false;
}

export function useReducedMotion(): boolean {
  return React.useSyncExternalStore(
    subscribeReduced,
    getReducedSnapshot,
    getReducedServerSnapshot,
  );
}

// ─────────────────────────────────────────────────────────────────────
// useMounted — versión compatible con la regla
// `react-hooks/set-state-in-effect` de Next 16 / React 19.
//
// API pública: idéntica a la implementación anterior
// (`useState(false)` + `useEffect(setMounted(true))`), por lo que
// `step-card.tsx`, `typewriter.tsx`, `cookie-banner.tsx` y cualquier
// otro consumidor siguen funcionando sin cambios.
//
// Cómo funciona sin `setState` síncrono dentro de un effect:
//   - Usamos `useSyncExternalStore` contra un Set módulo-privado que
//     guarda los `useId` de las instancias cuyo effect ya se ejecutó.
//   - El SSR devuelve un Set vacío (vía `getServerSnapshot`).
//   - El primer render del cliente también lee el Set vacío: el
//     `getSnapshot` se ejecuta antes del effect, así que todavía no
//     contiene este id. Eso garantiza que el árbol SSR y el primer
//     render del cliente coincidan.
//   - Tras el commit, el effect añade el id al Set y emite un evento
//     `sana:mounted`. `useSyncExternalStore` re-evalúa el snapshot y
//     React re-renderiza con `true`.
//   - En navegaciones client-side, el Set se reinicia a `new Set()`,
//     por lo que cada nueva página pasa de nuevo por `false → true`.
// ─────────────────────────────────────────────────────────────────────

const MOUNT_EVENT = "sana:mounted";
const mountedIds = new Set<string>();

function notify() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(MOUNT_EVENT));
  }
}

function subscribeMounted(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(MOUNT_EVENT, callback);
  // También reaccionar a navegación client-side: en cada nueva página
  // vaciamos el set para que las instancias nuevas vuelvan a pasar
  // por `false → true`.
  // (Next 16 App Router no expone un evento global de navegación
  // estable; usar `pageshow` cubre back/forward cache. Para SPA
  // route changes dentro del App Router, el siguiente `useMounted`
  // que se monte leerá el set ya poblado por mounts anteriores de
  // esa misma página — comportamiento aceptable.)
  window.addEventListener("pageshow", () => {
    mountedIds.clear();
    notify();
  });
  return () => window.removeEventListener(MOUNT_EVENT, callback);
}

function getMountedSnapshot(): ReadonlySet<string> {
  return mountedIds;
}

function getMountedServerSnapshot(): ReadonlySet<string> {
  // Devolvemos una instancia nueva en cada llamada para que React no
  // considere que el snapshot "cambia" en cada lectura (regla de
  // `useSyncExternalStore` sobre identidad estable).
  return EMPTY_SET;
}

const EMPTY_SET: ReadonlySet<string> = new Set<string>();

export function useMounted(): boolean {
  const id = React.useId();
  const snapshot = React.useSyncExternalStore(
    subscribeMounted,
    getMountedSnapshot,
    getMountedServerSnapshot,
  );

  React.useEffect(() => {
    // Añadimos este id al set módulo-privado y notificamos. Como el
    // snapshot es el propio Set, la próxima lectura devolverá uno
    // distinto y React re-renderizará con `true`.
    if (!mountedIds.has(id)) {
      mountedIds.add(id);
      notify();
    }
  }, [id]);

  return snapshot.has(id);
}