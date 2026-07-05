import { NextResponse } from "next/server";
import { sampleItinerary } from "@/lib/data/sample-itinerary";

/**
 * POST /api/planner/generate
 *
 * Fáza 0: vracia ukážkový itinerár.
 * Fáza 1: sem sa napojí OpenAI —
 *   1. validácia vstupu (zod)
 *   2. rate-limit (Redis)
 *   3. system prompt s pravidlami (reálne presuny, otváracie hodiny,
 *      sezónnosť, rozpočet) + kontext z databázy destinácií a atrakcií
 *   4. structured output (JSON schema ItineraryDay[])
 *   5. uloženie do DB (Itinerary + ItineraryDay + ItineraryItem)
 */
export async function POST(req: Request) {
  const input = await req.json().catch(() => ({}));

  return NextResponse.json({
    id: "sample",
    input,
    itinerary: sampleItinerary,
    note: "Ukážkový výstup — OpenAI generovanie sa zapína vo Fáze 1 (OPENAI_API_KEY).",
  });
}
