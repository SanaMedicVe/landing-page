"use client";

import * as React from "react";
import Link from "next/link";
import { Activity, Mail } from "lucide-react";

const COLS = [
  {
    title: "Producto",
    links: [
      { label: "Cómo funciona", href: "#como-funciona" },
      { label: "Para pacientes", href: "#para-pacientes" },
      { label: "Para doctores", href: "#para-doctores" },
      { label: "Seguridad", href: "#seguridad" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Aviso de privacidad", href: "/aviso-de-privacidad" },
      { label: "Términos de servicio", href: "/terminos" },
      { label: "Cookies", href: "/cookies" },
      { label: "Política de datos de salud", href: "/datos-de-salud" },
    ],
  },
  {
    title: "Compañía",
    links: [
      { label: "Sobre Sana", href: "/sobre" },
      { label: "Verified Doctor", href: "#verified-doctor" },
      { label: "Preguntas frecuentes", href: "#faq" },
      { label: "Contacto", href: "mailto:hola@sana.lat" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-sana-night-900 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-sana-accent/50 to-transparent"
      />
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.2fr_2fr]">
          {/* Brand */}
          <div>
            <Link
              href="#top"
              className="inline-flex items-center gap-2.5"
              aria-label="Sana — inicio"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-hero-gradient shadow-[0_8px_24px_-10px_rgba(0,63,110,0.7)]">
                <Activity className="h-4 w-4 text-white" strokeWidth={2.4} />
              </span>
              <span className="font-heading text-lg font-bold">Sana</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
              Pacientes y doctores verificados, conectados en una sola
              plataforma — diseñada para LATAM.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <SocialIcon href="#" label="Instagram">
                <InstagramGlyph />
              </SocialIcon>
              <SocialIcon href="#" label="X (Twitter)">
                <XGlyph />
              </SocialIcon>
              <SocialIcon href="#" label="LinkedIn">
                <LinkedinGlyph />
              </SocialIcon>
              <SocialIcon href="mailto:hola@sana.lat" label="Correo">
                <Mail className="h-4 w-4" />
              </SocialIcon>
            </div>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLS.map((col) => (
              <div key={col.title}>
                <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-white">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-white/65 transition-colors hover:text-sana-accent"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} Sana. Todos los derechos reservados.
          </p>
          <p className="font-mono uppercase tracking-[0.18em]">
            hecho en LATAM · v0.1
          </p>
        </div>
      </div>

      {/* sutil ECG footer */}
      <div aria-hidden className="absolute inset-x-0 bottom-2 h-6 opacity-50">
        <svg viewBox="0 0 520 24" className="h-full w-full">
          <path
            d="M0 12 L60 12 L80 6 L88 18 L120 12 L200 12 L220 8 L228 16 L260 12 L360 12 L380 6 L388 18 L420 12 L520 12"
            fill="none"
            stroke="rgba(15,182,204,0.55)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition-colors hover:bg-sana-accent hover:text-sana-night-900"
    >
      {children}
    </Link>
  );
}

function InstagramGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function XGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

function LinkedinGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}
