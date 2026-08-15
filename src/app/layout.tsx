import type { Metadata } from "next";
import { Lexend, Inter } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Auditor Épico | Marketing Amable - Diagnóstico Comercial & Autoridad 360°",
  description: "Diagnóstico comercial, CRO, detección de fugas de dinero y auditoría RGPD/AEPD para captar y cerrar clientes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${lexend.variable} ${inter.variable} h-full antialiased bg-[#0D0D0D] text-white`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#0D0D0D] text-slate-100 selection:bg-[#D8F3DC] selection:text-[#0D0D0D]">
        {children}
      </body>
    </html>
  );
}
