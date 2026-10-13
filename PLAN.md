# Plan de mejora y desarrollo — javierruiz.org

> Documento vivo. Fase 1 = dejar la web funcional, legal y productiva.
> Fase 2 = desarrollo final (crecimiento SEO y captación). Se marca cada punto al ejecutarlo.

Estado: **Fase 1 — lista para subir a GitHub y desplegar (§1.7 y DESPLIEGUE.md)** · Última revisión: 2026-10-13

---

## 0. Diagnóstico (auditoría del 13/10/2026)

### 🔴 Bloqueantes
| # | Problema | Evidencia |
|---|----------|-----------|
| B1 | **El proyecto no compila** | `npm run build` → `Module not found: Can't resolve 'lucide-react'`. Está en `package.json` pero no instalado. |
| B2 | **El dominio sirve otra web** | `https://javierruiz.org` devuelve hoy "Planeta Viaje – Tu Blog de Aventuras" (Vercel tras Cloudflare). `www.javierruiz.org` no resuelve. |
| B3 | **Contenido inventado** | Las estadísticas (+50 proyectos, 98/100, +340 %, 5★) y los 3 proyectos no están respaldados. Los subdominios `ecostore` / `rankpilot` / `localboost.javierruiz.org` **no existen** (DNS no resuelve): son enlaces rotos y un riesgo de publicidad engañosa. |
| B4 | **Incumplimiento legal (España)** | No hay aviso legal (LSSI-CE art. 10), ni política de privacidad (RGPD), ni política de cookies. Son obligatorios en una web profesional. |
| B5 | **Perfiles sociales sin verificar** | `github.com/javierruiz`, `linkedin.com/in/javierruiz` y `@javierruiz` existen, pero no consta que sean tuyos (el GitHub está vacío y sin nombre). |
| B6 | **Sin control de versiones** | La carpeta no es un repositorio git. |

### 🟠 SEO técnico
- Falta `metadataBase`, por lo que las URLs de Open Graph quedan relativas. Tampoco hay imagen OG ni de Twitter, y las previsualizaciones en redes y WhatsApp salen vacías.
- No hay `sitemap.xml`, `robots.txt`, `canonical`, `manifest` ni favicon propio (es el de Next).
- No hay datos estructurados JSON-LD (`ProfessionalService`/`LocalBusiness`, `Person`, `WebSite`, `Service`, `FAQPage`).
- Es una sola URL, así que solo puede posicionar una página. No hay páginas por servicio, por ciudad ni blog (se aborda en la Fase 2).
- El H1 ("Tu negocio merece una presencia digital…") no incluye palabras clave ni ubicación.
- `meta keywords` no aporta nada (Google la ignora).
- Hay textos desactualizados o incoherentes: el badge dice "Next.js 15" (el proyecto usa 16) y EcoStore dice "Next.js 14".
- Inter se carga con `@import` de Google Fonts en el CSS. Eso bloquea el renderizado, añade una petición a terceros y es problemático con el RGPD (sentencia LG München 2022). Debe pasar a `next/font` autoalojada.

### 🟠 Rendimiento / Core Web Vitals
- Toda la página es `"use client"`, así que se envía al navegador todo el JS de contenido estático. Lo interactivo se reduce a la navbar y las animaciones.
- El H1 y el hero empiezan en `opacity: 0` (animación), lo que retrasa el LCP.
- Las secciones se renderizan ocultas (`opacity-0`) hasta que el IntersectionObserver las activa. Sin JS, o si falla, la página aparece vacía.
- Hay animaciones infinitas costosas (degradado conic de 600 px con `blur(60px)` rotando, shimmer en todos los textos degradados, glow pulsante) y no se respeta `prefers-reduced-motion`.
- `avatar.png` es en realidad un JPEG de 1024×1024 y 584 KB con extensión incorrecta.

