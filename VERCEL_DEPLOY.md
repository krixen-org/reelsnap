# 🚀 Deploy to Vercel - Complete Guide

## ✅ What's Configured

Your app is now configured to deploy **everything on Vercel** - both frontend and backend!

- ✅ **Frontend**: Next.js app (auto-deploys)
- ✅ **Backend**: Python serverless functions in `/api` directory
- ✅ **Single Deployment**: Everything runs together, no separate deployment needed

## 📋 Deployment Steps

### 1. Push to GitHub

```bash
git add .
git commit -m "Configure for Vercel deployment"
git push origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js - click "Deploy"
5. **That's it!** Vercel will automatically:
   - Install Node.js dependencies (`npm install`)
   - Install Python dependencies (`pip install -r requirements.txt`)
   - Build your Next.js app
   - Deploy the Python serverless functions

### 3. Verify Deployment

After deployment:
- Visit your Vercel URL (e.g., `https://your-app.vercel.app`)
- Test the video downloader
- The API routes will automatically work at `/api/youtube`, `/api/instagram`, `/api/twitter`

## 🔧 How It Works

### Development Mode
- Frontend uses `http://127.0.0.1:8000` (your local FastAPI server)
- Backend runs separately via `python -m uvicorn`

### Production Mode (Vercel)
- Frontend automatically uses `/api/*` routes
- Python serverless functions handle the requests
- Everything runs in one deployment

## 📁 File Structure

```
├── api/              # Python serverless functions (Vercel)
│   ├── youtube.py
│   ├── instagram.py
│   └── twitter.py
├── src/              # Next.js frontend
│   └── app/
├── requirements.txt  # Python dependencies for Vercel
├── package.json      # Node.js dependencies
└── vercel.json       # Vercel configuration
```

## ⚙️ Configuration Files

### `vercel.json`
Configures Vercel to:
- Build Next.js app
- Run Python serverless functions
- Install both Node.js and Python dependencies

### `requirements.txt`
Python dependencies needed for serverless functions:
- `yt-dlp` - for video downloading

### `src/lib/api.ts`
Smart API URL utility:
- Development: uses local server
- Production: uses Vercel API routes

## 🐛 Troubleshooting

### Build Fails
- Make sure `requirements.txt` is in the root directory
- Check that all Python dependencies are listed
- Verify `vercel.json` is configured correctly

### API Not Working
- Check Vercel function logs in the dashboard
- Verify the API routes are accessible at `/api/youtube`, etc.
- Make sure CORS headers are set correctly

### Function Timeout
- Vercel free tier has 10s timeout for serverless functions
- For longer videos, consider upgrading to Pro plan (60s timeout)

## 🎉 You're Done!

Once deployed, your app will:
- ✅ Work entirely on Vercel
- ✅ No separate backend deployment needed
- ✅ Automatic scaling
- ✅ HTTPS included
- ✅ Global CDN
