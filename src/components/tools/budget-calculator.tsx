"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/* Orientačné denné náklady na osobu (bez medzinárodnej letenky), € / deň.
   Zdroj: praktické info vietnam.sk (ubytovanie, jedlo, doprava, aktivity). */
const STYLES = {
  Backpacking: { day: 30, label: "Hostely, street food, bus" },
  "Stredná trieda": { day: 60, label: "3* hotel, reštaurácie, občasný let" },
  Komfort: { day: 120, label: "4–5* hotel, súkromné transfery, výlety" },
} as const;

type StyleKey = keyof typeof STYLES;

const RATE = 27500;
const fmt = (n: number) => n.toLocaleString("sk-SK", { maximumFractionDigits: 0 });

export function BudgetCalculator() {
  const [style, setStyle] = useState<StyleKey>("Stredná trieda");
  const [days, setDays] = useState("14");
  const [people, setPeople] = useState("2");
  const [visa, setVisa] = useState(true);
  const [sim, setSim] = useState(true);

  const d = Math.max(Number(days) || 0, 0);
  const p = Math.max(Number(people) || 0, 0);
  const perDay = STYLES[style].day;
  const oneOff = (visa ? 45 : 0) + (sim ? 11 : 0); // e-víza ~45 €, SIM ~11 €
  const perPerson = d * perDay + oneOff;
  const total = perPerson * p;

  const numCls =
    "h-11 w-full rounded-sm border border-border bg-surface px-3.5 text-sm outline-none transition-colors duration-150 focus:border-jade data-num text-foreground";

  return (
    <div className="rounded-lg border border-border bg-surface p-6 shadow-soft md:p-8">
      <div>
        <span className="mb-1.5 block text-[13px] font-medium text-muted-foreground">
          Štýl cestovania
        </span>
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(STYLES) as StyleKey[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStyle(s)}
              className={cn(
                "rounded-md border p-3 text-left transition-colors duration-150",
                style === s
                  ? "border-jade bg-primary-light"
                  : "border-border bg-surface hover:border-jade"
              )}
            >
              <span className="block text-sm font-semibold leading-relaxed">
                {s}
              </span>
              <span className="mt-1 block text-[12px] leading-relaxed text-muted-foreground">
                {STYLES[s].label}
              </span>
              <span className="data-num mt-2 block text-[13px] font-semibold text-jade">
                ~{STYLES[s].day} € / deň
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-medium text-muted-foreground">
            Počet dní
          </span>
          <input
            type="number"
            min={1}
            className={numCls}
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-medium text-muted-foreground">
            Počet osôb
          </span>
          <input
            type="number"
            min={1}
            className={numCls}
            value={people}
            onChange={(e) => setPeople(e.target.value)}
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={visa}
            onChange={() => setVisa(!visa)}
            className="h-4 w-4 accent-jade"
          />
          E-víza (~45 € / os.)
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={sim}
            onChange={() => setSim(!sim)}
            className="h-4 w-4 accent-jade"
          />
          SIM s dátami (~11 € / os.)
        </label>
      </div>

      {/* Sand-box výsledok */}
      <div className="sand-box mt-6">
        <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-jade">
          Odhad rozpočtu · bez medzinárodnej letenky
        </p>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt>Na osobu ({fmt(d)} dní × {perDay} € + jednorazové)</dt>
            <dd className="data-num whitespace-nowrap font-semibold text-foreground">
              {fmt(perPerson)} €
            </dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-lacquer/20 pt-2">
            <dt className="font-semibold">Spolu za {fmt(p)} {p === 1 ? "osobu" : "osoby"}</dt>
            <dd className="data-num whitespace-nowrap text-base font-semibold text-foreground">
              {fmt(total)} €
            </dd>
          </div>
          <div className="flex justify-between gap-4 text-muted-foreground">
            <dt>≈ vo VND</dt>
            <dd className="data-num whitespace-nowrap">{fmt(total * RATE)} VND</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
