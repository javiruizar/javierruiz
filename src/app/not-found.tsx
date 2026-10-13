import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main id="contenido" className="min-h-[80svh] flex flex-col items-center justify-center text-center px-6 pt-24">
      <p className="text-7xl font-bold gradient-text mb-6">404</p>
      <h1 className="text-3xl font-bold mb-4">Esta página no existe</h1>
      <p className="mb-8 max-w-md" style={{ color: "var(--color-muted)" }}>
        Puede que el enlace esté roto o que la página se haya movido.
      </p>
      <Link href="/" className="btn-primary">
        Volver al inicio
        <ArrowRight size={15} aria-hidden="true" />
      </Link>
    </main>
  );
}
