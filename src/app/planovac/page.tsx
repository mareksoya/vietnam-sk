import type { Metadata } from "next";
import { PlannerForm } from "@/components/planner/planner-form";

export const metadata: Metadata = {
  title: "AI Plánovač itinerára",
  description:
    "Naplánuj si dovolenku vo Vietname za pár sekúnd. AI zostaví itinerár deň po dni — presuny, atrakcie, street food, hotely aj rozpočet.",
};

export default async function PlannerPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const prefill = Object.fromEntries(
    Object.entries(params).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v ?? ""])
  );

  return (
    <div className="mx-auto max-w-6xl px-6 pb-16 pt-32">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          AI Plánovač
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-5xl">
          Tvoj itinerár na mieru
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground md:text-base">
          Deň po dni: presuny, atrakcie, jedlo, hotely, časy aj orientačné
          náklady.
        </p>
      </div>
      <div className="mt-10">
        <PlannerForm prefill={prefill} />
      </div>
    </div>
  );
}
