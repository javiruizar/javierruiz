/** ID de Google Analytics 4. Sin él no se carga GA ni se muestra el banner de cookies. */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || undefined;
export const analyticsEnabled = Boolean(GA_ID);

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Envía un evento a GA4. No hace nada si GA no está cargado
 * (sin ID configurado o sin consentimiento del visitante).
 */
export function trackEvent(name: string, params: Record<string, string | number | undefined> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
