import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/tool-page";
import { BudgetCalculator } from "@/components/tools/budget-calculator";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find((t) => t.id === "rozpocet")!;

export const metadata: Metadata = {
  title: `${tool.title} — vietnam.sk`,
  description: tool.desc,
};

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <BudgetCalculator />
    </ToolPage>
  );
}
