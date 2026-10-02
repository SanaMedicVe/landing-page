"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Sana] Unhandled error:", error);
  }, [error]);

  return (
    <main className="relative isolate flex min-h-[70vh] items-center bg-white px-5 py-24 sm:py-32">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-rose-700">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          Error 500
        </span>
        <h1 className="mt-6 font-heading text-4xl font-semibold leading-tight text-sana-primary sm:text-5xl">
          Algo no salió{" "}
          <span className="text-gradient-sana">como esperábamos.</span>
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-sana-muted sm:text-lg">
          Registramos el incidente. Mientras tanto, puedes volver a intentarlo o
          regresar al inicio.
        </p>
        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-12 items-center justify-center rounded-full bg-sana-primary px-7 text-sm font-semibold text-white shadow-[0_8px_24px_-12px_rgba(0,63,110,0.55)] transition-colors hover:bg-sana-primary/90"
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full border border-sana-primary/15 bg-white px-7 text-sm font-semibold text-sana-primary transition-colors hover:border-sana-accent/40 hover:text-sana-accent-700"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
