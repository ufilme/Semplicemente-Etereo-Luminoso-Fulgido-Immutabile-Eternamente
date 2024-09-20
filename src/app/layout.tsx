import { Inter } from "next/font/google";
import { TimeMachine } from "@/app/components/TimeMachine";
import { Metadata } from "next";
import { useState } from "react";
import "@/app/global.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SELFIE",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="it" className={inter.className}>
      <body className="h-screen bg-sky-950">
        {/* Layout UI */}
        <main className="">
          <TimeMachine />
          {children}
          </main>
      </body>
    </html>
  );
}
