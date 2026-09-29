"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  LayoutDashboard,
  Users,
  ChartNoAxesColumn,
  FolderHeart,
  ShieldCheck,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-reduced-motion";

const BULLETS = [
  {
    icon: LayoutDashboard,
    title: "Panel que se adapta a ti",
    body: "Tu panel clínico se acomoda a cómo trabajas, no al revés.",
  },
  {
    icon: Users,
    title: "Pacientes ya verificados",
    body: "Listos para consulta, con historial relevante desde el primer minuto.",
  },
  {
    icon: FolderHeart,
    title: "Historial centralizado y seguro",
    body: "Toda la información clínica en un solo lugar, sin papeleo.",
  },
  {
    icon: ChartNoAxesColumn,
    title: "Métricas claras",
    body: "Visibilidad real de tu práctica: asistencia, seguimiento y resultados.",
  },
];

export function ForDoctors() {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  return (
    <section
      id="para-doctores"
      aria-labelledby="doctors-heading"
      className="relative isolate overflow-hidden bg-white py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-sana-primary/10 blur-[140px]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-8">
        {/* Mockup dashboard */}
        <div className="order-2 lg:order-1">
          <DashboardMockup reduced={!!reduced} mounted={mounted} />
        </div>

        {/* Texto */}
        <div className="order-1 lg:order-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-sana-primary/15 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-sana-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-sana-accent" />
            para doctores
          </span>
          <motion.h2
            id="doctors-heading"
            initial={
              !mounted ? false : reduced ? false : { opacity: 0, y: 14 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-heading text-3xl font-semibold leading-tight text-sana-primary sm:text-4xl lg:text-5xl"
          >
            Menos clics,{" "}
            <span className="text-gradient-sana">más consultas.</span>
          </motion.h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-sana-muted sm:text-lg">
            Plataforma web diseñada para profesionales: foco en lo clínico, lo
            demás queda en segundo plano.
          </p>

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
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
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sana-primary-50 text-sana-primary">
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
      </div>
    </section>
  );
}

function DashboardMockup({
  reduced,
  mounted,
}: {
  reduced: boolean;
  mounted: boolean;
}) {
  return (
    <motion.div
      initial={
        !mounted ? false : reduced ? false : { opacity: 0, y: 30 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* glow */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-sana-accent/20 via-sana-primary/15 to-transparent blur-2xl"
      />

      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-sana-night-900/15 bg-white",
          "shadow-[0_30px_80px_-20px_rgba(0,31,55,0.45)]",
        )}
      >
        {/* Browser bar */}
        <div className="flex items-center justify-between border-b border-sana-line bg-sana-primary-50/40 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          </div>
          <div className="rounded-md bg-white px-3 py-1 font-mono text-[11px] text-sana-muted ring-1 ring-sana-line">
            app.sana.lat/dashboard
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-sana-accent-700">
            <ShieldCheck className="h-3 w-3" />
            Verified
          </span>
        </div>

        {/* Dashboard grid */}
        <div className="grid gap-3 p-4 sm:grid-cols-3">
          <KpiCard label="Pacientes hoy" value="14" trend="+3 vs ayer" />
          <KpiCard label="Asistencia" value="98%" trend="estable" />
          <KpiCard label="Seguimiento" value="92%" trend="+4% semana" />
        </div>

        <div className="grid gap-3 p-4 pt-0 sm:grid-cols-[1.5fr_1fr]">
          {/* Gráfico simple */}
          <div className="rounded-xl border border-sana-line p-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-sana-primary">
                Consultas / semana
              </p>
              <span className="font-mono text-[10px] text-sana-muted-soft">
                últimos 7 días
              </span>
            </div>
            <ChartBars />
          </div>

          {/* Próxima cita */}
          <div className="rounded-xl border border-sana-line p-3">
            <p className="text-xs font-medium text-sana-primary">
              Próxima cita
            </p>
            <div className="mt-2 rounded-lg bg-sana-night-900 p-3 text-white">
              <p className="font-heading text-sm font-semibold">
                Andrea Castillo
              </p>
              <p className="text-xs text-white/70">
                16:30 · Telemedicina · Cardio
              </p>
              <button
                type="button"
                className="mt-2 rounded-full bg-sana-accent px-3 py-1 text-xs font-medium text-sana-night-900"
              >
                Iniciar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mini sello Verified Doctor flotante */}
      <div className="absolute -right-3 -bottom-3 hidden sm:block">
        <div className="stamp relative inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-sana-accent bg-white text-[9px] font-semibold uppercase tracking-[0.18em] text-sana-accent-700 shadow-[0_8px_24px_-8px_rgba(15,182,204,0.6)]">
          <span className="text-center leading-tight">
            Verified
            <br />
            Doctor
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function KpiCard({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <div className="rounded-xl border border-sana-line p-3">
      <p className="text-[11px] uppercase tracking-wider text-sana-muted-soft">
        {label}
      </p>
      <p className="mt-1 font-heading text-2xl font-semibold text-sana-primary">
        {value}
      </p>
      <p className="font-mono text-[10px] text-sana-accent-700">{trend}</p>
    </div>
  );
}

function ChartBars() {
  const bars = [40, 60, 35, 80, 55, 90, 70];
  return (
    <div className="mt-3 flex h-24 items-end gap-2">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            delay: 0.05 * i,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex-1 rounded-md bg-gradient-to-t from-sana-primary to-sana-accent"
        />
      ))}
    </div>
  );
}