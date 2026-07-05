import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = {
  title: "Hotové itineráre",
  description:
    "Overené trasy po Vietname — 2 týždne, 3 týždne aj mesiac. Deň po dni s presunmi, cenami a tipmi.",
};

export default function ItinerariesPage() {
  return (
    <ComingSoon
      eyebrow="Itineráre"
      title="Hotové trasy"
      description="Kurátorské itineráre: 2-týždňová klasika sever–juh, 3 týždne s Phong Nha, mesiac pre backpackerov aj trasy pre rodiny. Zatiaľ vyskúšaj AI plánovač."
      phase="Fáza 1"
    />
  );
}
