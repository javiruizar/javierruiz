/**
 * page.tsx — Landing de Javier Ruiz (javierruiz.org)
 *
 * Server Component: todo el contenido llega en el HTML. Solo la navbar, el
 * formulario, el banner de cookies y las animaciones de scroll son de cliente.
 * Textos y datos en src/content/site.ts.
 */

import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Code2,
  Globe,
  HelpCircle,
  ListChecks,
  Mail,
  MapPin,
  Search,
  Star,
  Database,
  BarChart3,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd, faqSchema } from "@/components/JsonLd";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { faqs, processSteps, services, site, type ServiceId } from "@/content/site";

const serviceVisuals: Record<ServiceId, { icon: React.ReactNode; background: string }> = {
  web: { icon: <Code2 size={26} />, background: "linear-gradient(135deg, #1d4ed8, #2563eb)" },
  seo: { icon: <Search size={26} />, background: "linear-gradient(135deg, #0e7490, #0891b2)" },
  "google-business": { icon: <MapPin size={26} />, background: "linear-gradient(135deg, #6d28d9, #7c3aed)" },
};

const googleStack = ["Google Search", "Google Maps", "Business Profile", "Search Console", "Analytics"];

function SectionHeader({
  tag,
  icon,
  id,
  title,
  highlight,
  intro,
}: {
  tag: string;
  icon: React.ReactNode;
  id: string;
  title: string;
  highlight: string;
  intro?: string;
}) {
  return (
    <div className="text-center mb-16 reveal">
      <div className="section-tag mx-auto mb-6">
        {icon}
        {tag}
      </div>
      <h2 id={id} className="text-4xl md:text-5xl font-bold tracking-tight mb-5" style={{ letterSpacing: "-0.03em" }}>
        {title}
        <br />
        <span className="gradient-text">{highlight}</span>
      </h2>
      {intro && (
        <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--color-muted)" }}>
          {intro}
        </p>
      )}
    </div>
  );
}

