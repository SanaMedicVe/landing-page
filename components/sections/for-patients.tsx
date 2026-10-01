"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  CalendarClock,
  BellRing,
  FolderHeart,
  ArrowRightCircle,
  Search,
} from "lucide-react";

import { AppScreenMockup } from "@/components/shared/app-screen-mockup";
import { useMounted } from "@/lib/use-reduced-motion";

const BULLETS = [
  {
    icon: CalendarClock,
    title: "Agenda en minutos, no en días",
    body: "Encuentra huecos reales según la disponibilidad del especialista.",
  },
  {
    icon: ArrowRightCircle,
    title: "Seguimiento sin perder el hilo",
    body: "Cada consulta queda registrada y conectada con la siguiente.",
  },
  {
    icon: FolderHeart,
    title: "Tu historial siempre contigo",
    body: "Disponible en tu bolsillo para ti y para tu doctor tratante.",
  },
  {
    icon: BellRing,
    title: "Recordatorios automáticos",
    body: "Citas, tomas y revisiones en el momento que las necesitas.",
  },
];

export function ForPatients() {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  return (
    <section
      id="para-pacientes"
      aria-labelledby="patients-heading"
      className="relative isolate overflow-hidden bg-sana-primary-50/40 py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/3 h-[420px] w-[420px] rounded-full bg-sana-accent/15 blur-[140px]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-8">
        <div className="text-center sm:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-sana-primary/15 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-sana-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-sana-accent" />
            para pacientes
          </span>
          <motion.h2
            id="patients-heading"
            initial={!mounted ? false : reduced ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-heading text-3xl font-semibold leading-tight text-sana-primary sm:text-4xl lg:text-5xl"
          >
            Encuentra al{" "}
            <span className="text-gradient-sana">especialista correcto.</span>
          </motion.h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-sana-muted sm:text-lg sm:mx-0">
            Sana transforma tu teléfono en un consultorio portátil, ordenado,
            cercano y siempre disponible.
          </p>

          <ul className="mt-10 grid gap-3 text-left sm:grid-cols-2">
            {BULLETS.map((b, i) => (
              <motion.li
                key={b.title}
                initial={
                  !mounted ? false : reduced ? false : { opacity: 0, y: 14 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex gap-3 rounded-2xl border border-sana-line bg-white p-4 transition-colors hover:border-sana-accent/40"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sana-accent-50 text-sana-accent-700">
                  <b.icon className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-heading text-base font-semibold text-sana-primary">
                    {b.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-sana-muted">
                    {b.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto flex w-full max-w-sm justify-center">
          <AppScreenMockup
            label="Tu próxima cita"
            icon={<Search className="h-3.5 w-3.5" />}
          >
            <div>
              <p className="text-[10px] uppercase tracking-wider text-sana-muted-soft">
                Hola, Andrea
              </p>
              <p className="font-heading text-[13px] font-semibold leading-tight text-sana-primary">
                Tu próxima cita
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl bg-hero-gradient p-3 text-white shadow-[0_10px_30px_-10px_rgba(0,63,110,0.6)]">
              <div className="flex items-center justify-between text-[10px] text-white/75">
                <span>Hoy · 16:30</span>
                <span className="rounded-full bg-white/15 px-1.5 py-0.5">
                  confirmado
                </span>
              </div>
              <p className="mt-1.5 font-heading text-sm font-semibold leading-tight">
                Dra. Mariana Pérez
              </p>
              <p className="text-[10px] text-white/75">
                Cardiología · Telemedicina
              </p>
              <div className="mt-2.5 flex items-center gap-2">
                <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px]">
                  Unirse
                </span>
                <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px]">
                  Reagendar
                </span>
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-sana-muted-soft">
                Especialidades
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {["Cardiología", "Pediatría", "Nutrición"].map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-sana-primary/15 bg-white px-2 py-0.5 text-[10px] text-sana-primary"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-sana-line p-2.5">
              <p className="text-[10px] uppercase tracking-wider text-sana-muted-soft">
                Historial reciente
              </p>
              <ul className="mt-1.5 space-y-1.5 text-[11px]">
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
          </AppScreenMockup>
        </div>
      </div>
    </section>
  );
}
