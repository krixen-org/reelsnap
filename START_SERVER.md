# How to Start the Video Downloader Server

## Important: Backend Server Must Be Running

The frontend cannot fetch videos without the backend server running!

## Step 1: Install Python Dependencies

1. Open a terminal/command prompt
2. Navigate to the server directory:
   ```bash
   cd server
   ```

3. Install required packages:
   ```bash
   pip install -r requirements.txt
   ```

   Or if you have multiple Python versions:
   ```bash
   python3 -m pip install -r requirements.txt
   ```

## Step 2: Start the Backend Server

From the `server` directory, run:

```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

You should see output like:
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

**Keep this terminal window open!** The server must stay running.

## Step 3: Start the Frontend (in a new terminal)

1. Open a **new** terminal/command prompt
2. Navigate to the project root:
   ```bash
   cd "e:\reel website\reelsnap"
   ```

3. Start the Next.js development server:
   ```bash
   npm run dev
   ```

4. Open your browser to: http://localhost:3000

## Testing the API

You can test if the backend is working by visiting:
- http://127.0.0.1:8000/docs - API documentation
- http://127.0.0.1:8000/health - Health check endpoint

## Troubleshooting

### "Cannot connect to server" error
- Make sure the backend server is running on port 8000
- Check that you can access http://127.0.0.1:8000/health in your browser
- Make sure no firewall is blocking port 8000

### "Module not found" errors
- Make sure you installed all Python dependencies: `pip install -r requirements.txt`
- Try updating yt-dlp: `pip install --upgrade yt-dlp`

### Videos not downloading
- Make sure you're using valid URLs
- Some videos may be region-restricted or age-restricted
- Check the browser console for detailed error messages
