"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
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
  const pathname = usePathname();

  return (
    <>
      <header className="nav-bar fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 md:px-8">
        <Link
          href="/"
          className="font-display text-xl font-medium tracking-tight"
        >
          vietnam<span className="text-lacquer">.sk</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm underline-offset-[6px] transition-colors duration-150 hover:text-jade",
                  active
                    ? "text-jade underline decoration-2"
                    : "text-foreground/80"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/planovac"
            className="ml-2 flex h-11 items-center rounded-md bg-lacquer px-5 text-sm font-medium text-white transition-colors duration-150 hover:bg-lacquer-deep"
          >
            Otvoriť plánovač
          </Link>
        </nav>

        <button
          className="rounded-md p-2 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Zavrieť menu" : "Otvoriť menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      </header>

      {/* Mobile: svetlý overlay na rice-paper pozadí, tiché body-font linky (§4).
          MIMO <header> — .nav-bar má backdrop-filter, ktorý robí z hlavičky
          containing block pre position:fixed → inak by overlay nepokryl obrazovku. */}
      {open && (
        <div className="fixed inset-0 top-16 z-40 bg-background md:hidden">
          <nav className="flex flex-col px-4 pt-2">
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex min-h-12 items-center border-b border-border text-[17px] font-medium tracking-[-0.008em] transition-colors duration-150",
                    active ? "text-lacquer" : "text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
