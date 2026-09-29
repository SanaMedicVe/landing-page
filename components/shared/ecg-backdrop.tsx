"use client";

import * as React from "react";
import { EcgLine, type EcgMood } from "@/components/shared/ecg-line";

/**
 * Map de secciones → mood del ECG. La línea muta su silueta al pasar
 * por cada sección. El fondo es persistente (fixed) y atraviesa toda
 * la página horizontalmente.
 *
 * chaotic  → El problema
 * steady   → Cómo funciona
 * calm     → Pacientes / Doctores / Beneficios
 * flat     → Seguridad / Verified Doctor (calma total)
 * calm-night → Footer / Final CTA
 */

const SECTION_MOODS: { id: string; mood: EcgMood; tone: "light" | "dark" }[] = [
  { id: "top", mood: "calm-night", tone: "dark" },
  { id: "como-funciona", mood: "steady", tone: "light" },
  { id: "para-pacientes", mood: "calm", tone: "light" },
  { id: "para-doctores", mood: "calm", tone: "light" },
  { id: "seguridad", mood: "flat", tone: "dark" },
  { id: "verified-doctor", mood: "flat", tone: "light" },
  { id: "beneficios", mood: "calm", tone: "light" },
  { id: "faq", mood: "steady", tone: "light" },
];

export function EcgBackdrop() {
  const [activeId, setActiveId] = React.useState<string>("top");

  React.useEffect(() => {
    const ids = SECTION_MOODS.map((s) => s.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        // Dispara cuando la sección ocupa la mitad superior del viewport
        rootMargin: "-30% 0px -55% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const active = SECTION_MOODS.find((s) => s.id === activeId) ?? SECTION_MOODS[0];

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[160px]"
    >
      <EcgLine mood={active.mood} tone={active.tone} />
    </div>
  );
}
