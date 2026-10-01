import type { Metadata } from "next";
import {
  LegalShell,
  LegalSection,
  LegalList,
  LegalCallout,
} from "@/components/sections/legal-shell";

export const metadata: Metadata = {
  title: "Política de datos de salud",
  description:
    "Cómo Sana trata la información clínica sensible: cifrado, control de acceso, retención y derechos del paciente.",
};

const PRINCIPIOS = [
  {
    t: "Tú decides qué se sube",
    d: "Ningún dato clínico se comparte sin tu acción explícita dentro de la app.",
  },
  {
    t: "Tú decides quién lo ve",
    d: "Solo los profesionales que tú elijas acceden a tu información clínica.",
  },
  {
    t: "Se almacena cifrado",
    d: "La información sensible se cifra en tránsito y en reposo con estándares vigentes.",
  },
  {
    t: "No se vende",
    d: "Sana no vende ni comercializa datos clínicos. Nunca.",
  },
  {
    t: "No se usa para entrenar modelos sin tu permiso",
    d: "Cualquier uso de datos clínicos con fines de investigación o mejora de modelos requiere consentimiento explícito y revocable.",
  },
];

const QUE_PROTEGEMOS = [
  { t: "Historial clínico" },
  { t: "Diagnósticos y notas de consulta" },
  { t: "Recetas y órdenes médicas" },
  { t: "Resultados de laboratorio e imágenes" },
  { t: "Antecedentes y alergias" },
  { t: "Registros de videoconsulta y mensajes clínicos" },
];

const CONTROLES = [
  {
    t: "Control de acceso por rol",
    d: "Cada usuario accede únicamente a los datos necesarios para su función.",
  },
  {
    t: "Registro de auditoría",
    d: "Queda constancia de quién accedió a qué dato y cuándo.",
  },
  {
    t: "Sesiones y tokens",
    d: "Las sesiones caducan y los tokens se revocan ante cambios de contraseña o dispositivos.",
  },
  {
    t: "Aislamiento por profesional",
    d: "Un profesional solo ve los historiales de pacientes con los que tiene relación clínica activa.",
  },
];

const RETENCION = [
  {
    t: "Cuenta activa",
    d: "Mientras tu cuenta esté activa, conservamos los datos necesarios para prestarte el servicio.",
  },
  {
    t: "Cuenta cerrada",
    d: "Tras cerrar tu cuenta, conservamos los datos clínicos durante el plazo que exija la ley aplicable y luego los eliminamos de forma segura.",
  },
  {
    t: "Copias de seguridad",
    d: "Se purgan según los ciclos técnicos establecidos; ningún dato sensible se conserva más allá del periodo definido.",
  },
];

export default function DatosDeSaludPage() {
  return (
    <LegalShell
      eyebrow="Legal"
      title="Política de datos de salud"
      description="Cómo Sana trata la información clínica que tú decides compartir. Este documento es un primer borrador sujeto a revisión por el equipo Legal antes de su publicación definitiva."
      crumbs={[
        { label: "Inicio", href: "/" },
        { label: "Aviso de privacidad", href: "/aviso-de-privacidad" },
        { label: "Datos de salud" },
      ]}
      lastUpdated="Pendiente de validación Legal"
    >
      <LegalCallout tone="warning">
        <strong>Borrador — no publicado.</strong> El contenido de esta página es
        un placeholder factual. El equipo Legal debe revisar y aprobar el texto
        definitivo antes de marcar el ticket como cerrado. Sana no hace claims
        regulatorios específicos (HIPAA, ISO, GDPR) hasta que esa revisión
        ocurra.
      </LegalCallout>

      <LegalSection title="1. Nuestra postura" id="postura">
        <p>
          Los datos de salud son la categoría de información más sensible que
          tratamos. Por eso, además de lo descrito en el{" "}
          <a href="/aviso-de-privacidad">Aviso de privacidad</a>, aplicamos
          medidas reforzadas y principios específicos que detallamos aquí.
        </p>
      </LegalSection>

      <LegalSection title="2. Principios" id="principios">
        <LegalList items={PRINCIPIOS} />
      </LegalSection>

      <LegalSection
        title="3. ¿Qué información consideramos «de salud»?"
        id="alcance"
      >
        <p>
          Consideramos datos de salud toda aquella información que revela
          información sobre tu estado físico o mental, presente o futuro. Entre
          otros:
        </p>
        <LegalList items={QUE_PROTEGEMOS} />
      </LegalSection>

      <LegalSection title="4. Medidas técnicas y organizativas" id="medidas">
        <p>Aplicamos medidas reforzadas para esta categoría de datos:</p>
        <LegalList items={CONTROLES} />
      </LegalSection>

      <LegalSection title="5. Conservación y eliminación" id="retencion">
        <LegalList items={RETENCION} />
      </LegalSection>

      <LegalSection title="6. Compartir con profesionales" id="compartir">
        <p>
          Tu información clínica solo se muestra al profesional con quien tienes
          una relación clínica activa. Puedes revocar ese acceso en cualquier
          momento desde la configuración de la app, salvo que la ley aplicable
          exija conservarlo por un periodo mínimo.
        </p>
      </LegalSection>

      <LegalSection title="7. Emergencias" id="emergencias">
        <p>
          Sana no está diseñada como un sistema de atención de urgencias. En una
          emergencia médica, contacta directamente con los servicios de
          emergencia de tu país o acude al centro de salud más cercano.
        </p>
      </LegalSection>

      <LegalSection title="8. Tus derechos sobre datos de salud" id="derechos">
        <p>
          Adicionalmente a los derechos descritos en el{" "}
          <a href="/aviso-de-privacidad#derechos">Aviso de privacidad</a>,
          puedes solicitar el bloqueo temporal del acceso a tu información
          clínica, sin eliminar la cuenta, si necesitas un periodo de
          inactividad.
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
