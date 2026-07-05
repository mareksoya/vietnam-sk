import Image from "next/image";
import Link from "next/link";
import {
  Map,
  CalendarDays,
  Utensils,
  Coffee,
  Waves,
  Mountain,
  Landmark,
  Laptop,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Wifi,
  Stamp,
} from "lucide-react";
import { SearchPanel } from "@/components/home/search-panel";
import { DestinationCard } from "@/components/cards/destination-card";
import { destinations } from "@/lib/data/destinations";

const categories = [
  { icon: Landmark, label: "Kultúra a UNESCO", href: "/destinacie?typ=UNESCO" },
  { icon: Waves, label: "Pláže a ostrovy", href: "/destinacie?typ=pláž" },
  { icon: Mountain, label: "Hory a treking", href: "/destinacie?typ=hory" },
  { icon: Utensils, label: "Street food", href: "/gastro" },
  { icon: Coffee, label: "Kávová kultúra", href: "/gastro" },
  { icon: Laptop, label: "Digitálni nomádi", href: "/nomadi" },
  { icon: CalendarDays, label: "Festivaly", href: "/udalosti" },
  { icon: Map, label: "Interaktívna mapa", href: "/mapa" },
];

const practical = [
  {
    icon: Stamp,
    title: "Víza a vstup",
    text: "E-víza za 25 USD do 90 dní, alebo bezvízový Phu Quoc. Ako na to krok za krokom.",
  },
  {
    icon: Wifi,
    title: "SIM a eSIM",
    text: "Viettel vs. Mobifone, eSIM pred odletom od 5 €. Internet je vo Vietname rýchly a lacný.",
  },
  {
    icon: CreditCard,
    title: "Mena a ceny",
    text: "1 € ≈ 27 000 VND. Pho za 2 €, hotel od 20 €. Kde vyberať z bankomatu bez poplatkov.",
  },
  {
    icon: ShieldCheck,
    title: "Bezpečnosť a scamy",
    text: "Vietnam je bezpečná krajina. Naučte sa rozpoznať taxi a zmenárenské triky vopred.",
  },
];

export default function Home() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-4 pb-16 pt-32">
        <Image
          src="/images/homepage_bg_AdobeStock_337232364.jpeg"
          alt="Zátoka Ha Long, Vietnam"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />

        <div className="relative z-10 flex flex-col items-center text-center animate-fade-up">
          <p className="mb-4 rounded-full bg-white/20 px-4 py-1.5 text-xs font-medium tracking-wide text-white backdrop-blur-md">
            Inteligentný cestovateľský sprievodca
          </p>
          <h1 className="font-display text-5xl font-semibold tracking-tight text-white drop-shadow-lg md:text-7xl">
            Objav Vietnam
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/90 drop-shadow md:text-lg">
            Naplánuj celú dovolenku na jednom mieste — od inšpirácie až po
            návrat domov. Itinerár na mieru ti vytvorí AI za pár sekúnd.
          </p>
        </div>

        <div className="relative z-10 mt-10 w-full max-w-4xl animate-fade-up">
          <SearchPanel />
        </div>
      </section>

      {/* ── KATEGÓRIE ────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Čo ťa láka?
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className="group flex flex-col items-start gap-4 rounded-3xl border border-border bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lift"
            >
              <span className="rounded-2xl bg-primary-light p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <c.icon size={22} />
              </span>
              <span className="text-sm font-medium">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── TOP DESTINÁCIE ───────────────────────────── */}
      <section className="bg-muted/60 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Top destinácie
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Miesta, ktoré by nemali chýbať v žiadnom itinerári.
              </p>
            </div>
            <Link
              href="/destinacie"
              className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline md:flex"
            >
              Všetky destinácie <ArrowRight size={15} />
            </Link>
          </div>
          <div className="scroll-fade mt-8 flex gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
            {destinations.slice(0, 6).map((d) => (
              <DestinationCard key={d.slug} d={d} />
            ))}
          </div>
        </div>
      </section>

      {/* ── AI PLANNER CTA ───────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary-dark px-8 py-16 text-center shadow-lift md:px-16">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/40 blur-3xl" />
          <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              AI Plánovač
            </p>
            <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-semibold text-white md:text-4xl">
              Itinerár deň po dni — presuny, jedlo, hotely aj rozpočet
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
              Zadáš dátumy, letiská, rozpočet a štýl cestovania. AI zostaví celý
              plán s mapou a nákladmi. Exportuješ do PDF, Google Maps či
              kalendára.
            </p>
            <Link
              href="/planovac"
              className="mt-8 inline-flex h-14 items-center gap-2 rounded-full bg-accent px-8 text-base font-semibold text-white shadow-lift transition hover:brightness-110"
            >
              Vyskúšať plánovač <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRAKTICKÉ INFO ───────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Praktické informácie
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Všetko, čo potrebuješ vybaviť pred odletom.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {practical.map((p) => (
            <Link
              key={p.title}
              href="/prakticke-info"
              className="group flex gap-5 rounded-3xl border border-border bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
            >
              <span className="h-fit rounded-2xl bg-accent-light p-3 text-accent">
                <p.icon size={22} />
              </span>
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/70">
                  {p.text}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
