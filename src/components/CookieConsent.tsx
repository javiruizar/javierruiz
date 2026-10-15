"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Script from "next/script";
import { GA_ID } from "@/lib/analytics";

/**
 * Banner de cookies + carga condicional de Google Analytics 4.
 *
 * - Sin NEXT_PUBLIC_GA_ID no se usan cookies: no hay banner ni botón de configuración.
 * - GA no se carga en absoluto hasta que el usuario acepta (RGPD / LSSI art. 22.2).
 * - "Rechazar" tiene el mismo peso visual que "Aceptar" (criterio de la AEPD).
 * - La decisión se guarda en localStorage y puede cambiarse desde el pie de página
 *   (botón "Configurar cookies"), que dispara el evento OPEN_EVENT.
 */

const STORAGE_KEY = "cookie-consent";
const CHANGE_EVENT = "cookie-consent-change";
export const OPEN_EVENT = "cookie-consent-open";

type Consent = "granted" | "denied" | null;

function readConsent(): Consent {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

/** Borra las cookies de Google Analytics (_ga, _ga_XXXX) en el dominio actual y el raíz. */
function deleteAnalyticsCookies() {
  const host = window.location.hostname;
  const domains = ["", host, `.${host.replace(/^www\./, "")}`];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (!name.startsWith("_ga")) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

export function CookieConsent() {
  // "ssr" mientras no hay acceso a localStorage: evita parpadeos y desajustes de hidratación.
  const consent = useSyncExternalStore<Consent | "ssr">(subscribe, readConsent, () => "ssr");
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const open = () => setSettingsOpen(true);
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  const decide = (value: Exclude<Consent, null>) => {
    const previous = readConsent();
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Sin almacenamiento (modo privado estricto): la decisión vale solo para esta visita.
    }
    setSettingsOpen(false);
    window.dispatchEvent(new Event(CHANGE_EVENT));
    if (value === "denied" && previous === "granted") {
      // gtag ya está cargado: se borran sus cookies y se recarga para descargarlo.
      deleteAnalyticsCookies();
      window.location.reload();
    }
  };

  const showBanner = Boolean(GA_ID) && consent !== "ssr" && (consent === null || settingsOpen);

  return (
    <>
      {GA_ID && consent === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  analytics_storage: 'granted',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}

      {showBanner && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-desc"
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[60] glass-card p-6 shadow-2xl"
          style={{ background: "rgba(13, 13, 20, 0.97)" }}
        >
          <h2 id="cookie-title" className="text-base font-semibold mb-2">
            Cookies
          </h2>
          <p id="cookie-desc" className="text-sm leading-relaxed mb-5" style={{ color: "#a0a0be" }}>
            Usamos cookies de Google Analytics solo si las aceptas, para saber cuántas personas visitan la
            web y mejorarla. No hay cookies publicitarias.{" "}
            <a href="/cookies" className="underline underline-offset-2 text-blue-400 hover:text-blue-300">
              Más información sobre cookies
            </a>
            .
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              className="btn-secondary flex-1 justify-center py-2.5 px-4 text-sm"
              onClick={() => decide("denied")}
            >
              Rechazar
            </button>
            <button
              type="button"
              className="btn-primary flex-1 justify-center py-2.5 px-4 text-sm"
              onClick={() => decide("granted")}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/** Botón para reabrir el banner y cambiar la decisión. */
export function CookieSettingsButton({ className }: { className?: string }) {
  if (!GA_ID) return null;
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
    >
      Configurar cookies
    </button>
  );
}
