"use client";

import { useEffect, useState } from "react";

/* Vietnam = Indochina Time (UTC+7), bez letného času.
   Slovensko = UTC+1 (zima) / UTC+2 (leto). Posun teda +5 h (leto) / +6 h (zima). */
function vietnamParts(now: Date) {
  // Prepočet na VN čas cez UTC (nezávislé od zóny prehliadača)
  const vn = new Date(now.getTime() + (7 * 60 + now.getTimezoneOffset()) * 60000);
  return vn;
}

const two = (n: number) => String(n).padStart(2, "0");
const DNI = ["nedeľa", "pondelok", "utorok", "streda", "štvrtok", "piatok", "sobota"];

export function VietnamClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return (
      <div className="rounded-lg border border-border bg-surface p-6 shadow-soft md:p-8">
        <div className="h-24 animate-pulse rounded-md bg-border/60" />
      </div>
    );
  }

  const vn = vietnamParts(now);
  // Posun oproti lokálnemu času používateľa (v hodinách)
  const offsetH = Math.round((vn.getTime() - now.getTime()) / 3600000);

  return (
    <div className="rounded-lg border border-border bg-surface p-6 shadow-soft md:p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-jade">
            Vietnam práve teraz
          </p>
          <p className="data-num mt-2 text-[49px] font-semibold leading-none tabular-nums">
            {two(vn.getHours())}:{two(vn.getMinutes())}
            <span className="text-2xl text-muted-foreground">:{two(vn.getSeconds())}</span>
          </p>
          <p className="mt-2 text-sm capitalize text-muted-foreground">
            {DNI[vn.getDay()]}, {vn.getDate()}. {vn.getMonth() + 1}. {vn.getFullYear()}
          </p>
        </div>
        <div className="sm:border-l sm:border-border sm:pl-6">
          <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
            U teba
          </p>
          <p className="data-num mt-2 text-[31px] font-semibold leading-none tabular-nums text-foreground/80">
            {two(now.getHours())}:{two(now.getMinutes())}
          </p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-sm bg-primary-light px-3 py-1.5 text-sm font-medium text-jade">
            Vietnam je o {offsetH} h {offsetH >= 0 ? "napred" : "pozadu"}
          </p>
        </div>
      </div>
      <p className="mt-5 border-t border-border pt-4 text-sm text-foreground/75">
        Vietnam má jedno časové pásmo (UTC+7) a <strong>nepoužíva letný čas</strong>.
        Posun je preto +5 h v lete a +6 h v zime oproti Slovensku.
      </p>
    </div>
  );
}
