import { Inter } from "next/font/google";
import { TimeMachine } from "@/app/components/TimeMachine";
import Link from "next/link";
import { Metadata } from "next";
import { useState } from "react";
import "@/app/global.css";
import { GoHomeFill } from "react-icons/go";
import { IconContext } from "react-icons";

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
          <div className="h-[4vh] flex justify-center items-center bg-gray-200">
            <Link href="/" className="rounded-lg bg-black p-1.5">
              <GoHomeFill style={{ color: "white" }} />
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
