import type { Metadata } from "next";
import Link from "next/link";
import {
  Stamp,
  Wifi,
  CreditCard,
  ShieldCheck,
  HeartPulse,
  Bus,
  ArrowRight,
} from "lucide-react";
import { practicalTopics } from "@/lib/data/practical";

export const metadata: Metadata = {
  title: "Praktické informácie pre cestu do Vietnamu",
  description:
    "Víza a e-víza, SIM karty a eSIM, mena a ceny, bezpečnosť a scamy, zdravie a očkovanie, doprava — všetko, čo potrebuješ vedieť pred cestou do Vietnamu.",
};

const icons = {
  stamp: Stamp,
  wifi: Wifi,
  creditcard: CreditCard,
  shield: ShieldCheck,
  heart: HeartPulse,
  bus: Bus,
} as const;

export default function PracticalHub() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-16 pt-32">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">
        Praktické info
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-5xl">
        Všetko pred odletom
      </h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
        Overené informácie z oficiálnych zdrojov, zrozumiteľne po slovensky.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {practicalTopics.map((t) => {
          const Icon = icons[t.icon];
          return (
            <Link
              key={t.slug}
              href={`/prakticke-info/${t.slug}`}
              className="group flex gap-5 rounded-3xl border border-border bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lift"
            >
              <span className="h-fit rounded-2xl bg-primary-light p-3.5 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <Icon size={24} />
              </span>
              <div>
                <h2 className="font-semibold tracking-tight md:text-lg">
                  {t.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/70">
                  {t.excerpt}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Čítať sprievodcu
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
