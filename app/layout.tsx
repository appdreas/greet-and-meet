import ContextWrapper from "@/components/ContextWrapper";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
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
  title: "Greet and Meet",
  description:
    "Find and join exciting events in your area. From sports to arts, there is something for everyone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <ContextWrapper>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-zinc-50 to-emerald-200`}
        >
          <Navbar />
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>
          <Toaster />
        </body>
      </ContextWrapper>
    </html>
  );
}
