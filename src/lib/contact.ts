export type ContactField =
  | "name"
  | "email"
  | "phone"
  | "contact_method"
  | "website"
  | "service"
  | "message"
  | "privacy";

/** Vías por las que el cliente puede pedir que se le conteste. */
export const contactMethods = [
  { id: "email", label: "Email", inSentence: "por email" },
  { id: "phone", label: "Teléfono", inSentence: "por teléfono" },
  { id: "whatsapp", label: "WhatsApp", inSentence: "por WhatsApp" },
] as const;

export type ContactMethod = (typeof contactMethods)[number]["id"];

export function isContactMethod(value: string): value is ContactMethod {
  return contactMethods.some((m) => m.id === value);
}

export function contactMethodLabel(method: ContactMethod) {
  return contactMethods.find((m) => m.id === method)!.label;
}

/** El teléfono solo es obligatorio si se elige como vía de contacto. */
export function needsPhone(method: ContactMethod) {
  return method === "phone" || method === "whatsapp";
}

export interface ContactState {
  status: "idle" | "success" | "error";
  attempt?: number;
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
  /** Valores enviados, para repoblar el formulario tras un error. */
  values?: Partial<Record<Exclude<ContactField, "privacy">, string>>;
}

export const initialContactState: ContactState = { status: "idle" };
