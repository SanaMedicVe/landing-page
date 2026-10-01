import type { Metadata } from "next";
import {
  LegalShell,
  LegalSection,
  LegalList,
  LegalCallout,
} from "@/components/sections/legal-shell";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description:
    "Cómo Sana trata los datos personales de pacientes y profesionales: qué recopilamos, para qué los usamos y cómo ejercer tus derechos.",
};

const IDENTIDAD = [
  {
    t: "Sana (la plataforma)",
    d: "App móvil y panel clínico web que conectan pacientes con doctores verificados.",
  },
  {
    t: "Responsable del tratamiento",
    d: "La sociedad operadora de Sana, identificada al pie de este documento.",
  },
  {
    t: "Contacto del equipo de privacidad",
    d: "privacidad@sana.lat · responde en horario laboral (GMT-5).",
  },
];

const DATOS_RECOLECTADOS = [
  {
    t: "Datos de cuenta",
    d: "Nombre, correo, teléfono, país e idioma. Para pacientes, opcionalmente documento de identidad.",
  },
  {
    t: "Datos clínicos que tú decides subir",
    d: "Historial, recetas, resultados de laboratorio, notas y archivos que compartes desde la app.",
  },
  {
    t: "Datos de uso de la app",
    d: "Pantallas visitadas, acciones realizadas y errores. Nos ayudan a mejorar el producto.",
  },
  {
    t: "Datos del dispositivo",
    d: "Modelo, sistema operativo y versión de la app, necesarios para soporte y compatibilidad.",
  },
];

const USOS = [
  {
    t: "Conectarte con tu doctor",
    d: "Mostrar tu perfil al profesional que tú elijas y permitir la videoconsulta.",
  },
  {
    t: "Cuidar tu historial",
    d: "Guardar de forma segura tus documentos clínicos y mostrarlos cuando tú lo autorices.",
  },
  {
    t: "Mejorar Sana",
    d: "Analizar patrones de uso agregados y anónimos para tomar decisiones de producto.",
  },
  {
    t: "Cumplir obligaciones legales",
    d: "Conservar registros mínimos que la ley aplicable nos pueda requerir.",
  },
];

const DERECHOS = [
  { t: "Acceder", d: "Saber qué datos tenemos sobre ti." },
  { t: "Rectificar", d: "Corregir información incorrecta o desactualizada." },
  {
    t: "Eliminar",
    d: "Solicitar la supresión de tu cuenta y datos asociados.",
  },
  {
    t: "Oponerte",
    d: "Negarte a tratamientos específicos, como mensajes de marketing.",
  },
  { t: "Portabilidad", d: "Recibir una copia legible de tu información." },
  {
    t: "Revocar consentimiento",
    d: "Retirar permisos que nos hayas otorgado, sin efecto retroactivo.",
  },
];

export default function AvisoDePrivacidadPage() {
  return (
    <LegalShell
      eyebrow="Legal"
      title="Aviso de privacidad"
      description="Explicamos, en lenguaje claro, qué datos personales trata Sana, con qué finalidad y cómo puedes ejercer tus derechos. Este documento es un primer borrador sujeto a revisión por el equipo Legal antes de su publicación definitiva."
      crumbs={[
        { label: "Inicio", href: "/" },
        { label: "Aviso de privacidad" },
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

      <LegalSection title="1. ¿Quién es Sana?" id="identidad">
        <p>
          Sana es una plataforma que conecta pacientes con doctores verificados
          a través de una app móvil (iOS y Android) y un panel clínico web. La
          entidad responsable del tratamiento de tus datos personales es la
          sociedad operadora de Sana, identificada al pie de este documento.
        </p>
        <LegalList items={IDENTIDAD} />
      </LegalSection>

      <LegalSection title="2. ¿Qué datos personales tratamos?" id="datos">
        <p>
          Tratamos únicamente los datos necesarios para prestarte el servicio y
          cumplir nuestras obligaciones. No vendemos datos personales a
          terceros.
        </p>
        <LegalList items={DATOS_RECOLECTADOS} />
        <p>
          Los datos clínicos sensibles (historial, diagnósticos, recetas) sólo
          se almacenan si tú decides proporcionarlos y se tratan con medidas
          reforzadas descritas en la{" "}
          <a href="/datos-de-salud">Política de datos de salud</a>.
        </p>
      </LegalSection>

      <LegalSection title="3. ¿Para qué usamos tus datos?" id="finalidad">
        <LegalList items={USOS} />
      </LegalSection>

      <LegalSection
        title="4. ¿Con quién compartimos tus datos?"
        id="compartimos"
      >
        <p>
          Sana comparte información personal únicamente con los profesionales de
          la salud que tú elijas dentro de la plataforma, y con proveedores
          tecnológicos necesarios para operar el servicio (por ejemplo,
          alojamiento en la nube o envío de notificaciones). Estos proveedores
          actúan como encargados de tratamiento bajo contrato.
        </p>
        <p>
          No vendemos, alquilamos ni comercializamos datos personales. Si en el
          futuro un tercero desea adquirirlos, te lo informaremos y
          solicitaremos tu consentimiento de forma previa y explícita.
        </p>
      </LegalSection>

      <LegalSection title="5. Tus derechos" id="derechos">
        <p>
          Puedes ejercer en cualquier momento los derechos reconocidos por la
          legislación aplicable:
        </p>
        <LegalList items={DERECHOS} />
        <p>
          Para ejercer cualquiera de estos derechos, escríbenos a{" "}
          <a href="mailto:privacidad@sana.lat">privacidad@sana.lat</a>.
          Responderemos en un plazo razonable tras verificar tu identidad.
        </p>
      </LegalSection>

      <LegalSection title="6. Conservación de los datos" id="conservacion">
        <p>
          Conservamos tus datos personales mientras tu cuenta esté activa y
          durante el plazo necesario para cumplir obligaciones legales o
          resolver disputas. Cuando un dato deja de ser necesario, lo eliminamos
          o anonimizamos de forma segura.
        </p>
      </LegalSection>

      <LegalSection title="7. Seguridad de la información" id="seguridad">
        <p>
          Aplicamos medidas técnicas y organizativas razonables para proteger
          tus datos: cifrado en tránsito y en reposo, control de acceso por
          roles, registro de auditoría y revisión periódica de proveedores.
          Ningún sistema es 100 % seguro; si ocurre un incidente que afecte tus
          datos, te lo notificaremos conforme a la ley aplicable.
        </p>
      </LegalSection>

      <LegalSection title="8. Cookies y tecnologías similares" id="cookies">
        <p>
          Sana utiliza cookies y almacenamiento local para recordar tus
          preferencias (por ejemplo, el cierre del banner de cookies y tu sesión
          iniciada). No utilizamos cookies publicitarias de terceros. Puedes
          gestionar tu preferencia desde el banner de cookies que aparece al
          visitar la landing.
        </p>
      </LegalSection>

      <LegalSection title="9. Cambios a este aviso" id="cambios">
        <p>
          Si modificamos este aviso de privacidad, publicaremos la versión
          actualizada en esta misma página con la fecha de «última
          actualización» al inicio del documento. Para cambios materiales, te
          avisaremos dentro de la app antes de que entren en vigor.
        </p>
      </LegalSection>

      <LegalCallout tone="info">
        Este documento es un{" "}
        <strong>borrador pendiente de validación Legal</strong>. La fecha de
        «última actualización» refleja ese estado y se reemplazará por una fecha
        concreta cuando el equipo Legal apruebe la versión definitiva.
      </LegalCallout>
    </LegalShell>
  );
}
