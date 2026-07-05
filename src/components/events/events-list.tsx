"use client";

import { useState } from "react";
import { CalendarDays, MapPin, ExternalLink, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VnEvent, EventCategory } from "@/lib/data/events";

const categories: ("všetko" | EventCategory)[] = [
  "všetko",
  "festival",
  "štátny sviatok",
  "lampióny",
  "gastronómia",
  "kultúra",
];

const regions = [
  "všade",
  "Severný Vietnam",
  "Stredný Vietnam",
  "Južný Vietnam",
  "Celý Vietnam",
] as const;

// Tagy sú jade (§2) — kategóriu rozlišuje text, nie farba (žiadny rainbow, žiadna červená mimo CTA)
const catColors: Record<string, string> = {
  festival: "bg-accent-light text-accent",
  "štátny sviatok": "bg-accent-light text-accent",
  "lampióny": "bg-accent-light text-accent",
  "gastronómia": "bg-accent-light text-accent",
  "kultúra": "bg-accent-light text-accent",
  "šport": "bg-accent-light text-accent",
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("sk-SK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function EventsList({ events }: { events: VnEvent[] }) {
  const [cat, setCat] = useState<string>("všetko");
  const [region, setRegion] = useState<string>("všade");

  const visible = events.filter(
    (e) =>
      (cat === "všetko" || e.category === cat) &&
      (region === "všade" || e.region === region)
  );

  return (
    <div>
      {/* Filtre */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition",
              cat === c
                ? "border-accent bg-accent text-white shadow-soft"
                : "border-border bg-white text-foreground/70 hover:border-accent/40"
            )}
          >
            {c}
          </button>
        ))}
        <span className="mx-2 hidden h-6 w-px bg-border md:block" />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="h-10 rounded-full border border-border bg-white px-4 text-sm outline-none focus:border-accent"
        >
          {regions.map((r) => (
            <option key={r} value={r}>
              {r === "všade" ? "Všetky regióny" : r}
            </option>
          ))}
        </select>
      </div>

      {/* Zoznam */}
      <div className="mt-8 space-y-4">
        {visible.map((e) => {
          const past = new Date(e.endDate ?? e.startDate) < new Date();
          return (
            <article
              key={e.slug}
              id={e.slug}
              className={cn(
                "scroll-mt-28 rounded-3xl border border-border bg-white p-6 shadow-soft transition hover:shadow-lift md:p-7",
                past && "opacity-60"
              )}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    catColors[e.category] ?? "bg-muted"
                  )}
                >
                  {e.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <CalendarDays size={13} />
                  {fmtDate(e.startDate)}
                  {e.endDate ? ` – ${fmtDate(e.endDate)}` : ""}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin size={13} />
                  {e.city ? `${e.city} · ` : ""}
                  {e.region}
                </span>
              </div>

              <h2 className="mt-3 text-lg font-semibold tracking-tight md:text-xl">
                {e.name}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                {e.summary}
              </p>
              {e.tips && (
                <p className="mt-3 flex gap-2 rounded-2xl bg-accent-light/50 p-3.5 text-sm text-foreground/80">
                  <Lightbulb size={16} className="mt-0.5 shrink-0 text-accent" />
                  {e.tips}
                </p>
              )}
              <a
                href={e.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
              >
                Zdroj: {e.sourceName} <ExternalLink size={11} />
              </a>
            </article>
          );
        })}
        {!visible.length && (
          <p className="rounded-3xl bg-muted p-8 text-center text-sm text-muted-foreground">
            Pre zvolený filter nemáme žiadne udalosti.
          </p>
        )}
      </div>
    </div>
  );
}
