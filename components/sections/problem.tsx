"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Hourglass,
  FileQuestion,
  MessageSquareLock,
  ScrollText,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-reduced-motion";

const FRICTION = [
  {
    icon: Hourglass,
    title: "Esperas que se alargan",
    body: "Días o semanas para una cita que muchas veces se resuelve en minutos.",
  },
  {
    icon: FileQuestion,
    title: "Historiales dispersos",
    body: "Resultados en un lugar, recetas en otro, y nadie ve el conjunto de tu salud.",
  },
  {
    icon: ScrollText,
    title: "Recetas en papel",
    body: "Documentos que se pierden, se mojan o no llegan a tu médico tratante.",
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
              el día a día
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
              Cuidar tu salud{" "}
              <span className="text-gradient-sana">
                no debería ser tan difícil.
              </span>
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
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-sana-muted sm:text-lg sm:mx-0"
            >
              Entre esperas largas, expedientes en papel y canales inseguros, el
              cuidado se fragmenta. Sana reúne tu información, tus citas y tus
              doctores — en una sola app que cabe en tu bolsillo.
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
                  "group relative flex items-start gap-3 overflow-hidden rounded-2xl border border-sana-line bg-white p-5",
                  "transition-colors hover:border-sana-accent/40",
                )}
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sana-primary text-white">
                  <f.icon className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="font-heading text-base font-semibold text-sana-primary">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-sana-muted">
                    {f.body}
                  </p>
                </div>
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
