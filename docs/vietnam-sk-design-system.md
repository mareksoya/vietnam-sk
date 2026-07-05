# DESIGN SYSTEM — vietnam.sk
> Master prompt. Paste this file into context at the start of every session.
> Every generation must follow it. Start prompts with: "Follow vietnam-sk-design-system.md".
> ŽIVÁ KÓPIA v repozitári (docs/) — jediný zdroj pravdy. Nové rozhodnutia sa dopisujú do príslušnej sekcie + do §10 changelogu.

## 0. Project definition

- **Product:** vietnam.sk — Slovak-language travel portal about Vietnam. Destination guides, itineraries, practical info (visa, transport, food, budget), personal stories.
- **Audience:** Slovak and Czech travelers aged 25–55 planning an independent trip to Vietnam. They read on mobile, often on the go.
- **Single job of the site:** make the reader feel "I can actually plan this trip myself" — practical confidence wrapped in atmosphere.
- **Voice:** experienced friend who has been there, not a tourism board. Concrete, honest (including downsides), no marketing superlatives.

## 1. Design principles (read before every generation)

1. **Photography leads, UI recedes.** Vietnam sells itself visually. The interface is a quiet frame: generous whitespace, restrained color, no decoration competing with images.
2. **Practical first.** Every guide page answers "how, when, how much" above the fold. Atmosphere supports facts, never replaces them.
3. **One accent, used sparingly.** Lacquer red appears only on primary actions and small wayfinding marks. If a section has more than two red elements, remove one.
4. **Editorial, not brochure.** Asymmetric layouts, strong typographic hierarchy, real captions under photos. Never symmetric three-card rows with icon + title + text.
5. **Mobile is the primary canvas.** Design mobile-first; desktop is the enhancement.

## 2. Design tokens

### Color
Semantic variables only. Never hardcode hex values in components.

```css
:root {
  /* Base */
  --color-bg:            #FBFAF7;  /* rice-paper white, page background */
  --color-surface:       #FFFFFF;  /* cards, panels */
  --color-ink:           #151816;  /* primary text, near-black with green undertone */
  --color-ink-muted:     #454D48;  /* secondary text, captions — contrast ≥ 7:1 on --color-bg */
  --color-line:          #E5E2DA;  /* hairline borders, dividers */

  /* Accents */
  --color-lacquer:       #B3372B;  /* lacquer red — primary CTA, active nav, links on hover */
  --color-lacquer-deep:  #8E2A21;  /* hover/pressed state of lacquer */
  --color-jade:          #2F6D5E;  /* Hạ Long jade — secondary accent: tags, success, map markers */
  --color-jade-deep:     #245A4C;  /* jade-deep — hover interaktívnych jade prvkov (accent-dark) */
  --color-sand:          #EFE7D8;  /* warm sand — highlighted info boxes, practical-tip panels */

  /* Functional */
  --color-focus:         #2F6D5E;  /* focus rings, always visible */
  --color-error:         #B3372B;
}
```

**Usage rules:**
- *(2026-07-05 — spresnenie)* **`--color-lacquer` LEN na hlavné CTA tlačidlá** (jedno primárne CTA na pohľad) a na značkový wordmark „`.sk`". Nič iné. Aktívna navigácia, hover odkazov, aktívne filtre/čipy, tagy, metadata ikony, akcentové texty — **všetko jade**. Chybové stavy zostávajú lacquer (semantická červená). Nikdy pozadia väčšie ako tlačidlo, nikdy nadpisy.
- `--color-jade` for: active navigation state, inline link hover, category tags, active filters/chips, map pins, success states, small metadata icons, accent figures. Hover interaktívnych jade prvkov používa `--color-accent-dark` (jade-deep `#245A4C`).
- `--color-sand` only for: "practical info" boxes (visa, prices, transport). This becomes the site's recognizable pattern — readers learn that sand background = actionable facts.
- Photos are the only large color surfaces. UI stays in the neutral range.
- Dark sections (footer, occasional full-bleed photo overlays) use `--color-ink` as background with `--color-bg` text.
- *(2026-07-05)* Povolený **jade tint 10 %** (`#E6EDEA`, resp. `color-mix(jade 10%, white)`) výhradne ako pozadie tagov/chipov a malých metadata ikon. Nie je to nová farba, ale odvodený odtieň jade.

