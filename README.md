# javierruiz.org

Web profesional de Javier Ruiz Arroyo: desarrollo web, SEO y Google Business Profile en Pozoblanco (Córdoba).

**Stack:** Next.js 16 (App Router, Server Components y Server Actions) · React 19 · TypeScript · Tailwind CSS v4 · Resend · Google Analytics 4 (con consentimiento) · despliegue en Vercel.

## Desarrollo

```bash
pnpm install
# crear .env.local con las variables de abajo
pnpm dev                     # http://localhost:3000
pnpm lint && pnpm build
```

Se usa **pnpm** (versión fijada en `package.json` → `packageManager`). La configuración de seguridad está en `pnpm-workspace.yaml`: no se instalan versiones con menos de 24 h de antigüedad y los scripts de instalación están bloqueados salvo aprobación expresa. No uses `npm install`: crearía un `package-lock.json` paralelo.

## Estructura

| Ruta | Contenido |
|---|---|
| `src/content/site.ts` | **Todos los textos y datos** (servicios, FAQ, proceso, contacto, redes). Para cambiar contenido, edita este archivo. |
| `src/app/page.tsx` | Landing (Server Component). |
| `src/app/{aviso-legal,privacidad,cookies}` | Páginas legales. |
| `src/app/{sitemap,robots,manifest}.ts`, `opengraph-image.tsx`, `icon.svg`, `apple-icon.tsx` | SEO técnico e iconos generados. |
| `src/actions/contact.ts` | Server Action del formulario (validación, honeypot, límite de envíos y envío con Resend: consulta a Javier + confirmación al cliente). Plantillas en `src/lib/contact-email.ts`. |
| `src/components/` | Navbar, Footer, ContactForm, CookieConsent (+GA4), RevealObserver, JsonLd… |
| `public/images/javier-ruiz.jpeg` | Foto del apartado «Sobre mí» (cuadrada; ideal ≥ 448 px para pantallas retina). |

## Variables de entorno

En local van en `.env.local` (ignorado por git, nunca se sube). En producción, en Vercel → *Settings → Environment Variables*.

| Variable | Para qué sirve |
|---|---|
| `RESEND_API_KEY` | Clave de la API de Resend (`re_…`) para enviar los emails del formulario. |
| `CONTACT_TO_EMAIL` | Buzón que recibe las consultas y las respuestas de los clientes (`javiruizar@gmail.com`). |
| `CONTACT_FROM_EMAIL` | Remitente de los emails: `"Web javierruiz.org <contacto@javierruiz.org>"`. |
| `NEXT_PUBLIC_GA_ID` | ID de medición de Google Analytics 4 (`G-…`). Si está vacío, no hay analítica ni banner de cookies. |

## Plan de trabajo

Ver [`PLAN.md`](PLAN.md).
