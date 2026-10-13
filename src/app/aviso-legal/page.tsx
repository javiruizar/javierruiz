import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Aviso legal e información del titular de javierruiz.org.",
  alternates: { canonical: "/aviso-legal" },
};

export default function AvisoLegalPage() {
  return (
    <LegalPage title="Aviso legal" updated="13 de octubre de 2026">
      <h2>1. Datos identificativos del titular</h2>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la
        Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del titular de este sitio web:
      </p>
      <ul>
        <li>
          <strong>Titular:</strong> {site.legalName}
        </li>
        {site.nif && (
          <li>
            <strong>NIF:</strong> {site.nif}
          </li>
        )}
        <li>
          <strong>Localidad:</strong> {site.location.locality} ({site.location.region}), {site.location.countryName}
        </li>
        <li>
          <strong>Email de contacto:</strong> <a href={`mailto:${site.email}`}>{site.email}</a>
        </li>
        <li>
          <strong>Sitio web:</strong> {site.url.replace("https://", "")}
        </li>
      </ul>

      <h2>2. Objeto</h2>
      <p>
        Este sitio web tiene carácter informativo y sirve para dar a conocer los servicios profesionales de desarrollo
        web, posicionamiento en buscadores (SEO) y gestión de Google Business Profile de su titular, así como para
        facilitar el contacto con las personas interesadas.
      </p>

      <h2>3. Condiciones de uso</h2>
      <p>
        El acceso a este sitio web es gratuito y atribuye la condición de usuario, que acepta este aviso legal. El
        usuario se compromete a hacer un uso adecuado de los contenidos y a no emplearlos para actividades ilícitas o
        contrarias a la buena fe, ni para dañar los sistemas del titular o de terceros.
      </p>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>
        Los textos, diseños, imágenes, logotipos y código fuente de este sitio web son titularidad de {site.legalName} o
        se usan con autorización de sus titulares. Queda prohibida su reproducción, distribución o transformación sin
        autorización expresa, salvo para uso personal y privado. Las marcas de terceros mencionadas (como Google,
        Google Maps o Google Business Profile) pertenecen a sus respectivos titulares y se citan solo con fines
        descriptivos.
      </p>

      <h2>5. Responsabilidad</h2>
      <p>
        El titular procura que la información publicada sea correcta y esté actualizada, pero no garantiza la ausencia
        de errores ni la disponibilidad ininterrumpida del sitio. Tampoco se responsabiliza del contenido de los sitios
        web de terceros enlazados desde esta página.
      </p>

      <h2>6. Protección de datos y cookies</h2>
      <p>
        El tratamiento de datos personales se rige por la <a href="/privacidad">política de privacidad</a> y el uso de
        cookies por la <a href="/cookies">política de cookies</a>.
      </p>

      <h2>7. Legislación aplicable</h2>
      <p>
        Este aviso legal se rige por la legislación española. Para cualquier controversia, las partes se someten a los
        juzgados y tribunales que correspondan conforme a la normativa vigente; cuando el usuario tenga la condición de
        consumidor, serán competentes los de su domicilio.
      </p>
    </LegalPage>
  );
}
