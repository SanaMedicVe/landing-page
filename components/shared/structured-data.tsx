import * as React from "react";

type JsonLdProps = {
  /**
   * Schema(s) a inyectar. Acepta uno o varios objetos JSON-LD.
   * Se serializa con JSON.stringify para evitar inyecciones.
   */
  schema: object | object[];
  /**
   * ID único del <script> para evitar duplicados si se monta varias veces.
   */
  id?: string;
};

/**
 * Inyecta JSON-LD en el DOM. Se usa para Schema.org (Organization,
 * FAQPage, etc.) en Client Components, donde no podemos usar el
 * `next/script` server-side.
 *
 * El JSON se escapa con JSON.stringify y se monta con
 * dangerouslySetInnerHTML: no es input de usuario, lo generamos
 * nosotros, así que es seguro.
 */
export function StructuredData({ schema, id }: JsonLdProps) {
  const payload = Array.isArray(schema) ? schema : [schema];
  return (
    <>
      {payload.map((s, i) => (
        <script
          key={`${id ?? "ld"}-${i}`}
          id={`${id ?? "ld"}-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}
