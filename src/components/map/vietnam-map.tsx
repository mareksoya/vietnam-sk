"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import type { Map as MapboxMap, Marker } from "mapbox-gl";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapboxMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const [selected, setSelected] = useState<Destination | null>(null);
  const [filter, setFilter] = useState<string>("všetko");
  const [mapReady, setMapReady] = useState(false);

  const visible =
    filter === "všetko"
      ? destinations
      : destinations.filter((d) => d.type === filter);

  const selectAndFly = useCallback((d: Destination) => {
    setSelected(d);
    mapRef.current?.flyTo({
      center: [d.lng, d.lat],
      zoom: 9.5,
      duration: 1600,
      essential: true,
    });
  }, []);

  // Inicializácia mapy — raz
  useEffect(() => {
    if (!TOKEN || !containerRef.current || mapRef.current) return;
    let cancelled = false;

    import("mapbox-gl").then((mod) => {
      if (cancelled || !containerRef.current) return;
      const mapboxgl = mod.default;
      mapboxgl.accessToken = TOKEN!;
      const map = new mapboxgl.Map({
        container: containerRef.current,
        style: "mapbox://styles/mapbox/outdoors-v12",
        center: [106.5, 16.2],
        zoom: 5,
      });
      map.addControl(new mapboxgl.NavigationControl(), "top-right");
      mapRef.current = map;
      setMapReady(true);
    });

    return () => {
      cancelled = true;
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Markery — pri zmene filtra alebo výberu
  useEffect(() => {
    if (!mapReady || !mapRef.current) return;
    let cancelled = false;

    import("mapbox-gl").then((mod) => {
      if (cancelled || !mapRef.current) return;
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = visible.map((d) => {
        const isSel = selected?.slug === d.slug;
        const el = document.createElement("button");
        el.type = "button";
        el.title = d.name;
        el.style.cssText = [
          `width:${isSel ? 26 : 18}px`,
          `height:${isSel ? 26 : 18}px`,
          "border-radius:50%",
          `border:${isSel ? 4 : 3}px solid white`,
          "cursor:pointer",
          `box-shadow:0 2px 10px rgba(0,0,0,.35)${isSel ? ",0 0 0 6px rgba(201,162,39,.35)" : ""}`,
          `background:${typeColors[d.type] ?? "#2d6a4f"}`,
          "transition:all .2s ease",
        ].join(";");
        el.addEventListener("click", (e) => {
          e.stopPropagation();
          selectAndFly(d);
        });
        return new mod.default.Marker({ element: el })
          .setLngLat([d.lng, d.lat])
          .addTo(mapRef.current!);
      });
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, mapReady, selected]);

  return (
    <div className="relative h-[calc(100svh-6rem)] w-full overflow-hidden rounded-[2rem] border border-border shadow-soft">
      {/* Mapbox alebo fallback */}
      {TOKEN ? (
        <div ref={containerRef} className="h-full w-full" />
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
                onClick={() => selectAndFly(d)}
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
              onClick={() => {
                setSelected(null);
                mapRef.current?.flyTo({ center: [106.5, 16.2], zoom: 5, duration: 1200 });
              }}
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
