# 🚀 Deployment Guide - Vercel (Single Deployment)

Your app is now configured to deploy **everything on Vercel** - both frontend and backend in one deployment!

## ✅ What's Configured

- ✅ **Frontend**: Next.js app (auto-detected by Vercel)
- ✅ **Backend**: Python serverless functions in `/api` directory
- ✅ **Smart API URLs**: Automatically uses local server in dev, Vercel API routes in production
- ✅ **Single Deployment**: Everything runs together on Vercel

## 📋 Quick Deploy Steps

### 1. Push to GitHub

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js
5. **Important**: In "Build and Output Settings":
   - Framework Preset: **Next.js**
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: `.next` (default)
6. Click **"Deploy"**

Vercel will automatically:
- ✅ Install Node.js dependencies
- ✅ Install Python dependencies (from `requirements.txt`)
- ✅ Build your Next.js app
- ✅ Deploy Python serverless functions from `/api`

### 3. Configure Environment Variables (if needed)

In Vercel Dashboard → Project Settings → Environment Variables:
- No environment variables needed for basic deployment!

### 4. Test Your Deployment

After deployment:
- Visit your Vercel URL: `https://your-app.vercel.app`
- Test the video downloader
- API routes will work at:
  - `/api/youtube`
  - `/api/instagram`
  - `/api/twitter`

## 🔧 How It Works

### Development (Local)

When running locally:
- Frontend: `npm run dev` → http://localhost:3000
- Backend: Uses `http://127.0.0.1:8000` (your FastAPI server)
- You need to run: `python -m uvicorn main:app --reload` in the `server` folder

### Production (Vercel)

When deployed:
- Frontend: Automatically serves Next.js app
- Backend: Python serverless functions handle `/api/*` routes
- Everything runs together - **no separate backend needed!**

## 📁 Project Structure

```
├── api/                    # Python serverless functions (Vercel)
│   ├── youtube.py         # → /api/youtube
│   ├── instagram.py       # → /api/instagram
│   └── twitter.py         # → /api/twitter
├── server/                # FastAPI server (for local dev only)
│   ├── main.py
│   └── requirements.txt
├── src/                   # Next.js frontend
│   ├── app/
│   └── lib/
│       └── api.ts        # Smart API URL utility
├── requirements.txt       # Python deps for Vercel
├── package.json          # Node.js deps
└── vercel.json           # Vercel configuration
```

## 🎯 Key Files

### `src/lib/api.ts`
Smart API URL utility that:
- **Development**: Uses `http://127.0.0.1:8000`
- **Production**: Uses `/api/*` routes

### `vercel.json`
Configures Vercel to:
- Use Next.js framework
- Run Python serverless functions
- Install both Node.js and Python dependencies

### `requirements.txt`
Python dependencies for Vercel serverless functions:
- `yt-dlp` - for video downloading

## 🐛 Troubleshooting

### Build Fails - Python Dependencies

If build fails with Python errors:
1. Check `requirements.txt` is in the root directory
2. Verify `vercel.json` is configured correctly
3. Check Vercel build logs for specific errors

### API Routes Not Working

1. Check Vercel function logs in dashboard
2. Verify routes are accessible at `/api/youtube`, `/api/instagram`, `/api/twitter`
3. Check CORS headers are set correctly

### Function Timeout

- **Free Tier**: 10 second timeout
- **Pro Tier**: 60 second timeout
- For longer videos, consider upgrading or optimizing

### Local Development Issues

If local development doesn't work:
1. Make sure FastAPI server is running: `python -m uvicorn main:app --reload`
2. Check `src/lib/api.ts` is using local server URL
3. Or set env var: `NEXT_PUBLIC_USE_LOCAL_SERVER=false` to use API routes locally

## ✅ Verification Checklist

After deployment, verify:
- ✅ Site loads at your Vercel URL
- ✅ YouTube downloader works
- ✅ Instagram downloader works
- ✅ Twitter downloader works
- ✅ API routes return JSON responses
- ✅ CORS is working (no CORS errors in browser console)

## 🎉 You're Done!

Your app is now fully deployed on Vercel with:
- ✅ Frontend and backend in one deployment
- ✅ Automatic scaling
- ✅ HTTPS included
- ✅ Global CDN
- ✅ No separate backend deployment needed!

**That's it!** Your video downloader is live! 🚀
