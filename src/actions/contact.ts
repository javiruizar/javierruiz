"use server";

import { headers } from "next/headers";
import { services } from "@/content/site";
import type { ContactField, ContactState } from "@/lib/contact";
import { buildContactEmail } from "@/lib/contact-email";

/**
 * Server Action del formulario de contacto. Envía el mensaje con la API REST de Resend.
 *
 * Variables de entorno (ver .env.example):
 *   RESEND_API_KEY      clave de la API de Resend
 *   CONTACT_TO_EMAIL    buzón que recibe los mensajes
 *   CONTACT_FROM_EMAIL  remitente verificado en Resend (p. ej. "Web javierruiz.org <noreply@javierruiz.org>")
 */

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
// Límite por IP en memoria: en serverless es por instancia, suficiente contra abusos básicos.
const submissions = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (submissions.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    submissions.set(ip, recent);
    return true;
  }
  recent.push(now);
  submissions.set(ip, recent);
  return false;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function field(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function sendContact(prev: ContactState, formData: FormData): Promise<ContactState> {
  const result = await handleContact(formData);
  // `attempt` cambia en cada envío: el formulario lo usa como key para repoblar los campos.
  return { ...result, attempt: (prev.attempt ?? 0) + 1 };
}

async function handleContact(formData: FormData): Promise<ContactState> {
  // Honeypot: los humanos no ven este campo; si viene relleno, se finge éxito.
  if (field(formData, "company_website")) {
    return { status: "success", message: "¡Gracias! Te responderé lo antes posible." };
  }

  const values = {
    // Campos de una línea: sin saltos de línea (el nombre acaba en el asunto del email).
    name: field(formData, "name").replace(/\s+/g, " "),
    email: field(formData, "email").replace(/\s+/g, ""),
    website: field(formData, "website").replace(/\s+/g, ""),
    service: field(formData, "service"),
    message: field(formData, "message"),
  };

  const errors: Partial<Record<ContactField, string>> = {};
  if (values.name.length < 2 || values.name.length > 100) errors.name = "Indica tu nombre.";
  if (!EMAIL_RE.test(values.email) || values.email.length > 200) errors.email = "Introduce un email válido.";
  if (values.website.length > 200) errors.website = "La dirección es demasiado larga.";
  if (values.message.length < 10) errors.message = "Cuéntame un poco más (mínimo 10 caracteres).";
  if (values.message.length > 5000) errors.message = "El mensaje es demasiado largo (máximo 5000 caracteres).";
  if (formData.get("privacy") !== "on") errors.privacy = "Debes aceptar la política de privacidad.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Revisa los campos marcados.", errors, values };
  }

  const headerList = await headers();
  const ip = headerList.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (isRateLimited(ip)) {
    return {
      status: "error",
      message: "Has enviado varios mensajes seguidos. Inténtalo de nuevo en unos minutos.",
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error("[contacto] Faltan variables de entorno RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL");
    return {
      status: "error",
      message: "El formulario no está disponible ahora mismo. Escríbeme directamente por email.",
      values,
    };
  }

  const serviceLabel = services.find((s) => s.id === values.service)?.title ?? "Sin especificar";
  const { subject, text, html } = buildContactEmail({
    name: values.name,
    email: values.email,
    website: values.website,
    message: values.message,
    serviceLabel,
  });

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject,
        text,
        html,
      }),
    });
    if (!res.ok) {
      console.error("[contacto] Resend respondió", res.status, await res.text());
      throw new Error(`Resend ${res.status}`);
    }
  } catch (error) {
    console.error("[contacto] Error al enviar", error);
    return {
      status: "error",
      message: "No se ha podido enviar el mensaje. Inténtalo de nuevo o escríbeme por email.",
      values,
    };
  }

  return {
    status: "success",
    message: "¡Gracias! He recibido tu mensaje y te responderé lo antes posible.",
    values: { service: values.service },
  };
}
