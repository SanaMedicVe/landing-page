"use client";

import * as React from "react";

import { track } from "@/lib/analytics";

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
