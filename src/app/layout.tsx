import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ReelSnap - Free Video Downloader | YouTube, Instagram & Twitter",
  description: "Download videos from YouTube, Instagram, and Twitter for free. Fast, easy, and secure video downloads in HD quality. No sign-up required.",
  keywords: ["video downloader", "youtube downloader", "instagram downloader", "twitter downloader", "free video download", "HD video download"],
  authors: [{ name: "ReelSnap" }],
  creator: "ReelSnap",
  publisher: "ReelSnap",
  openGraph: {
    title: "ReelSnap - Free Video Downloader",
    description: "Download videos from YouTube, Instagram, and Twitter for free in HD quality.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReelSnap - Free Video Downloader",
    description: "Download videos from YouTube, Instagram, and Twitter for free.",
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
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