### Typography

```css
:root {
  --font-display: "Source Serif 4", serif;    /* headings H1–H2 only, weight 500–600 — clean, low-contrast, no decorative details */
  --font-body:    "Be Vietnam Pro", sans-serif; /* body, UI, H3+, AND all numeric/data text */
}
```

**Two typefaces total — no third font, no monospace.** Numeric data (prices, dates, distances, table cells) uses `--font-body` with `font-variant-numeric: tabular-nums`, size one step smaller than surrounding text, color `--color-ink-muted`. Data is distinguished by size and color, never by switching typeface.

**Font loading — SELF-HOSTED ONLY.** Never load fonts from Google Fonts CDN or any third-party origin in production (performance, no external dependency, GDPR). Fonts live in `/fonts/` as woff2, subset to `latin, latin-ext, vietnamese`.

*(2026-07-05 — implementačné rozhodnutie)* V Next.js projekte je požiadavka splnená cez `next/font/google` (Source_Serif_4, Be_Vietnam_Pro; subsets latin/latin-ext/vietnamese; weights 400/500/600; display swap). next/font fonty **stiahne pri builde a servíruje z vlastnej domény** — v produkcii nejde žiadny request na fonts.googleapis.com, preload a @font-face generuje automaticky. Manuálne woff2 súbory v `/fonts/` preto nie sú potrebné; ak by sa projekt sťahoval z Next.js, platí pôvodný postup nižšie.

Required files (5 total):
```
/fonts/source-serif-4-500.woff2
/fonts/source-serif-4-600.woff2
/fonts/be-vietnam-pro-400.woff2
/fonts/be-vietnam-pro-500.woff2
/fonts/be-vietnam-pro-600.woff2
```

Loading rules:
- Preload the two most critical files; always `font-display: swap`.
- Fallback stacks: `--font-display: "Source Serif 4", Georgia, serif;` `--font-body: "Be Vietnam Pro", -apple-system, "Segoe UI", sans-serif;`
- Do not load italic styles or any weights outside 400/500/600. If a design calls for another weight, it is wrong — fix the design, not the font list.
- Both families are OFL-licensed.

- **Scale (ratio 1.25, base 16px):** 16 / 20 / 25 / 31 / 39 / 49. Mobile caps at 39px for H1.
- **Line-height:** body 1.65; headings 1.15; captions 1.4.
- **Line width:** body text max-width 68ch, never wider.
- **Weights:** body 400, emphasis 600. Display headings 500–600, never 700+.
- **Letter-spacing:** H1–H2 −0.025em; H3/card titles −0.01em; body −0.008em; eyebrows +0.06em uppercase 12–13px.
- **Vietnamese diacritics:** test every font change against "Điện Biên Phủ – Mỹ Tho – Huế".
- **Numbers:** `--font-body`, tabular-nums, one size step smaller, `--color-ink-muted`.
- Never use Inter, Roboto, Arial, or system defaults. Max 2 typefaces total.

### Spacing & layout

- **Grid:** 8px base. Allowed values: 8 / 16 / 24 / 32 / 48 / 64 / 96.
- **Container:** max-width 1200px; article text column 720px.
- **Side gutters:** 16px mobile (<640px), 24px tablet, 32px+ desktop. Full-bleed elements (hero photos, sand boxes on mobile) may extend edge-to-edge with inner padding 16px.
- **Data must not wrap:** price/value columns get `white-space: nowrap`.
- **Section rhythm:** vertical padding 96px desktop / 48px mobile.
- **Breakpoints:** 640 / 960 / 1200.

### Shape & elevation

