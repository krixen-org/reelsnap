"use client";

import { useState } from "react";

export default function YouTubeDownloader() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchVideo = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/youtube", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const result = await res.json();
      setData(result);
    } catch (error) {
      alert(error.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-xl p-6 space-y-4">
        <h1 className="text-3xl font-bold text-center">
          YouTube Video Downloader
        </h1>

        <input
          className="w-full p-3 text-black rounded"
          placeholder="Paste YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          onClick={fetchVideo}
          className="w-full bg-red-600 p-3 rounded font-semibold"
        >
          {loading ? "Fetching..." : "Fetch Video"}
        </button>

        {data && (
          <div className="bg-zinc-900 p-4 rounded">
            <img src={data.thumbnail} className="rounded mb-2" />
            <h2 className="font-semibold">{data.title}</h2>

            {data.video_formats.length > 0 && (
              <>
                <h3 className="font-semibold mt-4">Video Downloads</h3>
                {data.video_formats.map((f: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = f.url;
                      link.download = `${data.title}_${f.quality}.${f.ext}`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="block mt-2 bg-green-600 p-2 rounded text-center w-full"
                  >
                    Download {f.quality} ({f.ext})
                  </button>
                ))}
              </>
            )}

            {data.audio_formats.length > 0 && (
              <>
                <h3 className="font-semibold mt-4">Audio Downloads</h3>
                {data.audio_formats.map((f: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = f.url;
                      link.download = `${data.title}_audio.${f.ext}`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="block mt-2 bg-blue-600 p-2 rounded text-center w-full"
                  >
                    Download {f.quality} ({f.ext})
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}