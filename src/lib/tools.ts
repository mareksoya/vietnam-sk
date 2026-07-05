import {
  Coins,
  Wallet,
  Clock,
  Luggage,
  Languages,
  type LucideIcon,
} from "lucide-react";

export type ToolMeta = {
  id: string;
  href: string;
  icon: LucideIcon;
  title: string;
  short: string; // krátky podtitul (karta/chip)
  desc: string; // veta pod nadpisom stránky
};

export const TOOLS: ToolMeta[] = [
  {
    id: "mena",
    href: "/nastroje/mena",
    icon: Coins,
    title: "Prevod meny",
    short: "EUR ↔ VND",
    desc: "Prepočítaj eurá na dongy a naopak — s upraviteľným kurzom.",
  },
  {
    id: "rozpocet",
    href: "/nastroje/rozpocet",
    icon: Wallet,
    title: "Kalkulačka rozpočtu",
    short: "koľko ťa cesta vyjde",
    desc: "Odhadni náklady na cestu podľa štýlu, dĺžky a počtu osôb.",
  },
  {
    id: "cas",
    href: "/nastroje/cas",
    icon: Clock,
    title: "Čas vo Vietname",
    short: "aktuálny čas a posun",
    desc: "Pozri aktuálny čas vo Vietname a časový posun oproti tebe.",
  },
  {
    id: "balenie",
    href: "/nastroje/balenie",
    icon: Luggage,
    title: "Čo si zbaliť",
    short: "checklist pred odletom",
    desc: "Odškrtávací zoznam, čo si zbaliť — ukladá sa v prehliadači.",
  },
  {
    id: "vietnamcina",
    href: "/nastroje/vietnamcina",
    icon: Languages,
    title: "Vietnamčina pre turistov",
    short: "frázy s výslovnosťou",
    desc: "Základné frázy so zjednodušenou výslovnosťou a prehrávaním nahlas.",
  },
];
