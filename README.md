# javierruiz.org

Web profesional de Javier Ruiz Arroyo: desarrollo web, SEO y Google Business Profile en Pozoblanco (Córdoba).

**Stack:** Next.js 16 (App Router, Server Components y Server Actions) · React 19 · TypeScript · Tailwind CSS v4 · Resend · Google Analytics 4 (con consentimiento) · despliegue en Vercel.

## Desarrollo

```bash
npm install
cp .env.example .env.local   # rellenar las claves
npm run dev                  # http://localhost:3000
npm run lint && npm run build
```

## Estructura

| Ruta | Contenido |
|---|---|
| `src/content/site.ts` | **Todos los textos y datos** (servicios, FAQ, proceso, contacto, redes). Para cambiar contenido, edita este archivo. |
| `src/app/page.tsx` | Landing (Server Component). |
| `src/app/{aviso-legal,privacidad,cookies}` | Páginas legales. |
| `src/app/{sitemap,robots,manifest}.ts`, `opengraph-image.tsx`, `icon.svg`, `apple-icon.tsx` | SEO técnico e iconos generados. |
| `src/actions/contact.ts` | Server Action del formulario (validación, honeypot, límite de envíos y envío con Resend). |
| `src/components/` | Navbar, Footer, ContactForm, CookieConsent (+GA4), RevealObserver, JsonLd… |
| `public/images/javier-ruiz.jpeg` | Foto del apartado «Sobre mí» (cuadrada; ideal ≥ 448 px para pantallas retina). |

## Variables de entorno

Ver `.env.example`. Se configuran en Vercel en *Settings → Environment Variables*.

## Plan de trabajo

Ver [`PLAN.md`](PLAN.md).
