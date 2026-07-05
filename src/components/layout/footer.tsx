import Link from "next/link";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Objav Vietnam",
    links: [
      { label: "Destinácie", href: "/destinacie" },
      { label: "Interaktívna mapa", href: "/mapa" },
      { label: "UNESCO pamiatky", href: "/destinacie?typ=UNESCO" },
      { label: "Pláže a ostrovy", href: "/destinacie?typ=pláž" },
      { label: "Národné parky", href: "/destinacie?typ=národný park" },
    ],
  },
  {
    title: "Plánovanie",
    links: [
      { label: "AI Plánovač", href: "/planovac" },
      { label: "Itineráre", href: "/itinerare" },
      { label: "Udalosti a festivaly", href: "/udalosti" },
      { label: "Počasie", href: "/prakticke-info" },
    ],
  },
  {
    title: "Praktické info",
    links: [
      { label: "Víza", href: "/prakticke-info" },
      { label: "SIM a eSIM", href: "/prakticke-info" },
      { label: "Mena a ceny", href: "/prakticke-info" },
      { label: "Bezpečnosť a scamy", href: "/prakticke-info" },
      { label: "Zdravie a očkovanie", href: "/prakticke-info" },
    ],
  },
  {
    title: "Nástroje",
    links: [
      { label: "Kalkulačka rozpočtu", href: "/nastroje" },
      { label: "Prevod meny", href: "/nastroje" },
      { label: "Checklist pred odletom", href: "/nastroje" },
      { label: "Vietnamčina pre turistov", href: "/nastroje" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-muted/60">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <p className="text-lg font-semibold">
              <span className="text-primary">Vietnam</span>
              <span className="text-accent">.sk</span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Inteligentný cestovateľský sprievodca Vietnamom pre slovenských a
              českých cestovateľov.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Vietnam.sk — všetky práva vyhradené</p>
          <p>Vytvorené s láskou k Vietnamu 🇻🇳</p>
        </div>
      </div>
    </footer>
  );
}
