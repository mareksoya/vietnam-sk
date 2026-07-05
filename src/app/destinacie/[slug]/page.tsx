import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  Clock,
  Plane,
  MapPin,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DestinationCard } from "@/components/cards/destination-card";
import { destinations, getDestination } from "@/lib/data/destinations";
import { MONTHS_SK } from "@/lib/utils";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) return {};
  return {
    title: `${d.name} — sprievodca, kedy ísť a čo vidieť`,
    description: d.summary,
    openGraph: { images: [d.image] },
  };
}

export default async function DestinationDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) notFound();

  const related = destinations
    .filter((x) => x.region === d.region && x.slug !== d.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: d.name,
    description: d.summary,
    geo: { "@type": "GeoCoordinates", latitude: d.lat, longitude: d.lng },
    touristType: d.type,
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="relative h-[60svh] min-h-[420px]">
        <Image src={d.image} alt={d.name} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-6 pb-10">
          <nav className="text-xs text-white/80">
            <Link href="/" className="hover:underline">Domov</Link>
            {" / "}
            <Link href="/destinacie" className="hover:underline">Destinácie</Link>
            {" / "}
            <span className="text-white">{d.name}</span>
          </nav>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="font-display text-4xl font-semibold text-white drop-shadow md:text-6xl">
              {d.name}
            </h1>
            <Badge gold={d.type === "UNESCO"}>{d.type}</Badge>
          </div>
        </div>
      </div>

      {/* Quick facts */}
      <div className="mx-auto -mt-8 max-w-6xl px-6">
        <div className="glass relative z-10 grid grid-cols-2 gap-4 rounded-3xl p-6 shadow-lift md:grid-cols-4">
          <div className="flex items-center gap-3">
            <CalendarDays size={20} className="text-primary" />
            <div>
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Najlepší čas
              </p>
              <p className="text-sm font-semibold">
                {d.bestMonths.slice(0, 3).map((m) => MONTHS_SK[m - 1]).join(", ")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-primary" />
            <div>
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Odporúčané
              </p>
              <p className="text-sm font-semibold">{d.recommendedDays} dni</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Plane size={20} className="text-primary" />
            <div>
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Letisko
              </p>
              <p className="text-sm font-semibold">{d.nearestAirport}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin size={20} className="text-primary" />
            <div>
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Región
              </p>
              <p className="text-sm font-semibold">{d.region}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Obsah */}
      <div className="mx-auto max-w-6xl gap-10 px-6 pt-12 lg:grid lg:grid-cols-[1fr_340px]">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Prečo navštíviť {d.name}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            {d.body}
          </p>

          <h3 className="mt-10 text-lg font-semibold">Nevynechaj</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {d.highlights.map((h) => (
              <span
                key={h}
                className="rounded-full border border-border bg-white px-4 py-2 text-sm shadow-soft"
              >
                {h}
              </span>
            ))}
          </div>
        </div>

        <aside className="mt-10 h-fit space-y-4 lg:sticky lg:top-28 lg:mt-0">
          <div className="overflow-hidden rounded-3xl border border-border shadow-soft">
            <iframe
              title={`Mapa — ${d.name}`}
              className="h-56 w-full"
              loading="lazy"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${d.lng - 0.3},${d.lat - 0.22},${d.lng + 0.3},${d.lat + 0.22}&marker=${d.lat},${d.lng}`}
            />
          </div>
          <Link
            href={`/planovac?where=${encodeURIComponent(d.name)}`}
            className="flex items-center justify-center gap-2 rounded-3xl bg-primary px-6 py-4 text-sm font-semibold text-white shadow-lift transition hover:bg-primary-dark"
          >
            <Sparkles size={16} className="text-accent-light" />
            Naplánovať cestu do {d.name}
          </Link>
        </aside>
      </div>

      {/* Súvisiace */}
      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pt-16">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              Ďalšie miesta v regióne
            </h2>
            <Link
              href="/destinacie"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Všetky <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <DestinationCard key={r.slug} d={r} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
