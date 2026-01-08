import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instagram Video Downloader - Download Reels, Posts & Stories Free | ReelSnap",
  description: "Download Instagram Reels, posts, and stories for free. Fast and easy Instagram video downloader. No sign-up required. Download Instagram videos in HD quality.",
  keywords: ["instagram downloader", "download instagram videos", "instagram reel downloader", "download instagram reels", "instagram story downloader", "free instagram downloader"],
  openGraph: {
    title: "Instagram Video Downloader - ReelSnap",
    description: "Download Instagram Reels, posts, and stories for free in HD quality.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Instagram Video Downloader - ReelSnap",
    description: "Download Instagram Reels, posts, and stories for free.",
  },
  alternates: {
    canonical: "/instagram",
  },
};

export default function InstagramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
