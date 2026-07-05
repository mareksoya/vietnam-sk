import type { Map as MapboxMap } from "mapbox-gl";

/* Zdieľaná Mapbox konfigurácia pre /mapa aj mini-mapu v itinerári. */

export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
export const MAPBOX_STYLE = "mapbox://styles/mapbox/outdoors-v12";

/* Mapbox nemá slovenský dataset (name_sk neexistuje). Základ = latinka
   (name_en → fallback name, žiadne čínske/lokálne znaky), hlavné viditeľné
   názvy (krajiny, moria, veľké mestá) prekladáme na slovenské exonymá. */
const SK_NAMES: Record<string, string> = {
  // Krajiny
  China: "Čína",
  Vietnam: "Vietnam",
  Laos: "Laos",
  Cambodia: "Kambodža",
  Thailand: "Thajsko",
  Myanmar: "Mjanmarsko",
  Burma: "Mjanmarsko",
  Philippines: "Filipíny",
  Malaysia: "Malajzia",
  Indonesia: "Indonézia",
  India: "India",
  Bangladesh: "Bangladéš",
  Bhutan: "Bhután",
  Nepal: "Nepál",
  Taiwan: "Taiwan",
  "South Korea": "Južná Kórea",
  "North Korea": "Severná Kórea",
  Japan: "Japonsko",
  Singapore: "Singapur",
  Brunei: "Brunej",
  // Moria a zálivy
  "South China Sea": "Juhočínske more",
  "East Sea": "Juhočínske more",
  "Gulf of Thailand": "Thajský záliv",
  "Gulf of Tonkin": "Tonkinský záliv",
  "Andaman Sea": "Andamanské more",
  "Philippine Sea": "Filipínske more",
  "Pacific Ocean": "Tichý oceán",
  "Bay of Bengal": "Bengálsky záliv",
  // Mestá / regióny
  Hanoi: "Hanoj",
  "Ho Chi Minh City": "Ho Či Minovo mesto",
  Beijing: "Peking",
  Guangzhou: "Kanton",
  "Hong Kong": "Hongkong",
  Macau: "Macao",
  Yangon: "Rangún",
  Hainan: "Chaj-nan",
};

/* text-field expression: preklad podľa name_en, inak latinka. */
const SK_LABEL_EXPRESSION = [
  "match",
  ["get", "name_en"],
  ...Object.entries(SK_NAMES).flatMap(([en, sk]) => [en, sk]),
  ["coalesce", ["get", "name_en"], ["get", "name"]],
];

/* Prepne popisky miest na slovenské/latinkové. Volať v `style.load`.
   POZOR: len vrstvy s popiskmi miest (`*-label`) — NIE cestné štíty
   (road-number-shield…), tie majú číslo cesty (`ref`), nie názov, a prepis by
   z nich spravil prázdne biele obdĺžniky. */
export function applySlovakLabels(map: MapboxMap) {
  const layers = map.getStyle()?.layers ?? [];
  for (const layer of layers) {
    const id = layer.id;
    if (layer.type !== "symbol") continue;
    if (!/-label$|-label-/.test(id)) continue; // len popisky miest/oblastí
    if (/shield|ref|exit|junction|number|route/i.test(id)) continue; // istota
    const layout = (layer as { layout?: Record<string, unknown> }).layout;
    if (layout && "text-field" in layout) {
      map.setLayoutProperty(
        layer.id,
        "text-field",
        SK_LABEL_EXPRESSION as never
      );
    }
  }
}

/* Bodový marker — plný kruh bez vonkajšieho outline, len jemný tieň. */
export function createDotMarker(color: string, selected = false): HTMLButtonElement {
  const el = document.createElement("button");
  el.type = "button";
  el.style.cssText = [
    "width:18px",
    "height:18px",
    "border-radius:50%",
    "border:none",
    "cursor:pointer",
    `background-color:${color}`,
    selected
      ? `box-shadow:0 0 0 3px ${color}55, 0 1px 4px rgba(0,0,0,.35)`
      : "box-shadow:0 1px 4px rgba(0,0,0,.35)",
    "transition:box-shadow .2s ease",
    "padding:0",
  ].join(";");
  return el;
}