function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-6 pt-24 pb-20 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="mesh-bg" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <p className="section-tag mx-auto mb-8">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
          Pozoblanco · Los Pedroches · Toda España
        </p>

        {/* Sin animación de opacidad: es el elemento LCP */}
        <h1
          id="hero-heading"
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.08] mb-6"
          style={{ letterSpacing: "-0.03em" }}
        >
          Diseño web y SEO en Pozoblanco para que tu negocio{" "}
          <span className="gradient-text">aparezca en Google</span>
        </h1>

        <p
          className="text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto animate-fade-in-up delay-200"
          style={{ color: "var(--color-muted)" }}
        >
          Creo webs rápidas, posiciono tu negocio en el buscador y en Google Maps y gestiono tu ficha de
          Google Business. También me ocupo del dominio, el hosting y el mantenimiento:{" "}
          <strong className="text-blue-300 font-semibold">tú te centras en tu negocio</strong>.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
          <a href="#contacto" className="btn-primary text-base">
            Solicitar auditoría gratuita
            <ArrowRight size={16} aria-hidden="true" />
          </a>
          <a href="#servicios" className="btn-secondary text-base">
            Ver servicios
          </a>
        </div>

        <ul
          className="flex flex-wrap items-center justify-center gap-3 mt-12 animate-fade-in-up delay-500"
          aria-label="Especialista en el ecosistema de Google"
        >
          {googleStack.map((item) => (
            <li key={item} className="tech-tag">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-50 animate-float"
        aria-hidden="true"
      >
        <ChevronDown size={18} style={{ color: "var(--color-muted)" }} />
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="servicios" className="py-24 px-6" aria-labelledby="servicios-heading">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          tag="Servicios"
          icon={<Globe size={12} aria-hidden="true" />}
          id="servicios-heading"
          title="Todo lo que tu negocio necesita"
          highlight="para destacar en Google"
          intro="Desarrollo, posicionamiento y presencia local, con un único interlocutor que se encarga también de toda la parte técnica de tu web."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <article
              key={service.id}
              className="glass-card reveal p-8 flex flex-col gap-6"
              style={{ transitionDelay: `${i * 120}ms` }}
              aria-labelledby={`service-title-${service.id}`}
            >
              <div className="flex items-start justify-between">
                <div
                  className="icon-wrapper text-white"
                  style={{ background: serviceVisuals[service.id].background }}
                  aria-hidden="true"
                >
                  {serviceVisuals[service.id].icon}
                </div>
                <span className="tech-tag">{service.tag}</span>
              </div>

              <div>
                <h3 id={`service-title-${service.id}`} className="text-xl font-bold mb-3">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                  {service.description}
                </p>
              </div>

              <ul className="flex flex-col gap-3 mt-auto">
                {service.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-blue-400" aria-hidden="true" />
                    <span className="text-sm leading-relaxed" style={{ color: "#a0a0be" }}>
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p
          className="reveal mt-10 text-center text-sm max-w-3xl mx-auto leading-relaxed"
          style={{ color: "var(--color-muted)" }}
        >
          <strong className="text-white font-semibold">Especialista en el ecosistema de Google.</strong> Mi trabajo se
          centra en el buscador, Google Maps, Business Profile, Search Console y Analytics. No gestiono redes
          sociales: me dedico por completo al canal por el que la mayoría de clientes encuentran un negocio.
        </p>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section
      id="como-trabajo"
      className="py-24 px-6 relative"
      aria-labelledby="como-trabajo-heading"
      style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.05), transparent)" }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          tag="Cómo trabajo"
          icon={<ListChecks size={12} aria-hidden="true" />}
          id="como-trabajo-heading"
          title="Un proceso claro,"
          highlight="de principio a fin"
          intro="Sin tecnicismos ni sorpresas: sabes en cada momento qué se está haciendo y por qué."
        />

        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, i) => (
            <li
              key={step.title}
              className="glass-card reveal p-7 flex flex-col gap-4"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <span className="text-4xl font-bold gradient-text" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-bold">
                <span className="sr-only">Paso {i + 1}: </span>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function AboutSection() {
  const skills = [
    { icon: <Database size={16} />, label: "Ingeniería de datos" },
    { icon: <Code2 size={16} />, label: "Desarrollo web (Next.js / React)" },
    { icon: <Search size={16} />, label: "SEO técnico y local" },
    { icon: <MapPin size={16} />, label: "Google Business Profile" },
    { icon: <BarChart3 size={16} />, label: "Search Console y Analytics" },
  ];

  return (
    <section id="sobre-mi" className="py-24 px-6" aria-labelledby="sobre-mi-heading">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="reveal flex flex-col items-center md:items-start gap-8">
          <div className="avatar-ring">
            <Image
              src={site.photo}
              alt="Javier Ruiz Arroyo, desarrollador web y especialista SEO en Pozoblanco"
              width={224}
              height={224}
              sizes="224px"
              className="w-56 h-56 rounded-full object-cover"
            />
          </div>

          <ul className="flex flex-wrap gap-2 justify-center md:justify-start">
            {skills.map((skill) => (
              <li
                key={skill.label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: "rgba(59,130,246,0.08)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  color: "#93c5fd",
                }}
              >
                <span aria-hidden="true">{skill.icon}</span>
                {skill.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal" style={{ transitionDelay: "150ms" }}>
          <div className="section-tag mb-6">
            <Star size={12} aria-hidden="true" />
            Sobre mí
          </div>

          <h2 id="sobre-mi-heading" className="text-4xl font-bold tracking-tight mb-6" style={{ letterSpacing: "-0.03em" }}>
            Ingeniería al servicio de <span className="gradient-text">tu crecimiento</span>
          </h2>

          <div className="flex flex-col gap-5 text-base leading-relaxed" style={{ color: "#a0a0be" }}>
            <p>
              Soy <strong className="text-white">Javier Ruiz Arroyo</strong>, ingeniero de datos y desarrollador web
              en Pozoblanco (Córdoba). Ayudo a negocios y profesionales a conseguir clientes a través de Google: con
              una web rápida y bien construida, un buen posicionamiento en el buscador y una ficha de Google Business
              cuidada.
            </p>
            <p>
              Mi formación en datos marca la forma de trabajar: cada decisión se basa en métricas reales de Search
              Console y Analytics, no en intuiciones. Me centro exclusivamente en el{" "}
              <strong className="text-blue-300">ecosistema de Google</strong> y me encargo también de la parte
              técnica que suele dar dolores de cabeza: dominio, hosting, correo y mantenimiento.
            </p>
            <p>
              Si tienes un negocio en Pozoblanco o en Los Pedroches, podemos vernos en persona. Si estás en otro
              punto de España, trabajamos en remoto con la misma cercanía.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            <a href="#contacto" className="btn-primary">
              Hablemos de tu proyecto
              <ArrowRight size={15} aria-hidden="true" />
            </a>
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer me" className="btn-secondary">
              <LinkedinIcon size={15} />
              LinkedIn
            </a>
            <a href={site.social.github} target="_blank" rel="noopener noreferrer me" className="btn-secondary">
              <GithubIcon size={15} />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="py-24 px-6" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          tag="Preguntas frecuentes"
          icon={<HelpCircle size={12} aria-hidden="true" />}
          id="faq-heading"
          title="Resolvemos tus"
          highlight="dudas"
        />

        <div className="flex flex-col gap-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="faq-item glass-card reveal px-6 py-5">
              <summary className="flex items-center justify-between gap-4 font-semibold">
                <h3 className="text-base">{faq.question}</h3>
                <ChevronDown size={18} className="faq-chevron shrink-0 text-blue-400" aria-hidden="true" />
              </summary>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "#a0a0be" }}>
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section
      id="contacto"
      className="py-24 px-6 relative overflow-hidden border-t border-white/5"
      aria-labelledby="contacto-heading"
      style={{ background: "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(59,130,246,0.08), transparent)" }}
    >
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          tag="Contacto"
          icon={<Mail size={12} aria-hidden="true" />}
          id="contacto-heading"
          title="¿Hablamos de"
          highlight="tu negocio?"
          intro="Cuéntame qué haces y qué quieres conseguir. Te propongo una auditoría inicial gratuita de tu web y tu presencia en Google, sin compromiso."
        />

        <div className="reveal">
          <ContactForm />
        </div>

        <p className="reveal mt-8 text-center text-sm" style={{ color: "var(--color-muted)" }}>
          ¿Prefieres el email? Escríbeme a{" "}
          <a href={`mailto:${site.email}`} className="text-blue-400 font-medium underline underline-offset-4 hover:text-blue-300">
            {site.email}
          </a>
        </p>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main id="contenido">
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <AboutSection />
      <FaqSection />
      <ContactSection />
      <JsonLd data={faqSchema} />
    </main>
  );
}
