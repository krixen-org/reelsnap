# 🚀 Local Development Guide

## Quick Start

### 1. Start the Backend Server (REQUIRED)

**You MUST start the backend server before using the app locally!**

Open a terminal and run:

```bash
cd server
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

**Keep this terminal open!** The server must stay running.

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Application startup complete.
```

### 2. Start the Frontend

Open a **NEW** terminal and run:

```bash
cd "e:\reel website\reelsnap"
npm run dev
```

### 3. Open Your Browser

Visit: http://localhost:3000

## ✅ Verification

After starting both servers:
1. ✅ Backend server is running on http://127.0.0.1:8000
2. ✅ Frontend is running on http://localhost:3000
3. ✅ Test the health endpoint: http://127.0.0.1:8000/health

You should see: `{"status":"healthy"}`

## 🔧 Troubleshooting

### "Cannot connect to server" Error

**Solution:** Make sure the backend server is running!

1. Check if the server is running:
   - Visit: http://127.0.0.1:8000/health
   - If you see an error, the server is NOT running

2. Start the server:
   ```bash
   cd server
   python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
   ```

3. Verify it's running:
   - You should see server logs in the terminal
   - Visit http://127.0.0.1:8000/health should return `{"status":"healthy"}`

### "uvicorn not recognized" Error

**Solution:** Use `python -m uvicorn` instead:

```bash
cd server
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

### Port Already in Use

If port 8000 is already in use:
1. Close any other programs using port 8000
2. Or use a different port and update the frontend:
   ```bash
   python -m uvicorn main:app --reload --host 127.0.0.1 --port 8001
   ```
   Then update `src/lib/api.ts` to use port 8001

### Module Not Found (Python)

Make sure Python dependencies are installed:

```bash
cd server
python -m pip install -r requirements.txt
```

## 📝 Quick Reference

### Start Backend (Terminal 1)
```bash
cd server
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

### Start Frontend (Terminal 2)
```bash
npm run dev
```

### Test Backend
Visit: http://127.0.0.1:8000/health

### Test Frontend
Visit: http://localhost:3000

## 🎯 Important Notes

- ⚠️ **You need TWO terminals running** - one for backend, one for frontend
- ⚠️ **Keep the backend server running** - don't close that terminal
- ✅ Once both are running, everything will work perfectly!

## 🚀 Alternative: Use Vercel CLI for Local Dev

If you prefer not to run the FastAPI server separately, you can use Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Run local development with serverless functions
vercel dev
```

This will run both frontend and backend together, but requires Vercel CLI.
