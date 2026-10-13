import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { navLinks, site } from "@/content/site";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { CookieSettingsButton } from "@/components/CookieConsent";
import { analyticsEnabled } from "@/lib/analytics";

const legalLinks = [
  { href: "/aviso-legal", label: "Aviso legal" },
  { href: "/privacidad", label: "Privacidad" },
  { href: "/cookies", label: "Cookies" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3 text-sm" style={{ color: "var(--color-subtle)" }}>
        <div className="flex flex-col gap-3">
          <Link href="/" className="flex items-center gap-2 text-white font-semibold">
            <span
              className="w-7 h-7 rounded-md flex items-center justify-center text-white font-bold text-xs"
              style={{ background: "linear-gradient(135deg, #2563eb, #0891b2)" }}
              aria-hidden="true"
            >
              JR
            </span>
            Javier Ruiz
          </Link>
          <p>Desarrollo web, SEO y Google Business Profile.</p>
          <p className="flex items-center gap-2">
            <MapPin size={14} aria-hidden="true" />
            {site.location.locality} ({site.location.region}) · Toda España en remoto
          </p>
          <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail size={14} aria-hidden="true" />
            {site.email}
          </a>
        </div>

        <nav aria-label="Secciones">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <a
              href={site.social.linkedin}
              className="social-link"
              target="_blank"
              rel="noopener noreferrer me"
              aria-label="LinkedIn de Javier Ruiz"
            >
              <LinkedinIcon />
            </a>
            <a
              href={site.social.github}
              className="social-link"
              target="_blank"
              rel="noopener noreferrer me"
              aria-label="GitHub de Javier Ruiz"
            >
              <GithubIcon />
            </a>
          </div>
          <nav aria-label="Información legal">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              {analyticsEnabled && (
                <li>
                  <CookieSettingsButton className="hover:text-white transition-colors cursor-pointer" />
                </li>
              )}
            </ul>
          </nav>
          <p className="text-xs">
            © {new Date().getFullYear()} {site.legalName}
          </p>
        </div>
      </div>
    </footer>
  );
}
