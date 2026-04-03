import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const siteUrl = "https://andrewlacroce.com";
const siteTitle = "Andrew Lacroce — Technical Program Manager * Engineering Manager";
const siteDescription =
  "Technical Program Manager and Engineering Manager with 20+ years delivering complex software programs.";
const socialImagePath = "/og-image.png";
const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;

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
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  applicationName: "Andrew Lacroce Professional Site",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Andrew Lacroce",
    "Technical Program Manager",
    "Engineering Manager",
    "Program Management",
    "Software Delivery",
    "Agile",
    "Portfolio",
    "Leadership",
  ],
  authors: [{ name: "Andrew Lacroce", url: siteUrl }],
  creator: "Andrew Lacroce",
  publisher: "Andrew Lacroce",
  verification: googleSiteVerification
    ? {
        google: googleSiteVerification,
      }
    : undefined,
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "profile-pic.jpg",
    apple: "profile-pic.jpg",
    shortcut: "profile-pic.jpg",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Andrew Lacroce",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: socialImagePath,
        width: 1200,
        height: 630,
        alt: "Andrew Lacroce - Technical Program Manager and Engineering Manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [socialImagePath],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1112",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Andrew Lacroce",
    url: siteUrl,
    image: `${siteUrl}/profile-pic.jpg`,
    jobTitle: "Technical Program Manager and Engineering Manager",
    description: siteDescription,
    sameAs: [
      "https://www.linkedin.com/in/andrew-lacroce/",
      "https://github.com/andylacroce",
    ],
    knowsAbout: [
      "Program Management",
      "Engineering Management",
      "Software Delivery",
      "Agile",
      "Cloud Migration",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Andrew Lacroce",
    url: siteUrl,
    description: siteDescription,
    inLanguage: "en-US",
  };

  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
