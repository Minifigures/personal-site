import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marco Anthony Ayuste | Full-Stack Developer & Builder",
  description:
    "Full-stack developer, CCIT + Sociology student at UofT, hackathon winner. Explore my portfolio of projects.",
  keywords: [
    "Marco Ayuste",
    "software engineer",
    "AI/ML",
    "full-stack developer",
    "University of Toronto",
    "portfolio",
    "React",
    "Next.js",
    "Three.js",
  ],
  authors: [{ name: "Marco Anthony Ayuste" }],
  openGraph: {
    title: "Marco Anthony Ayuste | Portfolio",
    description:
      "Full-stack developer, AI/ML engineer, and hackathon champion. Explore my work.",
    url: "https://marcoayuste.com",
    siteName: "Marco Ayuste",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marco Anthony Ayuste | Portfolio",
    description:
      "Full-stack developer, AI/ML engineer, and hackathon champion.",
  },
  metadataBase: new URL("https://marcoayuste.com"),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
