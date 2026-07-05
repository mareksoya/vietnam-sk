import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = {
  title: "Digitálni nomádi vo Vietname",
  description:
    "Coworking, kaviarne na prácu, internet, eSIM a najlepšie mestá pre digitálnych nomádov vo Vietname.",
};

export default function NomadsPage() {
  return (
    <ComingSoon
      eyebrow="Digitálni nomádi"
      title="Práca na diaľku z Vietnamu"
      description="Da Nang, Ho Či Minovo mesto či Hanoj? Coworkingy, kaviarne s dobrou wifi, ceny dlhodobých pobytov, víza a komunity."
      phase="Fáza 2"
    />
  );
}
