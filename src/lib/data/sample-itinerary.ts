// Ukážkový itinerár — v Fáze 1 ho nahradí výstup z OpenAI (POST /api/planner/generate)

export type ItemType =
  | "transfer"
  | "atrakcia"
  | "reštaurácia"
  | "street food"
  | "hotel"
  | "tip";

export interface ItineraryItem {
  type: ItemType;
  time?: string;
  title: string;
  description?: string;
  costEur?: number;
  durationMin?: number;
  lat?: number;
  lng?: number;
}

export interface ItineraryDay {
  day: number;
  title: string;
  location: string;
  lat: number;
  lng: number;
  items: ItineraryItem[];
}

export const sampleItinerary: { title: string; days: ItineraryDay[] } = {
  title: "Sever Vietnamu za 7 dní",
  days: [
    {
      day: 1,
      title: "Prílet a Staré mesto",
      location: "Hanoj",
      lat: 21.0285,
      lng: 105.8542,
      items: [
        { type: "transfer", time: "10:30", title: "Prílet HAN → hotel", description: "Grab z letiska (~35 min)", costEur: 12 },
        { type: "hotel", title: "Hanoi La Siesta (Staré mesto)", description: "Boutique hotel, skvelé raňajky", costEur: 55 },
        { type: "atrakcia", time: "14:00", title: "Jazero Hoan Kiem + chrám Ngoc Son", durationMin: 90, costEur: 1, lat: 21.0288, lng: 105.8525 },
        { type: "street food", time: "18:00", title: "Bun cha Huong Lien", description: "Legendárne miesto „Obama bun cha“", costEur: 3 },
        { type: "tip", title: "Večer si sadnite na pivo Bia Hoi na rohu Ta Hien — 0,30 € za pohár." },
      ],
    },
    {
      day: 2,
      title: "Hanoj do hĺbky",
      location: "Hanoj",
      lat: 21.0285,
      lng: 105.8542,
      items: [
        { type: "atrakcia", time: "08:00", title: "Ho Či Minovo mauzóleum", durationMin: 90, costEur: 0, lat: 21.0367, lng: 105.8342 },
        { type: "atrakcia", time: "10:30", title: "Chrám literatúry", durationMin: 60, costEur: 3, lat: 21.0293, lng: 105.8356 },
        { type: "street food", time: "12:30", title: "Pho Gia Truyen, Bat Dan 49", description: "Najlepšie pho bo v meste, príďte pred obedom", costEur: 2.5 },
        { type: "atrakcia", time: "16:30", title: "Train Street", description: "Vlak prechádza ~17:00 a 19:00, sadnite si do kaviarne", durationMin: 60, costEur: 2 },
        { type: "reštaurácia", time: "19:30", title: "Cha Ca Thang Long", description: "Cha ca — grilovaná ryba s kôprom, špecialita Hanoja", costEur: 8 },
      ],
    },
    {
      day: 3,
      title: "Ryžové polia a vyhliadky",
      location: "Ninh Binh",
      lat: 20.2506,
      lng: 105.9745,
      items: [
        { type: "transfer", time: "07:30", title: "Hanoj → Ninh Binh (limuzínový van)", durationMin: 120, costEur: 9 },
        { type: "atrakcia", time: "10:00", title: "Plavba Trang An (trasa 3)", description: "2,5 h loďkou cez jaskyne", durationMin: 150, costEur: 10, lat: 20.2547, lng: 105.9037 },
        { type: "atrakcia", time: "15:00", title: "Vyhliadka Hang Mua", description: "500 schodov, najlepší výhľad vo Vietname", durationMin: 90, costEur: 4, lat: 20.2295, lng: 105.9309 },
        { type: "hotel", title: "Tam Coc Garden Resort", description: "Bungalovy medzi ryžovými poľami", costEur: 70 },
        { type: "tip", title: "Na Hang Mua choďte po 15:30 — mäkké svetlo a menej ľudí." },
      ],
    },
    {
      day: 4,
      title: "Plavba snov",
      location: "Ha Long / Lan Ha Bay",
      lat: 20.9101,
      lng: 107.1839,
      items: [
        { type: "transfer", time: "08:00", title: "Ninh Binh → prístav Ha Long", durationMin: 180, costEur: 14 },
        { type: "atrakcia", time: "12:30", title: "Nalodenie — 2D/1N plavba Lan Ha Bay", description: "Obed na palube, kajak v lagúnach, západ slnka", costEur: 130, lat: 20.7833, lng: 107.05 },
        { type: "tip", title: "Lan Ha Bay = rovnaká scenéria ako Ha Long, o 70 % menej lodí." },
      ],
    },
    {
      day: 5,
      title: "Ráno na zátoke, nočný vlak do hôr",
      location: "Ha Long → Sapa",
      lat: 22.3364,
      lng: 103.8438,
      items: [
        { type: "atrakcia", time: "06:30", title: "Tai-chi na palube + jaskyňa Sung Sot", durationMin: 120 },
        { type: "transfer", time: "12:00", title: "Vylodenie → Hanoj → nočný vlak do Lao Cai", description: "Vlak SP3 22:00 → 06:00, spací vozeň", costEur: 35 },
        { type: "tip", title: "Kúpte si lístky na 12go.asia — kabína „soft sleeper 4 berth“." },
      ],
    },
    {
      day: 6,
      title: "Treking medzi terasami",
      location: "Sapa",
      lat: 22.3364,
      lng: 103.8438,
      items: [
        { type: "transfer", time: "06:30", title: "Lao Cai → Sapa (bus)", durationMin: 50, costEur: 3 },
        { type: "atrakcia", time: "09:00", title: "Trek údolím Muong Hoa (Lao Chai – Ta Van)", description: "S miestnou sprievodkyňou Hmong, obed v dedine", durationMin: 330, costEur: 25, lat: 22.3097, lng: 103.8817 },
        { type: "hotel", title: "Eco-lodge Ta Van", description: "Výhľad na terasy priamo z postele", costEur: 40 },
      ],
    },
    {
      day: 7,
      title: "Fansipan a návrat",
      location: "Sapa → Hanoj",
      lat: 21.0285,
      lng: 105.8542,
      items: [
        { type: "atrakcia", time: "08:00", title: "Lanovka na Fansipan (3 143 m)", description: "Strecha Indočíny — choďte hneď ráno pred oblačnosťou", durationMin: 180, costEur: 32, lat: 22.3033, lng: 103.7755 },
        { type: "transfer", time: "14:00", title: "Sapa → Hanoj (express bus)", durationMin: 330, costEur: 12 },
        { type: "street food", time: "20:30", title: "Rozlúčkové banh mi 25", costEur: 2 },
      ],
    },
  ],
};
