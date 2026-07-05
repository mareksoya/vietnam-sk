import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vietnam.sk"),
  title: {
    default: "Vietnam.sk — Objav Vietnam | Inteligentný cestovateľský sprievodca",
    template: "%s | Vietnam.sk",
  },
  description:
    "Najlepší slovenský portál o Vietname. AI plánovač itinerárov, interaktívna mapa, destinácie, festivaly, víza, street food a praktické rady na jednom mieste.",
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
    <html lang="sk">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
