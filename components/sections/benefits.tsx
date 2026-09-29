"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Zap, Database, Layers, Headphones, FileX2, Map } from "lucide-react";

import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-reduced-motion";

const ITEMS = [
  {
    icon: Zap,
    title: "Atención sin fricción",
    body: "Reserva, consulta y da seguimiento sin saltar entre apps.",
    span: "md:col-span-2",
    tone: "primary" as const,
  },
  {
    icon: Database,
    title: "Datos que te acompañan",
    body: "Historial disponible donde estés.",
    span: "md:col-span-1",
    tone: "soft" as const,
  },
  {
    icon: Layers,
    title: "Especialidades variadas",
    body: "Una red en crecimiento para cubrir lo que necesitas.",
    span: "md:col-span-1",
    tone: "soft" as const,
  },
  {
    icon: Headphones,
    title: "Soporte humano",
    body: "Cuando algo no encaja, hay alguien para ayudarte.",
    span: "md:col-span-2",
    tone: "accent" as const,
  },
  {
    icon: FileX2,
    title: "Sin papeleo",
    body: "Recetas, órdenes y notas en formato digital.",
    span: "md:col-span-1",
    tone: "soft" as const,
  },
  {
    icon: Map,
    title: "Pensado para LATAM",
    body: "Idioma, moneda y contexto regional desde el primer día.",
    span: "md:col-span-3",
    tone: "primary" as const,
  },
];

export function Benefits() {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  return (
    <section
      id="beneficios"
      aria-labelledby="benefits-heading"
      className="relative isolate overflow-hidden bg-sana-primary-50/50 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-sana-primary/15 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-sana-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-sana-accent" />
            beneficios
          </span>
          <h2
            id="benefits-heading"
            className="mt-5 font-heading text-3xl font-semibold leading-tight text-sana-primary sm:text-4xl lg:text-5xl"
          >
            Construido para{" "}
            <span className="text-gradient-sana">que fluya.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-sana-muted sm:text-lg">
            Cada pieza de Sana está diseñada para reducir pasos, no para agregar
            pantallas.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {ITEMS.map((it, i) => (
            <motion.div
              key={it.title}
              initial={
                !mounted ? false : reduced ? false : { opacity: 0, y: 18 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.6,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                it.span,
                "group relative overflow-hidden rounded-2xl border p-6 transition-all duration-500 hover:-translate-y-1",
                it.tone === "primary" &&
                  "border-white/15 bg-sana-primary text-white shadow-[0_18px_40px_-18px_rgba(0,63,110,0.5)] hover:shadow-[0_30px_60px_-20px_rgba(0,63,110,0.6)]",
                it.tone === "accent" &&
                  "border-sana-accent/30 bg-gradient-to-br from-sana-accent-50 to-white text-sana-primary shadow-[0_18px_40px_-18px_rgba(15,182,204,0.45)]",
                it.tone === "soft" &&
                  "border-sana-line bg-white text-sana-primary hover:border-sana-accent/40 hover:shadow-[0_18px_40px_-18px_rgba(0,63,110,0.18)]",
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "inline-flex h-11 w-11 items-center justify-center rounded-xl",
                    it.tone === "primary"
                      ? "bg-white/10 text-white"
                      : it.tone === "accent"
                        ? "bg-sana-accent text-sana-night-900"
                        : "bg-sana-primary text-white",
                  )}
                >
                  <it.icon className="h-5 w-5" />
                </span>
                <h3
                  className={cn(
                    "font-heading text-lg font-semibold",
                    it.tone === "primary" ? "text-white" : "text-sana-primary",
                  )}
                >
                  {it.title}
                </h3>
              </div>
              <p
                className={cn(
                  "mt-3 text-sm leading-relaxed",
                  it.tone === "primary" ? "text-white/75" : "text-sana-muted",
                )}
              >
                {it.body}
              </p>
              {it.tone === "primary" && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-sana-accent/20 blur-3xl"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
