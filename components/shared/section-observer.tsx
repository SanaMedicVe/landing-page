"use client";

import * as React from "react";

export interface SectionMood {
  id: string;
  /** Porcentaje (0-1) del viewport donde empieza a dominar este mood. */
  threshold?: number;
}

/**
 * Devuelve el id de la sección visible actualmente, basado en thresholds
 * relativos al viewport. Útil para mutar el mood del ECG global.
 */
export function useActiveSection(sectionIds: string[]): string {
  const [active, setActive] = React.useState<string>(sectionIds[0] ?? "");
  // Clave estable para evitar deps complejas en useEffect
  const idsKey = sectionIds.join("|");

  React.useEffect(() => {
    if (typeof window === "undefined" || sectionIds.length === 0) return;

    const ratios = new Map<string, number>();
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            ratios.set(id, entry.intersectionRatio);
          });
          let bestId = sectionIds[0];
          let bestRatio = -1;
          ratios.forEach((r, k) => {
            if (r > bestRatio) {
              bestRatio = r;
              bestId = k;
            }
          });
          if (bestRatio > 0) setActive(bestId);
        },
        { threshold: [0, 0.25, 0.5, 0.75, 1] }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey]);

  return active;
}
