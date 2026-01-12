# 🎬 ReelSnap - Video Downloader

Free, fast, and easy video downloads from YouTube, Instagram, and Twitter.

**Separate Backend & Frontend Architecture** - Deploy backend on AWS and frontend on Vercel!

## 🏗️ Architecture

```
┌─────────────────┐         ┌─────────────────┐
│   Frontend      │         │    Backend       │
│   (Next.js)     │────────▶│   (FastAPI)      │
│   Vercel        │  HTTP   │   AWS            │
└─────────────────┘         └─────────────────┘
```

## 🚀 Quick Start (Local Development)

### 1. Start Backend (FastAPI)
```bash
cd server
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Backend runs on: **http://127.0.0.1:8000**

### 2. Start Frontend (Next.js)
```bash
npm install
npm run dev
```

Frontend runs on: **http://localhost:3000**

## 📋 Prerequisites

1. **Node.js** (v18 or higher) - For frontend
2. **Python** (v3.9 or higher) - For backend

## 🌐 Deployment

### Backend Deployment (AWS)

See `DEPLOYMENT_SEPARATE.md` for detailed instructions.

**Quick Options:**
- **AWS Elastic Beanstalk** (Easiest)
- **AWS EC2** (More control)
- **AWS Lambda** (Serverless)

### Frontend Deployment (Vercel)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - **Set Environment Variable:**
     - Key: `NEXT_PUBLIC_API_URL`
     - Value: Your AWS backend URL
   - Click "Deploy"

## 🔧 Configuration

### Environment Variables

**Frontend (Vercel):**
- `NEXT_PUBLIC_API_URL` - Your AWS backend URL
  - Example: `https://reelsnap-backend.elasticbeanstalk.com`

**Backend (AWS):**
- `FRONTEND_URL` - Your Vercel frontend URL
  - Example: `https://your-app.vercel.app`
- `ALLOWED_ORIGINS` - Comma-separated list of allowed origins

## 📁 Project Structure

```
reelsnap/
├── server/                 # Backend (FastAPI)
│   ├── main.py            # FastAPI application
│   └── requirements.txt    # Python dependencies
│
├── src/                    # Frontend (Next.js)
│   ├── app/
│   │   ├── youtube/       # YouTube page
│   │   ├── instagram/     # Instagram page
│   │   └── twitter/       # Twitter page
│   └── lib/
│       └── api.ts         # API utility
│
├── package.json           # Frontend dependencies
└── README.md
```

## 🎉 Features

- ✅ Download YouTube videos (including live streams)
- ✅ Download Instagram Reels/Posts
- ✅ Download Twitter/X videos
- ✅ Multiple quality options
- ✅ Audio-only downloads
- ✅ Beautiful, modern UI
- ✅ Fully responsive
- ✅ SEO optimized

## 🔧 API Endpoints

### Backend API (FastAPI)

- `GET /` - API status
- `GET /health` - Health check
- `POST /youtube` - Get YouTube video formats
- `POST /instagram` - Get Instagram video formats
- `POST /twitter` - Get Twitter video formats

### Example Request
```bash
curl -X POST http://your-backend-url/youtube \
  -H "Content-Type: application/json" \
  -d '{"url": "https://youtube.com/watch?v=..."}'
```

## 🐛 Troubleshooting

### "405 Error" or "Method Not Allowed"
- Make sure you're using `POST` method for API endpoints
- Check that backend is running on port 8000
- Verify CORS is configured correctly

### "Cannot connect to server"
- Make sure backend is running: `cd server && python -m uvicorn main:app --reload`
- Check backend URL in `NEXT_PUBLIC_API_URL` environment variable

### CORS Errors
- Update backend CORS to include your frontend URL
- Check `ALLOWED_ORIGINS` environment variable in backend

## 📝 License

This project is open source and available for personal use.

## 🙏 Credits

- Built with [Next.js](https://nextjs.org/) (Frontend)
- Backend powered by [FastAPI](https://fastapi.tiangolo.com/)
- Video extraction using [yt-dlp](https://github.com/yt-dlp/yt-dlp)
