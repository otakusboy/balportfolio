import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteCursor } from "@/components/cursor/SiteCursor";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Iqbal Aqaba | UI/UX Designer & Framer Developer",
  description:
    "UI/UX Designer & Framer Developer. Founder of Nodes Agency, Top 3% Upwork Talent. Expert in web design, Framer sites, and user-focused digital products.",
  icons: {
    icon: "/images/icons/favicon-light.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full font-sans antialiased">
        <SiteCursor />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
