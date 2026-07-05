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
} from "lucide-react";
import { cn, formatEur } from "@/lib/utils";
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
            <span className="font-semibold text-primary">
              {formatEur(totalCost)}
            </span>{" "}
            / osoba (bez letenky)
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {exportOptions.map((e) => (
            <button
              key={e.label}
              className="flex items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-2 text-xs font-medium transition hover:border-primary/40 hover:text-primary cursor-pointer"
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
            onClick={() => setActiveDay(d.day)}
            className={cn(
              "shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-all",
              activeDay === d.day
                ? "bg-primary text-white shadow-soft"
                : "bg-white border border-border text-foreground/70 hover:border-primary/40"
            )}
          >
            Deň {d.day}
          </button>
        ))}
      </div>

      {/* Timeline dňa */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
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
              const isTip = item.type === "tip";
              return (
                <li key={i} className="relative flex gap-4 pb-8 last:pb-0">
                  {i < day.items.length - 1 && (
                    <span className="absolute left-[21px] top-11 h-[calc(100%-2.75rem)] w-px bg-border" />
                  )}
                  <span
                    className={cn(
                      "z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
                      isTip
                        ? "bg-accent-light text-accent"
                        : "bg-primary-light text-primary-dark"
                    )}
                  >
                    <Icon size={19} />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      {item.time && (
                        <span className="flex items-center gap-1 text-xs font-semibold text-primary">
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
                    <p className="mt-1 font-medium leading-snug">{item.title}</p>
                    {item.description && (
                      <p className="mt-1 text-sm leading-relaxed text-foreground/65">
                        {item.description}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Mini mapa dňa */}
        <aside className="h-fit space-y-4 lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-3xl border border-border shadow-soft">
            <iframe
              title={`Mapa — ${day.location}`}
              className="h-64 w-full"
              loading="lazy"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${day.lng - 0.25},${day.lat - 0.18},${day.lng + 0.25},${day.lat + 0.18}&marker=${day.lat},${day.lng}`}
            />
            <div className="bg-white p-4">
              <p className="text-sm font-medium">{day.location}</p>
              <p className="text-xs text-muted-foreground">
                Interaktívna mapa celej trasy: sekcia Mapa
              </p>
            </div>
          </div>
          <div className="rounded-3xl bg-primary-light/60 p-5 text-sm leading-relaxed text-primary-dark">
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
