import Image from "next/image";
import Link from "next/link";
import { DestinationCard } from "@/components/cards/destination-card";
import { destinations } from "@/lib/data/destinations";
import { upcomingEvents } from "@/lib/data/events";
import { TOOLS } from "@/lib/tools";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("sk-SK", {
    day: "numeric",
    month: "short",
  });
}

/* Fotky udalostí = licencované fotky destinácií, priradené podľa mesta (fallback
   región → národný default). Žiadne sťahovanie cudzích chránených fotiek. */
const NATIONAL_IMAGES = [
  "/images/AdobeStock_176472557.jpeg", // Ha Long
  "/images/AdobeStock_1998320314.jpeg", // Ninh Binh
  "/images/AdobeStock_225980061.jpeg", // Sapa
];

/* Rýchle praktické fakty na úvodku — editoriálne, bez sand-boxu.
   Sand-box (§3, červená čiara) je vyhradený pre podstránky s praktickým info. */
const preDeparture: [string, string][] = [
  ["E-víza (90 dní)", "25–50 USD"],
  ["Kurz", "1 € ≈ 27 500 VND"],
  ["Časový posun", "+5 h (v lete)"],
  ["Napätie / zásuvky", "220 V · typ A/C/F"],
  ["Miska phở na ulici", "~2 €"],
  ["Hotel (stredná trieda)", "20–40 € / noc"],
  ["SIM (neobmedzené dáta)", "8–13 € / 30 dní"],
  ["Denný rozpočet (backpacker)", "25–35 € / deň"],
];

function eventImage(e: { city?: string; region: string; slug: string }) {
  const byCity = e.city
    ? destinations.find(
        (d) => d.name.toLowerCase() === e.city!.toLowerCase()
      )
    : undefined;
  if (byCity) return byCity.image;
  const byRegion = destinations.find((d) => d.region === e.region);
  if (byRegion) return byRegion.image;
  const idx =
    [...e.slug].reduce((s, c) => s + c.charCodeAt(0), 0) %
    NATIONAL_IMAGES.length;
  return NATIONAL_IMAGES[idx];
}

