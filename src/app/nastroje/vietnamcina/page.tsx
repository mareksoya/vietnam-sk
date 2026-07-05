import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/tool-page";
import { Phrasebook } from "@/components/tools/phrasebook";
import { TOOLS } from "@/lib/tools";

const tool = TOOLS.find((t) => t.id === "vietnamcina")!;

export const metadata: Metadata = {
  title: `${tool.title} — vietnam.sk`,
  description: tool.desc,
};

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <Phrasebook />
    </ToolPage>
  );
}
