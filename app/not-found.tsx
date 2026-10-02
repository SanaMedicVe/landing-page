import Link from "next/link";
import { Footer } from "@/components/sections/footer";

export const metadata = {
  title: "Página no encontrada",
  description: "La página que buscas no existe o fue movida.",
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
};

export default function NotFound() {
  return (
    <>
      <main className="relative isolate flex min-h-[70vh] items-center bg-white px-5 py-24 sm:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-grid-faint opacity-50"
        />
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-sana-accent/30 bg-sana-accent-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-sana-accent-700">
            <span className="h-1.5 w-1.5 rounded-full bg-sana-accent" />
            404
          </span>
          <h1 className="mt-6 font-heading text-4xl font-semibold leading-tight text-sana-primary sm:text-5xl">
            Esta página <span className="text-gradient-sana">no existe.</span>
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-sana-muted sm:text-lg">
            Puede que el enlace haya cambiado o que la URL esté mal escrita.
            Vuelve al inicio para seguir explorando Sana.
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-full bg-sana-primary px-7 text-sm font-semibold text-white shadow-[0_8px_24px_-12px_rgba(0,63,110,0.55)] transition-colors hover:bg-sana-primary/90"
            >
              Ir al inicio
            </Link>
            <Link
              href="/#faq"
              className="inline-flex h-12 items-center justify-center rounded-full border border-sana-primary/15 bg-white px-7 text-sm font-semibold text-sana-primary transition-colors hover:border-sana-accent/40 hover:text-sana-accent-700"
            >
              Ver preguntas frecuentes
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
