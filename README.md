# Vietnam.sk

Inteligentná cestovateľská platforma o Vietname. Next.js 15 + React 19 + TypeScript + Tailwind CSS 4.

Kompletný návrh (IA, DB model, dizajn systém, API, roadmapa): **docs/ARCHITEKTURA.md**

## Lokálne spustenie

```bash
npm install
cp .env.example .env        # doplň NEXT_PUBLIC_MAPBOX_TOKEN (mapbox.com, free tier)
npm run dev                 # http://localhost:3000
```

Bez Mapbox tokenu funguje všetko — mapa použije OpenStreetMap fallback.

## Čo je hotové (Fáza 0)

- Dizajn systém (zelená/zlatá/glassmorphism, Inter + Playfair, tokeny v `globals.css`)
- Homepage: hero, plánovací formulár s typmi cestovania, kategórie, top destinácie, praktické info
- AI Planner: `/planovac` — formulár (tempo, deti, motorka, nočné vlaky, lety) → ukážkový 7-dňový itinerár s timeline, mapou, nákladmi a export tlačidlami
- Interaktívna mapa: `/mapa` — filtre podľa typu, klikateľné body (Mapbox alebo OSM fallback)
- Destinácie: `/destinacie` + 12 detailov so quick facts, mapou, JSON-LD, interným prelinkovaním
- SEO: metadata, OpenGraph, sitemap.xml, robots.txt, schema.org TouristDestination
- Prisma schéma celej platformy (`prisma/schema.prisma`)
- Docker + Caddy deploy pre Contabo

## Nasadenie na Contabo (Ubuntu)

```bash
# na serveri
apt update && apt install -y docker.io docker-compose-v2
git clone <repo> vietnam-sk && cd vietnam-sk
cp .env.example .env && nano .env      # heslá + tokeny
docker compose up -d --build
```

DNS: A záznam `vietnam.sk` → IP servera. Caddy vybaví HTTPS automaticky.
Odporúčané: Cloudflare proxy pred serverom (CDN + ochrana).

## Ďalšie fázy (docs/ARCHITEKTURA.md §8)

1. **MVP launch** — OpenAI generovanie itinerárov (`src/app/api/planner/generate/route.ts`), Prisma + PostgreSQL (`npm i prisma @prisma/client && npx prisma migrate dev`), obsah 15 destinácií
2. **Obsah & SEO** — kalendár udalostí, auto-import z oficiálnych zdrojov + AI články so schvaľovaním, programmatic SEO
3. **Účty** — NextAuth, uložené itineráre, exporty PDF/GPX/iCal, AI chat
4. **Monetizácia** — affiliate, Stripe

## Štruktúra

```
src/app          stránky + API routes
src/components   ui / layout / home / cards / planner / map
src/lib          utils + seed dáta (nahradí DB)
prisma           databázová schéma
docs             architektúra
```
