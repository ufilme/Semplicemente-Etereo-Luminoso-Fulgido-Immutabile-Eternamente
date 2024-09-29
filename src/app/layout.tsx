'use client';
import { Inter } from "next/font/google";
import { TimeMachine } from "@/app/components/TimeMachine";
import Link from "next/link";
import { Metadata } from "next";
import { useState } from "react";
import "@/app/global.css";
import { GoHomeFill } from "react-icons/go";
import { IconContext } from "react-icons";
import { GoXCircleFill } from "react-icons/go";
import { RiLogoutBoxFill } from "react-icons/ri";
import Cookies from 'js-cookie'


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const clearCookie = () => {
    Cookies.remove("token")
    window.location.reload();
  }

  return (
    <html lang="it" className={inter.className}>
      <title>SELFIE</title>
      <body className="h-screen bg-sky-950">
        {/* Layout UI */}
        <main className="h-full">
          <TimeMachine />
          {children}
          <div className="h-[4vh] flex justify-center gap-2 items-center bg-gray-200">
            <Link href="/" className="rounded-lg bg-black p-1.5">
              <GoHomeFill style={{ color: "white" }} />
            </Link>
            <button onClick={() => clearCookie()} className="rounded-lg bg-red-700 p-1.5">
              <GoXCircleFill style={{ color: "white" }} />
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
