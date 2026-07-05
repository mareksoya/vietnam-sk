import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/tool-page";
import { PackingChecklist } from "@/components/tools/packing-checklist";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find((t) => t.id === "balenie")!;

export const metadata: Metadata = {
  title: `${tool.title} — vietnam.sk`,
  description: tool.desc,
};

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <PackingChecklist />
    </ToolPage>
  );
}
