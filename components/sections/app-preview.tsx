"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  CalendarCheck2,
  Video,
  Pill,
  HeartPulse,
  Bell,
  FileText,
} from "lucide-react";

import { useMounted } from "@/lib/use-reduced-motion";
import { AppScreenMockup } from "@/components/shared/app-screen-mockup";

const SCREENS = [
  {
    label: "Tu agenda",
    badge: "Hoy",
    icon: CalendarCheck2,
    content: (
      <div className="space-y-3">
        <div className="rounded-xl bg-hero-gradient p-3 text-white shadow-[0_8px_24px_-10px_rgba(0,63,110,0.55)]">
          <div className="flex items-center justify-between text-[10px] text-white/75">
            <span>16:30</span>
            <span className="rounded-full bg-white/15 px-1.5 py-0.5">
              confirmado
            </span>
          </div>
          <p className="mt-1 font-heading text-sm font-semibold">
            Dra. Mariana Pérez
          </p>
          <p className="text-[10px] text-white/75">
            Cardiología · Telemedicina
          </p>
        </div>
        <div className="rounded-xl border border-sana-line p-2.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-medium text-sana-primary">Mañana</span>
            <span className="text-sana-muted-soft">10:00</span>
          </div>
          <p className="mt-0.5 text-[11px] text-sana-muted">
            Dr. Ricardo Soto · Pediatría
          </p>
        </div>
        <div className="rounded-xl border border-sana-line p-2.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-medium text-sana-primary">Jueves</span>
            <span className="text-sana-muted-soft">18:15</span>
          </div>
          <p className="mt-0.5 text-[11px] text-sana-muted">
            Lic. Laura Méndez · Nutrición
          </p>
        </div>
      </div>
    ),
  },
  {
    label: "Videoconsulta",
    badge: "En vivo",
    icon: Video,
    content: (
      <div className="space-y-3">
        <div className="relative overflow-hidden rounded-xl bg-sana-night-900 p-3 text-white">
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(circle at 30% 40%, rgba(15,182,204,0.5), transparent 60%)",
            }}
          />
          <div className="relative flex items-center justify-between">
            <span className="rounded-full bg-rose-500/80 px-2 py-0.5 text-[10px] font-medium">
              ● en vivo
            </span>
            <span className="font-mono text-[10px] text-white/65">12:48</span>
          </div>
          <div className="relative mt-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sana-accent to-sana-primary text-lg font-bold text-white">
              MP
            </div>
          </div>
          <p className="relative mt-2 text-center text-xs font-medium">
            Dra. Mariana Pérez
          </p>
          <p className="relative text-center text-[10px] text-white/70">
            Cardióloga · verificada
          </p>
          <div className="relative mt-3 flex justify-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
              <Video className="h-3 w-3" />
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-500">
              <span className="h-2.5 w-2.5 rounded-sm bg-white" />
            </span>
          </div>
        </div>
        <div className="rounded-xl border border-sana-line p-2.5 text-center">
          <p className="text-[11px] font-medium text-sana-primary">
            Señal estable · 4G
          </p>
          <p className="text-[10px] text-sana-muted-soft">Audio y video HD</p>
        </div>
      </div>
    ),
  },
  {
    label: "Tus medicamentos",
    badge: "Recordatorio",
    icon: Pill,
    content: (
      <div className="space-y-3">
        <div className="rounded-xl bg-sana-accent-50 p-3">
          <div className="flex items-center justify-between">
            <Pill className="h-4 w-4 text-sana-accent-700" />
            <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-sana-accent-700">
              08:00
            </span>
          </div>
          <p className="mt-2 text-xs font-semibold text-sana-primary">
            Losartán 50 mg
          </p>
          <p className="text-[10px] text-sana-muted">
            1 pastilla · con desayuno
          </p>
          <div className="mt-2 flex gap-1.5">
            <span className="rounded-full bg-sana-accent px-2 py-0.5 text-[10px] font-medium text-white">
              Tomado
            </span>
            <span className="rounded-full border border-sana-accent/30 bg-white px-2 py-0.5 text-[10px] text-sana-accent-700">
              Posponer
            </span>
          </div>
        </div>
        <div className="rounded-xl border border-sana-line p-2.5">
          <div className="flex items-center justify-between">
            <Pill className="h-4 w-4 text-sana-muted-soft" />
            <span className="text-[10px] text-sana-muted-soft">22:00</span>
          </div>
          <p className="mt-1 text-[11px] font-medium text-sana-primary">
            Atorvastatina 20 mg
          </p>
          <p className="text-[10px] text-sana-muted">
            1 pastilla · antes de dormir
          </p>
        </div>
        <div className="rounded-xl border border-sana-line p-2.5">
          <div className="flex items-center justify-between">
            <Bell className="h-4 w-4 text-sana-muted-soft" />
            <span className="text-[10px] text-sana-muted-soft">próxima</span>
          </div>
          <p className="mt-1 text-[11px] text-sana-primary">
            Te avisaremos antes de que se agoten
          </p>
        </div>
      </div>
    ),
  },
  {
    label: "Tu historial",
    badge: "Resumen",
    icon: HeartPulse,
    content: (
      <div className="space-y-3">
        <div className="rounded-xl bg-hero-gradient p-3 text-white">
          <div className="flex items-center justify-between">
            <HeartPulse className="h-4 w-4" />
            <span className="text-[10px] text-white/75">última semana</span>
          </div>
          <p className="mt-2 font-heading text-2xl font-bold">68</p>
          <p className="text-[10px] text-white/75">
            latidos promedio en reposo
          </p>
          <svg viewBox="0 0 200 30" className="mt-2 h-6 w-full" aria-hidden>
            <path
              d="M0 15 L30 15 L45 8 L55 22 L70 15 L100 15 L115 8 L125 22 L140 15 L200 15"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.85"
            />
          </svg>
        </div>
        <div className="rounded-xl border border-sana-line p-2.5">
          <div className="flex items-center gap-2">
            <FileText className="h-3.5 w-3.5 text-sana-accent" />
            <p className="text-[11px] font-medium text-sana-primary">
              Análisis · 12 oct
            </p>
          </div>
          <p className="mt-1 text-[10px] text-sana-muted">
            Glucosa y colesterol dentro del rango.
          </p>
        </div>
        <div className="rounded-xl border border-sana-line p-2.5">
          <div className="flex items-center gap-2">
            <FileText className="h-3.5 w-3.5 text-sana-accent" />
            <p className="text-[11px] font-medium text-sana-primary">
              Receta · 28 sep
            </p>
          </div>
          <p className="mt-1 text-[10px] text-sana-muted">
            Losartán 50 mg · 30 días.
          </p>
        </div>
      </div>
    ),
  },
];

