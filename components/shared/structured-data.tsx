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
