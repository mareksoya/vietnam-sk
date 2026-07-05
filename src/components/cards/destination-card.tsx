import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/lib/data/destinations";

/* Karta podľa §4: foto 3:2 radius-lg, jade tag cez spodný okraj fotky,
   H3 v body fonte 600, meta riadok 13px tabular-nums. */
export function DestinationCard({ d }: { d: Destination }) {
  return (
    <Link href={`/destinacie/${d.slug}`} className="group block w-72 shrink-0 md:w-auto">
      <div className="relative">
        <div className="aspect-[3/2] overflow-hidden rounded-lg">
          <Image
            src={d.image}
            alt={`${d.name} — ${d.type}, ${d.region}`}
            width={720}
            height={480}
            sizes="(max-width: 768px) 288px, 33vw"
            className="h-full w-full object-cover transition-transform duration-[250ms] group-hover:scale-[1.03]"
          />
        </div>
        <span className="absolute -bottom-2.5 left-4 rounded-sm bg-jade px-2.5 py-1 text-[12px] font-medium text-white">
          {d.type}
        </span>
      </div>
      <div className="px-1 pt-5">
        <h3 className="text-[17px] font-semibold">{d.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {d.summary}
        </p>
        <p className="data-num mt-2 text-[13px]">
          {d.region} · {d.recommendedDays} dni · letisko {d.nearestAirport}
        </p>
      </div>
    </Link>
  );
}
