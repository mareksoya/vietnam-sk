"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Sparkles, MapPin, CalendarDays, Users, Wallet, Plane } from "lucide-react";
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
  "h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-light";

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

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
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
    <div className="glass w-full max-w-4xl rounded-[2rem] p-6 shadow-lift md:p-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-foreground/70">
            <MapPin size={13} /> Kam chceš ísť?
          </span>
          <input
            className={inputCls}
            placeholder="Celý Vietnam, sever, Hoi An…"
            value={form.where}
            onChange={set("where")}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-foreground/70">
            <CalendarDays size={13} /> Koľko dní?
          </span>
          <input
            type="number"
            min={3}
            max={60}
            className={inputCls}
            value={form.days}
            onChange={set("days")}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-foreground/70">
            <CalendarDays size={13} /> Kedy cestuješ?
          </span>
          <input type="date" className={inputCls} value={form.date} onChange={set("date")} />
        </label>
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-foreground/70">
            <Plane size={13} /> Odkiaľ prilietaš?
          </span>
          <input className={inputCls} value={form.from} onChange={set("from")} />
        </label>
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-foreground/70">
            <Plane size={13} /> Prílet do
          </span>
          <select className={inputCls} value={form.arrive} onChange={set("arrive")}>
            {airports.map((a) => (
              <option key={a.code} value={a.code}>{a.label}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-foreground/70">
            <Plane size={13} className="rotate-45" /> Odlet z
          </span>
          <select className={inputCls} value={form.depart} onChange={set("depart")}>
            {airports.map((a) => (
              <option key={a.code} value={a.code}>{a.label}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-foreground/70">
            <Users size={13} /> Počet osôb
          </span>
          <input type="number" min={1} max={12} className={inputCls} value={form.people} onChange={set("people")} />
        </label>
        <label className="block md:col-span-2">
          <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-foreground/70">
            <Wallet size={13} /> Rozpočet na osobu (€, bez letenky)
          </span>
          <input type="number" step={100} className={inputCls} value={form.budget} onChange={set("budget")} />
        </label>
      </div>

      <div className="mt-5">
        <span className="text-xs font-medium text-foreground/70">Typ cestovania</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {travelStyles.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggleStyle(s)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-all duration-200",
                styles.includes(s)
                  ? "border-primary bg-primary text-white shadow-soft"
                  : "border-border bg-white/70 text-foreground/80 hover:border-primary/50"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={submit}
        className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-base font-semibold text-white shadow-lift transition hover:bg-primary-dark active:scale-[0.99] cursor-pointer"
      >
        <Sparkles size={18} className="text-accent-light" />
        Vytvor itinerár
      </button>
    </div>
  );
}