### 🟡 Accesibilidad / semántica
- El `<header>` y el `<footer>` están dentro de `<main>`, lo que rompe los landmarks. Además, el bloque de contacto es un `<footer>`.
- Hay un `role="navigation"` sobre un `<ul>` (incorrecto) y un `role="list"`/`listitem` forzado en enlaces.
- El texto del footer (`#555570` sobre `#050508`) tiene un contraste de ≈2,8:1 y no llega a WCAG AA (4,5:1).
- La cabecera fija tapa los títulos al navegar por anclas porque falta `scroll-margin-top`. El JS de scroll suave es redundante (ya hay `scroll-behavior: smooth`) e impide que la URL refleje la sección.
- El menú móvil no se cierra con Escape.
- Los iconos de marca de Lucide (`Github`, `Linkedin`, `Twitter`) están deprecados y se eliminarán. Twitter ahora es X.

### 🟡 Conversión / negocio local (Google Business)
- La única vía de contacto es `mailto:`. No hay formulario, teléfono, WhatsApp ni reserva de llamada.
- La CTA "Auditoría gratuita" no tiene un flujo propio (qué pides, qué entregas, en qué plazo).
- No hay prueba social real (reseñas de Google, testimonios, logos), ni proceso de trabajo, ni precios orientativos, ni FAQ.
- No hay NAP (nombre, dirección/zona, teléfono) ni zona de servicio. Para Google Business Profile la web debe tener un NAP coherente con la ficha.
- No hay analítica, seguimiento de conversiones ni verificación de Search Console.

### ⚪ Mantenimiento
- El README es el de serie de `create-next-app` y quedan SVG de plantilla en `public/` (`next.svg`, `vercel.svg`…).
- `page.tsx` es un monolito de 1000 líneas con los datos mezclados con la vista.
- `next.config.ts` no define cabeceras de seguridad, no hay página 404 propia ni `.env.example`.

---

## 1. Fase 1 — Plan de mejora (funcional y productiva)

### 1.1 Base técnica ✅
- [x] Dependencias instaladas; `lint`, `tsc` y `build` pasan sin errores (B1).
- [x] `git init` hecho, sin commits (los harás tú). `.gitignore` revisado (`.idea/`, `.env.example` incluido) (B6).
- [x] Refactor: datos en `src/content/site.ts` y componentes en `src/components/`. La página es Server Component; solo son cliente la navbar, el formulario, las cookies y el observer de animaciones.
- [x] Corregido un fallo de CSS: el CSS propio estaba fuera de `@layer` y anulaba las utilidades de Tailwind (paddings y márgenes).
- [x] Inter vía `next/font` (autoalojada).
- [x] `public/` limpio. Foto en `images/javier-ruiz.jpeg` (next/image lo sirve en AVIF/WebP). Favicon SVG e icono de Apple propios "JR".
- [x] Cabeceras de seguridad, redirección `www` → raíz, 404 propia y `.env.example`.

### 1.2 Contenido veraz ✅
- [x] Bloque de estadísticas eliminado (B3).
- [x] Portfolio sustituido por "Cómo trabajo"; sin enlaces rotos (B3).
- [x] Modo pre-lanzamiento: sin precios ni lenguaje de contratación.
- [x] Redes reales (LinkedIn y GitHub); Twitter eliminado (B5).
- [x] Textos reescritos: servicios con gestión integral (hosting, dominio, correo), foco en el ecosistema Google y no en redes sociales, y orientación a Pozoblanco más toda España.
- [x] **Foto real** en `public/images/javier-ruiz.jpeg` (337 px: correcta; con una de ≥ 448 px se verá más nítida en pantallas retina).

### 1.3 Legal ✅ (pendiente: NIF al darte de alta)
- [x] `/aviso-legal`, `/privacidad` y `/cookies`.
- [x] Banner de cookies propio (Aceptar/Rechazar con el mismo peso). GA solo se carga con consentimiento, la decisión se puede revocar desde el pie (y borra las cookies `_ga`).
- [x] Casilla de privacidad obligatoria en el formulario.
- [ ] Al darte de alta: rellenar `nif` en `src/content/site.ts` (aparece automáticamente en los textos legales) y revisar los textos con tu gestor.

### 1.4 Captación ✅ (pendiente: claves de Resend)
- [x] Formulario con Server Action: validación en servidor, honeypot, límite de 3 envíos cada 10 min por IP, campos conservados tras un error y funcionamiento sin JS. Probado en navegador.
- [x] Teléfono/WhatsApp: descartado por decisión tuya.
- [x] Secciones "Cómo trabajo" y FAQ.

