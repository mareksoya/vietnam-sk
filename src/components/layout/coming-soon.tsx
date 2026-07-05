import Link from "next/link";
import { Sparkles } from "lucide-react";

export function ComingSoon({
  eyebrow,
  title,
  description,
  phase,
}: {
  eyebrow: string;
  title: string;
  description: string;
  phase: string;
}) {
  return (
    <div className="mx-auto flex min-h-[70svh] max-w-2xl flex-col items-center justify-center px-6 pt-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">
        {eyebrow}
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
        {description}
      </p>
      <p className="mt-6 rounded-full bg-accent-light px-5 py-2 text-xs font-semibold text-accent">
        Pripravujeme — {phase}
      </p>
      <Link
        href="/planovac"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:bg-primary-dark"
      >
        <Sparkles size={15} className="text-accent-light" />
        Medzitým si naplánuj cestu
      </Link>
    </div>
  );
}