export function AppPreview() {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  return (
    <section
      id="app"
      aria-labelledby="app-heading"
      className="relative isolate overflow-hidden bg-white py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-sana-accent/10 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-sana-primary/10 blur-[140px]"
      />

      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-sana-accent/30 bg-sana-accent-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-sana-accent-700">
            <span className="h-1.5 w-1.5 rounded-full bg-sana-accent" />
            la app Sana
          </span>
          <h2
            id="app-heading"
            className="mt-5 font-heading text-3xl font-semibold leading-tight text-sana-primary sm:text-4xl lg:text-5xl"
          >
            Tu salud, en tu bolsillo.{" "}
            <span className="text-gradient-sana">En tu idioma.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-sana-muted sm:text-lg">
            Una app pensada para pacientes hispanohablantes en LATAM — clara,
            directa y siempre contigo.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 sm:gap-10 md:grid-cols-4 md:gap-6">
          {SCREENS.map((screen, i) => (
            <PhonePreview
              key={screen.label}
              screen={screen}
              index={i}
              reduced={!!reduced}
              mounted={mounted}
            />
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm font-medium text-sana-primary">
            Disponible para iOS y Android
          </p>
          <p className="text-xs text-sana-muted-soft">
            Descárgala gratis y crea tu perfil en menos de 2 minutos.
          </p>
        </div>
      </div>
    </section>
  );
}

function PhonePreview({
  screen,
  index,
  reduced,
  mounted,
}: {
  screen: (typeof SCREENS)[number];
  index: number;
  reduced: boolean;
  mounted: boolean;
}) {
  const tilt = index % 2 === 0 ? -3 : 3;
  const Icon = screen.icon;
  return (
    <motion.div
      initial={
        !mounted ? false : reduced ? false : { opacity: 0, y: 30, rotate: tilt }
      }
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative mx-auto flex w-full max-w-[220px] flex-col items-center"
    >
      <div
        aria-hidden
        className="absolute -inset-3 -z-10 rounded-[2.5rem] bg-gradient-to-br from-sana-primary/15 via-sana-accent/10 to-transparent blur-xl"
      />
      <AppScreenMockup
        label={screen.label}
        icon={<Icon className="h-3.5 w-3.5" />}
      >
        {screen.content}
      </AppScreenMockup>
      <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-sana-line bg-white px-2.5 py-1 text-[10px] font-medium text-sana-primary">
        <span className="h-1.5 w-1.5 rounded-full bg-sana-accent" />
        {screen.badge}
      </span>
    </motion.div>
  );
}
