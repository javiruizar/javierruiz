"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { navLinks } from "@/content/site";

/** Barra de navegación fija con efecto blur y menú móvil */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || mobileOpen ? "nav-blur" : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16"
        aria-label="Navegación principal"
      >
        <Link href="/" className="flex items-center gap-2 group" aria-label="Javier Ruiz — Inicio">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #2563eb, #0891b2)" }}
            aria-hidden="true"
          >
            JR
          </span>
          <span className="font-semibold text-white text-sm tracking-tight group-hover:opacity-80 transition-opacity">
            Javier Ruiz
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="nav-link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/#contacto" className="hidden md:inline-flex btn-primary text-sm py-2.5 px-5">
          Auditoría gratuita
          <ArrowRight size={14} aria-hidden="true" />
        </Link>

        <button
          type="button"
          className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white transition-colors"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
          aria-controls="menu-movil"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen && (
        <div id="menu-movil" className="md:hidden border-t border-white/10">
          <ul className="px-6 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-2 text-gray-300 hover:text-white font-medium transition-colors"
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#contacto" className="btn-primary w-full justify-center mt-2" onClick={closeMenu}>
                Solicitar auditoría gratuita
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
