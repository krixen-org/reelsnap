import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Video Downloader - Download YouTube Videos Free | ReelSnap",
  description: "Download YouTube videos for free in HD quality. Fast and easy YouTube video downloader. No sign-up required. Download YouTube videos and music.",
  keywords: ["youtube downloader", "download youtube videos", "youtube video downloader", "free youtube downloader", "download youtube music", "HD youtube download"],
  openGraph: {
    title: "YouTube Video Downloader - ReelSnap",
    description: "Download YouTube videos for free in HD quality. Fast and easy YouTube video downloader.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Video Downloader - ReelSnap",
    description: "Download YouTube videos for free in HD quality.",
  },
  alternates: {
    canonical: "/youtube",
  },
};

export default function YouTubeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
