"use client";

import * as React from "react";

import { track } from "@/lib/analytics";

/**
 * Dispara el evento `landing_visit` una vez por sesión, cuando:
 *  - el componente monta en el cliente, y
 *  - el visitante ya aceptó cookies (consent === "accepted").
 *
 * Si el visitante aún no decidió, el evento NO se emite ahora: se
 * vuelve a intentar cuando el banner emite `sana:cookies-changed`
 * y la decisión pasa a "accepted".
 *
 * Está separado del `<AnalyticsProvider />` para que `track()` se
 * llame sólo cuando sepamos que el consentimiento permite emitir.
 */
export function AnalyticsBoot() {
  React.useEffect(() => {
    let cancelled = false;

    const fire = () => {
      if (cancelled) return;
      void track("landing_visit", {
        audience: "patient", // "landing_visit" denota visita pública inicial
        section: "hero",
        locale: typeof navigator !== "undefined" ? navigator.language : "es",
      });
    };

    const checkConsentAndFire = () => {
      try {
        const raw = window.localStorage.getItem("sana.cookie-consent.v1");
        if (raw === "accepted") fire();
      } catch {
        // sessionStorage/localStorage no disponible: ignorar.
      }
    };

    // 1. Si el visitante ya tenía decisión previa, evaluar ahora.
    checkConsentAndFire();

    // 2. Si no, suscribirse al cambio de consentimiento. Si nunca
    //    decide, no emitimos (criterio de privacidad).
    window.addEventListener("sana:cookies-changed", checkConsentAndFire);
    return () => {
      cancelled = true;
      window.removeEventListener("sana:cookies-changed", checkConsentAndFire);
    };
  }, []);

  return null;
}