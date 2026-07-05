import Image from "next/image";
import Link from "next/link";
import { SearchPanel } from "@/components/home/search-panel";
import { DestinationCard } from "@/components/cards/destination-card";
import { destinations } from "@/lib/data/destinations";
import { upcomingEvents } from "@/lib/data/events";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("sk-SK", {
    day: "numeric",
    month: "short",
  });
}

export default function Home() {
  const events = upcomingEvents().slice(0, 4);

  return (
    <>
      {/* ── HERO: fotka vedie, UI ustupuje (§1) ─────────── */}
      <section className="relative mt-16 h-[60vh] min-h-[420px] w-full">
        <Image
          src="/images/homepage_bg_AdobeStock_337232364.jpeg"
          alt="Zátoka Hạ Long ráno — vápencové ostrovy a výletné lode"
          fill
          priority
          className="object-cover"
        />
        <div className="photo-scrim absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-[1200px] px-4 pb-12 md:px-8">
            <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-white/90">
              Severný Vietnam · Zátoka Hạ Long
            </p>
            <h1 className="mt-2 max-w-2xl font-display text-[39px] font-semibold leading-[1.15] text-white md:text-[49px]">
              Naplánuj si Vietnam sám. My ti dáme fakty.
            </h1>
            <p className="mt-3 max-w-xl text-white/90">
              Itineráre deň po dni, reálne ceny a praktické rady od ľudí, ktorí
              tam boli — bez marketingových superlatívov.
            </p>
          </div>
        </div>
      </section>

      {/* ── PLÁNOVAČ ────────────────────────────────────── */}
      <section className="mx-auto -mt-10 max-w-[1200px] px-4 md:px-8">
        <SearchPanel />
      </section>

      {/* ── SAND BOX: praktický rýchly prehľad (§3) ─────── */}
      <section className="mx-auto max-w-[1200px] px-4 py-12 md:px-8 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1fr_380px]">
          <div>
            <p className="eyebrow">Objav Vietnam</p>
            <h2 className="mt-2 max-w-lg text-[31px] font-semibold">
              Kam sa oplatí ísť — 12 destinácií so sprievodcom
            </h2>
            <p className="mt-3 max-w-lg text-muted-foreground">
              Od ryžových terás v Sa Pa po pláže Phú Quốcu. Pri každej
              destinácii nájdeš najlepší čas návštevy, odporúčaný počet dní a
              konkrétne tipy.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/destinacie" className="text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors duration-150 hover:text-lacquer hover:decoration-lacquer">
                Všetky destinácie
              </Link>
              <Link href="/mapa" className="text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors duration-150 hover:text-lacquer hover:decoration-lacquer">
                Interaktívna mapa
              </Link>
              <Link href="/udalosti" className="text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors duration-150 hover:text-lacquer hover:decoration-lacquer">
                Udalosti a festivaly
              </Link>
            </div>
          </div>

          <div className="sand-box">
            <p className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.06em] text-jade">
              Pred odletom · platné 2026
            </p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt>E-víza (90 dní)</dt>
                <dd className="data-num text-foreground">25–50 USD</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Kurz</dt>
                <dd className="data-num text-foreground">1 € ≈ 27 500 VND</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Miska phở na ulici</dt>
                <dd className="data-num text-foreground">~2 €</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Hotel (stredná trieda)</dt>
                <dd className="data-num text-foreground">20–40 € / noc</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>SIM s neobmedzenými dátami</dt>
                <dd className="data-num text-foreground">8–13 € / 30 dní</dd>
              </div>
            </dl>
            <Link
              href="/prakticke-info"
              className="mt-5 inline-block text-sm font-medium text-lacquer underline underline-offset-4 hover:text-lacquer-deep"
            >
              Otvoriť praktické info
            </Link>
          </div>
        </div>
      </section>

      {/* ── TOP DESTINÁCIE ─────────────────────────────── */}
      <section className="border-y border-border bg-surface py-12 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8">
          <div className="flex items-end justify-between">
            <h2 className="text-[31px] font-semibold">Najčítanejšie destinácie</h2>
            <Link
              href="/destinacie"
              className="hidden text-sm font-medium text-foreground underline decoration-border underline-offset-4 hover:text-lacquer hover:decoration-lacquer md:block"
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
        <div className="grid gap-10 md:grid-cols-[380px_1fr]">
          <div>
            <p className="eyebrow">Kalendár</p>
            <h2 className="mt-2 text-[31px] font-semibold">
              Čo sa chystá vo Vietname
            </h2>
            <p className="mt-3 text-muted-foreground">
              Festivaly a sviatky z oficiálnych zdrojov vietnamského turizmu —
              vrátane termínov, ktoré ovplyvnia tvoju cestu.
            </p>
            <Link
              href="/udalosti"
              className="mt-5 inline-flex h-11 items-center rounded-md border border-foreground px-5 text-sm font-medium transition-colors duration-150 hover:bg-sand"
            >
              Otvoriť celý kalendár
            </Link>
          </div>
          <ul className="divide-y divide-border">
            {events.map((e) => (
              <li key={e.slug} className="flex items-baseline gap-5 py-4">
                <span className="data-num w-24 shrink-0 text-[13px]">
                  {fmtDate(e.startDate)}
                  {e.endDate ? ` – ${fmtDate(e.endDate)}` : ""}
                </span>
                <div>
                  <p className="font-medium leading-snug">{e.name}</p>
                  <p className="data-num mt-0.5 text-[13px]">
                    {e.city ? `${e.city} · ` : ""}
                    {e.region}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
