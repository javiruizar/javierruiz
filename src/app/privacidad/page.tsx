import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/content/site";
import { analyticsEnabled } from "@/lib/analytics";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo se tratan los datos personales en javierruiz.org conforme al RGPD y la LOPDGDD.",
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <LegalPage title="Política de privacidad" updated="13 de octubre de 2026">
      <p>
        Esta política explica cómo se tratan los datos personales que facilitas a través de este sitio web, conforme al
        Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los
        derechos digitales (LOPDGDD).
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li>
          <strong>Responsable:</strong> {site.legalName}
        </li>
        {site.nif && (
          <li>
            <strong>NIF:</strong> {site.nif}
          </li>
        )}
        <li>
          <strong>Localidad:</strong> {site.location.locality} ({site.location.region})
        </li>
        <li>
          <strong>Email:</strong> <a href={`mailto:${site.email}`}>{site.email}</a>
        </li>
      </ul>

      <h2>2. Qué datos se tratan, para qué y con qué base legal</h2>
      <table>
        <thead>
          <tr>
            <th>Tratamiento</th>
            <th>Datos</th>
            <th>Finalidad</th>
            <th>Base legal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Formulario de contacto y email</td>
            <td>Nombre, email, web (opcional) y contenido del mensaje</td>
            <td>Responder a tu consulta y, si lo pides, preparar una auditoría o propuesta</td>
            <td>Consentimiento (art. 6.1.a RGPD) y medidas precontractuales a petición tuya (art. 6.1.b)</td>
          </tr>
          {analyticsEnabled && (
            <tr>
              <td>Analítica web</td>
              <td>Datos de navegación seudonimizados (páginas vistas, dispositivo, ubicación aproximada)</td>
              <td>Conocer el uso de la web y mejorarla</td>
              <td>Consentimiento mediante el banner de cookies (art. 6.1.a RGPD)</td>
            </tr>
          )}
        </tbody>
      </table>
      <p>
        No se toman decisiones automatizadas ni se elaboran perfiles, y los datos no se usan para enviar publicidad.
      </p>

      <h2>3. Plazo de conservación</h2>
      <p>
        Los mensajes de contacto se conservan mientras dure la conversación y, como máximo, un año después de la
        última comunicación, salvo que se inicie una relación profesional, en cuyo caso se conservarán durante los
        plazos legalmente exigidos.{analyticsEnabled && " Los datos de analítica se conservan 14 meses."}
      </p>

      <h2>4. Destinatarios y encargados del tratamiento</h2>
      <p>No se ceden datos a terceros salvo obligación legal. Para prestar el servicio se utilizan estos proveedores:</p>
      <ul>
        <li>
          <strong>Vercel Inc.</strong>: alojamiento de la web.
        </li>
        <li>
          <strong>Resend (Plus Five Five, Inc.)</strong>: envío de los mensajes del formulario, desde servidores
          ubicados en la Unión Europea (Irlanda).
        </li>
        <li>
          <strong>Google Ireland Ltd. / Google LLC</strong>:{" "}
          {analyticsEnabled ? "Google Analytics (solo con tu consentimiento) y correo electrónico." : "correo electrónico."}
        </li>
      </ul>
      <p>
        Algunos de estos proveedores pueden tratar datos en Estados Unidos. Estas transferencias se amparan en el Marco
        de Privacidad de Datos UE-EE. UU. o en las cláusulas contractuales tipo aprobadas por la Comisión Europea,
        según corresponda en cada caso.
      </p>

      <h2>5. Tus derechos</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y
        portabilidad, así como retirar tu consentimiento en cualquier momento, escribiendo a{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>. La retirada del consentimiento no afecta a la licitud del
        tratamiento previo.
      </p>
      <p>
        Si consideras que no se han atendido correctamente tus derechos, puedes presentar una reclamación ante la
        Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>).
      </p>

      <h2>6. Seguridad</h2>
      <p>
        Se aplican medidas técnicas y organizativas adecuadas para proteger tus datos, como el cifrado de las
        comunicaciones (HTTPS) y el acceso restringido a la información.
      </p>
    </LegalPage>
  );
}
