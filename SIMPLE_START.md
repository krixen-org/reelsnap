# 🚀 Simple Start Guide

## One Command Does Everything!

### Start Both Servers

```bash
npm run dev
```

This single command will:
- ✅ Start Next.js frontend on http://localhost:3000
- ✅ Start FastAPI backend on http://127.0.0.1:8000
- ✅ Both run in the same terminal
- ✅ Both restart automatically on file changes

### Open Your Browser

Visit: **http://localhost:3000**

You're ready to download videos! 🎉

## First Time Setup

Before running `npm run dev` for the first time, install dependencies:

```bash
# Install Node.js packages
npm install

# Install Python packages
cd server
python -m pip install -r requirements.txt
cd ..
```

That's it! Now you can use `npm run dev` every time.

## Deploying to Vercel

### Deploy Everything at Once!

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready to deploy"
   git push
   ```

2. **Deploy on Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Click "Deploy"

**Everything works automatically!**
- Frontend deploys automatically
- Backend deploys as serverless functions
- No separate deployment needed!

## That's It! 🎉

- **Local Dev**: Just run `npm run dev`
- **Production**: Push to GitHub and deploy on Vercel

Enjoy downloading videos! 🎬
