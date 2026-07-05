"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { cn, MONTHS_SK } from "@/lib/utils";

const WEEKDAYS = ["po", "ut", "st", "št", "pi", "so", "ne"];

const pad = (n: number) => String(n).padStart(2, "0");
const toISO = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/* Oblý date-picker podľa design systému (§2): jade výber, radius-md/lg,
   slovenské názvy, týždeň od pondelka. Bez externej knižnice. */
export function DatePicker({
  value,
  onChange,
  placeholder = "Vyber dátum",
  className,
}: {
  value: string; // ISO "YYYY-MM-DD" alebo ""
  onChange: (iso: string) => void;
  placeholder?: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const today = startOfDay(new Date());
  const selected = value ? startOfDay(new Date(value)) : null;

  const [view, setView] = useState(() => {
    const base = selected ?? today;
    return { y: base.getFullYear(), m: base.getMonth() };
  });

  // Zavri po kliku mimo / Esc
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const openPicker = () => {
    const base = selected ?? today;
    setView({ y: base.getFullYear(), m: base.getMonth() });
    setOpen(true);
  };

  const shiftMonth = (delta: number) =>
    setView((v) => {
      const m = v.m + delta;
      return { y: v.y + Math.floor(m / 12), m: ((m % 12) + 12) % 12 };
    });

  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const leadRaw = new Date(view.y, view.m, 1).getDay(); // 0=ne..6=so
  const lead = (leadRaw + 6) % 7; // 0=po..6=ne
  const cells: (number | null)[] = [
    ...Array(lead).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const label = selected
    ? `${selected.getDate()}. ${MONTHS_SK[selected.getMonth()]} ${selected.getFullYear()}`
    : placeholder;

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openPicker())}
        className={cn(
          "flex h-11 w-full items-center justify-between gap-2 rounded-sm border border-border bg-surface px-3.5 text-left text-sm outline-none transition-colors duration-150 focus:border-jade",
          open && "border-jade",
          className
        )}
      >
        <span className={cn("data-num", selected ? "text-foreground" : "text-muted-foreground")}>
          {label}
        </span>
        <CalendarDays size={16} className="shrink-0 text-jade" />
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-30 w-[288px] rounded-lg border border-border bg-surface p-3 shadow-lift">
          {/* Hlavička mesiaca */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              aria-label="Predošlý mesiac"
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-sand hover:text-jade"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm font-semibold">
              {MONTHS_SK[view.m]} {view.y}
            </span>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              aria-label="Ďalší mesiac"
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-sand hover:text-jade"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Dni v týždni */}
          <div className="mt-3 grid grid-cols-7 gap-1">
            {WEEKDAYS.map((w) => (
              <span
                key={w}
                className="flex h-7 items-center justify-center text-[11px] font-medium uppercase tracking-wide text-muted-foreground"
              >
                {w}
              </span>
            ))}
          </div>

          {/* Mriežka dní */}
          <div className="mt-1 grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              if (d === null) return <span key={`e${i}`} />;
              const date = new Date(view.y, view.m, d);
              const iso = toISO(view.y, view.m, d);
              const isPast = date < today;
              const isSel = selected != null && date.getTime() === selected.getTime();
              const isToday = date.getTime() === today.getTime();
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={isPast}
                  onClick={() => {
                    onChange(iso);
                    setOpen(false);
                  }}
                  className={cn(
                    "data-num flex h-9 items-center justify-center rounded-md text-sm transition-colors duration-150",
                    isSel
                      ? "bg-jade font-semibold text-white"
                      : isPast
                        ? "cursor-not-allowed text-muted-foreground/40"
                        : "text-foreground hover:bg-sand",
                    !isSel && isToday && "font-semibold text-jade"
                  )}
                >
                  {d}
                </button>
              );
            })}
          </div>

          {/* Pätička: dnes / vymazať */}
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-[13px]">
            <button
              type="button"
              onClick={() => {
                onChange(toISO(today.getFullYear(), today.getMonth(), today.getDate()));
                setOpen(false);
              }}
              className="font-medium text-jade transition-colors hover:text-accent-dark"
            >
              Dnes
            </button>
            {selected && (
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Vymazať
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
