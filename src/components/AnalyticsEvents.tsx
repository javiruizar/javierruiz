"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Eventos de GA4 que no dependen de un componente concreto.
 * Un único listener delegado: los enlaces pueden seguir en Server Components.
 */
export function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href^='mailto:']");
      if (!link) return;
      trackEvent("contact_email_click", { link_location: link.closest("section, footer")?.id || "footer" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
