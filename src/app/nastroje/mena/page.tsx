import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/tool-page";
import { CurrencyConverter } from "@/components/tools/currency-converter";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find((t) => t.id === "mena")!;

export const metadata: Metadata = {
  title: `${tool.title} (EUR/VND) — vietnam.sk`,
  description: tool.desc,
};

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <CurrencyConverter />
    </ToolPage>
  );
}
