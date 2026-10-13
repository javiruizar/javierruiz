"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Activa las animaciones de aparición de todos los elementos `.reveal`.
 * Un único observer para toda la página permite que las secciones sigan siendo
 * Server Components; sin JS el CSS no oculta nada (ver globals.css).
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
