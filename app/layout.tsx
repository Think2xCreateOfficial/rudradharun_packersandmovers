import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { ScrollRestoration } from "@/components/shared/scroll/ScrollRestoration";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    template: "%s | Rudra Dharun Packers and Movers",
    default: "Rudra Dharun Packers and Movers | Reliable Relocation Services in Tamil Nadu",
  },
  description:
    "Premium and secure packers and movers services in Tamil Nadu for household shifting, office relocation, and vehicle transport. Trusted since 2016.",
  keywords: [
    "Packers and Movers",
    "Tamil Nadu moving company",
    "Household shifting",
    "Office relocation",
    "Rudra Dharun",
  ],
  authors: [{ name: "Rudra Dharun Packers and Movers" }],
  creator: "Rudra Dharun",
  publisher: "Rudra Dharun Packers and Movers",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rudra Dharun Packers and Movers",
    description: "Reliable logistics and moving services in Tamil Nadu.",
    url: SITE_URL,
    siteName: "Rudra Dharun Packers and Movers",
    images: [
      {
        url: "/packersandmovers23.jpg",
        width: 1200,
        height: 630,
        alt: "Rudra Dharun Packers and Movers",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rudra Dharun Packers and Movers",
    description: "Reliable logistics and moving services in Tamil Nadu.",
    images: ["/packersandmovers23.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon1.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${outfit.variable}`}>
      <head>
        <meta name="apple-mobile-web-app-title" content="Rudra Dharun" />
      </head>
      <body className={`${inter.className} bg-white text-gray-900 antialiased`}>
        <LoadingProvider>
          <ScrollRestoration />
          <Navbar />
          <main className="flex min-h-screen flex-col">{children}</main>
          <Footer />
        </LoadingProvider>
      </body>
    </html>
  );
}
