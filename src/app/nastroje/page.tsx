import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = {
  title: "Interaktívne nástroje",
  description:
    "Kalkulačka rozpočtu, prevod meny, balíkový zoznam, checklist pred odletom, vietnamčina pre turistov a ďalšie nástroje.",
};

export default function ToolsPage() {
  return (
    <ComingSoon
      eyebrow="Nástroje"
      title="Interaktívne nástroje"
      description="Kalkulačka rozpočtu, prevod EUR/VND, balíkový zoznam, checklist pred odletom, vietnamčina pre turistov, časový posun, Street Food a Hidden Gems Finder."
      phase="Fáza 2–3"
    />
  );
}
