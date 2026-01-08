# 🎬 ReelSnap - Video Downloader

Free, fast, and easy video downloads from YouTube, Instagram, and Twitter.

## 🚀 Quick Start

### One Command to Start Everything!

```bash
npm run dev
```

That's it! This will automatically start:
- ✅ Next.js frontend (http://localhost:3000)
- ✅ FastAPI backend (http://127.0.0.1:8000)

**No need to run servers separately!**

## 📋 Prerequisites

1. **Node.js** (v18 or higher)
   - Install from [nodejs.org](https://nodejs.org/)

2. **Python** (v3.9 or higher)
   - Install from [python.org](https://www.python.org/)

3. **Install Dependencies**

   ```bash
   # Install Node.js dependencies
   npm install
   
   # Install Python dependencies
   cd server
   python -m pip install -r requirements.txt
   cd ..
   ```

## 🎯 Usage

### Development

```bash
# Start both frontend and backend
npm run dev
```

Then open your browser to: **http://localhost:3000**

### Build for Production

```bash
npm run build
npm start
```

## 🌐 Deploy to Vercel

Everything is configured for single deployment!

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Click "Deploy"

**That's it!** Vercel will automatically:
- ✅ Build your Next.js app
- ✅ Deploy Python serverless functions
- ✅ Everything works together!

## 📁 Project Structure

```
├── api/                  # Python serverless functions (for Vercel)
│   ├── youtube.py
│   ├── instagram.py
│   └── twitter.py
├── server/               # FastAPI backend (for local dev)
│   ├── main.py
│   └── requirements.txt
├── src/                  # Next.js frontend
│   ├── app/
│   └── lib/
│       └── api.ts       # Smart API URL utility
├── package.json
├── requirements.txt      # Python deps for Vercel
└── vercel.json          # Vercel configuration
```

## 🛠️ Available Scripts

- `npm run dev` - Start both frontend and backend
- `npm run dev:nextjs` - Start only Next.js frontend
- `npm run build` - Build for production
- `npm start` - Start production server

## 🔧 Troubleshooting

### "Cannot connect to server" Error

Make sure Python dependencies are installed:
```bash
cd server
python -m pip install -r requirements.txt
```

Then restart:
```bash
npm run dev
```

### Port Already in Use

If port 8000 or 3000 is already in use, close the application using those ports and try again.

### Module Not Found

```bash
# Reinstall Node.js dependencies
npm install

# Reinstall Python dependencies
cd server
python -m pip install -r requirements.txt
```

## 🎉 Features

- ✅ Download YouTube videos
- ✅ Download Instagram Reels/Posts
- ✅ Download Twitter/X videos
- ✅ Multiple quality options
- ✅ Audio-only downloads
- ✅ Beautiful, modern UI
- ✅ Fully responsive
- ✅ SEO optimized

## 📝 License

This project is open source and available for personal use.

## 🙏 Credits

- Built with [Next.js](https://nextjs.org/)
- Backend powered by [FastAPI](https://fastapi.tiangolo.com/)
- Video extraction using [yt-dlp](https://github.com/yt-dlp/yt-dlp)
