import type { Metadata } from "next";
import { Source_Serif_4, Be_Vietnam_Pro } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

/*
 * Fonty podľa design systému (§2): Source Serif 4 (display) + Be Vietnam Pro (body).
 * next/font ich pri builde stiahne a servíruje z vlastnej domény — v produkcii
 * nejde žiadny request na fonts.googleapis.com (splnená požiadavka self-hosted).
 * Subsety vrátane vietnamese pre správne diakritiky (Hội An, Đà Nẵng, Huế).
 */
const serifDisplay = Source_Serif_4({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["500", "600"],
  variable: "--font-serif-display",
  display: "swap",
});

const bodySans = Be_Vietnam_Pro({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-body-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vietnam.sk"),
  title: {
    default: "Vietnam.sk — sprievodca Vietnamom, ktorý ti pomôže naplánovať cestu",
    template: "%s | Vietnam.sk",
  },
  description:
    "Slovenský portál o Vietname: itineráre, praktické info (víza, doprava, ceny), destinácie a AI plánovač. Konkrétne rady od ľudí, ktorí tam boli.",
  openGraph: {
    siteName: "Vietnam.sk",
    locale: "sk_SK",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sk" className={`${serifDisplay.variable} ${bodySans.variable}`}>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
