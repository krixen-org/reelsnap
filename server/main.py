from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import yt_dlp

app = FastAPI()

# ✅ CORS CONFIG (CORRECT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # replace with frontend URL in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ REQUEST BODY MODEL
class VideoRequest(BaseModel):
    url: str


@app.post("/youtube")
def fetch_youtube(data: VideoRequest):
    try:
        url = data.url

        ydl_opts = {
            "quiet": True,
            "skip_download": True,
            "nocheckcertificate": True
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)

        formats_video = []
        formats_audio = []
        for f in info.get("formats", []):
            if f.get("url"):
                if f.get("vcodec") != "none" and f.get("acodec") != "none":
                    formats_video.append({
                        "quality": f.get("format_note"),
                        "ext": f.get("ext"),
                        "url": f.get("url")
                    })
                elif f.get("acodec") != "none" and f.get("vcodec") == "none":
                    formats_audio.append({
                        "quality": f.get("format_note"),
                        "ext": f.get("ext"),
                        "url": f.get("url")
                    })

        if not formats_video and not formats_audio:
            raise HTTPException(status_code=404, detail="No downloadable formats found")

        return {
            "title": info.get("title"),
            "thumbnail": info.get("thumbnail"),
            "video_formats": formats_video[:5],
            "audio_formats": formats_audio[:5]
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/instagram")
def fetch_instagram(data: VideoRequest):
    try:
        url = data.url

        ydl_opts = {
            "quiet": True,
            "skip_download": True,
            "nocheckcertificate": True
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)

        formats_video = []
        formats_audio = []
        for f in info.get("formats", []):
            if f.get("url"):
                if f.get("vcodec") != "none" and f.get("acodec") != "none":
                    formats_video.append({
                        "quality": f.get("format_note"),
                        "ext": f.get("ext"),
                        "url": f.get("url")
                    })
                elif f.get("acodec") != "none" and f.get("vcodec") == "none":
                    formats_audio.append({
                        "quality": f.get("format_note"),
                        "ext": f.get("ext"),
                        "url": f.get("url")
                    })

        if not formats_video and not formats_audio:
            raise HTTPException(status_code=404, detail="No downloadable formats found")

        return {
            "title": info.get("title"),
            "thumbnail": info.get("thumbnail"),
            "video_formats": formats_video[:5],
            "audio_formats": formats_audio[:5]
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/twitter")
def fetch_twitter(data: VideoRequest):
    try:
        url = data.url

        ydl_opts = {
            "quiet": True,
            "skip_download": True,
            "nocheckcertificate": True
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)

        formats_video = []
        formats_audio = []
        for f in info.get("formats", []):
            if f.get("url"):
                if f.get("vcodec") != "none" and f.get("acodec") != "none":
                    formats_video.append({
                        "quality": f.get("format_note"),
                        "ext": f.get("ext"),
                        "url": f.get("url")
                    })
                elif f.get("acodec") != "none" and f.get("vcodec") == "none":
                    formats_audio.append({
                        "quality": f.get("format_note"),
                        "ext": f.get("ext"),
                        "url": f.get("url")
                    })

        if not formats_video and not formats_audio:
            raise HTTPException(status_code=404, detail="No downloadable formats found")

        return {
            "title": info.get("title"),
            "thumbnail": info.get("thumbnail"),
            "video_formats": formats_video[:5],
            "audio_formats": formats_audio[:5]
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
