"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { destinations, type Destination } from "@/lib/data/destinations";
import { cn } from "@/lib/utils";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const typeColors: Record<string, string> = {
  mesto: "#2d6a4f",
  "pláž": "#0e7490",
  hory: "#7c5e2a",
  "národný park": "#3f6212",
  ostrov: "#0369a1",
  UNESCO: "#c9a227",
};

export function VietnamMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Destination | null>(null);
  const [filter, setFilter] = useState<string>("všetko");
  const [mapReady, setMapReady] = useState(false);

  const visible =
    filter === "všetko"
      ? destinations
      : destinations.filter((d) => d.type === filter);

  useEffect(() => {
    if (!TOKEN || !mapRef.current) return;
    let map: import("mapbox-gl").Map | undefined;
    let markers: import("mapbox-gl").Marker[] = [];

    import("mapbox-gl").then((mapboxgl) => {
      if (!mapRef.current) return;
      mapboxgl.default.accessToken = TOKEN;
      map = new mapboxgl.default.Map({
        container: mapRef.current,
        style: "mapbox://styles/mapbox/outdoors-v12",
        center: [106.5, 16.2],
        zoom: 5,
      });
      map.addControl(new mapboxgl.default.NavigationControl(), "top-right");

      visible.forEach((d) => {
        const el = document.createElement("button");
        el.style.cssText = `width:18px;height:18px;border-radius:50%;border:3px solid white;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.3);background:${typeColors[d.type] ?? "#2d6a4f"}`;
        el.addEventListener("click", () => setSelected(d));
        markers.push(
          new mapboxgl.default.Marker({ element: el })
            .setLngLat([d.lng, d.lat])
            .addTo(map!)
        );
      });
      setMapReady(true);
    });

    return () => {
      markers.forEach((m) => m.remove());
      map?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <div className="relative h-[calc(100svh-6rem)] w-full overflow-hidden rounded-[2rem] border border-border shadow-soft">
      {/* Mapbox alebo fallback */}
      {TOKEN ? (
        <div ref={mapRef} className="h-full w-full" />
      ) : (
        <iframe
          title="Mapa Vietnamu"
          className="h-full w-full"
          src="https://www.openstreetmap.org/export/embed.html?bbox=100.5,7.8,112.5,23.6&layer=mapnik"
        />
      )}

      {/* Filter panel */}
      <div className="glass absolute left-4 top-4 z-10 max-h-[calc(100%-2rem)] w-72 overflow-y-auto rounded-3xl p-4 shadow-lift">
        <p className="px-1 text-sm font-semibold">Objavuj na mape</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["všetko", "mesto", "pláž", "hory", "národný park", "ostrov", "UNESCO"].map(
            (t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition",
                  filter === t
                    ? "bg-primary text-white"
                    : "bg-white/70 text-foreground/70 hover:bg-white"
                )}
              >
                {t}
              </button>
            )
          )}
        </div>
        <ul className="mt-4 space-y-1">
          {visible.map((d) => (
            <li key={d.slug}>
              <button
                onClick={() => setSelected(d)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-2xl px-3 py-2.5 text-left text-sm transition hover:bg-white/80",
                  selected?.slug === d.slug && "bg-white shadow-soft"
                )}
              >
                <MapPin
                  size={14}
                  style={{ color: typeColors[d.type] ?? "#2d6a4f" }}
                />
                <span className="flex-1 font-medium">{d.name}</span>
                <span className="text-[10px] text-muted-foreground">{d.type}</span>
              </button>
            </li>
          ))}
        </ul>
        {!TOKEN && (
          <p className="mt-3 rounded-2xl bg-accent-light/70 p-3 text-[11px] leading-relaxed text-accent">
            Pre plnú interaktívnu mapu s klikateľnými bodmi pridaj
            NEXT_PUBLIC_MAPBOX_TOKEN do .env
          </p>
        )}
      </div>

      {/* Detail karta */}
      {selected && (
        <div className="glass absolute bottom-4 left-4 right-4 z-10 mx-auto max-w-md rounded-3xl p-5 shadow-lift md:left-auto md:right-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-accent">
                {selected.type} · {selected.region}
              </p>
              <h3 className="mt-0.5 text-lg font-semibold">{selected.name}</h3>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="rounded-full bg-white/70 px-2.5 py-1 text-xs hover:bg-white"
            >
              ✕
            </button>
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-foreground/75">
            {selected.summary}
          </p>
          <Link
            href={`/destinacie/${selected.slug}`}
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Otvoriť destináciu <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {TOKEN && !mapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <p className="text-sm text-muted-foreground">Načítavam mapu…</p>
        </div>
      )}
    </div>
  );
}
