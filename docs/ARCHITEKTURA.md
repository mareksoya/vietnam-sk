# Vietnam.sk — Architektúra platformy

Inteligentná cestovateľská platforma o Vietname pre slovenských a českých cestovateľov.
Nie blog — asistent, ktorý naplánuje celú dovolenku od inšpirácie po návrat domov.

---

## 1. Informačná architektúra

```
vietnam.sk
├── /                          Homepage (hero + AI vyhľadávanie)
├── /planovac                  AI Planner (hlavný diferenciátor)
│   └── /planovac/[id]         Vygenerovaný itinerár (zdieľateľný, exporty)
├── /mapa                      Interaktívna mapa Vietnamu (Mapbox)
├── /destinacie                Objav Vietnam
│   ├── /destinacie/[slug]     Detail: mesto / provincia / pláž / park / ostrov
│   └── filtre: región, typ, aktivity
├── /atrakcie
│   └── /atrakcie/[slug]       GPS, vstupné, hodiny, tipy, podobné
├── /udalosti                  Kalendár (festivaly, Tet, trhy, sviatky)
│   └── /udalosti/[slug]
├── /itinerare                 Kurátorské trasy (2 týždne, 3 týždne, 1 mesiac…)
│   └── /itinerare/[slug]
├── /prakticke-info            Víza, SIM/eSIM, mena, bezpečnosť, zdravie, scamy…
│   └── /prakticke-info/[slug]
├── /doprava                   Motorky, vlaky, autobusy, trajekty, lety
├── /gastro                    Street food, káva, reštaurácie
├── /nomadi                    Digitálni nomádi: coworking, kaviarne, internet
├── /nastroje                  Kalkulačky, checklisty, prekladač, findery
│   ├── /nastroje/rozpocet
│   ├── /nastroje/mena
│   ├── /nastroje/balenie
│   ├── /nastroje/vietnamcina
│   └── /nastroje/casovy-posun
├── /clanky                    Magazín + auto-generovaný obsah
│   └── /clanky/[slug]
├── /ucet                      Profil, obľúbené, itineráre, wishlist, navštívené
├── /admin                     CMS, schvaľovanie AI obsahu, import logy, štatistiky
└── SEO landing pages          programmatic: /destinacie/{mesto},
                               /pocasie/{mesto}-{mesiac}, /itinerare/{dni}-dni…
```

Navigácia (header): Plánovač · Mapa · Destinácie · Udalosti · Praktické info · Nástroje
Sekundárne (footer): všetkých ~50 tém zoskupených do 6 stĺpcov.

---

## 2. Databázový model (Prisma / PostgreSQL)

Kompletná schéma v `prisma/schema.prisma`. Jadro:

| Entita | Účel |
|---|---|
| `Region`, `Province` | Geografická hierarchia (8 regiónov, 63 provincií) |
| `Destination` | Mesto/pláž/park/ostrov — typ, GPS, popisy, SEO polia |
| `Attraction` | Atrakcie: GPS, vstupné, hodiny, história, tipy, rating |
| `Event` | Festivaly, sviatky, trhy — dátumy, opakovanie, región |
| `Itinerary` + `ItineraryDay` + `ItineraryItem` | AI aj kurátorské itineráre |
| `Article` | Články (manuálne aj AI) — stav draft→review→published, zdroj |
| `Source` + `ImportRun` | Sledované oficiálne zdroje + logy cron importov |
| `User`, `Favorite`, `VisitedPlace` | Účty, wishlist, navštívené |
| `Media` | Cloudinary assety |
| `Review` | Hodnotenia atrakcií |

Vzťahy: Destination ↔ Province ↔ Region; Attraction → Destination;
ItineraryItem → Attraction (polymorfne aj reštaurácie/hotely cez `type`).
Fulltext: PostgreSQL `tsvector` (slovenčina unaccent). Cache: Redis (počasie, kurzy, AI odpovede).

---

## 3. Dizajn systém

**Princípy:** Apple čistota + Airbnb vrelosť + Google Travel funkčnosť. Mobile-first, veľa whitespace, veľké fotografie, glassmorphism na overlay prvkoch, rounded-2xl.

**Farby (CSS tokeny v `globals.css`):**
- `--background` #FDFDFC (biela), `--muted` #F4F5F3 (svetlosivá)
- `--primary` #2D6A4F (jemná zelená), `--primary-light` #D8F0E3
- `--accent` #C9A227 (zlatá), `--accent-light` #F5ECD0
- text: #1A1A1A / #6B7280

**Typografia:** Inter (UI) + Playfair Display (headline v hero). Škála 12/14/16/18/24/32/48/72.
**Radius:** 12 px (prvky), 24 px (karty), 9999 (pills). **Tiene:** mäkké, nízka opacita.
**Animácie:** fade-up on scroll, hover scale 1.02 na kartách, 200–300 ms ease-out.
**Glassmorphism:** `bg-white/70 backdrop-blur-xl border-white/40` — search panel, header, mapové popupy.

**Kľúčové komponenty:** Button, Card (DestinationCard, AttractionCard, EventCard, ItineraryDayCard), SearchPanel, FilterPills, GlassHeader, HeroBanner, MapView, StatBadge, PriceTag, WeatherWidget, ExportMenu.

---

## 4. UX wireframy (textovo)

