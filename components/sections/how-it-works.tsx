"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { UserPlus, Link2, Activity } from "lucide-react";

import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-reduced-motion";

const STEPS = [
  {
    icon: UserPlus,
    n: "01",
    title: "Crea tu perfil",
    body: "Paciente o profesional en minutos — solo lo necesario para empezar.",
  },
  {
    icon: Link2,
    n: "02",
    title: "Conecta",
    body: "Busca por especialidad o recibe pacientes verificados, según tu rol.",
  },
  {
    icon: Activity,
    n: "03",
    title: "Consulta",
    body: "Seguimiento continuo desde la app móvil o el panel clínico web.",
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
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-sana-accent/30 bg-sana-accent-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-sana-accent-700">
            <span className="h-1.5 w-1.5 rounded-full bg-sana-accent" />
            cómo funciona
          </span>
          <h2
            id="how-heading"
            className="mt-5 font-heading text-3xl font-semibold leading-tight text-sana-primary sm:text-4xl lg:text-5xl"
          >
            Tres pasos.{" "}
            <span className="text-gradient-sana">Un pulso constante.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-sana-muted sm:text-lg">
            Sana simplifica el camino entre quien necesita atención y quien la
            brinda — sin pasos sobrantes.
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
                step={s}
                index={i}
                reduced={!!reduced}
                mounted={mounted}
              />
              {/* Conector horizontal entre cards (md+) */}
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

function StepCard({
  step,
  index,
  reduced,
  mounted,
}: {
  step: (typeof STEPS)[number];
  index: number;
  reduced: boolean;
  mounted: boolean;
}) {
  return (
    <div
      className={cn(
        "relative h-full overflow-hidden rounded-3xl border border-sana-line bg-white p-7",
        "transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_50px_-22px_rgba(0,63,110,0.35)]",
      )}
    >
      {/* Ripple expansivo desde el centro del icono */}
      {mounted && !reduced && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[68px] -translate-x-1/2"
        >
          <span
            className="ripple-ring absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sana-accent/60"
            style={{ animationDelay: `${index * 0.4}s` }}
          />
          <span
            className="ripple-ring absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sana-accent/40"
            style={{ animationDelay: `${index * 0.4 + 0.6}s` }}
          />
        </div>
      )}

      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-hero-gradient text-white shadow-[0_12px_28px_-10px_rgba(0,63,110,0.55)]">
        <step.icon className="h-7 w-7" />
        <span className="absolute -right-1.5 -top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-sana-primary ring-2 ring-sana-accent font-mono">
          {step.n}
        </span>
      </div>

      <h3 className="mt-6 font-heading text-xl font-semibold text-sana-primary">
        {step.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-sana-muted">
        {step.body}
      </p>

      {/* mini ECG al pie */}
      <svg viewBox="0 0 200 30" className="mt-6 h-7 w-full" aria-hidden>
        <path
          d="M0 15 L40 15 L55 8 L65 22 L75 15 L120 15 L140 8 L150 22 L160 15 L200 15"
          fill="none"
          stroke="#0fb6cc"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 4px rgba(15,182,204,0.5))" }}
        />
      </svg>
    </div>
  );
}
