import type { Metadata } from "next";
import { Inter, Quicksand } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-organix",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Organix | Preventive health tracking",
  description:
    "Know your body, understand your risk markers, and track preventive health progress in plain English.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${quicksand.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#F2F2F7] text-[#1D1D1F]">
        {children}
      </body>
    </html>
  );
}
