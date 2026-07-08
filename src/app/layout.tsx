import React from 'react';
import { ScrollToTop } from "@/components/scroll-to-top";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL('https://sk-partner.sk'),
  title: "SK Partner | Distribútor Deye, FoxESS, Solis na Slovensku",
  description: "SK Partner s.r.o. – oficiálny distribútor značiek Deye, FoxESS a Solis na Slovensku. Hybridné a sieťové invertory, LiFePO4 batérie. Sklad Bratislava, dodanie do 3 dní.",
  keywords: "Deye Slovensko, FoxESS distributor, Solis invertor, hybridný invertor B2B, batérie LiFePO4, solárna technika veľkoobchod",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/brand/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.svg',
    apple: '/brand/apple-touch-icon.png',
  },
  openGraph: {
    title: "SK Partner | Distribútor Deye, FoxESS, Solis",
    description: "Oficiálny distribútor solárnej techniky na Slovensku. Sklad Bratislava.",
    url: "https://sk-partner.sk",
    siteName: "SK Partner",
    locale: "sk_SK",
    type: "website",
    images: [{ url: "/brand/og-image.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
