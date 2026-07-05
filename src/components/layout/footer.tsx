import Link from "next/link";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Objav Vietnam",
    links: [
      { label: "Destinácie", href: "/destinacie" },
      { label: "Interaktívna mapa", href: "/mapa" },
      { label: "Udalosti a festivaly", href: "/udalosti" },
      { label: "Itineráre", href: "/itinerare" },
    ],
  },
  {
    title: "Praktické info",
    links: [
      { label: "Víza a vstup", href: "/prakticke-info/viza" },
      { label: "SIM a internet", href: "/prakticke-info/sim-esim-internet" },
      { label: "Mena a ceny", href: "/prakticke-info/mena-a-ceny" },
      { label: "Bezpečnosť a scamy", href: "/prakticke-info/bezpecnost-a-scamy" },
      { label: "Zdravie a očkovanie", href: "/prakticke-info/zdravie-a-ockovanie" },
      { label: "Doprava", href: "/prakticke-info/doprava" },
    ],
  },
  {
    title: "Plánovanie",
    links: [
      { label: "AI plánovač itinerára", href: "/planovac" },
      { label: "Gastronómia", href: "/gastro" },
      { label: "Digitálni nomádi", href: "/nomadi" },
      { label: "Nástroje", href: "/nastroje" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-sand-gray text-foreground">
      <div className="mx-auto max-w-[1200px] px-4 py-16 md:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-xl font-medium">
              vietnam<span className="text-lacquer">.sk</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Sprievodca Vietnamom pre slovenských a českých cestovateľov.
              Konkrétne rady, reálne ceny, žiadne marketingové superlatívy.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                {col.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-foreground/80 underline-offset-4 transition-colors duration-150 hover:text-jade hover:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-border pt-8 text-[13px] text-muted-foreground md:flex-row">
          <p className="data-num">© {new Date().getFullYear()} vietnam.sk</p>
          <p>Fotografie: Adobe Stock (licencované)</p>
        </div>
      </div>
    </footer>
  );
}
