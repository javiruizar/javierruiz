/**
 * Plantilla del email que recibe Javier con cada consulta del formulario.
 * Todo el contenido del usuario se escapa: nunca se interpreta como HTML.
 */

interface ContactEmailInput {
  name: string;
  email: string;
  website: string;
  message: string;
  serviceLabel: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Devuelve una URL https navegable a partir de lo que escribió el usuario, o null si no lo parece. */
function toSafeUrl(raw: string): string | null {
  if (!raw) return null;
  try {
    const url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    if (!["http:", "https:"].includes(url.protocol) || !url.hostname.includes(".")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function buildContactEmail(input: ContactEmailInput) {
  const sentAt = new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" });
  const websiteUrl = toSafeUrl(input.website);

  const subject = `Nueva consulta web: ${input.name} (${input.serviceLabel})`;

  const text = [
    `Nombre: ${input.name}`,
    `Email: ${input.email}`,
    `Web: ${input.website || "—"}`,
    `Servicio: ${input.serviceLabel}`,
    "",
    input.message,
    "",
    `— Enviado desde el formulario de javierruiz.org el ${sentAt}`,
  ].join("\n");

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:6px 16px 6px 0;color:#6b7280;font-size:14px;white-space:nowrap;vertical-align:top">${label}</td>
      <td style="padding:6px 0;color:#111827;font-size:14px">${value}</td>
    </tr>`;

  const html = `<!doctype html>
<html lang="es">
<body style="margin:0;padding:24px;background:#f3f4f6;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden">
    <tr>
      <td style="background:#2563eb;padding:20px 24px;color:#ffffff">
        <div style="font-size:12px;letter-spacing:1px;text-transform:uppercase;opacity:.85">Nueva consulta · javierruiz.org</div>
        <div style="font-size:20px;font-weight:700;margin-top:4px">${escapeHtml(input.name)}</div>
      </td>
    </tr>
    <tr>
      <td style="padding:24px">
        <table role="presentation" cellpadding="0" cellspacing="0">
          ${row("Email", `<a href="mailto:${escapeHtml(input.email)}" style="color:#2563eb">${escapeHtml(input.email)}</a>`)}
          ${row(
            "Web",
            websiteUrl
              ? `<a href="${escapeHtml(websiteUrl)}" style="color:#2563eb">${escapeHtml(input.website)}</a>`
              : escapeHtml(input.website || "—")
          )}
          ${row("Servicio", `<strong>${escapeHtml(input.serviceLabel)}</strong>`)}
        </table>
        <div style="margin-top:20px;padding:16px;background:#f9fafb;border-left:4px solid #2563eb;border-radius:4px;color:#111827;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(input.message)}</div>
        <div style="margin-top:24px">
          <a href="mailto:${escapeHtml(input.email)}?subject=${encodeURIComponent("Re: tu consulta en javierruiz.org")}" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:10px 20px;border-radius:999px">Responder a ${escapeHtml(input.name)}</a>
          ${
            websiteUrl
              ? `<a href="https://pagespeed.web.dev/analysis?url=${encodeURIComponent(websiteUrl)}" style="display:inline-block;margin-left:8px;color:#2563eb;font-size:14px;padding:10px 4px">Analizar su web en PageSpeed →</a>`
              : ""
          }
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 24px;border-top:1px solid #e5e7eb;color:#9ca3af;font-size:12px">Enviado desde el formulario de javierruiz.org el ${escapeHtml(sentAt)}</td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}
