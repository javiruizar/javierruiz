"use client";

import { useActionState, useEffect } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { sendContact } from "@/actions/contact";
import { initialContactState, type ContactField } from "@/lib/contact";
import { services } from "@/content/site";
import { trackEvent } from "@/lib/analytics";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initialContactState);

  // Conversión en GA4: evento recomendado "generate_lead" (márcalo como evento clave en GA).
  useEffect(() => {
    if (state.status !== "success") return;
    trackEvent("generate_lead", {
      form_id: "contacto",
      service: state.values?.service || "sin_especificar",
    });
  }, [state]);

  if (state.status === "success") {
    return (
      <div role="status" className="glass-card p-8 text-center flex flex-col items-center gap-4">
        <CheckCircle2 size={40} className="text-emerald-400" aria-hidden="true" />
        <p className="text-lg font-semibold">{state.message}</p>
        <p className="text-sm" style={{ color: "#a0a0be" }}>
          Suelo contestar en uno o dos días laborables.
        </p>
      </div>
    );
  }

  const values = state.values ?? {};
  const errorFor = (name: ContactField) => state.errors?.[name];
  const fieldProps = (name: ContactField) => ({
    id: `contact-${name}`,
    name,
    "aria-invalid": errorFor(name) ? true : undefined,
    "aria-describedby": errorFor(name) ? `contact-${name}-error` : undefined,
  });
  const errorText = (name: ContactField) =>
    errorFor(name) ? (
      <p id={`contact-${name}-error`} className="mt-1.5 text-xs text-red-400">
        {errorFor(name)}
      </p>
    ) : null;

  return (
    <form
      key={state.attempt ?? 0}
      action={formAction}
      noValidate
      className="glass-card p-6 md:p-8 grid gap-5 text-left"
      aria-describedby={state.status === "error" ? "contact-form-status" : undefined}
    >
      {/* Honeypot antispam: oculto para personas y lectores de pantalla */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="contact-company_website">No rellenar</label>
        <input id="contact-company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className="form-label">
            Nombre *
          </label>
          <input
            {...fieldProps("name")}
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            defaultValue={values.name}
            className="form-input"
          />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor="contact-email" className="form-label">
            Email *
          </label>
          <input
            {...fieldProps("email")}
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            defaultValue={values.email}
            className="form-input"
          />
          {errorText("email")}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-website" className="form-label">
            Tu web o ficha de Google <span style={{ color: "#8b8ba7" }}>(opcional)</span>
          </label>
          <input
            {...fieldProps("website")}
            type="text"
            maxLength={200}
            placeholder="www.tunegocio.es"
            defaultValue={values.website}
            className="form-input"
          />
          {errorText("website")}
        </div>
        <div>
          <label htmlFor="contact-service" className="form-label">
            ¿Qué necesitas?
          </label>
          <select {...fieldProps("service")} defaultValue={values.service ?? ""} className="form-input">
            <option value="">No lo tengo claro todavía</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="form-label">
          Mensaje *
        </label>
        <textarea
          {...fieldProps("message")}
          required
          rows={5}
          minLength={10}
          maxLength={5000}
          placeholder="Cuéntame a qué se dedica tu negocio y qué te gustaría conseguir."
          defaultValue={values.message}
          className="form-input resize-y"
        />
        {errorText("message")}
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm cursor-pointer" style={{ color: "#a0a0be" }}>
          <input
            {...fieldProps("privacy")}
            type="checkbox"
            required
            className="mt-1 h-4 w-4 shrink-0 accent-blue-500"
          />
          <span>
            He leído y acepto la{" "}
            <a href="/privacidad" target="_blank" className="underline underline-offset-2 text-blue-400 hover:text-blue-300">
              política de privacidad
            </a>
            . Usaré tus datos solo para responder a tu consulta.
          </span>
        </label>
        {errorText("privacy")}
      </div>

      {state.status === "error" && state.message && (
        <p id="contact-form-status" role="alert" className="text-sm text-red-400">
          {state.message}
        </p>
      )}

      <button type="submit" className="btn-primary justify-center w-full md:w-auto md:justify-self-start" disabled={pending}>
        {pending ? "Enviando…" : "Enviar mensaje"}
        <Send size={15} aria-hidden="true" />
      </button>
    </form>
  );
}
