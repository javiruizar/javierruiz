export type ContactField = "name" | "email" | "website" | "service" | "message" | "privacy";

export interface ContactState {
  status: "idle" | "success" | "error";
  attempt?: number;
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
  /** Valores enviados, para repoblar el formulario tras un error. */
  values?: Partial<Record<Exclude<ContactField, "privacy">, string>>;
}

export const initialContactState: ContactState = { status: "idle" };
