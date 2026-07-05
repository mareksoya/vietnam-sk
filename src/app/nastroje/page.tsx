import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TOOLS } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Interaktívne nástroje pre cestu do Vietnamu",
  description:
    "Prevod EUR/VND, kalkulačka rozpočtu, aktuálny čas vo Vietname, balíkový checklist a vietnamčina pre turistov — praktické nástroje na jednom mieste.",
};

export default function ToolsHub() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-24 pt-28 md:px-8">
      <header>
        <p className="eyebrow">Nástroje</p>
        <h1 className="mt-2 font-display text-[39px] font-semibold leading-[1.1]">
          Interaktívne nástroje
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground leading-relaxed">
          Praktické pomôcky na naplánovanie a prežitie cesty — prepočty, rozpočet,
          čas, balenie aj základná vietnamčina. Všetko funguje priamo v prehliadači.
        </p>
      </header>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {TOOLS.map((t) => (
          <Link
            key={t.id}
            href={t.href}
            className="group flex gap-4 rounded-lg border border-border bg-surface p-6 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-jade/40 hover:shadow-lift"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary-light text-jade transition-colors group-hover:bg-jade group-hover:text-white">
              <t.icon size={22} />
            </span>
            <div className="min-w-0">
              <h2 className="text-lg font-semibold leading-snug">{t.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {t.desc}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-jade">
                Otvoriť
                <ArrowRight
                  size={14}
                  className="transition-transform duration-150 group-hover:translate-x-0.5"
                />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
