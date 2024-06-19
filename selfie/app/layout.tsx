import { Inter } from "next/font/google";
import { TimeMachine } from "@/app/components/TimeMachine";
import { Metadata } from "next";
import "./global.css";

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
    <html lang="en" className={inter.className}>
      <body>
        {/* Layout UI */}
        <TimeMachine />
        <main>{children}</main>
      </body>
    </html>
  );
}
