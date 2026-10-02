"use client";

import * as React from "react";

import { initAnalytics } from "@/lib/analytics";

/**
 * Provider invisible: se limita a precargar el cliente de Segment
 * tras la hidratación para reducir la latencia del primer evento.
 *
 * No renderiza markup. Vive en el `<body>` del layout raíz, fuera de
 * `<main>`, junto al `<CookieBanner />`.
 */
export function AnalyticsProvider() {
  React.useEffect(() => {
    // No bloquea la hidratación: `initAnalytics` es fire-and-forget
    // y respeta el kill-switch / falta de write key.
    void initAnalytics();
  }, []);

  return null;
}