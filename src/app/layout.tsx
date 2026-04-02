import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Andrew Lacroce — Technical Program Manager / Engineering Manager",
  description:
    "Technical Program Manager and Engineering Manager with 20+ years delivering complex software programs.",
  icons: {
    icon: "/profile-pic.jpg",
    apple: "/profile-pic.jpg",
    shortcut: "/profile-pic.jpg",
  },
  openGraph: {
    title: "Andrew Lacroce — Technical Program Manager / Engineering Manager",
    description:
      "Technical Program Manager and Engineering Manager with 20+ years delivering complex software programs.",
    url: "https://andrewlacroce.com",
    siteName: "Andrew Lacroce",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>{children}</body>
    </html>
  );
}
