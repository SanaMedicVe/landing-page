"use client";

import * as React from "react";
import { useReducedMotion, useMounted } from "@/lib/use-reduced-motion";

/**
 * Línea ECG horizontal persistente que recorre toda la página.
 * Cambia su forma (mood) según la sección en la que se encuentre.
 *
 * Implementación: SVG con un path que se repite horizontalmente.
 * El "mood" define el patrón de picos. La posición Y se interpola
 * con scroll para que la línea parezca moverse a través del documento.
 *
 * También expone un "traveling pulse" — un punto cian que recorre la
 * línea como un latido, sincronizado a ~60bpm (1s).
 */

export type EcgMood = "chaotic" | "calm" | "steady" | "flat" | "calm-night";

interface EcgLineProps {
  className?: string;
  /** Mood actual. Cambia la silueta del trazo. */
  mood?: EcgMood;
  /** Si es true, la línea se ve tenue (oscura sobre fondo claro). */
  tone?: "light" | "dark";
}

const PATTERNS: Record<EcgMood, string> = {
  // Caótico: picos irregulares, amplitudes grandes
  chaotic:
    "M0 60 L40 60 L55 20 L70 90 L80 30 L92 80 L100 60 L160 60 L175 35 L188 88 L200 60 L260 60 L275 25 L290 75 L305 60 L380 60 L395 30 L410 90 L425 60",
  // Calmado: picos uniformes, un poco de actividad
  calm: "M0 60 L60 60 L75 50 L82 60 L90 60 L110 60 L120 25 L130 95 L140 60 L220 60 L240 60 L252 50 L260 60 L280 60 L300 60 L310 25 L320 95 L330 60 L420 60",
  // Estable: ritmo regular, picos iguales
  steady:
    "M0 60 L80 60 L100 50 L108 60 L120 60 L160 60 L180 25 L200 95 L220 60 L320 60 L340 60 L360 25 L380 95 L400 60 L520 60",
  // Plano: línea casi recta, sensación de calma/seguridad
  flat: "M0 60 L40 60 L60 58 L100 62 L160 60 L240 60 L280 59 L360 61 L440 60 L520 60",
  // Modo nocturno: tenue, picos suaves
  "calm-night":
    "M0 60 L60 60 L80 50 L88 60 L120 60 L150 25 L170 95 L190 60 L260 60 L290 60 L320 25 L340 95 L360 60 L440 60",
};

export function EcgLine({
  className,
  mood = "steady",
  tone = "light",
}: EcgLineProps) {
  const ref = React.useRef<SVGSVGElement | null>(null);
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const pathD = PATTERNS[mood];

  // Parallax con scroll — escribe directo en style (sin estado)
  React.useEffect(() => {
    if (reduced) return;
    const node = ref.current;
    if (!node) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        node.style.transform = `translateY(${window.scrollY * 0.06}px)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const stroke =
    tone === "dark" ? "rgba(255,255,255,0.45)" : "rgba(0, 63, 110, 0.32)";
  const glow =
    tone === "dark" ? "rgba(15, 182, 204, 0.55)" : "rgba(15, 182, 204, 0.75)";

  return (
    <div
      className={
        "pointer-events-none absolute inset-x-0 top-0 h-[120px] overflow-hidden " +
        (className ?? "")
      }
      aria-hidden
    >
      <svg
        ref={ref}
        viewBox="0 0 520 120"
        preserveAspectRatio="none"
        className="h-full w-full"
        style={{
          transition: "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <defs>
          <linearGradient id="ecg-stroke" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor={stroke} stopOpacity="0" />
            <stop offset="20%" stopColor={stroke} stopOpacity="0.9" />
            <stop offset="80%" stopColor={stroke} stopOpacity="0.9" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={pathD}
          fill="none"
          stroke="url(#ecg-stroke)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition: "d 700ms cubic-bezier(0.22, 1, 0.36, 1)",
            filter: `drop-shadow(0 0 6px ${glow})`,
          }}
        />
      </svg>
      {/* Traveling pulse */}
      {mounted && !reduced && (
        <span
          className="ecg-travel pointer-events-none absolute left-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-sana-accent pulse-dot"
          style={{
            boxShadow:
              "0 0 14px 2px rgba(15,182,204,0.7), 0 0 28px 6px rgba(15,182,204,0.35)",
          }}
        />
      )}
    </div>
  );
}
