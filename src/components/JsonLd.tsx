import { faqs, services, site } from "@/content/site";

/** Inserta un bloque JSON-LD escapando "<" para evitar inyección de HTML. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const personId = `${site.url}/#person`;
const businessId = `${site.url}/#business`;

/** Entidades globales del sitio: web, persona y negocio de servicios profesionales. */
export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: "es-ES",
      publisher: { "@id": personId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: site.legalName,
      alternateName: site.name,
      jobTitle: site.jobTitle,
      url: site.url,
      image: `${site.url}${site.photo}`,
      email: `mailto:${site.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.location.locality,
        addressRegion: site.location.region,
        addressCountry: site.location.country,
      },
      knowsAbout: ["Desarrollo web", "SEO", "SEO local", "Google Business Profile", "Ingeniería de datos", "Next.js"],
      sameAs: [site.social.linkedin, site.social.github],
    },
    {
      "@type": "ProfessionalService",
      "@id": businessId,
      name: `${site.name} — Desarrollo web y SEO`,
      description: site.description,
      url: site.url,
      image: `${site.url}/opengraph-image`,
      email: site.email,
      founder: { "@id": personId },
      // Negocio de zona de servicio: localidad sin dirección postal pública.
      address: {
        "@type": "PostalAddress",
        addressLocality: site.location.locality,
        addressRegion: site.location.region,
        postalCode: site.location.postalCode,
        addressCountry: site.location.country,
      },
      geo: { "@type": "GeoCoordinates", ...site.location.geo },
      areaServed: site.areaServed.map((name) =>
        name === "España" ? { "@type": "Country", name } : { "@type": "AdministrativeArea", name }
      ),
      knowsLanguage: "es",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.description },
        })),
      },
      sameAs: [site.social.linkedin],
    },
  ],
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};
