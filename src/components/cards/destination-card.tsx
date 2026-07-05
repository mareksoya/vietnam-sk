import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Destination } from "@/lib/data/destinations";

export function DestinationCard({ d }: { d: Destination }) {
  return (
    <Link
      href={`/destinacie/${d.slug}`}
      className="group block w-72 shrink-0 overflow-hidden rounded-3xl bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift md:w-auto"
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={d.image}
          alt={d.name}
          fill
          sizes="(max-width: 768px) 288px, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <Badge gold={d.type === "UNESCO"} className="glass border-0 backdrop-blur-md">
            {d.type}
          </Badge>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold tracking-tight">{d.name}</h3>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock size={12} /> {d.recommendedDays} dni
          </span>
        </div>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin size={12} /> {d.region}
        </p>
        <p className="mt-3 line-clamp-2 text-sm text-foreground/70 leading-relaxed">
          {d.summary}
        </p>
      </div>
    </Link>
  );
}
