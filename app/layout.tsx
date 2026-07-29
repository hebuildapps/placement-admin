// @ts-ignore: allow side-effect CSS import when no type declarations are present
import "./globals.css";
import React from "react";
import { Toaster } from "sonner";
import { Lexend, Geist, Lora } from "next/font/google";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Placements Dashboard",
  description: "Admin placement-tracking & visualization dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lexend.variable} ${geist.variable} ${lora.variable} font-lexend`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
