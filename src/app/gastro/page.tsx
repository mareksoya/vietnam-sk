import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = {
  title: "Street food a kávová kultúra",
  description:
    "Pho, banh mi, bun cha, egg coffee — sprievodca vietnamskou gastronómiou, street foodom a kaviarňami.",
};

export default function GastroPage() {
  return (
    <ComingSoon
      eyebrow="Gastronómia"
      title="Street food a káva"
      description="Sprievodca pho, banh mi, bun cha a regionálnymi špecialitami, Street Food Finder podľa mesta a mapa najlepších kaviarní vrátane egg coffee v Hanoji."
      phase="Fáza 2"
    />
  );
}
