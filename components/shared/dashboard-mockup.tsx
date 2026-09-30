"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-reduced-motion";

type DashboardMockupProps = {
  className?: string;
};

export function DashboardMockup({ className }: DashboardMockupProps) {
  const reduced = useReducedMotion();
  const mounted = useMounted();

  return (
    <motion.div
      initial={!mounted ? false : reduced ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative", className)}
    >
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
        <div className="flex items-center justify-between border-b border-sana-line bg-sana-primary-50/40 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          </div>
          <div className="rounded-md bg-white px-3 py-1 font-mono text-[11px] text-sana-muted ring-1 ring-sana-line">
            app.sana.lat/panel
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-sana-accent-700">
            <ShieldCheck className="h-3 w-3" />
            Verificado
          </span>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-3">
          <KpiCard label="Pacientes hoy" value="14" trend="+3 vs ayer" />
          <KpiCard label="Asistencia" value="98%" trend="estable" />
          <KpiCard label="Seguimiento" value="92%" trend="+4% semana" />
        </div>

        <div className="grid gap-3 p-4 pt-0 sm:grid-cols-[1.5fr_1fr]">
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

      <div className="absolute -right-3 -bottom-3 hidden sm:block">
        <div className="stamp relative inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-sana-accent bg-white text-[9px] font-semibold uppercase tracking-[0.18em] text-sana-accent-700 shadow-[0_8px_24px_-8px_rgba(15,182,204,0.6)]">
          <span className="text-center leading-tight">
            Verificado
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