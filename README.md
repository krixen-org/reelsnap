This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) with a FastAPI backend for handling video downloads from platforms like YouTube, Instagram, and Twitter.

## Getting Started

### Frontend (Next.js)

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### Backend (FastAPI)

The backend is built with FastAPI and provides endpoints for fetching video and audio formats from YouTube, Instagram, and Twitter using yt-dlp.

1. **Install Python Dependencies:**

   Navigate to the `server` directory and install the required packages:

   ```bash
   cd server
   pip install -r requirements.txt
   ```

   The dependencies include:
   - `fastapi`: Web framework for building APIs.
   - `uvicorn`: ASGI server for running FastAPI.
   - `yt-dlp`: Tool for downloading videos from various platforms.
   - `python-multipart`: For handling multipart form data.

2. **Run the Backend Server:**

   From the `server` directory, start the FastAPI server:

   ```bash
   uvicorn main:app --reload
   ```

   The server will run on [http://localhost:8000](http://localhost:8000). You can access the API documentation at [http://localhost:8000/docs](http://localhost:8000/docs).

   **Endpoints:**
   - `POST /youtube`: Fetch video/audio formats from a YouTube URL.
   - `POST /instagram`: Fetch video/audio formats from an Instagram URL.
   - `POST /twitter`: Fetch video/audio formats from a Twitter URL.

   Each endpoint expects a JSON payload with a `url` field, e.g., `{"url": "https://www.youtube.com/watch?v=example"}`.

   **CORS Configuration:** The backend is configured to allow requests from any origin for development. Update `allow_origins` in `main.py` for production.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
