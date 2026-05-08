import type { Metadata, Viewport } from "next";
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

const siteUrl = "https://marcoayuste.com";
const ogImage = "/projects/personal-site.png";
const description =
  "Marco Ayuste is a Toronto-based full-stack and AI/ML engineer at the University of Toronto Mississauga (CCIT + Sociology). Hackathon winner shipping production React, Next.js, FastAPI, and LangGraph systems.";

export const metadata: Metadata = {
  title: {
    default: "Marco Anthony Ayuste | Full-Stack & AI/ML Engineer",
    template: "%s | Marco Ayuste",
  },
  description,
  applicationName: "Marco Ayuste Portfolio",
  category: "technology",
  keywords: [
    "Marco Ayuste",
    "Marco Anthony Ayuste",
    "Marco Ayuste portfolio",
    "Marco Ayuste UofT",
    "software engineer Toronto",
    "full-stack developer Toronto",
    "AI engineer Toronto",
    "AI/ML engineer",
    "machine learning engineer",
    "agentic AI developer",
    "University of Toronto Mississauga",
    "UTM CCIT",
    "hackathon winner",
    "React",
    "Next.js",
    "TypeScript",
    "Three.js",
    "React Three Fiber",
    "Tailwind CSS",
    "FastAPI",
    "Python",
    "Node.js",
    "LangChain",
    "LangGraph",
    "Anthropic",
    "Claude",
    "Auth0",
    "Supabase",
    "Snowflake",
    "Vercel",
    "Netlify",
    "Streamlit",
    "MLflow",
    "scikit-learn",
    "PyTorch",
    "TensorFlow",
    "Model Context Protocol",
    "MCP",
    "Retrieval Augmented Generation",
    "RAG",
    "UTM Billiards Club",
  ],
  authors: [{ name: "Marco Anthony Ayuste", url: siteUrl }],
  creator: "Marco Anthony Ayuste",
  publisher: "Marco Anthony Ayuste",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Marco Anthony Ayuste | Full-Stack & AI/ML Engineer",
    description,
    url: siteUrl,
    siteName: "Marco Ayuste",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: ogImage,
        width: 1440,
        height: 900,
        alt: "Marco Anthony Ayuste portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marco Anthony Ayuste | Full-Stack & AI/ML Engineer",
    description,
    images: [ogImage],
  },
  metadataBase: new URL(siteUrl),
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
    icon: "/favicon.ico",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Marco Anthony Ayuste",
  givenName: "Marco",
  familyName: "Ayuste",
  alternateName: "Marco Ayuste",
  url: siteUrl,
  image: `${siteUrl}${ogImage}`,
  jobTitle: "Full-Stack & AI/ML Engineer",
  description,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Toronto Mississauga",
  },
  worksFor: {
    "@type": "Organization",
    name: "UTM Billiards Club",
  },
  knowsAbout: [
    "Full-stack development",
    "Artificial intelligence",
    "Machine learning",
    "Agentic AI",
    "Retrieval-Augmented Generation",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "FastAPI",
    "LangChain",
    "LangGraph",
    "Three.js",
    "Tailwind CSS",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  sameAs: [
    "https://github.com/Minifigures",
    "https://linkedin.com/in/marco-anthony-ayuste",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Marco Ayuste",
  url: siteUrl,
  inLanguage: "en-US",
  author: { "@type": "Person", name: "Marco Anthony Ayuste" },
};

export const viewport: Viewport = {
  themeColor: "#1A1A2E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
