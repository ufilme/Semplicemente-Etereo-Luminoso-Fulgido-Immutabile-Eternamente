import { Inter } from "next/font/google";
import { TimeMachine } from "@/app/components/TimeMachine";
import { Metadata } from "next";
import "@/app/global.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SELFIE - Note",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={inter.className}>
      <body className="h-screen bg-amber-600">
        {/* Layout UI */}
        <TimeMachine height="h-[4vh]" />
        <main className="h-[96vh]">{children}</main>
      </body>
    </html>
  );
}