- **Radius:** `--radius-sm: 4px` (tags, inputs), `--radius-md: 8px` (cards, buttons), `--radius-lg: 16px` (photo cards). Nothing fully rounded except avatar images.
- **Shadows:** `--shadow-sm: 0 1px 3px rgb(31 36 33 / 0.08)`, `--shadow-md: 0 8px 24px rgb(31 36 33 / 0.10)`. No colored shadows, no glows.
- **Borders:** 1px `--color-line`. Prefer borders over shadows for static cards; shadows only on hover/lift.

## 3. Signature element

**The "sand box" (praktické info panel).** Every guide contains 1–3 boxes on `--color-sand` background, 8px `--color-lacquer` left border, figures in --font-body tabular-nums, 14px, --color-ink. Padding 20px 24px desktop, 16px mobile; on mobile the box runs full-bleed. Value column always `white-space: nowrap`. Header row: jade icon + uppercase eyebrow label ("VÍZA", "DOPRAVA", "CENY 2026"). Treat its consistency as sacred.

*(2026-07-05)* V kóde ako utility trieda `.sand-box` v `globals.css`.

## 4. Component rules

**Buttons.** Primary: filled `--color-lacquer`, white text, height 44px, padding 0 20px, radius-md, hover `--color-lacquer-deep`. Secondary: 1px `--color-ink` outline, transparent bg, hover bg `--color-sand`. Ghost: text-only with underline on hover. One primary button per view maximum. All buttons: visible `:focus-visible` ring 2px `--color-focus` offset 2px. Labels are verbs.

**Cards (destination/article).** Photo top (aspect 3:2, radius-lg, cover), jade category tag overlapping photo bottom-left, H3 in body font 600, 2-line excerpt `--color-ink-muted`, meta row 13px tabular-nums. Hover: shadow-md + photo scale 1.03 within 250ms. Grid: 3 columns desktop, 1 column mobile — stagger or vary card sizes on landing pages.

**Navigation.** Sticky top bar, `--color-bg` at 95% opacity with backdrop-blur, 1px bottom `--color-line`. Logo left (wordmark "vietnam.sk" in Source Serif 4 500). Active item: lacquer text + 2px lacquer underline offset 6px. Mobile: full-screen overlay menu on `--color-ink` background, links in Source Serif 4 31px.

**Article layout.** Hero: full-width photo max-height 60vh with caption. Eyebrow (region, jade) → H1 Source Serif 4 → lead 20px ink-muted → meta row → body 720px column. Sand boxes interleaved with prose. Photos always captioned.

**Tables.** Header row uppercase 13px letter-spaced, data cells tabular-nums, row borders `--color-line`, zebra with `--color-sand` at 40%. Right-align numeric columns.

**Forms.** Input height 44px, radius-sm, 1px `--color-line`, focus border `--color-focus` + ring. Labels always visible above inputs. Errors in lacquer with concrete fix instructions.

**Map elements.** Pins in jade, selected pin in lacquer. Popup = mini card.

## 5. States & edge cases (never skip)

- Every interactive element defines: default / hover / focus-visible / active / disabled.
- Loading: skeleton blocks in `--color-line` with subtle pulse. No spinners on content.
- Empty states: one sentence + one action.
- Test long strings: "Ho Či Minovo mesto (Sài Gòn)".
- Images: always `alt` in Slovak, explicit width/height.

## 6. Motion

- Durations: 150ms (micro) / 250ms (cards, reveals). Easing `cubic-bezier(0.2, 0, 0, 1)`.
- Allowed: photo scale on hover, fade-up 12px scroll-reveal (once), underline grow.
- Forbidden: parallax, autoplaying carousels, animated gradients, anything >400ms.
- Always respect `prefers-reduced-motion: reduce`.

## 7. Content & tone rules (copy is design)

- Language: Slovak. Vietnamese names with full diacritics on first mention, simplified after.
- Headings are concrete promises — never "Objavte krásy Vietnamu".
- Prices always in € + VND, distances in km, date of validity in sand boxes.
- No exclamation marks in UI. No "úžasný", "magický", "raj na zemi".
- CTA follows through: button "Stiahnuť checklist" → confirmation "Checklist stiahnutý".

## 8. Quality floor (verify before delivering any page)

