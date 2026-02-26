import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hotel-breakfast-redesign.vercel.app"),
  title: "Hotel Breakfast | Because Champagne is a Morning Drink",
  description: "Elevate your morning ritual. Luxury lifestyle essentials for those who believe every morning should feel like vacation. Premium quality. Effortless style.",
  keywords: ["luxury breakfast", "champagne", "morning ritual", "lifestyle", "hotel breakfast", "beach towels", "premium apparel"],
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Hotel Breakfast | Because Champagne is a Morning Drink",
    description: "Lifestyle essentials for those who believe every morning should feel like vacation. Premium quality. Effortless style.",
    type: "website",
    siteName: "Hotel Breakfast",
    locale: "en_US",
    url: "https://hotel-breakfast-redesign.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Breakfast | Because Champagne is a Morning Drink",
    description: "Lifestyle essentials for those who believe every morning should feel like vacation.",
    creator: "@hotelbreakfast",
    site: "@hotelbreakfast",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-[#FFF6E1] text-[#1a1a1a]`}
      >
        {children}
      </body>
    </html>
  );
}
