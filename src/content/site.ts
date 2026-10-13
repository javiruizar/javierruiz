/**
 * Contenido y datos del sitio en un único lugar.
 * Los componentes solo pintan; cualquier cambio de textos o datos se hace aquí.
 */

export const site = {
  url: "https://javierruiz.org",
  name: "Javier Ruiz",
  legalName: "Javier Ruiz Arroyo",
  // Rellenar al darse de alta en Hacienda (obligatorio en el aviso legal desde ese momento).
  nif: null as string | null,
  email: "javiruizar@gmail.com",
  jobTitle: "Ingeniero de datos y desarrollador web",
  photo: "/images/javier-ruiz.jpeg",
  location: {
    locality: "Pozoblanco",
    region: "Córdoba",
    postalCode: "14400",
    country: "ES",
    countryName: "España",
    // Coordenadas del centro de Pozoblanco (no es una dirección física).
    geo: { latitude: 38.3792, longitude: -4.8485 },
  },
  areaServed: ["Pozoblanco", "Valle de los Pedroches", "Provincia de Córdoba", "España"],
  title: "Diseño web, SEO y Google Business en Pozoblanco",
  description:
    "Desarrollo web, posicionamiento SEO y gestión de Google Business Profile en Pozoblanco (Córdoba). Webs rápidas, visibilidad en Google y Maps, y gestión de dominio y hosting. Auditoría gratuita.",
  social: {
    linkedin: "https://www.linkedin.com/in/javier-ruiz-arroyo/",
    github: "https://github.com/javiruizar",
  },
} as const;

export const navLinks = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/#como-trabajo", label: "Cómo trabajo" },
  { href: "/#sobre-mi", label: "Sobre mí" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contacto", label: "Contacto" },
] as const;

export type ServiceId = "web" | "seo" | "google-business";

export interface Service {
  id: ServiceId;
  title: string;
  tag: string;
  description: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: "web",
    title: "Desarrollo web y gestión integral",
    tag: "Llave en mano",
    description:
      "Webs a medida, rápidas y pensadas para convertir visitas en clientes. Además me encargo de todo lo técnico que hay alrededor: dominio, hosting, certificados, correo profesional y mantenimiento, para que tú no tengas que preocuparte de nada.",
    features: [
      "Webs a medida que se ven perfectas en el móvil",
      "Carga en menos de 2,5 segundos: nadie se va esperando",
      "Dominio, alojamiento y conexión segura (https)",
      "Correo profesional: tunombre@tunegocio.es",
      "Mantenimiento y copias de seguridad sin que te preocupes",
    ],
  },
  {
    id: "seo",
    title: "Posicionamiento SEO",
    tag: "Buscador + local",
    description:
      "Auditoría técnica y estrategia basada en datos para que tu negocio aparezca cuando tus clientes te buscan en Google, tanto en Pozoblanco y Los Pedroches como en el resto de España.",
    features: [
      "Revisión completa de por qué Google no te muestra",
      "Aparecer cuando buscan tu servicio en Pozoblanco y comarca",
      "Resultados destacados en Google (estrellas, horarios, preguntas frecuentes)",
      "Textos pensados para lo que de verdad buscan tus clientes",
      "Informes claros: visitas, llamadas y posiciones, sin tecnicismos",
    ],
  },
  {
    id: "google-business",
    title: "Google Business Profile",
    tag: "Google Maps",
    description:
      "Alta, verificación y optimización de tu ficha de Google para destacar en Google Maps y en las búsquedas locales, y convertir esas búsquedas en llamadas y visitas.",
    features: [
      "Alta, verificación y puesta a punto de tu ficha",
      "Más reseñas y respuestas profesionales a cada una",
      "Fotos, horarios, servicios y novedades siempre al día",
      "Tus datos iguales en web, Google y directorios: más confianza",
      "Comparativa con tu competencia en Google Maps",
    ],
  },
];

export const processSteps = [
  {
    title: "Auditoría gratuita",
    description:
      "Analizo tu web, tu ficha de Google y a tu competencia en el buscador. Te entrego un diagnóstico con las prioridades, sin compromiso.",
  },
  {
    title: "Propuesta clara",
    description:
      "Objetivos, alcance y plazos por escrito. Sabes desde el principio qué se va a hacer y qué resultados medir.",
  },
  {
    title: "Desarrollo y optimización",
    description:
      "Construyo, optimizo y configuro todo: web, dominio, hosting, Search Console, Analytics y ficha de Google Business.",
  },
  {
    title: "Lanzamiento y seguimiento",
    description:
      "Publicamos y mido la evolución con datos reales de Google para seguir mejorando mes a mes.",
  },
];

export const faqs = [
  {
    question: "¿Trabajas solo en Pozoblanco?",
    answer:
      "Mi base está en Pozoblanco (Córdoba). Atiendo en persona en el Valle de los Pedroches y la provincia de Córdoba, y trabajo en remoto con negocios de toda España.",
  },
  {
    question: "¿Gestionas redes sociales?",
    answer:
      "No. Me especializo en el ecosistema de Google: buscador, Google Maps, Business Profile, Search Console y Analytics. Prefiero dominar a fondo el canal por el que la mayoría de clientes encuentran un negocio.",
  },
  {
    question: "¿Te encargas del dominio, el hosting y el correo?",
    answer:
      "Sí. Puedo registrar o trasladar tu dominio, alojar la web, configurar el correo profesional y el certificado SSL, y ocuparme del mantenimiento y las copias de seguridad.",
  },
  {
    question: "¿Qué incluye la auditoría gratuita?",
    answer:
      "Una revisión de la velocidad, la versión móvil y la indexación de tu web, el estado de tu ficha de Google Business y una comparación con tus competidores en Google. Recibes un resumen con las mejoras prioritarias, sin compromiso.",
  },
  {
    question: "¿Cuánto tarda en notarse el SEO?",
    answer:
      "Depende de la competencia y del punto de partida. Las mejoras en Google Maps y búsquedas locales suelen notarse en semanas; el SEO orgánico competitivo, en un plazo de entre 3 y 6 meses.",
  },
  {
    question: "¿La web será de mi propiedad?",
    answer:
      "Sí. El dominio se registra a tu nombre y el código y los contenidos son tuyos. Si algún día quieres cambiar de proveedor, te lo entrego todo.",
  },
];
