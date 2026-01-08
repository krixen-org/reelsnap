"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-5xl mx-auto animate-fadeIn">
        {/* Header Section */}
        <header className="text-center mb-12 sm:mb-16">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 text-gradient from-purple-400 via-pink-500 to-red-500">
            ReelSnap
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-3 font-medium">
            Download Videos in Seconds
          </p>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Free, fast, and easy video downloads from your favorite platforms. No sign-up required.
          </p>
        </header>

        {/* Platform Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {/* YouTube Card */}
          <article className="group">
            <Link 
              href="/youtube" 
              className="block h-full no-underline"
              aria-label="Download videos from YouTube"
            >
              <div className="glass-card rounded-2xl p-8 h-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20 cursor-pointer">
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    📺
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-red-400">YouTube</h2>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    Download videos and music in HD quality from YouTube
                  </p>
                  <div className="inline-flex items-center text-red-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    Get Started <span className="ml-2 text-xl">→</span>
                  </div>
                </div>
              </div>
            </Link>
          </article>

          {/* Instagram Card */}
          <article className="group">
            <Link 
              href="/instagram" 
              className="block h-full no-underline"
              aria-label="Download videos from Instagram"
            >
              <div className="glass-card rounded-2xl p-8 h-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20 cursor-pointer border-pink-500/30">
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    📸
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-pink-400">Instagram</h2>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    Download Reels, posts, and stories from Instagram
                  </p>
                  <div className="inline-flex items-center text-pink-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    Get Started <span className="ml-2 text-xl">→</span>
                  </div>
                </div>
              </div>
            </Link>
          </article>

          {/* Twitter Card */}
          <article className="group">
            <Link 
              href="/twitter" 
              className="block h-full no-underline"
              aria-label="Download videos from Twitter"
            >
              <div className="glass-card rounded-2xl p-8 h-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer border-blue-500/30">
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    🐦
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-blue-400">Twitter</h2>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    Download videos from X (Twitter) in high quality
                  </p>
                  <div className="inline-flex items-center text-blue-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    Get Started <span className="ml-2 text-xl">→</span>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="glass-effect rounded-xl p-6 transition-transform duration-300 hover:scale-105">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="font-semibold mb-2 text-lg">Fast Downloads</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Quick and efficient video processing</p>
          </div>
          <div className="glass-effect rounded-xl p-6 transition-transform duration-300 hover:scale-105">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-semibold mb-2 text-lg">100% Free</h3>
            <p className="text-gray-400 text-sm leading-relaxed">No sign-up required, completely free</p>
          </div>
          <div className="glass-effect rounded-xl p-6 transition-transform duration-300 hover:scale-105">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-semibold mb-2 text-lg">HD Quality</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Download in the highest available quality</p>
          </div>
        </section>
      </div>
    </main>
  );
}
