# ⚡ Quick Start - One Command!

## 🚀 Start Everything

```bash
npm run dev
```

**That's all you need!** This single command starts:
- ✅ **Frontend** (Next.js) → http://localhost:3000
- ✅ **Backend** (FastAPI) → http://127.0.0.1:8000

## 📋 First Time Setup

Before the first run, install dependencies:

```bash
# Install Node.js dependencies
npm install

# Install Python dependencies  
cd server
python -m pip install -r requirements.txt
cd ..
```

## ✅ Verify It's Working

After running `npm run dev`:

1. **Check the terminal** - You should see:
   - `[FRONTEND]` logs (cyan) - Next.js starting
   - `[BACKEND]` logs (green) - FastAPI starting

2. **Visit** http://localhost:3000 - Frontend should load

3. **Test backend** - Visit http://127.0.0.1:8000/health
   - Should return: `{"status":"healthy"}`

## 🎬 Use the App

1. Open http://localhost:3000
2. Choose a platform (YouTube, Instagram, Twitter)
3. Paste a video URL
4. Download!

## 🚀 Deploy to Vercel

### Single Deployment - Everything Together!

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Vercel"
   git push
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Click "Deploy"

**Done!** Everything works automatically:
- Frontend deploys
- Backend deploys as serverless functions
- No separate deployment needed!

## 🔧 Troubleshooting

### "Module not found" Error

Install dependencies:
```bash
npm install
cd server && python -m pip install -r requirements.txt && cd ..
```

### "Port already in use"

Close other applications using ports 3000 or 8000, then run `npm run dev` again.

### Backend not starting

Make sure Python and dependencies are installed:
```bash
python --version  # Should be 3.9+
cd server
python -m pip install -r requirements.txt
```

## 🎉 You're All Set!

- **Local**: `npm run dev` → Everything works!
- **Production**: Deploy on Vercel → Everything works!

No separate server management needed! 🚀
