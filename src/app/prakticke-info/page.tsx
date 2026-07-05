import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = {
  title: "Praktické informácie",
  description:
    "Víza, SIM karty a eSIM, mena a ceny, bankomaty, bezpečnosť, scamy, zdravie a očkovanie — všetko pre cestu do Vietnamu.",
};

export default function PracticalPage() {
  return (
    <ComingSoon
      eyebrow="Praktické info"
      title="Všetko pred odletom"
      description="Víza a e-víza, SIM/eSIM, mena a bankomaty, bezpečnosť a scamy, zdravie a očkovanie, poistenie, doprava. Každá téma ako podrobný sprievodca s FAQ."
      phase="Fáza 1"
    />
  );
}
