import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Andrew Lacroce — Engineering Leader",
  description:
    "Engineering leader with 20+ years delivering complex software programs. Targeting TPM and EM roles.",
  openGraph: {
    title: "Andrew Lacroce — Engineering Leader",
    description:
      "Engineering leader with 20+ years delivering complex software programs.",
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
      <body>{children}</body>
    </html>
  );
}
