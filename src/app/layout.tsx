import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Bebas_Neue } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bacolav.be"), // Verander dit naar je uiteindelijke domein
  title: "BACOLAV — Gasolina in a Bottle",
  description:
    "Bacolav — premium fictief Bacardi-cola merk. 60% rum. 100% fun. 0% apologies.",
  openGraph: {
    title: "BACOLAV — Gasolina in a Bottle",
    description: "60% rum. 100% fun. 0% apologies. Ontdek het geheim van Bacolav.",
    images: [
      {
        url: "/uploads/hero-bg.webp",
        width: 1200,
        height: 630,
        alt: "Bacolav",
      },
    ],
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BACOLAV — Gasolina in a Bottle",
    description: "60% rum. 100% fun. 0% apologies.",
    images: ["/uploads/hero-bg.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${playfair.variable} ${dmSans.variable} ${bebas.variable}`}
    >
      <body className="overflow-x-hidden bg-darker text-cream font-sans">
        {children}
      </body>
    </html>
  );
}
