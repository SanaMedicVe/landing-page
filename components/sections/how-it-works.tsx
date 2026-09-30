"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { UserPlus, Search, Video } from "lucide-react";

import { StepCard } from "@/components/shared/step-card";
import { useMounted } from "@/lib/use-reduced-motion";

const STEPS = [
  {
    icon: UserPlus,
    n: "01",
    title: "Descarga y crea tu perfil",
    body: "Instala la app en tu celular y regístrate en menos de 2 minutos con tus datos básicos.",
  },
  {
    icon: Search,
    n: "02",
    title: "Encuentra a tu especialista",
    body: "Filtra por especialidad, disponibilidad o idioma y elige al profesional que mejor se adapte a ti.",
  },
  {
    icon: Video,
    n: "03",
    title: "Consulta y da seguimiento",
    body: "Atiéndete por videollamada o presencial y lleva el control desde la app: recetas, recordatorios e historial.",
  },
];

export function HowItWorks() {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  return (
    <section
      id="como-funciona"
      aria-labelledby="how-heading"
      className="relative isolate overflow-hidden bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center sm:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-sana-accent/30 bg-sana-accent-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-sana-accent-700">
            <span className="h-1.5 w-1.5 rounded-full bg-sana-accent" />
            cómo funciona
          </span>
          <h2
            id="how-heading"
            className="mt-5 font-heading text-3xl font-semibold leading-tight text-sana-primary sm:text-4xl lg:text-5xl"
          >
            Tres pasos.{" "}
            <span className="text-gradient-sana">Una app que te cuida.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-sana-muted sm:text-lg">
            Sana simplifica tu camino hacia el especialista correcto — sin pasos
            sobrantes, sin llamadas eternas.
          </p>
        </div>

        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.n}
              initial={
                !mounted ? false : reduced ? false : { opacity: 0, y: 18 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              <StepCard
                icon={s.icon}
                n={s.n}
                title={s.title}
                body={s.body}
                index={i}
              />
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 hidden h-px w-12 -translate-y-1/2 bg-gradient-to-r from-sana-accent/60 to-transparent md:block"
                  style={{ left: "calc(50% + 56px)" }}
                />
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
