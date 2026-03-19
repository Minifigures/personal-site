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
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          /* iOS scrollbar - injected directly to bypass Tailwind */
          ::-webkit-scrollbar { width: 6px !important; }
          ::-webkit-scrollbar-track { background: transparent !important; }
          ::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.25) !important;
            border-radius: 100px !important;
          }
          ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.45) !important; }
          ::-webkit-scrollbar-thumb:active { background: rgba(255,255,255,0.6) !important; }
          html { scrollbar-width: thin !important; scrollbar-color: rgba(255,255,255,0.25) transparent !important; }

          /* Global text black outline for accessibility */
          body, body p, body span, body a, body li, body h1, body h2, body h3, body h4, body label, body div {
            -webkit-text-stroke: 0.8px rgba(0,0,0,0.4);
            paint-order: stroke fill;
            text-shadow: 0 1px 3px rgba(0,0,0,0.4), 0 0 6px rgba(0,0,0,0.2);
          }
          /* Heavier for headings */
          body h1, body h2, body h3 {
            -webkit-text-stroke: 1.2px rgba(0,0,0,0.5);
            text-shadow: 0 2px 6px rgba(0,0,0,0.5), 0 0 10px rgba(0,0,0,0.3);
          }
          /* Don't stroke inputs */
          input, textarea, button { -webkit-text-stroke: 0 !important; }
        `}} />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
