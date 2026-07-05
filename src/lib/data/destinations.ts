export type DestinationType =
  | "mesto"
  | "pláž"
  | "hory"
  | "národný park"
  | "ostrov"
  | "UNESCO";

export interface Destination {
  slug: string;
  name: string;
  type: DestinationType;
  region: "Severný Vietnam" | "Stredný Vietnam" | "Južný Vietnam";
  lat: number;
  lng: number;
  image: string;
  summary: string;
  body: string;
  bestMonths: number[];
  recommendedDays: number;
  nearestAirport: string;
  highlights: string[];
}

export const destinations: Destination[] = [
  {
    slug: "hanoj",
    name: "Hanoj",
    type: "mesto",
    region: "Severný Vietnam",
    lat: 21.0285,
    lng: 105.8542,
    image:
      "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?w=1600&q=80",
    summary:
      "Tisícročné hlavné mesto — Staré mesto, jazero Hoan Kiem, egg coffee a najlepší street food na severe.",
    body: "Hanoj je srdce severného Vietnamu a pre väčšinu Slovákov prvý kontakt s krajinou. Staré mesto (36 ulíc remesiel) žije od skorého rána do noci — pho na plastovej stoličke, bun cha, egg coffee v skrytých kaviarňach. Nevynechajte Chrám literatúry, Ho Či Minovo mauzóleum a vlakovú uličku. Hanoj je zároveň ideálna základňa pre výlety do Sapy, Ha Long a Ninh Binh.",
    bestMonths: [10, 11, 12, 3, 4],
    recommendedDays: 3,
    nearestAirport: "HAN",
    highlights: ["Staré mesto", "Jazero Hoan Kiem", "Train Street", "Egg coffee"],
  },
  {
    slug: "ha-long",
    name: "Zátoka Ha Long",
    type: "UNESCO",
    region: "Severný Vietnam",
    lat: 20.9101,
    lng: 107.1839,
    image: "/images/AdobeStock_176472557.jpeg",
    summary:
      "Ikonická zátoka s 1 600 vápencovými ostrovmi. Najkrajšia z paluby lode s prenocovaním.",
    body: "Ha Long Bay je UNESCO pamiatka a najfotografovanejšie miesto Vietnamu. Odporúčame 2-dňovú plavbu s nocou na lodi — západ slnka medzi skalami, kajak v lagúnach, jaskyňa Sung Sot. Pokojnejšia alternatíva s rovnakou scenériou je susedná Lan Ha Bay pri ostrove Cat Ba.",
    bestMonths: [10, 11, 12, 3, 4],
    recommendedDays: 2,
    nearestAirport: "HAN",
    highlights: ["Plavba s prenocovaním", "Kajak", "Jaskyňa Sung Sot", "Lan Ha Bay"],
  },
  {
    slug: "sapa",
    name: "Sapa",
    type: "hory",
    region: "Severný Vietnam",
    lat: 22.3364,
    lng: 103.8438,
    image: "/images/AdobeStock_225980061.jpeg",
    summary:
      "Ryžové terasy, treking medzi dedinami etnických menšín a najvyšší vrch Indočíny Fansipan.",
    body: "Sapa je treková mekka severu. Najkrajšie ryžové terasy uvidíte v údolí Muong Hoa, ideálne s miestnym sprievodcom z komunity Hmong. Na Fansipan (3 143 m) vedie lanovka aj dvojdňový trek. September (zlaté terasy pred žatvou) a apríl–máj (napúšťanie vodou) sú vizuálne najsilnejšie. V januári môže byť hmla a teploty pod 5 °C.",
    bestMonths: [9, 10, 4, 5],
    recommendedDays: 3,
    nearestAirport: "HAN",
    highlights: ["Ryžové terasy", "Fansipan", "Treking s Hmongmi", "Cat Cat"],
  },
  {
    slug: "ninh-binh",
    name: "Ninh Binh",
    type: "UNESCO",
    region: "Severný Vietnam",
    lat: 20.2506,
    lng: 105.9745,
    image: "/images/AdobeStock_1998320314.jpeg",
    summary:
      "„Suchá Ha Long“ — plavba na loďke pomedzi vápencové veže v Trang An a Tam Coc.",
    body: "Ninh Binh (komplex Trang An, UNESCO) je jednodňový až dvojdňový výlet z Hanoja, ktorý mnohí označia za vrchol severu. Loďka vás vezme cez jaskyne a ryžové polia, z vyhliadky Hang Mua je najlepší výhľad vo Vietname. Požičajte si bicykel a objavte Bich Dong a Hoa Lu.",
    bestMonths: [5, 6, 10, 11],
    recommendedDays: 2,
    nearestAirport: "HAN",
    highlights: ["Trang An", "Hang Mua", "Tam Coc", "Bicykel medzi poliami"],
  },
  {
    slug: "hue",
    name: "Hue",
    type: "UNESCO",
    region: "Stredný Vietnam",
    lat: 16.4637,
    lng: 107.5909,
    image: "/images/AdobeStock_476540660.jpeg",
    summary:
      "Cisárske mesto poslednej dynastie — citadela, hrobky cisárov a najlepšia kráľovská kuchyňa.",
    body: "Hue bolo hlavným mestom dynastie Nguyen. Citadela so Zakázaným purpurovým mestom, hrobky cisárov Minh Manga a Khai Dinha pozdĺž Voňavej rieky a pagoda Thien Mu tvoria jednodňový okruh. Ochutnajte bun bo Hue a banh khoai. Z Hue do Hoi An vedie legendárny Hai Van Pass — ideálny na motorke.",
    bestMonths: [2, 3, 4, 5],
    recommendedDays: 2,
    nearestAirport: "HUI",
    highlights: ["Citadela", "Hrobky cisárov", "Thien Mu", "Hai Van Pass"],
  },
  {
    slug: "da-nang",
    name: "Da Nang",
    type: "mesto",
    region: "Stredný Vietnam",
    lat: 16.0544,
    lng: 108.2022,
    image: "/images/AdobeStock_634740280.jpeg",
    summary:
      "Moderné plážové mesto — My Khe beach, Zlatý most v Ba Na Hills a Marble Mountains.",
    body: "Da Nang je najpríjemnejšie mesto na život vo Vietname — dlhá piesková pláž My Khe, Dračí most, ktorý cez víkend chrlí oheň, a mramorové hory s jaskynnými chrámami. Výlet do Ba Na Hills s ikonickým Zlatým mostom vyjde na celý deň. Skvelá základňa: Hoi An je 30 minút, Hue 2,5 hodiny.",
    bestMonths: [3, 4, 5, 6, 7, 8],
    recommendedDays: 2,
    nearestAirport: "DAD",
    highlights: ["My Khe beach", "Zlatý most", "Marble Mountains", "Dračí most"],
  },
  {
    slug: "hoi-an",
    name: "Hoi An",
    type: "UNESCO",
    region: "Stredný Vietnam",
    lat: 15.8801,
    lng: 108.338,
    image: "/images/AdobeStock_626127018.jpeg",
    summary:
      "Lampiónové mesto — najkrajšie historické centrum Ázie, krajčíri, cao lau a pláž An Bang.",
    body: "Hoi An je pre väčšinu návštevníkov srdcovka. Staré mesto (UNESCO) večer rozsvietia tisíce lampiónov, každý 14. lunárny deň je Lantern Festival. Nechajte si ušiť oblečenie na mieru (24–48 h), na bicykli prejdite ryžové polia do Tra Que a zakončite deň na pláži An Bang. Ochutnajte cao lau a white rose dumplings.",
    bestMonths: [2, 3, 4, 5, 6, 7, 8],
    recommendedDays: 3,
    nearestAirport: "DAD",
    highlights: ["Lampióny", "Japonský most", "Krajčíri", "An Bang beach"],
  },
  {
    slug: "phong-nha",
    name: "Phong Nha-Ke Bang",
    type: "národný park",
    region: "Stredný Vietnam",
    lat: 17.5906,
    lng: 106.2836,
    image: "/images/AdobeStock_406360568.jpeg",
    summary:
      "Najväčšie jaskyne sveta vrátane Son Doong. Raj pre dobrodruhov a trekerov.",
    body: "Národný park Phong Nha-Ke Bang (UNESCO) ukrýva najväčšiu jaskyňu sveta Son Doong (expedícia ~3 000 USD, rezervácia rok dopredu) aj dostupnejšie skvosty: Paradise Cave, Phong Nha Cave loďkou a Dark Cave so zipline a bahenným kúpeľom. Okolie sa najlepšie spoznáva na motorke.",
    bestMonths: [2, 3, 4, 5, 6, 7, 8],
    recommendedDays: 2,
    nearestAirport: "VDH",
    highlights: ["Paradise Cave", "Dark Cave", "Son Doong", "Motorkárske okruhy"],
  },
  {
    slug: "nha-trang",
    name: "Nha Trang",
    type: "pláž",
    region: "Južný Vietnam",
    lat: 12.2388,
    lng: 109.1967,
    image: "/images/AdobeStock_1278495181.jpeg",
    summary:
      "Najznámejšie plážové letovisko — potápanie, ostrovné výlety a bahenné kúpele.",
    body: "Nha Trang má 6 km mestskej pláže, najlepšie potápanie pri ostrove Hon Mun, bahenné kúpele Thap Ba a Po Nagar veže po Čamoch. Je to najrušnejšie letovisko krajiny — kto hľadá pokoj, nech pokračuje do Quy Nhon alebo na Phu Quoc.",
    bestMonths: [2, 3, 4, 5, 6, 7, 8],
    recommendedDays: 3,
    nearestAirport: "CXR",
    highlights: ["Potápanie Hon Mun", "Bahenné kúpele", "Po Nagar", "Ostrovné výlety"],
  },
  {
    slug: "dalat",
    name: "Da Lat",
    type: "hory",
    region: "Južný Vietnam",
    lat: 11.9404,
    lng: 108.4583,
    image: "/images/AdobeStock_2051018564.jpeg",
    summary:
      "Mesto večnej jari — kávové plantáže, vodopády, canyoning a najlepšia káva v krajine.",
    body: "Da Lat leží v 1 500 m a je únikom pred horúčavou juhu. Francúzska koloniálna architektúra, jazero Xuan Huong, vodopády Datanla a Elephant Falls, canyoning a farmy — odtiaľto pochádza najlepšia vietnamská káva vrátane weasel coffee. Skvelé pre dvojice aj rodiny.",
    bestMonths: [12, 1, 2, 3, 4],
    recommendedDays: 2,
    nearestAirport: "DLI",
    highlights: ["Kávové farmy", "Canyoning", "Crazy House", "Nočný trh"],
  },
  {
    slug: "ho-ci-minovo-mesto",
    name: "Ho Či Minovo mesto",
    type: "mesto",
    region: "Južný Vietnam",
    lat: 10.8231,
    lng: 106.6297,
    image: "/images/AdobeStock_625826732.jpeg",
    summary:
      "Saigon — ekonomické srdce krajiny: rooftop bary, vojnové múzeá, tunely Cu Chi a delta Mekongu.",
    body: "Saigon nikdy nespí. War Remnants Museum, pošta od Eiffela, Ben Thanh market a nekonečný street food v District 4. Poldňový výlet do tunelov Cu Chi a jednodňovka do delty Mekongu patria k povinnej jazde. Večer rooftop bar na Bitexco alebo pivná ulička Bui Vien.",
    bestMonths: [12, 1, 2, 3, 4],
    recommendedDays: 3,
    nearestAirport: "SGN",
    highlights: ["War Remnants Museum", "Cu Chi", "Delta Mekongu", "Rooftop bary"],
  },
  {
    slug: "phu-quoc",
    name: "Phu Quoc",
    type: "ostrov",
    region: "Južný Vietnam",
    lat: 10.2899,
    lng: 103.984,
    image: "/images/AdobeStock_341175912.jpeg",
    summary:
      "Najväčší vietnamský ostrov — biele pláže Sao Beach, západy slnka a bezvízový vstup.",
    body: "Phu Quoc je plážová bodka za cestou po Vietname. Sao Beach a Ong Lang patria k najkrajším plážam krajiny, najdlhšia lanovka sveta vedie na Hon Thom. Ostrov má bezvízový režim 30 dní pri priamom prílete. Sezóna je november–apríl; v lete počítajte s dažďom.",
    bestMonths: [11, 12, 1, 2, 3, 4],
    recommendedDays: 4,
    nearestAirport: "PQC",
    highlights: ["Sao Beach", "Lanovka Hon Thom", "Západy slnka", "Nočný trh"],
  },
];

export function getDestination(slug: string) {
  return destinations.find((d) => d.slug === slug);
}
