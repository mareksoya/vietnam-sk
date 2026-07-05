"use client";

import { useState } from "react";
import { Sparkles, Loader2, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { DatePicker } from "@/components/ui/date-picker";
import { ItineraryView, type Itinerary } from "./itinerary-view";

const travelStyles = [
  "Backpacking",
  "Rodina",
  "Luxus",
  "Dobrodružstvo",
  "Digitálny nomád",
  "Pláže",
  "Gastronómia",
  "Kultúra",
];

const airports = [
  { code: "HAN", label: "Hanoj (HAN)" },
  { code: "SGN", label: "Ho Či Minovo mesto (SGN)" },
  { code: "DAD", label: "Da Nang (DAD)" },
  { code: "CXR", label: "Nha Trang (CXR)" },
  { code: "PQC", label: "Phu Quoc (PQC)" },
];

const dayOptions = [
  3, 4, 5, 6, 7, 8, 9, 10, 11, 12, // každý deň 3–12
  14, 16, 18, 21, 24, 28, // dlhšie cesty
];
const paces = ["Pohodové", "Vyvážené", "Intenzívne"] as const;

const extras = [
  { key: "kids", label: "Cestujem s deťmi" },
  { key: "motorbike", label: "Chcem si prenajať motorku" },
  { key: "nightTrains", label: "Nočné vlaky sú OK" },
  { key: "domesticFly", label: "Vnútroštátne lety sú OK" },
] as const;

const inputCls =
  "h-11 w-full rounded-sm border border-border bg-surface px-3.5 text-sm outline-none transition-colors duration-150 focus:border-jade";

const labelCls = "mb-1.5 block text-[13px] font-medium text-muted-foreground";

export function PlannerForm({ prefill }: { prefill: Record<string, string> }) {
  const [form, setForm] = useState({
    where: prefill.where || "",
    days: prefill.days || "10",
    date: prefill.date || "",
    from: prefill.from || "Viedeň (VIE)",
    arrive: prefill.arrive || "HAN",
    depart: prefill.depart || "SGN",
    people: prefill.people || "2",
    budget: prefill.budget || "1500",
  });
  const [styles, setStyles] = useState<string[]>(
    prefill.styles ? prefill.styles.split(",").filter(Boolean) : []
  );
  const [pace, setPace] = useState<string>("Vyvážené");
  const [flags, setFlags] = useState<Record<string, boolean>>({
    nightTrains: true,
  });
  const [state, setState] = useState<"form" | "loading" | "result">("form");
  const [result, setResult] = useState<Itinerary | null>(null);
  const [note, setNote] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const toggleStyle = (s: string) =>
    setStyles((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const toggleFlag = (k: string) => setFlags((f) => ({ ...f, [k]: !f[k] }));

  const generate = async () => {
    setState("loading");
    setError(null);
    try {
      const res = await fetch("/api/planner/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          days: Number(form.days),
          styles: styles.join(","),
          pace,
          ...flags,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.itinerary) {
        throw new Error(data.error || "Generovanie zlyhalo, skús to znova.");
      }
      setResult(data.itinerary);
      setNote(data.note);
      setState("result");
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Niečo sa pokazilo, skús to znova."
      );
      setState("form");
    }
  };

  if (state === "result" && result) {
    return (
      <div>
        <ItineraryView itinerary={result} note={note} />
        <div className="mt-8 text-center">
          <button
            onClick={() => setState("form")}
            className="rounded-md border border-border bg-white px-6 py-3 text-sm font-medium transition hover:border-accent/40 hover:text-accent cursor-pointer"
          >
            ← Upraviť zadanie a vygenerovať znova
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="w-full rounded-lg border border-border bg-surface p-6 shadow-lift md:p-8">
        <p className="eyebrow">Plánovač cesty</p>
        <h2 className="mt-2 text-[25px] font-semibold">
          Naplánuj si Vietnam na mieru
        </h2>

        {/* Základné zadanie */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <label className="block">
            <span className={labelCls}>Kam chceš ísť?</span>
            <input
              className={inputCls}
              placeholder="Celý Vietnam, sever, Hội An…"
              value={form.where}
              onChange={set("where")}
            />
          </label>
          <label className="block">
            <span className={labelCls}>Koľko dní?</span>
            <select
              className={cn(inputCls, "data-num text-foreground")}
              value={form.days}
              onChange={set("days")}
            >
              {dayOptions.map((d) => (
                <option key={d} value={d}>
                  {d} dní
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={labelCls}>Kedy cestuješ?</span>
            <DatePicker
              value={form.date}
              onChange={(iso) => setForm((f) => ({ ...f, date: iso }))}
            />
          </label>
          <label className="block">
            <span className={labelCls}>Odkiaľ prilietaš?</span>
            <input className={inputCls} value={form.from} onChange={set("from")} />
          </label>
          <label className="block">
            <span className={labelCls}>Prílet do</span>
            <select
              className={inputCls}
              value={form.arrive}
              onChange={set("arrive")}
            >
              {airports.map((a) => (
                <option key={a.code} value={a.code}>
                  {a.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={labelCls}>Odlet z</span>
            <select
              className={inputCls}
              value={form.depart}
              onChange={set("depart")}
            >
              {airports.map((a) => (
                <option key={a.code} value={a.code}>
                  {a.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={labelCls}>Počet osôb</span>
            <input
              type="number"
              min={1}
              max={12}
              className={cn(inputCls, "data-num text-foreground")}
              value={form.people}
              onChange={set("people")}
            />
          </label>
          <label className="block md:col-span-2">
            <span className={labelCls}>Rozpočet na osobu (€, bez letenky)</span>
            <input
              type="number"
              step={100}
              className={cn(inputCls, "data-num text-foreground")}
              value={form.budget}
              onChange={set("budget")}
            />
          </label>
        </div>

        {/* Typ cestovania */}
        <div className="mt-6">
          <span className={labelCls}>Typ cestovania</span>
          <div className="mt-1 flex flex-wrap gap-2">
            {travelStyles.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => toggleStyle(s)}
                className={cn(
                  "rounded-sm border px-3 py-1.5 text-[13px] font-medium transition-colors duration-150",
                  styles.includes(s)
                    ? "border-jade bg-jade text-white"
                    : "border-border bg-surface text-muted-foreground hover:border-jade"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Spresnenie (nepovinné) */}
        <div className="mt-6">
          <span className={labelCls}>Tempo cestovania</span>
          <div className="mt-1 grid grid-cols-3 gap-2">
            {paces.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPace(p)}
                className={cn(
                  "rounded-sm border px-4 py-2.5 text-sm font-medium transition-colors duration-150",
                  pace === p
                    ? "border-jade bg-jade text-white"
                    : "border-border bg-surface text-muted-foreground hover:border-jade"
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {extras.map((e) => (
            <label
              key={e.key}
              className="flex cursor-pointer items-center gap-3 rounded-sm border border-border px-4 py-3 transition hover:border-jade"
            >
              <input
                type="checkbox"
                checked={!!flags[e.key]}
                onChange={() => toggleFlag(e.key)}
                className="h-4.5 w-4.5 accent-jade"
              />
              <span className="text-sm font-medium">{e.label}</span>
            </label>
          ))}
        </div>

        {error && (
          <p className="mt-5 flex items-center gap-2 rounded-sm bg-red-50 p-4 text-sm text-red-700">
            <TriangleAlert size={16} /> {error}
          </p>
        )}

        <button
          onClick={generate}
          disabled={state === "loading"}
          className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-lacquer text-sm font-semibold text-white transition-colors duration-150 hover:bg-lacquer-deep disabled:opacity-70 cursor-pointer"
        >
          {state === "loading" ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              AI zostavuje tvoj itinerár…
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Vygenerovať itinerár
            </>
          )}
        </button>
        {state === "loading" && (
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Analyzujem presuny, počasie, otváracie hodiny a rozpočet… (do minúty)
          </p>
        )}
      </div>
    </div>
  );
}
