import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Leading Aluminium Windows and Doors Manufacturer | Tostem India",
  description:
    "Tostem India is the world's leading manufacturer and supplier of aluminium windows and doors in India. Browse our premium Japanese products for durable, energy-efficient solutions.",
  keywords: [
    "Tostem India",
    "aluminium windows",
    "aluminium doors",
    "system windows",
    "Japanese innovation",
    "window manufacturer",
    "door manufacturer",
    "energy efficient windows",
    "soundproof windows",
    "LIXIL",
  ],
  authors: [{ name: "Tostem India" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Leading Aluminium Windows and Doors Manufacturer | Tostem India",
    description:
      "Tostem India is the world's leading manufacturer and supplier of aluminium windows and doors in India.",
    siteName: "Tostem India",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leading Aluminium Windows and Doors Manufacturer | Tostem India",
    description:
      "Tostem India is the world's leading manufacturer and supplier of aluminium windows and doors in India.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