- [ ] Responsive 360px → 1440px, no horizontal scroll
- [ ] Fonts self-hosted — zero requests to fonts.googleapis.com (next/font to garantuje)
- [ ] Contrast: body ≥ 4.5:1, large ≥ 3:1 (lacquer on sand fails for small text — never combine)
- [ ] Keyboard: full tab order, visible focus everywhere
- [ ] Vietnamese diacritics render correctly
- [ ] Only one primary CTA visible per viewport
- [ ] All spacing on 8px grid
- [ ] Sand box present and consistent on every guide page

## 9. Anti-patterns (hard bans)

- No Inter/Roboto/system fonts. No purple-blue gradients. No glassmorphism.
- No icon + title + text symmetric three-card feature rows.
- No stock-photo clichés as icons.
- No centered long-form body text. No text over photos without a legibility gradient (ink at 60% bottom-up).
- No new colors, fonts, radii or shadow levels outside this document. If a new pattern is needed, propose it first, then add it here.

## 10. Changelog (rozhodnutia počas projektu)

- **2026-07-05 · Prijatie design systému.** Web dovtedy bežal na provizórnom vizuáli (Inter + Playfair, zelená/zlatá, glassmorphism) — celý sa migruje na tento dokument. Hotovo: tokeny v `globals.css`, fonty cez next/font, header, footer, homepage (hero 60vh + scrim, sand box, editorial sekcie), destination card (3:2, jade tag, meta tabular-nums).
- **2026-07-05 · Fonty cez next/font** (detail v §2) — self-hosting splnený bez manuálnych woff2.
- **2026-07-05 · Jade tint 10 % `#E6EDEA`** povolený pre pozadia tagov/chipov (detail v §2 Usage rules).
- **2026-07-05 · Červená len na hlavné CTA.** Lacquer sa sťahuje výhradne na primárne CTA tlačidlá (+ wordmark `.sk`); aktívna navigácia, hover odkazov, aktívne filtre, tagy, metadata ikony a akcentové texty sa naprieč webom prepli na **jade**. Pridaný token `--color-accent-dark` / `--color-jade-deep` `#245A4C` pre hover jade prvkov. Kategórie udalostí zjednotené na jade tint (zrušený „rainbow" sky/orange/violet/red — rozlišuje text, nie farba, súlad s §2 a §9 „one accent").
- **2026-07-05 · Hero úvodky = fotka na celé pozadie.** Hero má fotku cez celý priestor (min-h 70vh) + legibility gradient; plánovač už nie je na úvodke (len na `/planovac`), v hero ostal nadpis, lead a jedno CTA „Spustiť plánovač". Kalendár na úvodke má deep-linky na `/udalosti#slug` (kotvy doplnené do zoznamu udalostí).
- **2026-07-05 · Mapa.** Popisky: Mapbox nemá slovenský dataset (`name_sk` neexistuje), preto základ = latinka (`name_en` → fallback `name`, žiadne čínske znaky) + **slovník slovenských exoným** (`SK_NAMES` v `vietnam-map.tsx`) pre hlavné viditeľné názvy (krajiny vrátane Číny, moria, veľké mestá). Rozšíriteľné pridaním do slovníka. Panely mapy (filter + detail) mali nedefinovanú triedu `.glass` (priehľadné, nečitateľné) → podfarbené na `bg-surface/70` + border (súlad so zákazom glassmorphism §9). Hover položiek v zozname používa `sand` (predtým biela → v bielom paneli nebola vidno). Ľavý panel: hlavička (názov + filter tagy) fixná, scrolluje sa len zoznam miest.
- **2026-07-05 · Migračný dlh:** vnútorné stránky (/planovac, /mapa, /udalosti, /prakticke-info, /destinacie/[slug]) zdedili nové tokeny cez CSS premenné, ale ešte používajú staré tvary (rounded-full pills, rounded-3xl karty). Postupne sa prepisujú na radius-sm/md/lg podľa §2 — pri každej ďalšej úprave súboru zosúladiť.

---
*Living document. When a new design decision is made during the project, write it back into the relevant section immediately.*
