import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { CookieSettingsButton } from "@/components/CookieConsent";
import { analyticsEnabled } from "@/lib/analytics";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Qué cookies utiliza javierruiz.org y cómo gestionarlas.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalPage title="Política de cookies" updated="13 de octubre de 2026">
      <h2>1. Qué son las cookies</h2>
      <p>
        Las cookies son pequeños archivos que un sitio web guarda en tu navegador para recordar información sobre tu
        visita.
      </p>

      {analyticsEnabled ? (
        <>
          <p>Esta web usa el mínimo imprescindible y solo instala cookies de analítica si las aceptas.</p>

          <h2>2. Cookies y almacenamiento que se utilizan</h2>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Titular</th>
                <th>Finalidad</th>
                <th>Duración</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>cookie-consent (almacenamiento local)</td>
                <td>Propia</td>
                <td>Recordar si has aceptado o rechazado las cookies de analítica</td>
                <td>Hasta que la borres</td>
                <td>Técnica (exenta de consentimiento)</td>
              </tr>
              <tr>
                <td>_ga</td>
                <td>Google (Google Analytics)</td>
                <td>Distinguir visitantes de forma seudónima</td>
                <td>2 años</td>
                <td>Analítica (requiere consentimiento)</td>
              </tr>
              <tr>
                <td>_ga_&lt;ID&gt;</td>
                <td>Google (Google Analytics)</td>
                <td>Mantener el estado de la sesión</td>
                <td>2 años</td>
                <td>Analítica (requiere consentimiento)</td>
              </tr>
            </tbody>
          </table>
          <p>No se utilizan cookies publicitarias ni de redes sociales.</p>

          <h2>3. Cómo cambiar tu elección</h2>
          <p>
            Puedes aceptar o retirar tu consentimiento en cualquier momento desde aquí:{" "}
            <CookieSettingsButton className="text-blue-400 underline underline-offset-2 cursor-pointer" />. Si lo
            retiras, se eliminan las cookies de Google Analytics.
          </p>
          <p>
            También puedes bloquear o eliminar las cookies desde la configuración de tu navegador (Chrome, Firefox,
            Safari, Edge…). Encontrarás las instrucciones en la sección de ayuda de cada uno.
          </p>

          <h2>4. Más información</h2>
          <p>
            Para saber cómo trata Google los datos de Analytics, consulta{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites?hl=es"
              target="_blank"
              rel="noopener noreferrer"
            >
              cómo utiliza Google la información de los sitios web
            </a>
            . El tratamiento de datos personales se detalla en la <a href="/privacidad">política de privacidad</a>.
          </p>
        </>
      ) : (
        <>
          <h2>2. Cookies que se utilizan</h2>
          <p>
            <strong>Esta web no utiliza cookies</strong> ni tecnologías similares de analítica, publicidad o redes
            sociales. Por eso no se muestra ningún aviso de consentimiento.
          </p>
          <p>
            Si en el futuro se incorporan cookies que requieran tu consentimiento, esta política se actualizará y se te
            pedirá permiso antes de instalarlas.
          </p>

          <h2>3. Más información</h2>
          <p>
            El tratamiento de datos personales se detalla en la <a href="/privacidad">política de privacidad</a>.
          </p>
        </>
      )}
    </LegalPage>
  );
}
