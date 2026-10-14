/**
 * Plantillas de los emails del formulario:
 *  - buildContactEmail: la consulta que recibe Javier.
 *  - buildConfirmationEmail: el acuse de recibo que recibe el cliente.
 * Todo el contenido del usuario se escapa: nunca se interpreta como HTML.
 */

import { site } from "@/content/site";
import { contactMethodLabel, contactMethods, type ContactMethod } from "@/lib/contact";

export interface ContactEmailInput {
  name: string;
  email: string;
  phone: string;
  contactMethod: ContactMethod;
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

/**
 * Teléfono en formato internacional solo con dígitos (sin "+"), para enlaces tel: y wa.me.
 * Un número de 9 cifras sin prefijo se considera español.
 */
function toInternationalDigits(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (raw.trim().startsWith("+")) return digits;
  if (digits.startsWith("00")) return digits.slice(2);
  if (digits.length === 9) return `34${digits}`;
  return digits;
}

const sentence = (method: ContactMethod) => contactMethods.find((m) => m.id === method)!.inSentence;

/** "por WhatsApp al +34 600 000 000" / "por email a cliente@ejemplo.com" */
function contactPhrase(input: ContactEmailInput) {
  const target = input.contactMethod === "email" ? input.email : input.phone;
  return `${sentence(input.contactMethod)} ${input.contactMethod === "email" ? "a" : "al"} ${target}`;
}

function formatSentAt() {
  return new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" });
}

const row = (label: string, value: string) => `
    <tr>
      <td style="padding:6px 16px 6px 0;color:#6b7280;font-size:14px;white-space:nowrap;vertical-align:top">${label}</td>
      <td style="padding:6px 0;color:#111827;font-size:14px">${value}</td>
    </tr>`;

const button = (href: string, label: string, primary = true) =>
  `<a href="${escapeHtml(href)}" style="display:inline-block;margin:0 8px 8px 0;${
    primary ? "background:#2563eb;color:#ffffff" : "background:#eff6ff;color:#1d4ed8"
  };text-decoration:none;font-weight:600;font-size:14px;padding:10px 20px;border-radius:999px">${label}</a>`;

const messageBox = (message: string) =>
  `<div style="margin-top:20px;padding:16px;background:#f9fafb;border-left:4px solid #2563eb;border-radius:4px;color:#111827;font-size:15px;line-height:1.6;white-space:pre-wrap">${escapeHtml(message)}</div>`;

function layout({ kicker, title, body, footer }: { kicker: string; title: string; body: string; footer: string }) {
  return `<!doctype html>
<html lang="es">
<body style="margin:0;padding:24px;background:#f3f4f6;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden">
    <tr>
      <td style="background:#2563eb;padding:20px 24px;color:#ffffff">
        <div style="font-size:12px;letter-spacing:1px;text-transform:uppercase;opacity:.85">${kicker}</div>
        <div style="font-size:20px;font-weight:700;margin-top:4px">${title}</div>
      </td>
    </tr>
    <tr>
      <td style="padding:24px">${body}
      </td>
    </tr>
    <tr>
      <td style="padding:16px 24px;border-top:1px solid #e5e7eb;color:#9ca3af;font-size:12px;line-height:1.5">${footer}</td>
    </tr>
  </table>
</body>
</html>`;
}

/** Email interno: la consulta tal como llega a Javier. */
export function buildContactEmail(input: ContactEmailInput) {
  const sentAt = formatSentAt();
  const websiteUrl = toSafeUrl(input.website);
  const phoneDigits = input.phone ? toInternationalDigits(input.phone) : "";
  const method = contactMethodLabel(input.contactMethod);

  const subject = `Nueva consulta web: ${input.name} (${input.serviceLabel}) · Contactar por ${method}`;

  const text = [
    `Nombre: ${input.name}`,
    `Email: ${input.email}`,
    `Teléfono: ${input.phone || "—"}`,
    `Quiere que le contactes: ${contactPhrase(input)}`,
    `Web: ${input.website || "—"}`,
    `Servicio: ${input.serviceLabel}`,
    "",
    input.message,
    "",
    `— Enviado desde el formulario de javierruiz.org el ${sentAt}`,
  ].join("\n");

  // El botón principal es el de la vía que ha elegido el cliente.
  const actions = {
    email: button(
      `mailto:${input.email}?subject=${encodeURIComponent("Re: tu consulta en javierruiz.org")}`,
      `Responder por email`,
      input.contactMethod === "email"
    ),
    phone: phoneDigits ? button(`tel:+${phoneDigits}`, "Llamar", input.contactMethod === "phone") : "",
    whatsapp: phoneDigits
      ? button(`https://wa.me/${phoneDigits}`, "Escribir por WhatsApp", input.contactMethod === "whatsapp")
      : "",
  };
  const orderedActions = [
    actions[input.contactMethod],
    ...Object.entries(actions)
      .filter(([id]) => id !== input.contactMethod)
      .map(([, html]) => html),
  ].join("");

  const html = layout({
    kicker: "Nueva consulta · javierruiz.org",
    title: escapeHtml(input.name),
    body: `
        <div style="margin-bottom:16px;padding:12px 16px;background:#eff6ff;border-radius:8px;color:#1e3a8a;font-size:14px">
          Quiere que le contactes <strong>${escapeHtml(contactPhrase(input))}</strong>
        </div>
        <table role="presentation" cellpadding="0" cellspacing="0">
          ${row("Email", `<a href="mailto:${escapeHtml(input.email)}" style="color:#2563eb">${escapeHtml(input.email)}</a>`)}
          ${row(
            "Teléfono",
            phoneDigits
              ? `<a href="tel:+${phoneDigits}" style="color:#2563eb">${escapeHtml(input.phone)}</a>`
              : "—"
          )}
          ${row(
            "Web",
            websiteUrl
              ? `<a href="${escapeHtml(websiteUrl)}" style="color:#2563eb">${escapeHtml(input.website)}</a>`
              : escapeHtml(input.website || "—")
          )}
          ${row("Servicio", `<strong>${escapeHtml(input.serviceLabel)}</strong>`)}
        </table>
        ${messageBox(input.message)}
        <div style="margin-top:24px">
          ${orderedActions}
          ${
            websiteUrl
              ? `<a href="https://pagespeed.web.dev/analysis?url=${encodeURIComponent(websiteUrl)}" style="display:inline-block;color:#2563eb;font-size:14px;padding:10px 4px">Analizar su web en PageSpeed →</a>`
              : ""
          }
        </div>`,
    footer: `Enviado desde el formulario de javierruiz.org el ${escapeHtml(sentAt)}. El cliente ha recibido un email de confirmación.`,
  });

  return { subject, text, html };
}

/** Acuse de recibo para el cliente, con el resumen de su consulta y la vía por la que se le contactará. */
export function buildConfirmationEmail(input: ContactEmailInput) {
  const firstName = input.name.split(" ")[0];
  const method = contactMethodLabel(input.contactMethod);
  const phrase = contactPhrase(input);

  const subject = `Consulta recibida · ${site.name}`;

  const text = [
    `Hola, ${firstName}:`,
    "",
    "Gracias por escribirme. He recibido tu consulta y la revisaré personalmente.",
    `Me pondré en contacto contigo ${phrase} lo antes posible, normalmente en uno o dos días laborables.`,
    "",
    "Resumen de tu consulta",
    `Servicio: ${input.serviceLabel}`,
    `Web: ${input.website || "—"}`,
    `Teléfono: ${input.phone || "—"}`,
    `Vía de contacto preferida: ${method}`,
    "",
    input.message,
    "",
    "¿Quieres añadir información adicional? Responde directamente a este email (botón «Responder») en lugar de escribir un correo nuevo: así tu mensaje quedará unido a tu consulta.",
    "",
    `Un saludo,`,
    `${site.name}`,
    `${site.jobTitle} · ${site.location.locality} (${site.location.region})`,
    site.url,
    "",
    "Recibes este correo porque se ha enviado el formulario de contacto de javierruiz.org con esta dirección. Si no has sido tú, puedes ignorarlo.",
  ].join("\n");

  const html = layout({
    kicker: site.name,
    title: "Tu consulta ha llegado correctamente",
    body: `
        <p style="margin:0 0 12px;color:#111827;font-size:15px;line-height:1.6">Hola, ${escapeHtml(firstName)}:</p>
        <p style="margin:0 0 12px;color:#111827;font-size:15px;line-height:1.6">
          Gracias por escribirme. He recibido tu consulta y la revisaré personalmente.
        </p>
        <div style="margin:16px 0;padding:12px 16px;background:#eff6ff;border-radius:8px;color:#1e3a8a;font-size:15px;line-height:1.6">
          Me pondré en contacto contigo <strong>${escapeHtml(phrase)}</strong> lo antes posible, normalmente en uno o dos días laborables.
        </div>
        <div style="margin-top:24px;font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#6b7280">Resumen de tu consulta</div>
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:8px">
          ${row("Servicio", `<strong>${escapeHtml(input.serviceLabel)}</strong>`)}
          ${row("Web", escapeHtml(input.website || "—"))}
          ${row("Teléfono", escapeHtml(input.phone || "—"))}
          ${row("Contacto preferido", escapeHtml(method))}
        </table>
        ${messageBox(input.message)}
        <div style="margin-top:20px;padding:12px 16px;background:#fefce8;border:1px solid #fde68a;border-radius:8px;color:#713f12;font-size:14px;line-height:1.6">
          <strong>¿Quieres añadir información adicional?</strong> Responde directamente a este email (botón
          «Responder») en lugar de escribir un correo nuevo: así tu mensaje quedará unido a tu consulta.
        </div>
        <p style="margin:20px 0 0;color:#111827;font-size:15px;line-height:1.6">
          Un saludo,<br>
          <strong>${escapeHtml(site.name)}</strong><br>
          <span style="color:#6b7280;font-size:13px">${escapeHtml(site.jobTitle)} · ${escapeHtml(site.location.locality)} (${escapeHtml(site.location.region)})</span><br>
          <a href="${site.url}" style="color:#2563eb;font-size:13px">${site.url.replace(/^https?:\/\//, "")}</a>
        </p>`,
    footer:
      "Recibes este correo porque se ha enviado el formulario de contacto de javierruiz.org con esta dirección. Si no has sido tú, puedes ignorarlo.",
  });

  return { subject, text, html };
}
