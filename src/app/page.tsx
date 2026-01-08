"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-xl p-6 space-y-4 text-center">
        <h1 className="text-3xl font-bold">
          Video Downloader
        </h1>
        <p className="text-gray-400">Choose a platform to download videos</p>
        <div className="space-y-4">
          <Link href="/youtube">
            <button className="w-full bg-red-600 p-3 rounded font-semibold">
              YouTube Downloader
            </button>
          </Link>
          <Link href="/instagram">
            <button className="w-full bg-pink-600 p-3 rounded font-semibold">
              Instagram Downloader
            </button>
          </Link>
          <Link href="/twitter">
            <button className="w-full bg-blue-600 p-3 rounded font-semibold">
              Twitter Downloader
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
