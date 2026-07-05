"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/planovac", label: "Plánovač" },
  { href: "/mapa", label: "Mapa" },
  { href: "/destinacie", label: "Destinácie" },
  { href: "/udalosti", label: "Udalosti" },
  { href: "/prakticke-info", label: "Praktické info" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 pt-4">
      <div className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-6 py-3 shadow-soft">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="text-primary text-lg">Vietnam</span>
          <span className="text-accent text-lg">.sk</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-foreground/80 transition-colors hover:bg-white/60 hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/planovac"
            className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-dark"
          >
            <Sparkles size={15} />
            Vytvor itinerár
          </Link>
          <button
            className="md:hidden rounded-full p-2 hover:bg-white/60"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl transition-all duration-300",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <nav className="glass flex flex-col gap-1 rounded-3xl p-4 shadow-soft">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm font-medium hover:bg-white/60"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
