"use client";

import { useMemo, useState } from "react";
import {
  Bus,
  Landmark,
  Utensils,
  Soup,
  BedDouble,
  Lightbulb,
  Clock,
  Download,
  Map as MapIcon,
  CalendarPlus,
  MapPin,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { cn, formatEur } from "@/lib/utils";
import { MapboxMini } from "@/components/map/mapbox-mini";
import {
  sampleItinerary,
  type ItemType,
  type ItineraryDay,
} from "@/lib/data/sample-itinerary";

export interface Itinerary {
  title: string;
  days: ItineraryDay[];
}

const icons: Record<ItemType, React.ElementType> = {
  transfer: Bus,
  atrakcia: Landmark,
  "reštaurácia": Utensils,
  "street food": Soup,
  hotel: BedDouble,
  tip: Lightbulb,
};

const exportOptions = [
  { icon: Download, label: "PDF" },
  { icon: MapIcon, label: "Google Maps" },
  { icon: MapIcon, label: "Apple Maps" },
  { icon: CalendarPlus, label: "Google Calendar" },
  { icon: CalendarPlus, label: "iCal" },
  { icon: Download, label: "GPX" },
];

export function ItineraryView({
  itinerary,
  note,
}: {
  itinerary?: Itinerary;
  note?: string;
}) {
  const data = itinerary ?? sampleItinerary;
  const [activeDay, setActiveDay] = useState(data.days[0]?.day ?? 1);
  // Vybraný bod programu (posunie mini mapu); null = stred dňa
  const [activePoint, setActivePoint] = useState<{
    lat: number;
    lng: number;
    zoom: number;
    key: string;
  } | null>(null);
  const [mapExpanded, setMapExpanded] = useState(false);

  const totalCost = useMemo(
    () =>
      data.days.reduce(
        (sum, d) => sum + d.items.reduce((s, i) => s + (i.costEur ?? 0), 0),
        0
      ),
    [data]
  );

  const day =
    data.days.find((d) => d.day === activeDay) ?? data.days[0];

  return (
    <div className="animate-fade-up">
      {note && (
        <p className="mb-4 rounded-2xl bg-accent-light/70 p-4 text-sm text-accent">
          {note}
        </p>
      )}

      {/* Súhrn + exporty */}
      <div className="glass flex flex-col items-start justify-between gap-4 rounded-3xl p-6 shadow-soft md:flex-row md:items-center">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">{data.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {data.days.length} dní · odhad nákladov{" "}
            <span className="font-semibold text-accent">
              {formatEur(totalCost)}
            </span>{" "}
            / osoba (bez letenky)
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {exportOptions.map((e) => (
            <button
              key={e.label}
              className="flex items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-2 text-xs font-medium transition hover:border-accent/40 hover:text-accent cursor-pointer"
              title="Export bude aktívny vo Fáze 3"
            >
              <e.icon size={13} /> {e.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dni */}
      <div className="scroll-fade mt-6 flex gap-2 overflow-x-auto pb-1">
        {data.days.map((d) => (
          <button
            key={d.day}
            onClick={() => {
              setActiveDay(d.day);
              setActivePoint(null);
            }}
            className={cn(
              "shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-all",
              activeDay === d.day
                ? "bg-accent text-white shadow-soft"
                : "bg-white border border-border text-foreground/70 hover:border-accent/40"
            )}
          >
            Deň {d.day}
          </button>
        ))}
      </div>

      {/* Timeline dňa + mapa (zväčšenie = 50/50 vedľa seba) */}
      <div
        className={cn(
          "mt-6 grid gap-6",
          mapExpanded ? "lg:grid-cols-2" : "lg:grid-cols-[1fr_360px]"
        )}
      >
        <div className="rounded-3xl border border-border bg-white p-6 shadow-soft md:p-8">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                Deň {day.day} · {day.location}
              </p>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight">
                {day.title}
              </h3>
            </div>
          </div>

          <ol className="mt-8 space-y-0">
            {day.items.map((item, i) => {
              const Icon = icons[item.type as ItemType] ?? Lightbulb;
              const precise =
                typeof item.lat === "number" && typeof item.lng === "number";
              const pLat = precise ? item.lat! : day.lat;
              const pLng = precise ? item.lng! : day.lng;
              const key = `${day.day}-${i}`;
              const isActive = activePoint?.key === key;
              const onPick = () =>
                setActivePoint(
                  isActive
                    ? null
                    : { lat: pLat, lng: pLng, zoom: precise ? 14 : 12, key }
                );
              return (
                <li key={i} className="relative pb-8 last:pb-0">
                  {i < day.items.length - 1 && (
                    <span className="absolute left-[21px] top-11 h-[calc(100%-2.75rem)] w-px bg-border" />
                  )}
                  <button
                    type="button"
                    onClick={onPick}
                    aria-pressed={isActive}
                    title="Zobraziť na mape"
                    className={cn(
                      "group -mx-2 flex w-full cursor-pointer gap-4 rounded-lg px-2 py-2 text-left transition-colors duration-150 hover:bg-sand/60",
                      isActive && "bg-sand"
                    )}
                  >
                    <span
                      className={cn(
                        "z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-colors",
                        isActive
                          ? "bg-jade text-white"
                          : "bg-accent-light text-accent"
                      )}
                    >
                      <Icon size={19} />
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        {item.time && (
                          <span className="flex items-center gap-1 text-xs font-semibold text-accent">
                            <Clock size={11} /> {item.time}
                          </span>
                        )}
                        <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                          {item.type}
                        </span>
                        {item.costEur !== undefined && (
                          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                            ~{formatEur(item.costEur)}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 flex items-center gap-1.5 font-medium leading-snug">
                        {item.title}
                        <MapPin
                          size={13}
                          className={cn(
                            "shrink-0 transition-colors",
                            isActive
                              ? "text-jade"
                              : "text-muted-foreground/40 group-hover:text-jade"
                          )}
                        />
                      </p>
                      {item.description && (
                        <p className="mt-1 text-sm leading-relaxed text-foreground/65">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Mini mapa dňa */}
        <aside className="h-fit space-y-4 lg:sticky lg:top-28">
          <div className="relative overflow-hidden rounded-3xl border border-border shadow-soft">
            <MapboxMini
              lat={activePoint?.lat ?? day.lat}
              lng={activePoint?.lng ?? day.lng}
              zoom={activePoint?.zoom ?? 9}
              heightCss={mapExpanded ? "62vh" : "16rem"}
              label={day.location}
            />
            <button
              type="button"
              onClick={() => setMapExpanded((v) => !v)}
              title={mapExpanded ? "Zmenšiť mapu" : "Zväčšiť mapu"}
              aria-label={mapExpanded ? "Zmenšiť mapu" : "Zväčšiť mapu"}
              className="absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface/90 text-foreground shadow-soft backdrop-blur-sm transition-colors duration-150 hover:text-jade"
            >
              {mapExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
            <div className="bg-white p-4">
              <p className="text-sm font-medium">{day.location}</p>
              <p className="text-xs text-muted-foreground">
                Tip: klikni na bod programu (📍) a mapa naň priletí.
              </p>
            </div>
          </div>
          <div className="rounded-3xl bg-accent-light/60 p-5 text-sm leading-relaxed text-accent">
            <p className="font-semibold">💡 Tip</p>
            <p className="mt-2">
              Itinerár je orientačný — over si otváracie hodiny a odchody
              dopravy deň vopred. Ceny sú odhady v EUR na osobu.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
