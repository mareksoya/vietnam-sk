"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const fmt = (n: number, dp = 0) =>
  n.toLocaleString("sk-SK", { minimumFractionDigits: dp, maximumFractionDigits: dp });

const inputCls =
  "h-11 w-full rounded-sm border border-border bg-surface px-3.5 text-sm outline-none transition-colors duration-150 focus:border-jade data-num text-foreground";

const QUICK = [1, 5, 10, 20, 50, 100];

export function CurrencyConverter() {
  const [rate, setRate] = useState(27500);
  const [eur, setEur] = useState("10");
  const [vnd, setVnd] = useState(String(10 * 27500));

  const setFromEur = (v: string) => {
    setEur(v);
    const n = parseFloat(v.replace(",", "."));
    setVnd(Number.isFinite(n) ? String(Math.round(n * rate)) : "");
  };
  const setFromVnd = (v: string) => {
    setVnd(v);
    const n = parseFloat(v.replace(/\s/g, "").replace(",", "."));
    setEur(Number.isFinite(n) ? (n / rate).toFixed(2) : "");
  };
  const setNewRate = (v: string) => {
    const n = parseFloat(v.replace(",", "."));
    setRate(n || 0);
    const e = parseFloat(eur.replace(",", "."));
    if (Number.isFinite(e) && n) setVnd(String(Math.round(e * n)));
  };

  return (
    <div className="rounded-lg border border-border bg-surface p-6 shadow-soft md:p-8">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-medium text-muted-foreground">
            Eurá (€)
          </span>
          <input
            inputMode="decimal"
            className={inputCls}
            value={eur}
            onChange={(e) => setFromEur(e.target.value)}
          />
        </label>
        <span className="hidden pb-3 text-lg text-muted-foreground sm:block">=</span>
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-medium text-muted-foreground">
            Dong (VND)
          </span>
          <input
            inputMode="numeric"
            className={inputCls}
            value={vnd}
            onChange={(e) => setFromVnd(e.target.value)}
          />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {QUICK.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => setFromEur(String(q))}
            className={cn(
              "rounded-sm border px-3 py-1.5 text-[13px] font-medium transition-colors duration-150",
              eur === String(q)
                ? "border-jade bg-jade text-white"
                : "border-border bg-surface text-muted-foreground hover:border-jade"
            )}
          >
            {q} €
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <label className="flex items-center gap-2 text-[13px] text-muted-foreground">
          Kurz: 1 € =
          <input
            inputMode="numeric"
            value={rate}
            onChange={(e) => setNewRate(e.target.value)}
            className="h-9 w-24 rounded-sm border border-border bg-surface px-2.5 text-sm outline-none focus:border-jade data-num text-foreground"
          />
          VND
        </label>
        <p className="data-num text-[13px] text-muted-foreground">
          orientačný kurz, over si aktuálny pred cestou
        </p>
      </div>

      <p className="mt-4 text-sm text-foreground/75">
        Rýchly odhad: <strong className="font-semibold">1 €</strong> ≈{" "}
        <span className="data-num">{fmt(rate)}</span> VND ·{" "}
        <strong className="font-semibold">100 000 VND</strong> ≈{" "}
        <span className="data-num">{fmt(100000 / rate, 2)}</span> €
      </p>
    </div>
  );
}
