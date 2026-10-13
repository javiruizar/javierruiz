/** Plantilla común de las páginas legales. */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main id="contenido" className="px-6 pt-32 pb-24">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ letterSpacing: "-0.03em" }}>
          {title}
        </h1>
        <p className="text-sm mb-10" style={{ color: "var(--color-subtle)" }}>
          Última actualización: {updated}
        </p>
        <div className="legal-content">{children}</div>
      </article>
    </main>
  );
}
