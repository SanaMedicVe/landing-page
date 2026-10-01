import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Wrapper compartido para todas las páginas legales.
 *
 * Server Component: las páginas legales son contenido indexable y
 * deben renderizar HTML en el servidor para SEO. Por eso evitamos
 * `<Button asChild>` (que introduce una `render` prop incompatible
 * con el modelo de Server Components) y estilizamos los CTAs
 * directamente con Tailwind.
 *
 * Mantiene coherencia visual con la landing:
 *  - fondo blanco con halo cian sutil
 *  - tipografía heading + sans
 *  - paleta SANA (sin claims regulatorios: copy factual)
 *  - accesibilidad: jerarquía h1/h2/h3, links focusables, fecha de
 *    "última actualización" visible para que el equipo Legal pueda
 *    auditarla.
 */

type Crumb = { label: string; href?: string };

// Estilos alineados con `Button` variant="ghost" size="sm" + pill.
const ctaClasses =
  "mt-3 inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[0.8rem] font-medium text-sana-primary transition-colors hover:bg-sana-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sana-accent/40";

export function LegalShell({
  eyebrow,
  title,
  description,
  crumbs,
  lastUpdated,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <article className="relative isolate overflow-hidden bg-white pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32">
      {/* Halo cian sutil — coherente con el resto de la landing */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-sana-accent/10 blur-[140px]"
      />

      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        {crumbs && crumbs.length > 0 && (
          <nav
            aria-label="Migas de pan"
            className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-sana-muted"
          >
            {crumbs.map((c, i) => (
              <span key={c.label} className="inline-flex items-center gap-2">
                {c.href ? (
                  <Link
                    href={c.href}
                    className="transition-colors hover:text-sana-accent-700"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-sana-primary">{c.label}</span>
                )}
                {i < crumbs.length - 1 && (
                  <span aria-hidden className="text-sana-line">
                    /
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}

        <span className="inline-flex items-center gap-2 rounded-full border border-sana-primary/15 bg-sana-primary-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-sana-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-sana-accent" />
          {eyebrow}
        </span>

        <h1 className="mt-5 font-heading text-3xl font-semibold leading-tight tracking-tight text-sana-primary sm:text-4xl lg:text-5xl">
          {title}
        </h1>

        {description && (
          <p className="mt-4 text-base leading-relaxed text-sana-muted sm:text-lg">
            {description}
          </p>
        )}

        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-sana-line bg-white px-3 py-1 text-xs text-sana-muted">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-sana-accent" />
          Última actualización:{" "}
          <strong className="font-medium text-sana-primary">{lastUpdated}</strong>
        </p>

        <div className="mt-12 space-y-12 text-[15px] leading-relaxed text-sana-muted sm:text-base">
          {children}
        </div>

        <div className="mt-16 rounded-2xl border border-sana-line bg-sana-primary-50/50 p-6">
          <p className="font-heading text-base font-semibold text-sana-primary">
            ¿Dudas sobre este documento?
          </p>
          <p className="mt-2 text-sm leading-relaxed text-sana-muted">
            Escríbenos a{" "}
            <a
              href="mailto:legal@sana.lat"
              className="font-semibold text-sana-accent-700 hover:underline"
            >
              legal@sana.lat
            </a>
            . El equipo responderá en horario laboral (GMT-5).
          </p>
          <Link href="/#top" className={ctaClasses}>
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </article>
  );
}

/**
 * Bloques <section> con título + contenido. Usar siempre h2 para mantener
 * jerarquía correcta bajo el h1 del shell.
 */
export function LegalSection({
  id,
  title,
  children,
  className,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-28", className)}>
      <h2 className="font-heading text-xl font-semibold leading-tight text-sana-primary sm:text-2xl">
        {title}
      </h2>
      <div className="mt-3 space-y-3 [&_a]:font-medium [&_a]:text-sana-accent-700 [&_a]:underline-offset-4 hover:[&_a]:underline">
        {children}
      </div>
    </section>
  );
}

export function LegalList({
  items,
}: {
  items: { t: string; d?: string }[];
}) {
  return (
    <ul className="grid gap-2">
      {items.map((it, i) => (
        <li
          key={i}
          className="flex gap-3 rounded-xl border border-sana-line bg-white p-3"
        >
          <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sana-primary-50 font-mono text-[11px] text-sana-primary">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="font-medium text-sana-primary">{it.t}</p>
            {it.d && (
              <p className="mt-0.5 text-sm leading-relaxed text-sana-muted">
                {it.d}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function LegalCallout({
  tone = "info",
  children,
}: {
  tone?: "info" | "warning";
  children: React.ReactNode;
}) {
  return (
    <aside
      className={cn(
        "rounded-2xl border p-4 text-sm leading-relaxed",
        tone === "info" &&
          "border-sana-accent/30 bg-sana-accent-50 text-sana-primary",
        tone === "warning" &&
          "border-amber-300 bg-amber-50 text-amber-900",
      )}
    >
      {children}
    </aside>
  );
}