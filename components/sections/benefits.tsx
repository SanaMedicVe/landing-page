"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Zap,
  Database,
  Layers,
  Headphones,
  FileX2,
  Map,
  ArrowUpRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-reduced-motion";

type BenefitTone = "primary" | "accent" | "soft";

type BenefitItem = {
  icon: React.ElementType;
  title: string;
  body: string;
  tone: BenefitTone;
  span?: "third" | "half" | "full";
};

const ITEMS: BenefitItem[] = [
  {
    icon: Zap,
    title: "Atención sin fricción",
    body: "Reserva, consulta y da seguimiento sin saltar entre apps.",
    tone: "primary",
    span: "third",
  },
  {
    icon: Database,
    title: "Datos que te acompañan",
    body: "Historial disponible donde estés.",
    tone: "soft",
    span: "third",
  },
  {
    icon: Layers,
    title: "Especialidades variadas",
    body: "Una red en crecimiento para cubrir lo que necesitas.",
    tone: "soft",
    span: "third",
  },
  {
    icon: Headphones,
    title: "Soporte humano",
    body: "Cuando algo no encaja, hay alguien para ayudarte.",
    tone: "primary",
    span: "half",
  },
  {
    icon: FileX2,
    title: "Sin papeleo",
    body: "Recetas, órdenes y notas en formato digital.",
    tone: "soft",
    span: "half",
  },
  {
    icon: Map,
    title: "Pensado para LATAM",
    body: "Idioma, moneda y contexto regional desde el primer día.",
    tone: "accent",
    span: "full",
  },
];

// Clases completas como strings literales para que Tailwind las detecte.
const SPAN_CLASS: Record<NonNullable<BenefitItem["span"]>, string> = {
  third: "md:col-span-2",
  half: "md:col-span-3",
  full: "md:col-span-6",
};

export function Benefits() {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  return (
    <section
      id="beneficios"
      aria-labelledby="benefits-heading"
      className="relative isolate overflow-hidden bg-sana-primary-50/50 py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/3 h-[420px] w-[420px] rounded-full bg-sana-accent/10 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-sana-primary/10 blur-[140px]"
      />

      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center sm:text-left">
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

        <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-6">
          {ITEMS.map((it, i) => {
            const isLast = i === ITEMS.length - 1;
            return (
              <motion.li
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
                  "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-500 hover:-translate-y-1 sm:p-7",
                  SPAN_CLASS[it.span ?? "third"],
                  it.tone === "primary" &&
                    "border-white/15 bg-sana-primary text-white shadow-[0_18px_40px_-18px_rgba(0,63,110,0.5)] hover:shadow-[0_30px_60px_-20px_rgba(0,63,110,0.6)]",
                  it.tone === "accent" &&
                    "border-sana-accent/30 bg-gradient-to-br from-sana-accent-50 via-white to-white text-sana-primary shadow-[0_18px_40px_-18px_rgba(15,182,204,0.45)]",
                  it.tone === "soft" &&
                    "border-sana-line bg-white text-sana-primary hover:border-sana-accent/40 hover:shadow-[0_18px_40px_-18px_rgba(0,63,110,0.18)]",
                )}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
                      it.tone === "primary"
                        ? "bg-white/10 text-white"
                        : it.tone === "accent"
                          ? "bg-sana-accent text-sana-night-900"
                          : "bg-sana-primary text-white",
                    )}
                  >
                    <it.icon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <div className="flex flex-1 items-start justify-between gap-3">
                    <h3
                      className={cn(
                        "font-heading text-lg font-semibold sm:text-xl",
                        it.tone === "primary"
                          ? "text-white"
                          : "text-sana-primary",
                      )}
                    >
                      {it.title}
                    </h3>
                    <ArrowUpRight
                      className={cn(
                        "h-4 w-4 shrink-0 -translate-x-1 translate-y-1 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100",
                        it.tone === "primary"
                          ? "text-white/70"
                          : "text-sana-accent",
                      )}
                    />
                  </div>
                </div>
                <p
                  className={cn(
                    "mt-2 text-sm leading-relaxed sm:text-[15px]",
                    it.tone === "primary" ? "text-white/75" : "text-sana-muted",
                  )}
                >
                  {it.body}
                </p>

                {isLast && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sana-accent/25 blur-3xl"
                  />
                )}
                {it.tone === "primary" && !isLast && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-12 -bottom-12 h-44 w-44 rounded-full bg-sana-accent/25 blur-3xl"
                  />
                )}
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
