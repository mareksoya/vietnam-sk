import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = {
  title: "Udalosti a festivaly vo Vietname",
  description:
    "Kalendár festivalov, štátnych sviatkov, nočných trhov a lampiónových festivalov vo Vietname — filtrovanie podľa dátumu, regiónu a kategórie.",
};

export default function EventsPage() {
  return (
    <ComingSoon
      eyebrow="Inteligentný kalendár"
      title="Udalosti a festivaly"
      description="Tet, lampiónové festivaly v Hoi An, nočné trhy aj lokálne oslavy — s filtrovaním podľa dátumu, regiónu a kategórie. Udalosti sa budú automaticky importovať z oficiálnych zdrojov."
      phase="Fáza 2"
    />
  );
}
