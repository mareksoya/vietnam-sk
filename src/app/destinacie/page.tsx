import type { Metadata } from "next";
import { DestinationCard } from "@/components/cards/destination-card";
import { destinations } from "@/lib/data/destinations";

export const metadata: Metadata = {
  title: "Destinácie vo Vietname",
  description:
    "Objav najkrajšie miesta Vietnamu — Hanoj, Ha Long, Sapa, Hoi An, Phu Quoc a ďalšie. Kedy ísť, koľko dní a čo nevynechať.",
};

export default function DestinationsPage() {
  const regions = [
    "Severný Vietnam",
    "Stredný Vietnam",
    "Južný Vietnam",
  ] as const;

  return (
    <div className="mx-auto max-w-6xl px-6 pb-16 pt-32">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">
        Objav Vietnam
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-5xl">
        Destinácie
      </h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
        Od ryžových terás na severe po ostrovy na juhu. Každá destinácia
        obsahuje najlepší čas návštevy, odporúčaný počet dní a tipy.
      </p>

      {regions.map((region) => {
        const items = destinations.filter((d) => d.region === region);
        if (!items.length) return null;
        return (
          <section key={region} className="mt-14">
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              {region}
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((d) => (
                <DestinationCard key={d.slug} d={d} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
