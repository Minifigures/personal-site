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
  title: "Marco Anthony Ayuste | Portfolio",
  description:
    "Full-stack developer, AI/ML engineer, and hackathon competitor. Explore my work and get in touch.",
  openGraph: {
    title: "Marco Anthony Ayuste | Portfolio",
    description:
      "Full-stack developer, AI/ML engineer, and hackathon competitor.",
    url: "https://marcoayuste.com",
    siteName: "Marco Ayuste",
    type: "website",
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
