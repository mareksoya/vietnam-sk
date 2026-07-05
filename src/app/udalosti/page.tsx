import type { Metadata } from "next";
import { EventsList } from "@/components/events/events-list";
import { upcomingEvents } from "@/lib/data/events";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Udalosti a festivaly vo Vietname 2026/2027",
  description:
    "Kalendár najbližších udalostí vo Vietname: Tet, lampiónové festivaly v Hoi An, DIFF ohňostroje, štátne sviatky a gastro festivaly — s dátumami a oficiálnymi zdrojmi.",
};

export default function EventsPage() {
  const events = upcomingEvents();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: events.slice(0, 10).map((e, i) => ({
      "@type": "Event",
      position: i + 1,
      name: e.name,
      startDate: e.startDate,
      endDate: e.endDate,
      location: { "@type": "Place", name: e.city ?? e.region, address: "Vietnam" },
      description: e.summary,
    })),
  };

  return (
    <div className="mx-auto max-w-4xl px-6 pb-16 pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">
        Inteligentný kalendár
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-5xl">
        Udalosti a festivaly
      </h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
        Čo sa chystá vo Vietname — festivaly, štátne sviatky, lampiónové noci a
        oslavy. Zostavené z oficiálnych zdrojov vietnamského turizmu.
      </p>

      <div className="mt-10">
        <EventsList events={events} />
      </div>

      <p className="mt-10 rounded-3xl bg-muted p-5 text-xs leading-relaxed text-muted-foreground">
        Dátumy vychádzajú z oficiálneho portálu vietnam.travel (Vietnam National
        Authority of Tourism) a lunárneho kalendára. Termíny lunárnych sviatkov
        sa každý rok menia — pred cestou si ich over v uvedených zdrojoch.
        Kalendár priebežne dopĺňame.
      </p>
    </div>
  );
}
