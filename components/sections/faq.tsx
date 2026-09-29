"use client";

import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "¿Qué es Sana?",
    a: "Sana es una plataforma que conecta a pacientes con doctores verificados. Los pacientes usan una app móvil (iOS y Android) para encontrar especialistas y dar seguimiento a su historial. Los profesionales usan un panel clínico web para gestionar su práctica.",
  },
  {
    q: "¿Cómo me registro como paciente?",
    a: "Descarga la app Sana desde el App Store o Google Play, crea tu perfil con tus datos básicos y, opcionalmente, sube documentos clínicos. En minutos puedes empezar a buscar especialistas disponibles.",
  },
  {
    q: "¿Cómo me registro como doctor?",
    a: 'Solicita tu registro profesional desde la landing, sección "Soy doctor". Te pediremos cédula profesional vigente y comprobante de especialidad. Una vez verificada tu información, tu perfil queda visible para los pacientes.',
  },
  {
    q: "¿Cuánto cuesta usar Sana?",
    a: "Para pacientes, el registro y acceso a funcionalidades básicas es gratuito. Los precios de consulta dependen de cada profesional. No hacemos claims de gratuidad total hasta que la estructura de planes esté aprobada por Producto.",
  },
  {
    q: "¿Mis datos están seguros?",
    a: "Tu información viaja cifrada de extremo a extremo y se almacena cumpliendo con los estándares de protección de datos en salud aplicables a la región. Sana no hace claims regulatorios específicos (HIPAA, ISO, GDPR) hasta que el equipo Legal los apruebe.",
  },
  {
    q: "¿En qué países está disponible?",
    a: "Sana está pensada para Latinoamérica y se encuentra en expansión gradual por país. La disponibilidad exacta por región se confirma al crear tu perfil.",
  },
  {
    q: "¿Necesito un dispositivo especial?",
    a: "No. La app móvil corre en cualquier iPhone con iOS reciente y en la mayoría de teléfonos Android. El panel clínico es web y funciona en navegadores modernos de escritorio.",
  },
  {
    q: "¿Sana sustituye a mi médico?",
    a: "No. Sana es una herramienta de conexión y seguimiento. Las decisiones clínicas siempre las toma un profesional de la salud acreditado.",
  },
];

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative isolate overflow-hidden bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-sana-primary/15 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-sana-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-sana-accent" />
            preguntas frecuentes
          </span>
          <h2
            id="faq-heading"
            className="mt-5 font-heading text-3xl font-semibold leading-tight text-sana-primary sm:text-4xl lg:text-5xl"
          >
            Resolvemos lo esencial,
            <br />
            <span className="text-gradient-sana">en español claro.</span>
          </h2>
        </div>

        <Accordion className="mt-12 w-full">
          {FAQS.map((f, i) => (
            <AccordionItem key={f.q} value={`faq-${i}`}>
              <AccordionTrigger>
                <span className="font-heading">{f.q}</span>
              </AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="mt-10 text-center text-sm text-sana-muted">
          ¿No encuentras lo que buscas?{" "}
          <a
            href="mailto:hola@sana.lat"
            className="font-semibold text-sana-accent-700 hover:underline"
          >
            Escríbenos a hola@sana.lat
          </a>
        </p>
      </div>
    </section>
  );
}