**Homepage:** fullscreen hero foto (Ha Long) → headline „Objav Vietnam" → glass search panel (kam, dni, dátum, odkiaľ, letiská, osoby, rozpočet, typ cestovania pills) → CTA „Vytvor itinerár" → kategórie (8 dlaždíc) → Top destinácie (horizontálny scroll kariet) → Najbližšie udalosti → Praktické info grid → Newsletter → Footer.

**AI Planner:** 3-krokový wizard (Kam a kedy → Štýl a rozpočet → Detaily: deti, motorka, nočné vlaky, vnútroštátne lety) → loading s progress → výsledok: ľavý stĺpec dni (timeline s presunmi, atrakciami, jedlom, cenami, hotelmi), pravý stĺpec sticky mapa → export bar (PDF, Google Maps, Apple Maps, Calendar, iCal, GPX).

**Mapa:** fullscreen Mapbox, ľavý glass panel s filtrami (provincie, typy POI), klik na POI → glass card (foto, počasie, atrakcie, „Pridať do itinerára").

**Detail destinácie:** hero foto + breadcrumbs → quick facts bar (počasie, najlepší čas, letisko, dni odporúčané) → taby: Atrakcie / Jedlo / Ubytovanie / Doprava / Udalosti → súvisiace itineráre.

---

## 5. Štruktúra projektu

```
src/
├── app/
│   ├── (marketing)/           homepage, destinácie, články… (RSC, ISR)
│   ├── (tools)/nastroje/
│   ├── planovac/
│   ├── mapa/
│   ├── ucet/                  (auth-gated)
│   ├── admin/                 (role-gated)
│   ├── api/                   route handlers
│   ├── sitemap.ts  robots.ts  feed.xml/
│   └── layout.tsx  globals.css
├── components/
│   ├── ui/                    shadcn primitívy
│   ├── cards/  map/  planner/  layout/  seo/
├── lib/
│   ├── ai/                    prompty, generovanie itinerárov a článkov
│   ├── db.ts  redis.ts  mapbox.ts  seo.ts  utils.ts
├── server/
│   ├── services/              business logika (itinerary, content, import)
│   └── jobs/                  cron: import zdrojov, AI články, sitemap
├── prisma/schema.prisma
└── content/                   statické MDX (praktické info)
```

---

## 6. API (route handlers)

```
POST /api/planner/generate      vstup: PlannerInput → stream itinerára (OpenAI)
GET  /api/itineraries/[id]      + PATCH (úpravy), POST /export/{pdf|gpx|ics}
GET  /api/destinations          filtre: region, type, q  (cached)
GET  /api/attractions/[slug]
GET  /api/events?from&to&region&category
POST /api/chat                  AI chat nad databázou (RAG, pgvector)
GET  /api/weather/[slug]        cache 3 h (Redis)
GET  /api/rates                 EUR/VND/CZK, cache 12 h
POST /api/admin/import/run      manuálne spustenie importu
POST /api/admin/articles/[id]/approve
Auth: NextAuth (Google + email). Rate-limit: Upstash/Redis na AI endpointy.
```

**Automatický obsah (pipeline):**
cron (GitHub Actions / node-cron v Dockeri) → fetch registrovaných zdrojov (RSS/HTML/API) → dedup (hash) → AI: extrakcia faktov → originálny slovenský článok + SEO titulok/description/OG obrázok + kategorizácia + interné linky + citácia zdroja → stav `review` → admin schváli → publish + revalidate + sitemap ping. Nikdy sa nekopíruje celý text, vždy autorský obsah s odkazom na oficiálny zdroj.

---

## 7. SEO

- Metadata API per route, JSON-LD: `TouristDestination`, `TouristAttraction`, `Event`, `Article`, `FAQPage`, `BreadcrumbList`
- Programmatic pages: 63 provincií × šablóna, `pocasie/{mesto}-{mesiac}` (12×N), `itinerare/{7|10|14|21|30}-dni`, festival pages
- ISR (revalidate 1–24 h), sitemap index (split podľa typu), RSS, hreflang sk-SK (cs-CZ pripravené), canonical, interné prelinkovanie cez `related` vzťahy
- Core Web Vitals: RSC, next/image + Cloudinary, font subset, LCP hero preload

---

## 8. Roadmapa

| Fáza | Obsah | Trvanie |
|---|---|---|
| **0 — Základ** (táto session) | Dizajn systém, homepage, Prisma schéma, planner UI, mapa, destinácie seed | ✅ |
| **1 — MVP launch** | OpenAI itineráre naostro, 15 destinácií + 100 atrakcií obsah, praktické info, SEO základ, deploy na Contabo (Docker + Cloudflare) | 3–4 týž. |
| **2 — Obsah & SEO škálovanie** | Programmatic pages, kalendár udalostí, auto-import pipeline + admin schvaľovanie, počasie, kurzy | 4–6 týž. |
| **3 — Účty & personalizácia** | NextAuth, uložené itineráre, wishlist, exporty PDF/GPX/iCal, AI chat (RAG) | 4 týž. |
| **4 — Monetizácia** | Affiliate (ubytovanie, letenky, aktivity, poistenie), partneri, Stripe premium plánovač | priebežne |

**Deploy (Contabo):** Docker Compose — `next` (standalone) + `postgres` + `redis` + `caddy/nginx`; Cloudflare pred tým (CDN + cache statiky); GitHub Actions build → push image → SSH deploy. Zálohy: denný `pg_dump` na S3-kompatibilné úložisko.
