"use client";

import { useState } from "react";
import Link from "next/link";
import { getApiUrl } from "@/lib/api";

export default function InstagramDownloader() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVideo = async () => {
    if (!url.trim()) {
      setError("Please enter an Instagram URL");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(getApiUrl("/instagram"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ detail: res.statusText }));
        const errorMessage = errorData.detail || errorData.message || `Error: ${res.status} ${res.statusText}`;
        throw new Error(errorMessage);
      }

      const result = await res.json();
      
      // Validate response structure
      if (!result || (!result.video_formats && !result.audio_formats)) {
        throw new Error("Invalid response from server. No formats found.");
      }
      
      setData(result);
    } catch (error: any) {
      console.error("Error fetching video:", error);
      
      // Handle network errors
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        setError("⚠️ Backend server is not running! Please start it:\n\n1. Open a terminal\n2. Run: cd server\n3. Run: python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000\n\nOr double-click: server/start_server.bat");
      } else if (error.message) {
        setError(error.message);
      } else {
        setError("Failed to fetch video. Please check the URL and try again.");
      }
      
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (downloadUrl: string, filename: string) => {
    try {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(async () => {
        try {
          const response = await fetch(downloadUrl, { mode: 'cors' });
          if (response.ok) {
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const blobLink = document.createElement('a');
            blobLink.href = blobUrl;
            blobLink.download = filename;
            document.body.appendChild(blobLink);
            blobLink.click();
            document.body.removeChild(blobLink);
            window.URL.revokeObjectURL(blobUrl);
          }
        } catch (e) {
          console.log('Download initiated');
        }
      }, 100);
    } catch (error) {
      window.open(downloadUrl, '_blank');
    }
  };

  const sanitizeFilename = (title: string, quality: string, ext: string) => {
    const sanitized = title.replace(/[^a-z0-9]/gi, '_').toLowerCase().substring(0, 50);
    return `${sanitized}_${quality}.${ext}`;
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <div className="w-full max-w-4xl mx-auto animate-fadeIn">
        {/* Header */}
        <header className="text-center mb-8 sm:mb-12">
          <Link 
            href="/" 
            className="inline-block mb-4 text-gray-400 hover:text-white transition-colors duration-300 no-underline"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 text-gradient from-pink-400 via-purple-500 to-orange-500">
            Instagram Downloader
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Download Reels, Posts, and Stories from Instagram
          </p>
        </header>

        {/* Input Section */}
        <section className="glass-card rounded-2xl p-6 sm:p-8 mb-6 border-pink-500/30">
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="https://www.instagram.com/reel/..."
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setError(null);
                }}
                onKeyPress={(e) => e.key === 'Enter' && !loading && fetchVideo()}
                disabled={loading}
                aria-label="Instagram video URL input"
              />
            </div>

            <button
              onClick={fetchVideo}
              disabled={loading || !url.trim()}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-pink-500/30 disabled:shadow-none"
              aria-label="Fetch Instagram video"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-pulse-soft mr-2">⏳</span>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <span className="mr-2">🔍</span>
                  Fetch Video
                </span>
              )}
            </button>

            {error && (
              <div 
                className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-red-300 animate-fadeIn"
                role="alert"
              >
                <div className="flex items-start">
                  <span className="mr-2 mt-1">⚠️</span>
                  <div className="flex-1">
                    <div className="font-semibold mb-2">Server Connection Error</div>
                    <div className="text-sm whitespace-pre-line">{error}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Results Section */}
        {data && (
          <article className="glass-card rounded-2xl p-6 sm:p-8 animate-fadeIn">
            {/* Video Info */}
            <div className="mb-6">
              {data.thumbnail && (
                <div className="mb-4 rounded-xl overflow-hidden border border-white/10">
                  <img 
                    src={data.thumbnail} 
                    alt={data.title || 'Video thumbnail'}
                    className="w-full h-auto max-h-96 object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <h2 className="text-2xl font-bold mb-2 text-white">
                {data.title || 'Untitled Video'}
              </h2>
            </div>

            {/* Video Formats */}
            {data.video_formats && data.video_formats.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-green-400">
                  <span className="mr-2">🎥</span>
                  Video Formats
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.video_formats.map((f: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => handleDownload(f.url, sanitizeFilename(data.title || 'video', f.quality || 'default', f.ext || 'mp4'))}
                      className="bg-gradient-to-r from-green-600/90 to-green-700/90 hover:from-green-600 hover:to-green-700 border border-green-500/50 rounded-xl p-4 text-left transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group"
                      aria-label={`Download ${f.quality || 'HD'} ${f.ext?.toUpperCase()} video`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-white mb-1">
                            {f.quality || 'HD'} {f.ext?.toUpperCase()}
                          </div>
                          <div className="text-xs text-green-200">
                            Video + Audio
                          </div>
                        </div>
                        <span className="text-2xl group-hover:scale-110 transition-transform">⬇️</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Audio Formats */}
            {data.audio_formats && data.audio_formats.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center text-blue-400">
                  <span className="mr-2">🎵</span>
                  Audio Formats
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.audio_formats.map((f: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => handleDownload(f.url, sanitizeFilename(data.title || 'audio', f.quality || 'default', f.ext || 'mp3'))}
                      className="bg-gradient-to-r from-blue-600/90 to-blue-700/90 hover:from-blue-600 hover:to-blue-700 border border-blue-500/50 rounded-xl p-4 text-left transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group"
                      aria-label={`Download ${f.quality || 'High'} ${f.ext?.toUpperCase()} audio`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-white mb-1">
                            {f.quality || 'High'} {f.ext?.toUpperCase()}
                          </div>
                          <div className="text-xs text-blue-200">
                            Audio Only
                          </div>
                        </div>
                        <span className="text-2xl group-hover:scale-110 transition-transform">⬇️</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {(!data.video_formats || data.video_formats.length === 0) && 
             (!data.audio_formats || data.audio_formats.length === 0) && (
              <div className="text-center py-8 text-gray-400">
                No downloadable formats found for this video.
              </div>
            )}
          </article>
        )}
      </div>
    </main>
  );
}
