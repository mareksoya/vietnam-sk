import type { ItineraryDay } from "./sample-itinerary";

export interface PresetItinerary {
  title: string;
  days: ItineraryDay[];
}

/**
 * Predpripravené itineráre pre základné kombinácie:
 * kľúč = "{počet dní}-{tempo}", napr. "7-Vyvážené".
 *
 * Servujú sa okamžite (bez volania OpenAI) pre štandardné zadanie:
 * prílet HAN, odlet SGN, bez detí/motorky/vlastnej destinácie.
 *
 * Knižnicu postupne dopĺňame pre 5–14 dní × Pohodové/Vyvážené/Intenzívne —
 * vygenerované cez AI, skontrolované a uložené sem.
 */
export const presetItineraries: Record<string, PresetItinerary> = {
  // Naplní sa vygenerovanými trasami HAN→SGN, napr.:
  // "7-Vyvážené": { title: "...", days: [...] },
};
