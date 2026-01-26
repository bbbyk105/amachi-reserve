import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "amachi hoshisora × エヴァンゲリオン コラボ予約",
  description: "amachi hoshisoraとエヴァンゲリオンのコラボレーション予約チラシ",
  keywords: ["amachi hoshisora", "エヴァンゲリオン", "コラボ", "予約"],
  openGraph: {
    title: "amachi hoshisora × エヴァンゲリオン コラボ予約",
    description: "amachi hoshisoraとエヴァンゲリオンのコラボレーション予約チラシ",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "amachi hoshisora × エヴァンゲリオン コラボ予約",
    description: "amachi hoshisoraとエヴァンゲリオンのコラボレーション予約チラシ",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#581c87",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
