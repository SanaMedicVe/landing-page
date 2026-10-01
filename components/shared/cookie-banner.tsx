"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Cookie } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCookieConsent } from "@/lib/use-cookie-consent";
import { useMounted } from "@/lib/use-reduced-motion";

/**
 * Banner de consentimiento de cookies.
 *
 * Comportamiento esperado por producto:
 *  - Al cargar la página, si el navegador ya tiene persistida una
 *    decisión en `localStorage`, NO se muestra.
 *  - Si no hay decisión, aparece abajo como una notificación hasta
 *    que el visitante acepte o rechace.
 *  - Sana no utiliza cookies publicitarias de terceros: la decisión
 *    impacta únicamente a cookies técnicas y de preferencias. El
 *    detalle está documentado en `/aviso-de-privacidad`.
 *
 * El banner se renderiza en el layout raíz, fuera de `<main>`, y se
 * posiciona de forma fija para no afectar al flujo del contenido.
 */
export function CookieBanner() {
  const { consent, accept, reject } = useCookieConsent();
  const reduced = useReducedMotion();
  const mounted = useMounted();

  // Hidratación: hasta que `mounted` no sea true asumimos `undefined`
  // para evitar parpadeos entre SSR y cliente.
  const visible = mounted && consent === undefined;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-desc"
          initial={reduced ? false : { y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { y: 24, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-2xl rounded-2xl border border-sana-line bg-white/95 p-4 shadow-[0_18px_40px_-18px_rgba(0,63,110,0.35)] backdrop-blur sm:bottom-5 sm:p-5"
        >
          <div className="flex items-start gap-3">
            <span
              aria-hidden
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sana-accent-50 text-sana-accent-700"
            >
              <Cookie className="h-4 w-4" />
            </span>

            <div className="flex-1">
              <p
                id="cookie-banner-title"
                className="font-heading text-sm font-semibold text-sana-primary"
              >
                Tu privacidad, en una decisión
              </p>
              <p
                id="cookie-banner-desc"
                className="mt-1 text-xs leading-relaxed text-sana-muted sm:text-sm"
              >
                Sana guarda una preferencia en tu navegador para recordar esta
                elección. No usamos cookies publicitarias. Consulta el{" "}
                <Link
                  href="/aviso-de-privacidad"
                  className="font-medium text-sana-accent-700 underline-offset-4 hover:underline"
                >
                  aviso de privacidad
                </Link>{" "}
                para más detalles.
              </p>

              <div className="mt-3 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={reject}
                  className="rounded-full"
                >
                  Sólo lo esencial
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="primary"
                  onClick={accept}
                  className="rounded-full"
                >
                  Aceptar
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
