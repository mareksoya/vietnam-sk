// Praktické informácie — obsah statických stránok /prakticke-info/[slug]
// Fakty overené z oficiálnych zdrojov (vietnam.travel, evisa.xuatnhapcanh.gov.vn), júl 2026.

export interface PracticalSection {
  heading: string;
  body: string; // odseky oddelené \n\n
}

export interface PracticalTopic {
  slug: string;
  title: string;
  icon: "stamp" | "wifi" | "creditcard" | "shield" | "heart" | "bus";
  excerpt: string;
  sections: PracticalSection[];
  faq: { q: string; a: string }[];
  sourceName?: string;
  sourceUrl?: string;
}

export const practicalTopics: PracticalTopic[] = [
  {
    slug: "viza",
    title: "Víza a vstup do Vietnamu",
    icon: "stamp",
    excerpt:
      "Slováci a Česi potrebujú e-víza — vybavíš ich online za pár minút, platia 90 dní na viac vstupov.",
    sections: [
      {
        heading: "E-víza za 25–50 USD",
        body: "Vietnam udeľuje elektronické víza občanom všetkých krajín vrátane Slovenska a Česka. E-víza platia až 90 dní a môžu byť na jeden vstup (25 USD) alebo viac vstupov (50 USD).\n\nŽiadosť podávaš výhradne na oficiálnom portáli imigračného úradu evisa.xuatnhapcanh.gov.vn. Potrebuješ sken pasu, fotografiu a platbu kartou. Schválenie trvá zvyčajne 3–5 pracovných dní, v špičke aj dlhšie — žiadaj aspoň 2 týždne pred odletom.",
      },
      {
        heading: "Pozor na neoficiálne stránky",
        body: "Existujú desiatky sprostredkovateľských webov, ktoré vyzerajú oficiálne a účtujú 2–4× vyššie poplatky. Jediná oficiálna adresa je evisa.xuatnhapcanh.gov.vn — všetko ostatné je sprostredkovateľ.",
      },
      {
        heading: "Vstup a pas",
        body: "Pas musí platiť minimálne 6 mesiacov od dátumu vstupu. E-víza platia na 13 medzinárodných letiskách (vrátane Hanoja, Ho Či Minovho Mesta, Da Nangu, Phu Quocu) a väčšine pozemných hraničných priechodov. Pri vstupe si vytlač schválené e-víza — imigrační úradníci ich chcú vidieť na papieri.",
      },
    ],
    faq: [
      {
        q: "Platí pre Slovákov bezvízový styk?",
        a: "Nie. Bezvízový vstup (45 dní) majú z EÚ len Nemecko, Francúzsko, Taliansko, Španielsko a severské krajiny. Slováci a Česi potrebujú e-víza.",
      },
      {
        q: "Ako dlho trvá vybavenie?",
        a: "Oficiálne 3 pracovné dni, reálne počítaj s 5–7 dňami. Pred sviatkami (Tet!) žiadaj s väčším predstihom.",
      },
      {
        q: "Môžem víza predĺžiť na mieste?",
        a: "Predĺženie je komplikované a nie je garantované. Jednoduchšie je vycestovať (napr. do Kambodže) a vrátiť sa na nové e-víza — pri multiple entry ani to netreba.",
      },
    ],
    sourceName: "vietnam.travel — Visa Requirements",
    sourceUrl: "https://vietnam.travel/plan-your-trip/visa-requirements",
  },
  {
    slug: "sim-esim-internet",
    title: "SIM karty, eSIM a internet",
    icon: "wifi",
    excerpt:
      "Internet je vo Vietname rýchly a smiešne lacný — neobmedzené dáta od ~8 € na mesiac.",
    sections: [
      {
        heading: "Operátori: Viettel je istota",
        body: "Najlepšie pokrytie (vrátane hôr a ostrovov) má štátny Viettel, nasledujú Mobifone a Vinaphone. Turistické balíčky s neobmedzenými dátami stoja 200 000–350 000 VND (8–13 €) na 30 dní.\n\nSIM kúpiš na letisku (drahšie, ale pohodlné) alebo v značkovej predajni operátora v meste (lacnejšie, treba pas). Vyhni sa pouličným stánkom — SIM nemusí byť riadne registrovaná a operátor ju môže zablokovať.",
      },
      {
        heading: "eSIM pred odletom",
        body: "Ak má tvoj telefón eSIM, najpohodlnejšie je kúpiť dátový balík ešte doma cez aplikácie ako Airalo, Holafly či Saily — od ~5 € za 3 GB. Aktivuje sa hneď po pristátí, ideálne na Grab z letiska. Na dlhší pobyt sa oplatí kombinácia: eSIM na prvé dni + lokálna Viettel SIM na zvyšok.",
      },
      {
        heading: "Wi-Fi je všade",
        body: "Každá kaviareň, hotel aj reštaurácia má zadarmo Wi-Fi, zvyčajne slušne rýchlu. Vietnam patrí k najlepším krajinám pre digitálnych nomádov aj vďaka tomu.",
      },
    ],
    faq: [
      {
        q: "Funguje vo Vietname 5G?",
        a: "Áno, vo väčších mestách. Rýchlosti 4G/5G bez problémov stačia na video hovory aj streamovanie.",
      },
      {
        q: "Potrebujem VPN?",
        a: "Bežné služby (Google, Instagram, WhatsApp, Netflix) fungujú normálne. VPN sa hodí nanajvýš na ochranu na verejných Wi-Fi.",
      },
    ],
  },
  {
    slug: "mena-a-ceny",
    title: "Mena, ceny a bankomaty",
    icon: "creditcard",
    excerpt:
      "1 € ≈ 27 000–28 000 VND. Pho za 2 €, hotel od 20 € — Vietnam je jedna z najlacnejších destinácií Ázie.",
    sections: [
      {
        heading: "Vietnamský dong (VND)",
        body: "Kurz sa dlhodobo drží okolo 27 000–28 000 VND za euro. Bankovky majú veľa núl — najjednoduchšia pomôcka: 100 000 VND ≈ 3,60 €. Pozor na zámenu bankoviek 20 000 (modrá) a 500 000 (tiež modrá!) — najčastejšia chyba turistov.",
      },
      {
        heading: "Koľko čo stojí",
        body: "Miska pho na ulici 50–70 tisíc VND (~2 €), banh mi 25–40 tisíc (~1,20 €), káva 30–50 tisíc, veľké pivo 15–30 tisíc (0,60–1,10 €). Slušný hotel s raňajkami 20–40 €, boutique 50–80 €. Vnútroštátny let 30–60 €, nočný vlak 25–40 €, hodina jazdy Grabom ~5 €.\n\nRozpočty na deň (bez letenky): backpacker 25–35 €, stredná trieda 50–80 €, komfort 120 €+.",
      },
      {
        heading: "Bankomaty a platby kartou",
        body: "Bankomaty sú všade; limit výberu býva 3–5 mil. VND. Najnižšie poplatky majú TPBank, VPBank a niektoré Agribank automaty; zahraničné banky (Citibank, HSBC) umožňujú vyššie výbery. Vždy odmietni konverziu bankomatu (DCC) — nechaj účtovať vo VND.\n\nKarty berú hotely, reštaurácie v centre a reťazce; street food, trhy a vidiek sú čisto hotovostné. Ideálny mix: karta Revolut/Wise + hotovosť na 2–3 dni vopred.",
      },
      {
        heading: "Zmenárne",
        body: "Najlepší kurz dostaneš v zlatníctvach (áno, naozaj) a oficiálnych zmenárňach vo veľkých mestách, nie na letisku. Eurá zmeníš bez problémov, doláre tiež. Vždy si prepočítaj sumu vopred a peniaze prepočítaj na mieste.",
      },
    ],
    faq: [
      {
        q: "Zjednáva sa vo Vietname?",
        a: "Na trhoch áno — začni na ~50 % ponúknutej ceny a stretnete sa v strede. V obchodoch s cenovkami a reštauráciách sa nezjednáva.",
      },
      {
        q: "Dáva sa prepitné?",
        a: "Nie je povinné ani očakávané, ale za dobrý servis poteší 5–10 % alebo zaokrúhlenie. Sprievodcom a masérkam je prepitné bežné.",
      },
    ],
  },
  {
    slug: "bezpecnost-a-scamy",
    title: "Bezpečnosť a scamy",
    icon: "shield",
    excerpt:
      "Vietnam je veľmi bezpečná krajina — násilná kriminalita voči turistom prakticky neexistuje. Stačí poznať pár klasických trikov.",
    sections: [
      {
        heading: "Celkovo: pokojná krajina",
        body: "Vietnam patrí k najbezpečnejším krajinám juhovýchodnej Ázie. Aj v noci sa v mestách pohybuješ bez obáv. Hlavné riziká sú drobné: vytrhnutie telefónu z ruky spolujazdcom na skútri (drž telefón ďalej od cesty) a predražené účty tam, kde nie sú cenovky.",
      },
      {
        heading: "Klasické triky, ktoré treba poznať",
        body: "Taxi s „rýchlym“ taxametrom: používaj výhradne aplikáciu Grab (funguje ako Uber, cena vopred) alebo oficiálne Mai Linh / Vinasun.\n\nCyklo-rikše a „zadarmo“ suveníry: dohodni cenu VOPRED, inak nasleduje scéna.\n\nZmena bankovky: zaplatíš 500 000, vodič v ruke „zázračne“ drží 20 000 a tvrdí, že si dal málo. Pri platení povedz nahlas hodnotu bankovky.\n\nPožičovne motoriek: falošné „poškodenia“ pri vrátení. Natoč si video motorky pri preberaní a požičiavaj len v overených požičovniach s recenziami.\n\nLúpežné ceny za ovocie/kokosy od pouličných predavačiek, ktoré ti najprv „zadarmo“ položia košík na rameno kvôli fotke — slušne odmietni.",
      },
      {
        heading: "Doprava = najväčšie reálne riziko",
        body: "Najnebezpečnejšia vec vo Vietname je cestná premávka. Na motorke jazdi len s prilbou, medzinárodným vodičákom (kategória A pre motorky nad 50 cm³!) a poistením, ktoré kryje jazdu na motorke. Cez cestu choď pomalým rovnomerným krokom — skútre si ťa obídu.",
      },
    ],
    faq: [
      {
        q: "Je bezpečné jesť street food?",
        a: "Áno — vyber si stánky, kde je veľa miestnych a jedlo sa pripravuje pred tebou. Vyhni sa vopred nakrájanému ovociu a ľadu z neznámej vody na vidieku.",
      },
      {
        q: "Dá sa piť voda z vodovodu?",
        a: "Nie. Kupuj balenú alebo používaj filter. Ľad v reštauráciách v mestách býva z baleného ľadu (valcovitý s dierou) — ten je v poriadku.",
      },
    ],
  },
  {
    slug: "zdravie-a-ockovanie",
    title: "Zdravie a očkovanie",
    icon: "heart",
    excerpt:
      "Povinné očkovania nie sú. Odporúča sa hepatitída A/B a brušný týfus, na dlhé pobyty aj besnota.",
    sections: [
      {
        heading: "Odporúčané očkovania",
        body: "Pre bežnú turistiku sa odporúča: hepatitída A (jednoznačne), hepatitída B, brušný týfus a aktuálne základné očkovania (tetanus, čierny kašeľ). Pri dlhodobých pobytoch mimo miest zváž besnotu a japonskú encefalitídu. Navštív ambulanciu cestovnej medicíny 6–8 týždňov pred odletom.\n\nMalária sa vyskytuje len v odľahlých horských oblastiach — pre klasickú trasu (mestá, pobrežie, Sapa, delta) sa antimalariká bežne neodporúčajú. Dôležitejšia je ochrana pred komármi (horúčka dengue je v mestách): repelent s DEET, dlhé rukávy večer.",
      },
      {
        heading: "Lekárne a nemocnice",
        body: "Lekárne (nhà thuốc) sú na každom rohu a mnohé lieky dostaneš bez receptu. V Hanoji, Da Nangu a Ho Či Minovom Meste sú kvalitné medzinárodné kliniky (Vinmec, FV Hospital, Family Medical Practice) s anglicky hovoriacim personálom — ošetrenie je rýchle, ale plať kartou a odkladaj bločky pre poisťovňu.",
      },
      {
        heading: "Cestovné poistenie",
        body: "Uzatvor komplexné poistenie liečebných nákladov s krytím aspoň 100 000 € a over si, či kryje jazdu na motorke (väčšina základných poistiek NIE — vyžaduje sa pripoistenie a vodičské oprávnenie na motorku). Bez správneho vodičáku poisťovňa pri nehode na skútri nemusí plniť.",
      },
      {
        heading: "Žalúdok a aklimatizácia",
        body: "„Cestovateľská“ hnačka postihne časť návštevníkov v prvých dňoch — základ je hydratácia, probiotiká a čierny čaj. Do lekárničky: probiotiká, rehydratačné soli, Smecta/aktívne uhlie, ibuprofen, náplasti a repelent. Klasika platí: uvarené, olúpané alebo horúce = v poriadku.",
      },
    ],
    faq: [
      {
        q: "Potrebujem COVID doklady?",
        a: "Nie, Vietnam nevyžaduje žiadne covidové potvrdenia.",
      },
      {
        q: "Je slnko nebezpečné?",
        a: "UV index je celoročne vysoký. Krém 50+, pokrývka hlavy a veľa vody — úpal je častejší problém než čokoľvek exotické.",
      },
    ],
  },
  {
    slug: "doprava",
    title: "Doprava po Vietname",
    icon: "bus",
    excerpt:
      "Nočné vlaky, limuzínové vany, lacné vnútroštátne lety a Grab — presuny sú lacné a prekvapivo pohodlné.",
    sections: [
      {
        heading: "Vnútroštátne lety",
        body: "Na dlhé presuny (Hanoj ↔ Da Nang ↔ Saigon) sú najrýchlejšie lety Vietnam Airlines, Vietjet a Bamboo — bežne 30–60 € s batožinou, letí sa každú hodinu. Vietjet je lacný, ale mešká častejšie; Vietnam Airlines je spoľahlivejšia voľba.",
      },
      {
        heading: "Vlaky: zážitok menom Reunification Express",
        body: "Železnica sever–juh spája Hanoj so Saigonom (celá trasa ~35 hodín). Najužitočnejšie úseky: Hanoj–Lao Cai (Sapa) nočným vlakom a Hue–Da Nang cez Hai Van Pass — jedna z najkrajších tratí Ázie, sadni si vľavo v smere na juh.\n\nKupuj „soft sleeper“ (4-lôžkové kupé) cez oficiálny dsvn.vn alebo agregátory 12go.asia / Baolau. Nočný vlak ušetrí noc v hoteli aj deň cestovania.",
      },
      {
        heading: "Autobusy a limuzínové vany",
        body: "Medzi mestami jazdia „sleeping busy“ (ležadlové autobusy, 15–25 € na dlhé trasy) a čoraz populárnejšie limuzínové vany s 9–11 sedadlami — rýchlejšie, pohodlnejšie, rezervovateľné cez 12go alebo hotel. Na kratšie trasy (Hanoj–Ninh Binh, Hue–Hoi An) sú vany jasná voľba.",
      },
      {
        heading: "V meste: Grab a spol.",
        body: "Grab (autá aj motorky) funguje vo všetkých väčších mestách — cena vopred, bez zjednávania, platba kartou. Alternatívy: Be a Xanh SM (elektrické taxíky). GrabBike za pár desiatok centov je najrýchlejší spôsob presunu v hustej premávke.",
      },
      {
        heading: "Motorka: sloboda s pravidlami",
        body: "Požičovné 5–10 €/deň (poloautomat Honda). Legálne potrebuješ medzinárodný vodičák s kategóriou A — bez neho ti pri nehode nepomôže poistka a hrozí pokuta. Slávne trasy: Hai Van Pass, Ha Giang Loop (3–4 dni) a okolie Phong Nha.",
      },
    ],
    faq: [
      {
        q: "Oplatí sa prenajať auto?",
        a: "Auto bez šoféra si turista prakticky neprenajme (a nechcel by si — premávka je divoká). Bežná alternatíva je auto so šoférom na deň (~50–80 €).",
      },
      {
        q: "Ako sa dostanem na Phu Quoc?",
        a: "Priamym letom z Hanoja aj Saigonu (od ~30 €) alebo trajektom z Ha Tien / Rach Gia. Ostrov má bezvízový režim 30 dní pri priamom prílete zo zahraničia.",
      },
    ],
    sourceName: "vietnam.travel — Getting around",
    sourceUrl: "https://vietnam.travel/plan-your-trip/transport-within-vietnam",
  },
];

export function getPracticalTopic(slug: string) {
  return practicalTopics.find((t) => t.slug === slug);
}
