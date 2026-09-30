"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { BellRing, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-reduced-motion";

type PhoneMockupProps = {
  className?: string;
};

export function PhoneMockup({ className }: PhoneMockupProps) {
  const reduced = useReducedMotion();
  const mounted = useMounted();

  return (
    <motion.div
      initial={
        !mounted ? false : reduced ? false : { opacity: 0, y: 30, rotate: -3 }
      }
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative", className)}
    >
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-sana-primary/20 via-sana-accent/15 to-transparent blur-2xl"
      />

      <div
        className={cn(
          "relative mx-auto w-full rounded-[2.5rem] border border-sana-night-900/20 bg-sana-night-900 p-3",
          "shadow-[0_30px_80px_-20px_rgba(0,31,55,0.55)]",
        )}
      >
        <div className="relative overflow-hidden rounded-[2rem] bg-white">
          <div className="flex items-center justify-between bg-sana-night-900 px-6 pb-3 pt-4 text-[11px] font-medium text-white/80">
            <span>9:41</span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-sana-accent" />
              Sana
            </span>
          </div>

          <div className="space-y-4 bg-white p-4 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-sana-muted-soft">
                  Hola, Andrea
                </p>
                <p className="font-heading text-base font-semibold text-sana-primary">
                  Tu próxima cita
                </p>
              </div>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sana-accent-50 text-sana-accent-700">
                <Search className="h-4 w-4" />
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl bg-hero-gradient p-4 text-white shadow-[0_10px_30px_-10px_rgba(0,63,110,0.6)]">
              <div className="flex items-center justify-between text-xs text-white/75">
                <span>Hoy · 16:30</span>
                <span className="rounded-full bg-white/15 px-2 py-0.5">
                  confirmado
                </span>
              </div>
              <p className="mt-2 font-heading text-lg font-semibold">
                Dra. Mariana Pérez
              </p>
              <p className="text-xs text-white/75">
                Cardiología · Telemedicina
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs">
                  Unirse
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs">
                  Reagendar
                </span>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-sana-muted-soft">
                Especialidades
              </p>
              <div className="mt-2 flex gap-2 overflow-hidden">
                {["Cardiología", "Pediatría", "Nutrición"].map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-sana-primary/15 bg-white px-3 py-1 text-xs text-sana-primary"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-sana-line p-3">
              <p className="text-xs uppercase tracking-wider text-sana-muted-soft">
                Historial reciente
              </p>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex items-center justify-between">
                  <span className="text-sana-primary">Consulta general</span>
                  <span className="text-sana-muted-soft">12 oct</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sana-primary">Análisis de sangre</span>
                  <span className="text-sana-muted-soft">28 sep</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {mounted && !reduced && (
        <span
          aria-hidden
          className="absolute -right-3 top-12 inline-flex h-6 w-6 items-center justify-center rounded-full bg-sana-accent text-white shadow-[0_0_0_6px_rgba(15,182,204,0.18)] pulse-dot"
        >
          <BellRing className="h-3 w-3" />
        </span>
      )}
    </motion.div>
  );
}