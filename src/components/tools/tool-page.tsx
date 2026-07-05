import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ToolMeta } from "@/lib/tools";

/* Spoločný rámec stránky jedného nástroja: breadcrumb, nadpis, popis, obsah. */
export function ToolPage({
  tool,
  children,
}: {
  tool: ToolMeta;
  children: React.ReactNode;
}) {
  const Icon = tool.icon;
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-28 md:px-8">
      <Link
        href="/nastroje"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-jade"
      >
        <ArrowLeft size={15} />
        Späť na nástroje
      </Link>

      <header className="mt-6 flex items-start gap-4">
        <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary-light text-jade">
          <Icon size={24} />
        </span>
        <div>
          <p className="eyebrow">Nástroj</p>
          <h1 className="mt-1.5 font-display text-[31px] font-semibold leading-snug md:text-[39px]">
            {tool.title}
          </h1>
          <p className="mt-2 max-w-xl text-muted-foreground leading-relaxed">
            {tool.desc}
          </p>
        </div>
      </header>

      <div className="mt-8">{children}</div>
    </div>
  );
}