export default function Home() {
  const events = upcomingEvents().slice(0, 6);

  return (
    <>
      {/* ── HERO: fotka na celom pozadí (§1) ─────────────── */}
      <section className="relative mt-16 flex min-h-[70vh] w-full items-end overflow-hidden">
        {/* Fotka vedie — kryje celý hero */}
        <div className="absolute inset-0">
          <Image
            src="/images/homepage_bg_AdobeStock_337232364.jpeg"
            alt="Zátoka Hạ Long ráno — vápencové ostrovy a výletné lode"
            fill
            priority
            className="object-cover"
          />
          {/* Legibility gradient (ink zospodu, §9) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgb(21 24 22 / 0.7), rgb(21 24 22 / 0.35) 55%, rgb(21 24 22 / 0.1))",
            }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-[1200px] px-4 pb-14 md:px-8 md:pb-20">
          <h1 className="max-w-2xl font-display text-[39px] font-semibold leading-[1.15] text-white md:text-[49px]">
            Naplánuj si Vietnam sám. My ti dáme fakty.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/90">
            Itineráre deň po dni, reálne ceny a praktické rady od ľudí, ktorí
            tam boli — bez marketingových superlatívov.
          </p>
          <Link
            href="/planovac"
            className="mt-7 inline-flex h-11 items-center rounded-md bg-lacquer px-5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-lacquer-deep"
          >
            Spustiť plánovač
          </Link>
        </div>
      </section>

      {/* ── OBJAV VIETNAM: intro + praktické fakty (editoriálne, bez sand-boxu) ── */}
      <section className="mx-auto max-w-[1200px] px-4 py-12 md:px-8 md:py-24">
        <p className="eyebrow">Objav Vietnam</p>
        <h2 className="mt-2 max-w-2xl text-[31px] font-semibold">
          Kam sa oplatí ísť — 12 destinácií so sprievodcom
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Od ryžových terás v Sa Pa po pláže Phú Quốcu. Pri každej destinácii
          nájdeš najlepší čas návštevy, odporúčaný počet dní a konkrétne tipy.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/destinacie" className="text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors duration-150 hover:text-jade hover:decoration-jade">
            Všetky destinácie
          </Link>
          <Link href="/mapa" className="text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors duration-150 hover:text-jade hover:decoration-jade">
            Interaktívna mapa
          </Link>
          <Link href="/udalosti" className="text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors duration-150 hover:text-jade hover:decoration-jade">
            Udalosti a festivaly
          </Link>
        </div>

        {/* Praktické fakty — 2 stĺpce, hairline linky, žiadny box */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex items-baseline justify-between gap-4">
            <p className="eyebrow">Pred odletom · platné 2026</p>
            <Link
              href="/prakticke-info"
              className="text-sm font-medium text-jade underline underline-offset-4 transition-colors hover:text-accent-dark"
            >
              Praktické info
            </Link>
          </div>
          <dl className="mt-6 grid gap-x-12 sm:grid-cols-2">
            {preDeparture.map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-4 border-b border-border py-3"
              >
                <dt className="text-sm text-muted-foreground">{k}</dt>
                <dd className="data-num whitespace-nowrap text-sm text-foreground">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── TOP DESTINÁCIE ─────────────────────────────── */}
      <section className="border-y border-border bg-surface py-12 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="flex items-end justify-between">
            <h2 className="text-[31px] font-semibold">Najčítanejšie destinácie</h2>
            <Link
              href="/destinacie"
              className="hidden text-sm font-medium text-foreground underline decoration-border underline-offset-4 hover:text-jade hover:decoration-jade md:block"
            >
              Zobraziť všetky
            </Link>
          </div>
          <div className="scroll-fade mt-8 flex gap-6 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
            {destinations.slice(0, 6).map((d) => (
              <DestinationCard key={d.slug} d={d} />
            ))}
          </div>
        </div>
      </section>

      {/* ── NAJBLIŽŠIE UDALOSTI ─────────────────────────── */}
      <section className="mx-auto max-w-[1200px] px-4 py-12 md:px-8 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Kalendár</p>
            <h2 className="mt-2 text-[31px] font-semibold">
              Čo sa chystá vo Vietname
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Festivaly a sviatky z oficiálnych zdrojov vietnamského turizmu —
              vrátane termínov, ktoré ovplyvnia tvoju cestu.
            </p>
          </div>
          <Link
            href="/udalosti"
            className="hidden h-11 items-center rounded-md border border-foreground px-5 text-sm font-medium transition-colors duration-150 hover:bg-sand md:inline-flex"
          >
            Otvoriť celý kalendár
          </Link>
        </div>

        <div className="mt-8 grid gap-x-6 gap-y-9 sm:grid-cols-2 md:grid-cols-3">
          {events.map((e) => (
            <Link key={e.slug} href={`/udalosti#${e.slug}`} className="group block">
              <div className="relative">
                <div className="aspect-[3/2] overflow-hidden rounded-lg">
                  <Image
                    src={eventImage(e)}
                    alt={`${e.name} — ${e.city ?? e.region}`}
                    width={720}
                    height={480}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-[250ms] group-hover:scale-[1.03]"
                  />
                </div>
                <span className="absolute -bottom-2.5 left-4 rounded-sm bg-jade px-2.5 py-1 text-[12px] font-medium text-white">
                  {e.category}
                </span>
              </div>
              <div className="px-1 pt-5">
                <span className="data-num text-[13px] font-semibold text-jade">
                  {fmtDate(e.startDate)}
                  {e.endDate ? ` – ${fmtDate(e.endDate)}` : ""}
                </span>
                <h3 className="mt-1 text-[17px] font-semibold leading-snug transition-colors group-hover:text-jade">
                  {e.name}
                </h3>
                <p className="data-num mt-2 text-[13px]">
                  {e.city ? `${e.city} · ` : ""}
                  {e.region}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/udalosti"
          className="mt-8 inline-flex h-11 items-center rounded-md border border-foreground px-5 text-sm font-medium transition-colors duration-150 hover:bg-sand md:hidden"
        >
          Otvoriť celý kalendár
        </Link>
      </section>

      {/* ── INTERAKTÍVNE NÁSTROJE (rozcestník) ──────────── */}
      <section className="border-t border-border bg-surface py-12 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Nástroje</p>
              <h2 className="mt-2 text-[31px] font-semibold">
                Interaktívne nástroje
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Prepočet meny, rozpočet, čas vo Vietname, balíkový checklist a
                vietnamčina — praktické pomôcky priamo v prehliadači.
              </p>
            </div>
            <Link
              href="/nastroje"
              className="hidden h-11 items-center rounded-md border border-foreground px-5 text-sm font-medium transition-colors duration-150 hover:bg-sand md:inline-flex"
            >
              Všetky nástroje
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((t) => (
              <Link
                key={t.id}
                href={t.href}
                className="group flex items-center gap-3 rounded-lg border border-border bg-background p-4 transition-colors duration-150 hover:border-jade/40"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary-light text-jade transition-colors group-hover:bg-jade group-hover:text-white">
                  <t.icon size={20} />
                </span>
                <div className="min-w-0">
                  <p className="font-medium leading-snug transition-colors group-hover:text-jade">
                    {t.title}
                  </p>
                  <p className="text-[13px] leading-relaxed text-muted-foreground">
                    {t.short}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/nastroje"
            className="mt-8 inline-flex h-11 items-center rounded-md border border-foreground px-5 text-sm font-medium transition-colors duration-150 hover:bg-sand md:hidden"
          >
            Všetky nástroje
          </Link>
        </div>
      </section>
    </>
  );
}
