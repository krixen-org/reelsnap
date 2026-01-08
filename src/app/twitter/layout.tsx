import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Twitter/X Video Downloader - Download Twitter Videos Free | ReelSnap",
  description: "Download videos from Twitter (X) for free. Fast and easy Twitter video downloader. No sign-up required. Download Twitter videos in HD quality.",
  keywords: ["twitter downloader", "x downloader", "download twitter videos", "twitter video downloader", "download x videos", "free twitter downloader"],
  openGraph: {
    title: "Twitter/X Video Downloader - ReelSnap",
    description: "Download videos from Twitter (X) for free in HD quality.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Twitter/X Video Downloader - ReelSnap",
    description: "Download videos from Twitter (X) for free.",
  },
  alternates: {
    canonical: "/twitter",
  },
};

export default function TwitterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
