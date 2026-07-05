import { NextResponse } from "next/server";
import { sampleItinerary } from "@/lib/data/sample-itinerary";
import { destinations } from "@/lib/data/destinations";
import { presetItineraries } from "@/lib/data/preset-itineraries";

export const maxDuration = 60;

/**
 * POST /api/planner/generate
 * Fáza 1: reálne generovanie itinerára cez OpenAI (JSON mode).
 * Bez OPENAI_API_KEY vracia ukážkový itinerár.
 */

interface PlannerInput {
  days?: string | number;
  date?: string;
  where?: string;
  from?: string;
  arrive?: string;
  depart?: string;
  people?: string | number;
  budget?: string | number;
  styles?: string;
  pace?: string;
  kids?: boolean;
  motorbike?: boolean;
  nightTrains?: boolean;
  domesticFly?: boolean;
}

const MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

// GPS letísk — bod príletu/odletu na mape musí byť letisko, nie hotel.
const AIRPORTS: Record<string, { name: string; lat: number; lng: number }> = {
  HAN: { name: "Noi Bai (Hanoj)", lat: 21.2212, lng: 105.8072 },
  SGN: { name: "Tan Son Nhat (Ho Či Minovo mesto)", lat: 10.8188, lng: 106.652 },
  DAD: { name: "Da Nang", lat: 16.0439, lng: 108.1994 },
  CXR: { name: "Cam Ranh (Nha Trang)", lat: 11.9982, lng: 109.2192 },
  PQC: { name: "Phu Quoc", lat: 10.1698, lng: 103.9931 },
};

function buildPrompt(input: PlannerInput) {
  const days = Math.min(Math.max(Number(input.days) || 14, 3), 30);
  const context = destinations
    .map(
      (d) =>
        `${d.name} (${d.type}, ${d.region}, GPS ${d.lat},${d.lng}, letisko ${d.nearestAirport}, odporúčané ${d.recommendedDays} dni, najlepšie mesiace ${d.bestMonths.join("/")})`
    )
    .join("\n");

  const arr = AIRPORTS[input.arrive ?? "HAN"] ?? AIRPORTS.HAN;
  const dep = AIRPORTS[input.depart ?? "SGN"] ?? AIRPORTS.SGN;

  const prefs: string[] = [];
  if (input.kids) prefs.push("cestuje s deťmi — pomalšie tempo, kid-friendly aktivity, žiadne nočné presuny");
  if (input.motorbike) prefs.push("chce si prenajať motorku — zaraď scénické trasy (napr. Hai Van Pass)");
  prefs.push(input.nightTrains ? "nočné vlaky sú OK — využi ich na dlhé presuny" : "žiadne nočné vlaky");
  prefs.push(input.domesticFly ? "vnútroštátne lety sú OK pri dlhých vzdialenostiach" : "žiadne vnútroštátne lety — len pozemná doprava");

  return `Zostav itinerár cesty po Vietname. Odpovedz IBA validným JSON objektom (bez markdown).

VSTUP:
- Počet dní: ${days}
- Dátum začiatku: ${input.date || "neurčený"}
- Kam chce ísť: ${input.where || "celý Vietnam / navrhni najlepšiu trasu"}
- Prílet: letisko ${arr.name} GPS ${arr.lat},${arr.lng}
- Odlet: letisko ${dep.name} GPS ${dep.lat},${dep.lng}
- Počet osôb: ${input.people || 2}
- Rozpočet: ${input.budget || 1500} € na osobu (bez medzinárodnej letenky)
- Štýl: ${input.styles || "vyvážený mix"}
- Tempo: ${input.pace || "Vyvážené"}
- Preferencie: ${prefs.join("; ")}

ZNÁME DESTINÁCIE (používaj ich GPS presne, môžeš pridať aj ďalšie miesta):
${context}

PRAVIDLÁ:
1. Trasa musí logicky nadväzovať od letiska príletu po letisko odletu, s reálnymi časmi presunov (bus/vlak/let/loď).
2. Zohľadni sezónu podľa dátumu (monzún, teploty, festivaly ako Tet).
3. Každý deň: 2–5 položiek — presuny, atrakcie, jedlo (street food aj reštaurácie), hotel pri zmene mesta, praktické tipy.
4. Ceny v EUR realisticky (pho ~2 €, hotel 20–60 €, vstupné 1–15 €, plavba Ha Long ~130 €). Súčet drž v rozpočte.
5. Časy vo formáte "HH:MM". Popisy po slovensky, konkrétne (názvy podnikov a miest, nie všeobecné frázy).
6. Polia lat/lng dňa = hlavná lokalita dňa.
7. Pri každej konkrétnej položke (atrakcia, reštaurácia, street food, hotel) uveď jej presné GPS lat/lng — použije sa na kliknutie v mape.
8. Prvá položka dňa 1 je transfer PRÍLETU — jej lat/lng = GPS letiska príletu (${arr.lat},${arr.lng}), NIE hotel. Posledná položka posledného dňa je transfer ODLETU — lat/lng = GPS letiska odletu (${dep.lat},${dep.lng}).

JSON SCHÉMA:
{
  "title": "string — názov trasy po slovensky",
  "days": [
    {
      "day": 1,
      "title": "string",
      "location": "string — mesto/oblasť",
      "lat": 0.0,
      "lng": 0.0,
      "items": [
        {
          "type": "transfer" | "atrakcia" | "reštaurácia" | "street food" | "hotel" | "tip",
          "time": "08:30 (voliteľné)",
          "title": "string",
          "description": "string (voliteľné)",
          "costEur": 0.0,
          "durationMin": 60,
          "lat": 0.0,
          "lng": 0.0
        }
      ]
    }
  ]
}`;
}

