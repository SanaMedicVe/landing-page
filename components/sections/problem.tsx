"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Hourglass,
  FileQuestion,
  PlugZap,
  MessageSquareLock,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-reduced-motion";

const FRICTION = [
  {
    icon: Hourglass,
    title: "Esperas que se alargan",
    body: "Semántas para una cita que suele resolverse en minutos.",
  },
  {
    icon: FileQuestion,
    title: "Historiales dispersos",
    body: "Resultados en un lugar, recetas en otro, nadie ve el conjunto.",
  },
  {
    icon: PlugZap,
    title: "Sistemas que no conectan",
    body: "Pacientes y doctores usando herramientas distintas, sin continuidad.",
  },
  {
    icon: MessageSquareLock,
    title: "Información sensible",
    body: "Compartir datos clínicos por canales que no fueron pensados para eso.",
  },
];

export function Problem() {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  return (
    <section
      aria-labelledby="problem-heading"
      className="relative isolate overflow-hidden bg-sana-primary-50/60 py-20 sm:py-28"
    >
      {/* halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-sana-accent/10 blur-[140px]"
      />

      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-sana-primary/15 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-sana-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-sana-accent" />
              el problema
            </span>
            <motion.h2
              id="problem-heading"
              initial={
                !mounted ? false : reduced ? false : { opacity: 0, y: 14 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 font-heading text-3xl font-semibold leading-tight text-sana-primary sm:text-4xl lg:text-5xl"
            >
              La salud no debería ser{" "}
              <span className="text-gradient-sana">un rompecabezas</span> cada
              vez que la necesitas.
            </motion.h2>
            <motion.p
              initial={
                !mounted ? false : reduced ? false : { opacity: 0, y: 10 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.6,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-5 max-w-xl text-base leading-relaxed text-sana-muted sm:text-lg"
            >
              Entre agendas saturadas, expedientes en papel y canales inseguros,
              el cuidado se fragmenta. Sana existe para volver a unir las piezas
              — paciente, doctor e información clínica — en un solo lugar.
            </motion.p>
          </div>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {FRICTION.map((f, i) => (
              <motion.li
                key={f.title}
                initial={
                  !mounted ? false : reduced ? false : { opacity: 0, y: 16 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-sana-line bg-white p-5",
                  "transition-colors hover:border-sana-accent/40",
                )}
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sana-primary text-white">
                  <f.icon className="h-4 w-4" />
                </span>
                <h3 className="mt-3 font-heading text-base font-semibold text-sana-primary">
                  {f.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-sana-muted">
                  {f.body}
                </p>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-5 -bottom-px h-px bg-gradient-to-r from-transparent via-sana-accent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
