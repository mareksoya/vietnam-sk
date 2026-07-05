"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const GROUPS: { title: string; items: string[] }[] = [
  {
    title: "Dokumenty",
    items: [
      "Pas (platný min. 6 mesiacov)",
      "E-víza — vytlačené aj v mobile",
      "Cestovné poistenie",
      "Kópie dokladov (cloud + papier)",
      "Medzinárodný vodičák (na motorku)",
    ],
  },
  {
    title: "Oblečenie",
    items: [
      "Ľahké priedušné tričká",
      "Dlhé nohavice (chrámy, komáre)",
      "Pláštenka / lacný dáždnik",
      "Sandále + pohodlné tenisky",
      "Šatka na plecia (do chrámov)",
    ],
  },
  {
    title: "Elektronika",
    items: [
      "Adaptér (VN zásuvky typ A/C/F, 220 V)",
      "Powerbanka",
      "Nabíjačky a káble",
      "Slúchadlá",
    ],
  },
  {
    title: "Lekárnička",
    items: [
      "Repelent (DEET)",
      "Opaľovací krém SPF 50",
      "Lieky na hnačku + probiotiká",
      "Osobné lieky s receptom",
      "Dezinfekcia a náplasti",
    ],
  },
  {
    title: "Praktické",
    items: [
      "Grab appka (taxi/jedlo)",
      "Offline mapy (maps.me / Google offline)",
      "Malá hotovosť v USD na výmenu",
      "Filtračná fľaša na vodu",
    ],
  },
];

const ALL = GROUPS.flatMap((g) => g.items);
const KEY = "vietnam-sk-packing";

export function PackingChecklist() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setDone(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(done));
  }, [done, ready]);

  const toggle = (item: string) =>
    setDone((d) => ({ ...d, [item]: !d[item] }));

  const count = ALL.filter((i) => done[i]).length;
  const pct = Math.round((count / ALL.length) * 100);

  return (
    <div className="rounded-lg border border-border bg-surface p-6 shadow-soft md:p-8">
      {/* Progress */}
      <div className="flex items-center justify-between gap-4">
        <p className="data-num text-sm text-muted-foreground">
          {count} / {ALL.length} zbalené
        </p>
        <button
          type="button"
          onClick={() => setDone({})}
          className="text-[13px] font-medium text-muted-foreground underline underline-offset-4 transition-colors hover:text-jade"
        >
          Vynulovať
        </button>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-jade transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {GROUPS.map((g) => (
          <div key={g.title}>
            <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-jade">
              {g.title}
            </p>
            <ul className="mt-2 space-y-1">
              {g.items.map((item) => (
                <li key={item}>
                  <label className="flex cursor-pointer items-start gap-2.5 rounded-sm px-1 py-1.5 transition-colors hover:bg-sand/50">
                    <input
                      type="checkbox"
                      checked={!!done[item]}
                      onChange={() => toggle(item)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-jade"
                    />
                    <span
                      className={cn(
                        "text-sm leading-snug",
                        done[item] && "text-muted-foreground line-through"
                      )}
                    >
                      {item}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-6 border-t border-border pt-4 text-[13px] text-muted-foreground">
        Zoznam sa ukladá v tvojom prehliadači — nabudúce ťa počká odškrtnutý.
      </p>
    </div>
  );
}
