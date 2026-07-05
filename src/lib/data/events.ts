// Udalosti — zdroj: oficiálny portál vietnam.travel (Vietnam National Authority
// of Tourism) a oficiálne lunárne kalendáre. Aktualizované: júl 2026.
// Fáza 2+: tento súbor nahradí automatický import (cron) s AI sumarizáciou.

export type EventCategory =
  | "festival"
  | "štátny sviatok"
  | "lampióny"
  | "gastronómia"
  | "kultúra"
  | "šport";

export interface VnEvent {
  slug: string;
  name: string;
  category: EventCategory;
  region: "Severný Vietnam" | "Stredný Vietnam" | "Južný Vietnam" | "Celý Vietnam";
  city?: string;
  startDate: string; // ISO
  endDate?: string;
  summary: string;
  tips?: string;
  sourceName: string;
  sourceUrl: string;
}

export const events: VnEvent[] = [
  {
    slug: "diff-2026-finale",
    name: "Da Nang International Fireworks Festival (DIFF) 2026 — finále",
    category: "festival",
    region: "Stredný Vietnam",
    city: "Da Nang",
    startDate: "2026-05-30",
    endDate: "2026-07-11",
    summary:
      "Najväčšia ohňostrojová súťaž Ázie s témou „United Horizons“. Šesť súťažných večerov tímov z Vietnamu, Číny, Francúzska, Talianska, Japonska a ďalších krajín nad riekou Han. Veľké finále 11. júla.",
    tips: "Lístky na tribúny kúp vopred, mosty cez rieku Han sa počas šou zatvárajú. Skvelý výhľad je aj z rooftop barov.",
    sourceName: "vietnam.travel (oficiálny portál)",
    sourceUrl:
      "https://vietnam.travel/things-to-do/festival-event/da-nang-international-fireworks-festival-diff-2026",
  },
  {
    slug: "khanh-hoa-sea-festival-2026",
    name: "Khanh Hoa Sea Tourism Festival 2026",
    category: "festival",
    region: "Južný Vietnam",
    city: "Nha Trang",
    startDate: "2026-06-01",
    endDate: "2026-07-31",
    summary:
      "Dvojmesačný festival morského turizmu v Nha Trangu — koncerty na pláži, vodné športy, gastronomické zóny a večerné trhy pozdĺž promenády.",
    sourceName: "vietnam.travel (oficiálny portál)",
    sourceUrl:
      "https://vietnam.travel/things-to-do/festival-event/khanh-hoa-sea-tourism-festival-2026",
  },
  {
    slug: "hoi-an-lampionovy-festival-jul",
    name: "Hoi An Lantern Festival — splnová noc",
    category: "lampióny",
    region: "Stredný Vietnam",
    city: "Hoi An",
    startDate: "2026-07-27",
    summary:
      "Každý 14. deň lunárneho mesiaca staré mesto zhasne elektrické osvetlenie (~18:00–22:00), svietia len hodvábne lampióny a po rieke Thu Bon plávajú sviečkové lampióny.",
    tips: "Ďalšie termíny 2026: 26. 8., 24. 9. (najväčší, pred sviatkom Trung Thu), 23. 10., 22. 11., 22. 12. Príď pred 17:30, potom je centrum plné.",
    sourceName: "Hoi An City / lunárny kalendár",
    sourceUrl: "https://vietnam.travel/places-to-go/central-vietnam/hoi-an",
  },
  {
    slug: "ngoc-linh-ginseng-festival-2026",
    name: "Ngoc Linh Ginseng & International Medicinal Herbs Festival",
    category: "gastronómia",
    region: "Stredný Vietnam",
    city: "Da Nang",
    startDate: "2026-07-31",
    endDate: "2026-08-03",
    summary:
      "Festival slávneho vietnamského ženšenu Ngoc Linh a liečivých bylín — degustácie, trh s produktmi horských provincií a odborný program.",
    sourceName: "vietnam.travel (oficiálny portál)",
    sourceUrl:
      "https://vietnam.travel/things-to-do/festival-event/ngoc-linh-ginseng-and-international-medicinal-herbs-festival-da-nang",
  },
  {
    slug: "den-nezavislosti-2026",
    name: "Deň nezávislosti (Quốc khánh)",
    category: "štátny sviatok",
    region: "Celý Vietnam",
    startDate: "2026-09-02",
    summary:
      "Štátny sviatok — výročie vyhlásenia nezávislosti (1945). Vlajky v uliciach, ohňostroje vo veľkých mestách, v Hanoji slávnostný program okolo Ba Dinh. Úrady a banky sú zatvorené, doprava plná.",
    tips: "Rezervuj vlaky, lety a hotely s predstihom — cestujú aj miestni.",
    sourceName: "vietnam.travel (oficiálny portál)",
    sourceUrl: "https://vietnam.travel/things-to-do/festival-event",
  },
  {
    slug: "hanoi-autumn-festival-2026",
    name: "Hanoi Autumn Festival 2026",
    category: "kultúra",
    region: "Severný Vietnam",
    city: "Hanoj",
    startDate: "2026-09-01",
    endDate: "2026-09-30",
    summary:
      "Mesiac osláv hanojskej jesene — najkrajšieho obdobia mesta: kultúrne programy v pamiatkových zónach, umelecké vystúpenia a tradičná kuchyňa okolo jazera Hoan Kiem.",
    sourceName: "vietnam.travel (oficiálny portál)",
    sourceUrl:
      "https://vietnam.travel/things-to-do/festival-event/hanoi-autumn-festival-2026",
  },
  {
    slug: "hue-culinary-capital-2026",
    name: "Hue — Culinary Capital 2026",
    category: "gastronómia",
    region: "Stredný Vietnam",
    city: "Hue",
    startDate: "2026-09-01",
    endDate: "2026-09-30",
    summary:
      "Festival cisárskej kuchyne — Hue sa prezentuje ako kulinárske hlavné mesto Vietnamu. Ochutnávky kráľovských menu, street food zóny a ukážky prípravy tradičných jedál.",
    tips: "Povinná ochutnávka: bun bo Hue, banh khoai a kráľovské degustačné menu v záhradných domoch.",
    sourceName: "vietnam.travel (oficiálny portál)",
    sourceUrl:
      "https://vietnam.travel/things-to-do/festival-event/hue-culinary-capital-2026",
  },
  {
    slug: "tet-trung-thu-2026",
    name: "Tết Trung Thu — Sviatok stredu jesene",
    category: "lampióny",
    region: "Celý Vietnam",
    startDate: "2026-09-25",
    summary:
      "„Detský festival“ pri splne 8. lunárneho mesiaca — sprievody s lampiónmi, levie tance a mesačné koláčiky (banh trung thu). Najkrajšia atmosféra: ulica Hang Ma v Hanoji a staré mesto Hoi An.",
    tips: "V Hoi An pripadá lampiónová splnová noc na 24. 9. — ideálne spojiť.",
    sourceName: "vietnam.travel (oficiálny portál)",
    sourceUrl:
      "https://vietnam.travel/things-to-do/festival-event/mid-autumn-festival",
  },
  {
    slug: "dalat-flower-festival-2026",
    name: "Da Lat Flower Festival 2026 (11. ročník)",
    category: "festival",
    region: "Južný Vietnam",
    city: "Da Lat",
    startDate: "2026-12-12",
    endDate: "2026-12-31",
    summary:
      "Bienálny kvetinový festival mesta večnej jari — kvetinové prehliadky okolo jazera Xuan Huong, nočné trhy, koncerty a výstavy miestnych pestovateľov.",
    sourceName: "Lam Dong province / vietnam.travel",
    sourceUrl: "https://vietnam.travel/places-to-go/central-vietnam/dalat",
  },
  {
    slug: "tet-2027",
    name: "Tết Nguyên Đán 2027 — lunárny Nový rok (Rok kozy)",
    category: "štátny sviatok",
    region: "Celý Vietnam",
    startDate: "2027-02-06",
    endDate: "2027-02-13",
    summary:
      "Najväčší sviatok roka. Prvý deň nového lunárneho roka pripadá na sobotu 6. 2. 2027, štátne voľno trvá zhruba 5.–13. 2. Kvetinové trhy, ohňostroje a rodinné oslavy po celej krajine.",
    tips: "Týždeň pred a po Tete je doprava vypredaná a mnohé podniky zatvorené — na klasické cestovanie to nie je ideálny termín, na zážitok z osláv áno.",
    sourceName: "vietnam.travel / lunárny kalendár",
    sourceUrl:
      "https://vietnam.travel/things-to-do/tet-vietnam-lunar-new-year",
  },
  {
    slug: "hung-kings-2027",
    name: "Festival kráľov Hung (Giỗ Tổ Hùng Vương) 2027",
    category: "štátny sviatok",
    region: "Severný Vietnam",
    city: "Phu Tho",
    startDate: "2027-04-16",
    summary:
      "Štátny sviatok na počesť zakladateľov národa — pútnický deň k chrámom kráľov Hung v provincii Phu Tho (10. deň 3. lunárneho mesiaca; termín sa každý rok mení).",
    sourceName: "vietnam.travel (oficiálny portál)",
    sourceUrl: "https://vietnam.travel/things-to-do/festival-event",
  },
];

export function upcomingEvents(from = new Date()) {
  return events
    .filter((e) => new Date(e.endDate ?? e.startDate) >= from)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
}
