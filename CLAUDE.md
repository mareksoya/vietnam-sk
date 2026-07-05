# CLAUDE.md — vietnam.sk

## Čo je tento projekt
Slovenský cestovateľský portál o Vietname (Next.js 15, React 19, TypeScript, Tailwind CSS v4).
Live: https://vietnam-sk.vercel.app — každý push do `main` automaticky nasadí Vercel.
Majiteľ je nie-programátor: vysvetľuj zrozumiteľne, zmeny rob priamo a over ich.

## Jediný zdroj pravdy pre dizajn
**`docs/vietnam-sk-design-system.md`** — čítaj PRED každou zmenou UI, dodržuj bez výnimky
(farby lacquer/jade/sand, fonty Source Serif 4 + Be Vietnam Pro, radius 4/8/16, sand-box vzor,
zákaz glassmorphism a Inter). Nové dizajnové rozhodnutia okamžite dopisuj do tohto dokumentu (§10 changelog).

Celková architektúra a roadmapa: `docs/ARCHITEKTURA.md`.

## Štruktúra
- `src/app` — stránky (App Router) + `api/planner/generate` (OpenAI itineráre)
- `src/components` — ui / layout / home / cards / planner / map / events
- `src/lib/data` — obsah: destinations, events (z oficiálnych zdrojov), practical, preset-itineraries (18 predgenerovaných trás), sample-itinerary
- `public/images` — fotky destinácií (Adobe Stock, optimalizované 2000px)
- `prisma/schema.prisma` — pripravená schéma, DB zatiaľ NIE je zapojená

## Env premenné (nastavené vo Verceli)
`OPENAI_API_KEY` (planner), `NEXT_PUBLIC_MAPBOX_TOKEN` (mapa). Lokálne: skopíruj do `.env` podľa `.env.example`.

## Stav a známe dlhy
- Hotové: homepage, AI plánovač (presety + OpenAI), interaktívna mapa, destinácie (12), udalosti (oficiálne zdroje, jún 2026), praktické info (6 tém), redizajn jadra podľa design systému
- **Migračný dlh:** /planovac, /mapa, /udalosti, /prakticke-info a /destinacie/[slug] ešte používajú staré tvary (rounded-full, rounded-3xl) — pri úprave súboru zosúlaď s design systémom
- Ďalšie fázy (ARCHITEKTURA.md §8): DB (Neon/Postgres + Prisma), auto-import udalostí cronom, účty, exporty PDF/GPX/iCal, vlastná doména vietnam.sk

## Pravidlá
- Texty po slovensky, tón podľa design systému §7 (žiadne superlatívy, konkrétne fakty, ceny v € + VND)
- Udalosti a fakty len z oficiálnych zdrojov s citáciou (sourceName/sourceUrl)
- Pred commitom: `npm run build` musí prejsť
