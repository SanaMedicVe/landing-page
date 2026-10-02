"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";

import {
  InstagramGlyph,
  XGlyph,
  LinkedinGlyph,
} from "@/components/shared/social-icons";
import {
  externalLinkProps,
  getContactMail,
  getSocialInstagramUrl,
  getSocialLinkedinUrl,
  getSocialXUrl,
  mailto,
} from "@/lib/links";
import { track, classifyHref } from "@/lib/analytics";

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
      { label: "Política de datos de salud", href: "/datos-de-salud" },
    ],
  },
  {
    title: "Compañía",
    links: [
      { label: "Doctor Verificado", href: "#doctor-verificado" },
      { label: "Preguntas frecuentes", href: "#faq" },
      {
        label: "Contacto",
        href: mailto(getContactMail(), "Contacto desde la landing"),
      },
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
          <div>
            <Link
              href="#top"
              className="inline-flex items-center gap-2.5"
              aria-label="Sana — inicio"
            >
              <Image
                src="/logo/sana-logo-primary.svg"
                alt="Sana"
                width={120}
                height={41}
                sizes="120px"
                loading="lazy"
                className="h-9 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
              Pacientes y doctores verificados, conectados en una sola
              plataforma — diseñada para LATAM.
            </p>

            <SocialRow />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLS.map((col) => (
              <div key={col.title}>
                <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-white">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => {
                    const ext = externalLinkProps(l.href);
                    return (
                      <li key={l.label}>
                        <Link
                          href={l.href}
                          {...ext}
                          className="text-sm text-white/65 transition-colors hover:text-sana-accent"
                        >
                          {l.label}
                        </Link>
                      </li>
                    );
                  })}
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

function SocialRow() {
  const instagram = getSocialInstagramUrl();
  const x = getSocialXUrl();
  const linkedin = getSocialLinkedinUrl();
  const mail = getContactMail();

  return (
    <div className="mt-6 flex items-center gap-3">
      {instagram && (
        <SocialIcon href={instagram} label="Instagram">
          <InstagramGlyph />
        </SocialIcon>
      )}
      {x && (
        <SocialIcon href={x} label="X (Twitter)">
          <XGlyph />
        </SocialIcon>
      )}
      {linkedin && (
        <SocialIcon href={linkedin} label="LinkedIn">
          <LinkedinGlyph />
        </SocialIcon>
      )}
      <SocialIcon
        href={mailto(mail, "Contacto desde la landing")}
        label="Correo"
      >
        <Mail className="h-4 w-4" />
      </SocialIcon>
    </div>
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
  const kind = classifyHref(href);
  const channel: string =
    kind === "mailto"
      ? "email"
      : kind === "social_instagram"
        ? "instagram"
        : kind === "social_x"
          ? "x"
          : kind === "social_linkedin"
            ? "linkedin"
            : "other";

  return (
    <Link
      href={href}
      aria-label={label}
      {...externalLinkProps(href)}
      onClick={() =>
        track("contact_cta", {
          audience: "contact",
          cta_label: label,
          section: "footer",
          channel,
        })
      }
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/75 transition-colors hover:bg-sana-accent hover:text-sana-night-900"
    >
      {children}
    </Link>
  );
}
