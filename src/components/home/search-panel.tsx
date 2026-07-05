"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

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

const inputCls =
  "h-11 w-full rounded-sm border border-border bg-surface px-3.5 text-sm outline-none transition-colors duration-150 focus:border-jade";

const labelCls = "mb-1.5 block text-[13px] font-medium text-muted-foreground";

export function SearchPanel() {
  const router = useRouter();
  const [styles, setStyles] = useState<string[]>([]);
  const [form, setForm] = useState({
    where: "",
    days: "14",
    date: "",
    from: "Viedeň (VIE)",
    arrive: "HAN",
    depart: "SGN",
    people: "2",
    budget: "1500",
  });

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const toggleStyle = (s: string) =>
    setStyles((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const submit = () => {
    const params = new URLSearchParams({ ...form, styles: styles.join(",") });
    router.push(`/planovac?${params.toString()}`);
  };

  return (
    <div className="w-full rounded-lg border border-border bg-surface p-6 shadow-lift md:p-8">
      <p className="eyebrow">Plánovač cesty</p>
      <h2 className="mt-2 text-[25px] font-semibold">
        Naplánuj si Vietnam na mieru
      </h2>

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
          <input
            type="number"
            min={3}
            max={60}
            className={cn(inputCls, "data-num text-foreground")}
            value={form.days}
            onChange={set("days")}
          />
        </label>
        <label className="block">
          <span className={labelCls}>Kedy cestuješ?</span>
          <input
            type="date"
            className={cn(inputCls, "data-num text-foreground")}
            value={form.date}
            onChange={set("date")}
          />
        </label>
        <label className="block">
          <span className={labelCls}>Odkiaľ prilietaš?</span>
          <input className={inputCls} value={form.from} onChange={set("from")} />
        </label>
        <label className="block">
          <span className={labelCls}>Prílet do</span>
          <select className={inputCls} value={form.arrive} onChange={set("arrive")}>
            {airports.map((a) => (
              <option key={a.code} value={a.code}>
                {a.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>Odlet z</span>
          <select className={inputCls} value={form.depart} onChange={set("depart")}>
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

      <button
        onClick={submit}
        className="mt-7 h-11 w-full rounded-md bg-lacquer px-5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-lacquer-deep md:w-auto"
      >
        Vytvoriť itinerár
      </button>
    </div>
  );
}
