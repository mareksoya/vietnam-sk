"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ItineraryView } from "./itinerary-view";

const extras = [
  { key: "kids", label: "Cestujem s deťmi" },
  { key: "motorbike", label: "Chcem si prenajať motorku" },
  { key: "nightTrains", label: "Nočné vlaky sú OK" },
  { key: "domesticFly", label: "Vnútroštátne lety sú OK" },
] as const;

const paces = ["Pohodové", "Vyvážené", "Intenzívne"] as const;

export function PlannerForm({ prefill }: { prefill: Record<string, string> }) {
  const [pace, setPace] = useState<string>("Vyvážené");
  const [flags, setFlags] = useState<Record<string, boolean>>({
    nightTrains: true,
  });
  const [state, setState] = useState<"form" | "loading" | "result">("form");

  const toggle = (k: string) => setFlags((f) => ({ ...f, [k]: !f[k] }));

  const generate = async () => {
    setState("loading");
    // Fáza 1: fetch("/api/planner/generate", { method: "POST", body: JSON.stringify({...prefill, pace, ...flags}) })
    await new Promise((r) => setTimeout(r, 2200));
    setState("result");
  };

  if (state === "result") return <ItineraryView />;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-[2rem] border border-border bg-white p-6 shadow-soft md:p-8">
        <h2 className="text-lg font-semibold">Doladenie itinerára</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {prefill.days ? `${prefill.days} dní` : "14 dní"} ·{" "}
          {prefill.arrive || "HAN"} → {prefill.depart || "SGN"} ·{" "}
          {prefill.budget ? `${prefill.budget} € / os.` : "rozpočet neurčený"}
          {prefill.styles ? ` · ${prefill.styles.split(",").join(", ")}` : ""}
        </p>

        <div className="mt-6">
          <span className="text-xs font-medium text-foreground/70">
            Tempo cestovania
          </span>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {paces.map((p) => (
              <button
                key={p}
                onClick={() => setPace(p)}
                className={cn(
                  "rounded-2xl border px-4 py-3 text-sm font-medium transition-all",
                  pace === p
                    ? "border-primary bg-primary text-white shadow-soft"
                    : "border-border bg-white hover:border-primary/40"
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-2.5">
          {extras.map((e) => (
            <label
              key={e.key}
              className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border px-4 py-3.5 transition hover:border-primary/40"
            >
              <input
                type="checkbox"
                checked={!!flags[e.key]}
                onChange={() => toggle(e.key)}
                className="h-4.5 w-4.5 accent-[#2d6a4f]"
              />
              <span className="text-sm font-medium">{e.label}</span>
            </label>
          ))}
        </div>

        <button
          onClick={generate}
          disabled={state === "loading"}
          className="mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-base font-semibold text-white shadow-lift transition hover:bg-primary-dark disabled:opacity-70 cursor-pointer"
        >
          {state === "loading" ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              AI zostavuje tvoj itinerár…
            </>
          ) : (
            <>
              <Sparkles size={18} className="text-accent-light" />
              Vygenerovať itinerár
            </>
          )}
        </button>
        {state === "loading" && (
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Analyzujem presuny, počasie, otváracie hodiny a rozpočet…
          </p>
        )}
      </div>
    </div>
  );
}