interface RawItem {
  type?: string;
  time?: string;
  title?: string;
  description?: string;
  costEur?: number;
  durationMin?: number;
  lat?: number;
  lng?: number;
}
interface RawDay {
  day?: number;
  title?: string;
  location?: string;
  lat?: number;
  lng?: number;
  items?: RawItem[];
}

const VALID_TYPES = new Set([
  "transfer",
  "atrakcia",
  "reštaurácia",
  "street food",
  "hotel",
  "tip",
]);

function sanitize(raw: { title?: string; days?: RawDay[] }) {
  const days = (raw.days ?? [])
    .filter((d) => Array.isArray(d.items) && d.items.length > 0)
    .map((d, i) => ({
      day: typeof d.day === "number" ? d.day : i + 1,
      title: d.title || `Deň ${i + 1}`,
      location: d.location || "Vietnam",
      lat: typeof d.lat === "number" ? d.lat : 16.2,
      lng: typeof d.lng === "number" ? d.lng : 106.5,
      items: (d.items ?? [])
        .filter((it) => it.title)
        .map((it) => ({
          type: VALID_TYPES.has(it.type ?? "") ? it.type : "tip",
          time: it.time || undefined,
          title: it.title!,
          description: it.description || undefined,
          costEur: typeof it.costEur === "number" ? it.costEur : undefined,
          durationMin:
            typeof it.durationMin === "number" ? it.durationMin : undefined,
          lat: typeof it.lat === "number" ? it.lat : undefined,
          lng: typeof it.lng === "number" ? it.lng : undefined,
        })),
    }));
  if (!days.length) throw new Error("empty itinerary");
  return { title: raw.title || "Itinerár po Vietname", days };
}

/**
 * Základné kombinácie (5–14 dní × tempo, štandardné letiská, bez špeciálnych
 * preferencií) sa servujú okamžite z predpripravenej knižnice — bez AI nákladov.
 */
function findPreset(input: PlannerInput) {
  const days = Number(input.days) || 14;
  const pace = input.pace || "Vyvážené";
  const isBasic =
    !input.kids &&
    !input.motorbike &&
    (!input.where || input.where.trim() === "") &&
    (input.arrive ?? "HAN") === "HAN" &&
    (input.depart ?? "SGN") === "SGN";
  if (!isBasic) return null;
  return presetItineraries[`${days}-${pace}`] ?? null;
}

export async function POST(req: Request) {
  const input: PlannerInput = await req.json().catch(() => ({}));
  const apiKey = process.env.OPENAI_API_KEY;

  const preset = findPreset(input);
  if (preset) {
    return NextResponse.json({ itinerary: preset, preset: true });
  }

  if (!apiKey) {
    return NextResponse.json({
      id: "sample",
      itinerary: sampleItinerary,
      note: "Ukážkový itinerár — na serveri zatiaľ nie je nastavený OPENAI_API_KEY.",
    });
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.7,
        max_tokens: 12000,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "Si skúsený slovenský sprievodca po Vietname a plánovač ciest. Poznáš reálne podniky, dopravu, ceny a sezónnosť. Vždy odpovedáš iba validným JSON.",
          },
          { role: "user", content: buildPrompt(input) },
        ],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("OpenAI error:", res.status, err.slice(0, 500));
      return NextResponse.json(
        { error: "Generovanie zlyhalo, skús to o chvíľu znova." },
        { status: 502 }
      );
    }

    const data = await res.json();
    const content: string = data.choices?.[0]?.message?.content ?? "{}";
    const itinerary = sanitize(JSON.parse(content));

    return NextResponse.json({ itinerary, model: MODEL });
  } catch (e) {
    console.error("Planner error:", e);
    return NextResponse.json(
      { error: "Nepodarilo sa spracovať itinerár, skús to znova." },
      { status: 500 }
    );
  }
}
