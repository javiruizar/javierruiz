# Puesta en producción — javierruiz.org

Pasos en orden. Marca cada casilla al terminarla. Si algo no cuadra, para y avísame.

## 1. Resend (envío del formulario)
- [x] En *Domains*, `javierruiz.org` aparece como **Verified** (los registros MX/TXT de `send` y el DKIM en Cloudflare, con la nube **gris** = "DNS only").
- [ ] Registro DMARC en Cloudflare: tipo `TXT`, nombre `_dmarc`, valor `v=DMARC1; p=none;`
- [x] Región: **Irlanda (`eu-west-1`)**; ya reflejada en la política de privacidad.
- [ ] Confirmar que llegó a Gmail el correo de prueba "Nueva consulta web: Prueba de Claude (Posicionamiento SEO)" (revisa también Spam) y que "Responder" apunta al remitente del formulario.

## 2. Google Analytics 4
- [ ] analytics.google.com → *Administrar → Crear cuenta* "Javier Ruiz" → *Propiedad* "javierruiz.org" (España, EUR).
- [ ] *Flujos de datos → Web* → `https://javierruiz.org` → copia el **ID de medición** `G-…`.
- [ ] En *Medición mejorada* (dentro del flujo) puedes dejar todo activado.
- [ ] Ponlo en `.env.local` como `NEXT_PUBLIC_GA_ID=G-…` (y en Vercel, paso 4). No hay que tocar código.
- [ ] Tras el primer envío real del formulario (puede tardar hasta 24 h en aparecer): *Administrar → Eventos* → marca **`generate_lead`** como **evento clave** (conversión). Opcional: también `contact_email_click`.
- [ ] *Administrar → Configuración de datos → Retención*: **14 meses** (es lo que dice la política de privacidad).

## 3. GitHub
- [ ] Haz tu primer commit y súbelo a un repositorio (puede ser privado).
- [ ] Comprueba antes del `git add` que **`.env.local` no aparece** en `git status` (está ignorado; `.env.example` sí debe aparecer y sin claves reales).

## 4. Vercel
- [ ] Quita `javierruiz.org` (y `www`) del proyecto Planeta Viaje: *Project → Settings → Domains → Remove*.
- [ ] *Add New → Project* → importa el repositorio. Framework: Next.js (se detecta solo). No cambies los comandos.
- [ ] *Settings → Environment Variables* (entorno **Production** y **Preview**):

  | Variable | Valor |
  |---|---|
  | `RESEND_API_KEY` | tu clave `re_…` |
  | `CONTACT_TO_EMAIL` | `javiruizar@gmail.com` |
  | `CONTACT_FROM_EMAIL` | `Web javierruiz.org <noreply@javierruiz.org>` |
  | `NEXT_PUBLIC_GA_ID` | `G-…` |

  > Si cambias una variable `NEXT_PUBLIC_…` hay que **volver a desplegar** (se incrusta al compilar).
- [ ] *Settings → Domains*: añade `javierruiz.org` y `www.javierruiz.org`, y marca `www` como **redirección 308 a `javierruiz.org`**.
- [ ] En Cloudflare, los registros que Vercel indique (`A` para la raíz, `CNAME` para `www`) con la nube **gris** (DNS only). Con la nube naranja Vercel no puede emitir el certificado.
- [ ] Cloudflare → *SSL/TLS*: modo **Full (strict)**.

## 5. Comprobaciones tras publicar (las hago contigo)
- [ ] `https://javierruiz.org` carga la web nueva; `http://` y `www` redirigen a `https://javierruiz.org`.
- [ ] Formulario: un envío real llega a Gmail.
- [ ] Cookies: el banner aparece en una ventana de incógnito; con "Rechazar" no se carga GA; con "Aceptar", GA → *Informes → Tiempo real* muestra la visita.
- [ ] `https://javierruiz.org/robots.txt` y `/sitemap.xml` responden.
- [ ] [Prueba de resultados enriquecidos](https://search.google.com/test/rich-results) sin errores.
- [ ] [PageSpeed Insights](https://pagespeed.web.dev/) en móvil ≥ 90 (en local: 96–97 / 100 / 100 / 100).
- [ ] Vista previa al compartir el enlace por WhatsApp/LinkedIn (imagen y título).

## 6. Google Search Console
- [ ] search.google.com/search-console → *Añadir propiedad* → tipo **Dominio** → `javierruiz.org`.
- [ ] Copia el registro `TXT` en Cloudflare y verifica.
- [ ] *Sitemaps* → envía `sitemap.xml`.
- [ ] *Inspección de URLs* → `https://javierruiz.org/` → **Solicitar indexación**.
- [ ] Opcional: vincula Search Console con GA4 (*GA → Administrar → Vinculaciones de Search Console*).
