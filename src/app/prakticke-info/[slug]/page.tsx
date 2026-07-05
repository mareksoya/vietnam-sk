import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, ArrowLeft, Sparkles } from "lucide-react";
import { practicalTopics, getPracticalTopic } from "@/lib/data/practical";

export function generateStaticParams() {
  return practicalTopics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getPracticalTopic(slug);
  if (!t) return {};
  return {
    title: `${t.title} — praktický sprievodca`,
    description: t.excerpt,
  };
}

export default async function PracticalDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getPracticalTopic(slug);
  if (!t) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <article className="mx-auto max-w-3xl px-6 pb-16 pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="text-xs text-muted-foreground">
        <Link href="/" className="hover:text-primary">Domov</Link>
        {" / "}
        <Link href="/prakticke-info" className="hover:text-primary">
          Praktické info
        </Link>
        {" / "}
        <span className="text-foreground">{t.title}</span>
      </nav>

      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
        {t.title}
      </h1>
      <p className="mt-3 text-base text-muted-foreground">{t.excerpt}</p>

      <div className="mt-10 space-y-10">
        {t.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-xl font-semibold tracking-tight">
              {s.heading}
            </h2>
            {s.body.split("\n\n").map((p, i) => (
              <p
                key={i}
                className="mt-3 text-[15px] leading-relaxed text-foreground/80"
              >
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">Časté otázky</h2>
        <div className="mt-4 space-y-3">
          {t.faq.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-border bg-white p-5 shadow-soft"
            >
              <summary className="cursor-pointer list-none font-medium marker:hidden">
                {f.q}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {t.sourceUrl && (
        <a
          href={t.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          Oficiálny zdroj: {t.sourceName} <ExternalLink size={13} />
        </a>
      )}

      <div className="mt-12 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/prakticke-info"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-6 py-3.5 text-sm font-medium transition hover:border-primary/40"
        >
          <ArrowLeft size={15} /> Všetky témy
        </Link>
        <Link
          href="/planovac"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:bg-primary-dark"
        >
          <Sparkles size={15} className="text-accent-light" />
          Naplánovať cestu
        </Link>
      </div>
    </article>
  );
}
