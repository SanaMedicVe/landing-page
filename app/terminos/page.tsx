import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalShell,
  LegalSection,
  LegalList,
  LegalCallout,
} from "@/components/sections/legal-shell";

export const metadata: Metadata = {
  title: "Términos de servicio",
  description:
    "Reglas de uso de Sana: lo que Sana te ofrece, lo que esperamos de ti, y qué ocurre si algo no funciona como debería.",
};

const COMPROMISOS_SANA = [
  {
    t: "Servicio disponible",
    d: "Haremos nuestro mejor esfuerzo por mantener Sana operativa y accesible.",
  },
  {
    t: "Información clara",
    d: "Te avisaremos dentro de la app sobre cambios importantes al servicio.",
  },
  {
    t: "Soporte humano",
    d: "Cuando algo no encaje, habrá alguien del equipo para ayudarte.",
  },
  {
    t: "Verificación de profesionales",
    d: "Comprobamos la cédula y especialidad antes de habilitar perfiles médicos.",
  },
];

const REGLAS_USO = [
  {
    t: "Datos verdaderos",
    d: "Tu perfil debe reflejar información real. La suplantación está prohibida.",
  },
  {
    t: "Uso personal",
    d: "Tu cuenta es personal e intransferible. No la compartas con terceros.",
  },
  {
    t: "Respeto",
    d: "Trata al equipo y a los profesionales con respeto. No se tolera lenguaje ofensivo ni acoso.",
  },
  {
    t: "No uso clínico indebido",
    d: "Sana es una herramienta de conexión y seguimiento. Las decisiones clínicas las toma un profesional acreditado.",
  },
  {
    t: "No ingeniería inversa",
    d: "No intentes descompilar, copiar o redistribuir la app o su código.",
  },
];

const LIMITACIONES = [
  {
    t: "Servicio sin garantía de disponibilidad ininterrumpida",
    d: "Sana puede presentar interrupciones por mantenimiento, fallos técnicos o causas externas.",
  },
  {
    t: "Sin consejo médico directo",
    d: "Sana no reemplaza la consulta médica presencial ni la relación con tu profesional de salud tratante.",
  },
  {
    t: "Sin responsabilidad por actos de terceros",
    d: "Sana no se hace responsable por las decisiones clínicas adoptadas por profesionales independientes en la plataforma.",
  },
];

export default function TerminosPage() {
  return (
    <LegalShell
      eyebrow="Legal"
      title="Términos de servicio"
      description="Las reglas que ordenan el uso de Sana, en lenguaje claro. Este documento es un primer borrador sujeto a revisión por el equipo Legal antes de su publicación definitiva."
      crumbs={[{ label: "Inicio", href: "/" }, { label: "Términos" }]}
      lastUpdated="Pendiente de validación Legal"
    >
      <LegalCallout tone="warning">
        <strong>Borrador — no publicado.</strong> El contenido de esta página es
        un placeholder factual. El equipo Legal debe revisar y aprobar el texto
        definitivo antes de marcar el ticket como cerrado.
      </LegalCallout>

      <LegalSection title="1. Aceptación de los términos" id="aceptacion">
        <p>
          Al crear una cuenta en Sana, aceptas estos términos y nuestro{" "}
          <a href="/aviso-de-privacidad">Aviso de privacidad</a>. Si no estás de
          acuerdo con alguno de ellos, por favor no uses el servicio.
        </p>
      </LegalSection>

      <LegalSection title="2. Qué ofrece Sana" id="servicio">
        <p>
          Sana es una plataforma que conecta pacientes con doctores verificados,
          ofrece herramientas de agenda, videoconsulta, seguimiento e historial
          clínico digital. Está pensada para Latinoamérica y disponible en iOS y
          Android.
        </p>
        <LegalList items={COMPROMISOS_SANA} />
      </LegalSection>

      <LegalSection title="3. Reglas de uso" id="reglas">
        <p>Para mantener Sana segura y útil para todos:</p>
        <LegalList items={REGLAS_USO} />
      </LegalSection>

      <LegalSection title="4. Cuentas y suspensión" id="cuentas">
        <p>
          Puedes cerrar tu cuenta en cualquier momento desde la configuración de
          la app. Sana puede suspender o terminar cuentas que incumplan estos
          términos, previa notificación cuando sea posible.
        </p>
      </LegalSection>

      <LegalSection title="5. Profesionales de la salud" id="profesionales">
        <p>
          Los profesionales que usan Sana son independientes. Sana verifica su
          cédula profesional y su especialidad antes de habilitar su perfil,
          pero no garantiza los resultados clínicos de sus actos. La
          verificación se describe en{" "}
          <Link href="/#doctor-verificado">Doctor Verificado</Link>.
        </p>
      </LegalSection>

      <LegalSection
        title="6. Limitaciones de responsabilidad"
        id="limitaciones"
      >
        <p>
          Dentro de los límites que permita la ley aplicable, Sana no será
          responsable por:
        </p>
        <LegalList items={LIMITACIONES} />
      </LegalSection>

      <LegalSection title="7. Propiedad intelectual" id="propiedad">
        <p>
          La marca, el código, los diseños y los textos de Sana son propiedad de
          la sociedad operadora y están protegidos por las leyes de propiedad
          intelectual aplicables. Se prohíbe su uso sin autorización previa y
          por escrito.
        </p>
      </LegalSection>

      <LegalSection title="8. Cambios a los términos" id="cambios">
        <p>
          Si modificamos estos términos, publicaremos la versión actualizada en
          esta misma página con la fecha de «última actualización» al inicio del
          documento. Para cambios materiales, te avisaremos dentro de la app
          antes de que entren en vigor.
        </p>
      </LegalSection>

      <LegalSection title="9. Ley aplicable y jurisdicción" id="jurisdiccion">
        <p>
          Estos términos se rigen por las leyes aplicables en el país de
          operación de la sociedad responsable de Sana. Cualquier controversia
          se resolverá en los tribunales competentes de esa jurisdicción, sin
          perjuicio de los derechos del usuario como consumidor.
        </p>
      </LegalSection>

      <LegalCallout tone="info">
        Este documento es un{" "}
        <strong>borrador pendiente de validación Legal</strong>. La fecha de
        «última actualización» se reemplazará por una fecha concreta cuando el
        equipo Legal apruebe la versión definitiva.
      </LegalCallout>
    </LegalShell>
  );
}
