import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/tool-page";
import { VietnamClock } from "@/components/tools/vietnam-clock";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find((t) => t.id === "cas")!;

export const metadata: Metadata = {
  title: `${tool.title} — vietnam.sk`,
  description: tool.desc,
};

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <VietnamClock />
    </ToolPage>
  );
}
