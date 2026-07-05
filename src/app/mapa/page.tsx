import type { Metadata } from "next";
import { VietnamMap } from "@/components/map/vietnam-map";

export const metadata: Metadata = {
  title: "Interaktívna mapa Vietnamu",
  description:
    "Klikateľná mapa Vietnamu — mestá, pláže, hory, národné parky, ostrovy a UNESCO pamiatky s detailmi a itinerármi.",
};

export default function MapPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-28 md:px-6">
      <VietnamMap />
    </div>
  );
}