### 1.5 SEO técnico on-page ✅
- [x] `metadataBase`, canonical por página, OG/Twitter con imagen generada 1200×630, `locale es_ES`.
- [x] `sitemap.xml`, `robots.txt`, `manifest.webmanifest`.
- [x] JSON-LD: `WebSite`, `Person` (con `sameAs`), `ProfessionalService` (Pozoblanco, `areaServed`, catálogo de servicios) y `FAQPage`.
- [x] Title y H1 con la keyword y la ubicación: "Diseño web y SEO en Pozoblanco…".

### 1.6 Rendimiento y accesibilidad ✅ (pendiente: medir Lighthouse en producción)
- [x] El H1 se pinta sin animación (LCP). El contenido nunca queda oculto sin JS (`@media (scripting: enabled)`).
- [x] Se respeta `prefers-reduced-motion`; eliminados el blur rotatorio, el shimmer infinito y la textura de ruido.
- [x] Landmarks correctos (`header`/`main`/`footer`), enlace "Saltar al contenido", contraste AA, `scroll-padding-top`, Escape en el menú móvil, foco visible.
- [x] Lighthouse en local (build de producción con GA activo): **móvil 96–97 / 100 / 100 / 100**, escritorio 100 / 100 / 100 / 100. Pendiente: confirmar con PageSpeed tras desplegar.
- [x] Quitada la animación infinita de `box-shadow` (repintado continuo); enlaces con texto descriptivo.

### 1.8 Analítica y email (preparado como si GA4 ya estuviera activo) ✅
- [x] Evento GA4 `generate_lead` al enviar el formulario (con el servicio elegido) y `contact_email_click` al pulsar un email.
- [x] Probado con un ID ficticio: sin consentimiento no se carga nada de Google ni hay cookies; al aceptar se carga GA y llegan los eventos.
- [x] Sin `NEXT_PUBLIC_GA_ID`, la web no usa cookies: no hay banner y los textos legales se adaptan solos.
- [x] Email de aviso en HTML (más versión de texto): datos del contacto, mensaje, botón "Responder" y enlace a PageSpeed de su web. Contenido escapado y sin saltos de línea en el asunto.
- [ ] Introducir el ID real de GA4 (lo haces tú: `.env.local` y Vercel).

### 1.9 Preparación para GitHub ✅
- [x] Resend verificado (región Irlanda, reflejada en la política de privacidad); remitente `noreply@javierruiz.org`; clave solo de envío en `.env.local` (ignorado por git).
- [x] Prueba de envío real realizada (pendiente de que confirmes que llegó a Gmail).
- [x] Next 16.3.4 → **16.4.0**: corrige una vulnerabilidad crítica en `next/og`. `npm audit` de producción: 0 vulnerabilidades (las restantes son de herramientas de desarrollo: ESLint).
- [x] Revisión de lo que entra en el commit: sin secretos; `.env.local`, `.next`, `node_modules` e `.idea` ignorados.

### 1.7 Puesta en producción — paso a paso en [`DESPLIEGUE.md`](DESPLIEGUE.md)
- [ ] **Vercel**: liberar `javierruiz.org` del proyecto Planeta Viaje, importar este repo (al subirlo a GitHub) y añadir los dominios `javierruiz.org` y `www.javierruiz.org` (redirección a la raíz).
- [ ] **Resend**: crear la cuenta, verificar el dominio `javierruiz.org` (registros DNS en Cloudflare) y crear la API key. Definir en Vercel `RESEND_API_KEY`, `CONTACT_TO_EMAIL` y `CONTACT_FROM_EMAIL`.
- [ ] **GA4**: crear la propiedad y el flujo web, y definir `NEXT_PUBLIC_GA_ID` en Vercel. Marcar como conversión el envío del formulario (se hará en la Fase 2 con un evento `generate_lead`). **Aplazado por decisión tuya**: sin ID, GA no se carga.
- [ ] **Search Console**: verificar el dominio (registro TXT en Cloudflare) y enviar `sitemap.xml`.
- [ ] **Google Business Profile**: se crea al darte de alta como autónomo (ver §3).

