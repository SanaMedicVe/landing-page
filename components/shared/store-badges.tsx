import * as React from "react";

import { cn } from "@/lib/utils";
import {
  externalLinkProps,
  getPatientAppAndroidUrl,
  getPatientAppIosUrl,
} from "@/lib/links";

type StoreBadgeProps = {
  className?: string;
  /**
   * URL destino. Si se omite, se obtiene del helper centralizado
   * (`lib/links.ts`) que lee `NEXT_PUBLIC_PATIENT_APP_*_URL` y, en
   * su defecto, devuelve un `mailto:` como último fallback seguro
   * para que la badge nunca quede como enlace muerto.
   */
  href?: string;
};

/**
 * Badge oficial de la App Store de Apple.
 * Reproduce el rectángulo redondeado negro con el logo de Apple
 * y el texto "Disponible en el App Store".
 */
export function AppStoreBadge({ className, href }: StoreBadgeProps) {
  const target = href ?? getPatientAppIosUrl();
  return (
    <a
      href={target}
      aria-label="Descargar en el App Store"
      {...externalLinkProps(target)}
      className={cn(
        "inline-flex h-12 items-center gap-3 rounded-xl bg-black px-4 text-white transition-opacity hover:opacity-90",
        className,
      )}
    >
      <svg
        viewBox="0 0 384 512"
        width="22"
        height="22"
        aria-hidden
        className="shrink-0 fill-white"
      >
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
      </svg>
      <span className="flex flex-col leading-tight">
        <span className="text-[10px] uppercase tracking-wide text-white/85">
          Descargar en el
        </span>
        <span className="font-heading text-base font-semibold leading-none">
          App Store
        </span>
      </span>
    </a>
  );
}

/**
 * Badge oficial de Google Play.
 * Reproduce el rectángulo negro con el logo del triángulo y el texto "Disponible en Google Play".
 */
export function GooglePlayBadge({ className, href }: StoreBadgeProps) {
  const target = href ?? getPatientAppAndroidUrl();
  return (
    <a
      href={target}
      aria-label="Descargar en Google Play"
      {...externalLinkProps(target)}
      className={cn(
        "inline-flex h-12 items-center gap-3 rounded-xl bg-black px-4 text-white transition-opacity hover:opacity-90",
        className,
      )}
    >
      <svg
        viewBox="0 0 512 512"
        width="22"
        height="22"
        aria-hidden
        className="shrink-0"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M48,59.49v393a4.33,4.33,0,0,0,7.37,3.07L260,256,55.37,56.42A4.33,4.33,0,0,0,48,59.49Z" />
        <path d="M345.8,174,89.22,32.64l-.16-.09c-4.42-2.4-8.62,3.58-5,7.06L285.19,231.93Z" />
        <path d="M84.08,472.39c-3.64,3.48.56,9.46,5,7.06l.16-.09L345.8,338l-60.61-57.95Z" />
        <path d="M449.38,231l-71.65-39.46L310.36,256l67.37,64.43L449.38,281C468.87,270.23,468.87,241.77,449.38,231Z" />
      </svg>
      <span className="flex flex-col leading-tight">
        <span className="text-[10px] uppercase tracking-wide text-white/85">
          Descargar en
        </span>
        <span className="font-heading text-base font-semibold leading-none">
          Google Play
        </span>
      </span>
    </a>
  );
}