---

## 2. Fase 2 — Desarrollo final (borrador, se concretará al cerrar la Fase 1)
- Páginas propias por servicio (`/desarrollo-web`, `/seo`, `/google-business`) con contenido largo y FAQ específica.
- Landings locales por ciudad o zona de servicio (si aplica).
- Casos de estudio detallados (`/proyectos/[slug]`) con métricas reales.
- Blog/recursos (MDX) para captar long tail y enlazado interno.
- Lead magnet: auditoría SEO automática (formulario → informe PageSpeed/CrUX por email).
- Reseñas de Google integradas, precios/paquetes y reserva de llamada (Cal.com).
- Estrategia GBP: categorías, servicios, publicaciones, fotos, reseñas y citas locales (NAP en directorios).

---

## 3. Decisiones y datos pendientes

### Decididas (13/10/2026)
- **Dominio:** `javierruiz.org` pasa a ser esta web. Planeta Viaje ya está en otro dominio; liberarás `javierruiz.org` en Vercel.
- **Hosting:** Vercel.
- **Formulario:** Resend + Server Action (pendiente: cuenta y API key, y verificar el dominio en Resend).
- **Identidad:** marca personal "Javier Ruiz".
- **Datos:** Javier Ruiz Arroyo · javiruizar@gmail.com · Pozoblanco (Córdoba), con foco local y servicio en toda España · LinkedIn `javier-ruiz-arroyo`, GitHub `javiruizar`.
- **Contacto:** solo email y formulario (sin teléfono ni WhatsApp por ahora).
- **Servicios:** desarrollo web (incluida la gestión integral de hosting, dominios y correo), SEO y Google Business. Solo el ecosistema Google, sin redes sociales.
- **Git:** repositorio local; los commits y los push los haces tú.
- **Portfolio:** se oculta. La sección se sustituye por "Cómo trabajo" (proceso) hasta tener casos reales.
- **Estadísticas:** se elimina el bloque.
- **Analítica:** Google Analytics 4 con Consent Mode v2 y banner de cookies propio (rechazar con la misma facilidad que aceptar; GA no carga sin consentimiento).
- **Situación fiscal:** todavía sin actividad, sin alta como autónomo ni en Hacienda y sin ficha GBP.

### Marco legal de la fase pre-lanzamiento (orientativo, no es asesoramiento jurídico; confirmar con un gestor)
- **Una marca no anonimiza.** Si la web ofrece servicios, la LSSI-CE (art. 10) obliga a mostrar el nombre, el NIF y un contacto del titular en el aviso legal, aunque se use una marca. Además, el dominio y el WHOIS ya te identifican. Una marca es útil como imagen comercial, no para ocultar al titular.
- **Mientras no hay actividad económica**, la web puede funcionar como portfolio o marca personal: sin precios, sin "contrata" y sin cobrar nada. El RGPD sí aplica desde el primer formulario (tú eres el responsable del tratamiento), así que hace falta una política de privacidad con tu nombre y email.
- **Alta en Hacienda (modelo 036/037):** es gratuita y obligatoria antes de emitir la primera factura, sea cual sea el importe.
- **Alta en el RETA (Seguridad Social):** es lo que tiene coste. Desde 2023 existe una tarifa plana reducida el primer año (comprobar la cifra vigente) y cuotas por tramos de ingresos. La doctrina de "ingresos inferiores al SMI = sin alta" es discutida y la Seguridad Social no la acepta: no conviene basarse en ella.
- **Cooperativas de facturación:** desaconsejadas. La Inspección de Trabajo las ha sancionado y el riesgo recae también en el socio.
- **Google Business Profile:** exige un negocio real que atienda a clientes. Se crea al darse de alta, como empresa de zona de servicio y sin dirección pública.
- **Secuencia recomendada:** web en modo pre-lanzamiento → primer cliente confirmado → alta en Hacienda y RETA (antes de empezar el trabajo) → aviso legal completo con NIF → ficha GBP.
