from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import yt_dlp
import traceback

app = FastAPI(title="ReelSnap Video Downloader API")

# CORS CONFIG
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # replace with frontend URL in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# REQUEST BODY MODEL
class VideoRequest(BaseModel):
    url: str


@app.get("/")
def root():
    return {"message": "ReelSnap API is running", "status": "ok"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}


def extract_formats(info):
    """Extract video and audio formats from yt-dlp info"""
    formats_video = []
    formats_audio = []
    seen_urls = set()  # Prevent duplicates
    
    formats_list = info.get("formats", [])
    
    # If no formats in list, try to get best format
    if not formats_list:
        # Try to get the best format directly
        if info.get("url"):
            formats_list = [info]
    
    for f in formats_list:
        if not f:
            continue
            
        url = f.get("url")
        if not url or url in seen_urls:
            continue
        
        vcodec = f.get("vcodec", "none")
        acodec = f.get("acodec", "none")
        format_note = f.get("format_note") or f.get("quality") or f.get("resolution", "default")
        ext = f.get("ext") or "mp4"
        
        # Video with audio (preferred)
        if vcodec != "none" and acodec != "none":
            formats_video.append({
                "quality": str(format_note),
                "ext": str(ext),
                "url": str(url)
            })
            seen_urls.add(url)
        # Video only (no audio) - also add it
        elif vcodec != "none" and acodec == "none":
            formats_video.append({
                "quality": str(format_note),
                "ext": str(ext),
                "url": str(url)
            })
            seen_urls.add(url)
        # Audio only
        elif acodec != "none" and vcodec == "none":
            formats_audio.append({
                "quality": str(format_note),
                "ext": str(ext),
                "url": str(url)
            })
            seen_urls.add(url)
    
    # If still no formats, try to get best video/audio from info
    if not formats_video and not formats_audio:
        best_format = info.get("bestformat") or info
        if best_format and best_format.get("url"):
            formats_video.append({
                "quality": best_format.get("format_note") or "best",
                "ext": best_format.get("ext") or "mp4",
                "url": best_format.get("url")
            })
    
    # Sort video formats by quality (higher first)
    formats_video.sort(key=lambda x: (
        int(x["quality"].replace("p", "").replace("k", "").split()[0]) if x["quality"].replace("p", "").replace("k", "").split()[0].isdigit() else 0
    ), reverse=True)
    
    return formats_video[:10], formats_audio[:10]  # Return more formats


@app.post("/youtube")
def fetch_youtube(data: VideoRequest):
    try:
        url = data.url.strip()
        
        if not url:
            raise HTTPException(status_code=400, detail="URL cannot be empty")
        
        # Validate YouTube URL
        if "youtube.com" not in url and "youtu.be" not in url:
            raise HTTPException(status_code=400, detail="Invalid YouTube URL")
        
        ydl_opts = {
            "quiet": True,
            "no_warnings": True,
            "skip_download": True,
            "nocheckcertificate": True,
            "extract_flat": False,
            "no_playlist": True,
        }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
        
        if not info:
            raise HTTPException(status_code=404, detail="Could not extract video information")
        
        formats_video, formats_audio = extract_formats(info)
        
        if not formats_video and not formats_audio:
            raise HTTPException(status_code=404, detail="No downloadable formats found for this video")
        
        return {
            "title": info.get("title", "Untitled Video"),
            "thumbnail": info.get("thumbnail") or info.get("thumbnails", [{}])[0].get("url") if info.get("thumbnails") else None,
            "video_formats": formats_video,
            "audio_formats": formats_audio
        }
        
    except HTTPException:
        raise
    except yt_dlp.utils.DownloadError as e:
        error_msg = str(e)
        if "Private video" in error_msg or "unavailable" in error_msg.lower():
            raise HTTPException(status_code=404, detail="Video is private or unavailable")
        elif "Sign in" in error_msg or "age-restricted" in error_msg.lower():
            raise HTTPException(status_code=403, detail="Video is age-restricted or requires sign in")
        else:
            raise HTTPException(status_code=400, detail=f"Failed to fetch video: {error_msg}")
    except Exception as e:
        error_trace = traceback.format_exc()
        print(f"Error in fetch_youtube: {error_trace}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@app.post("/instagram")
def fetch_instagram(data: VideoRequest):
    try:
        url = data.url.strip()
        
        if not url:
            raise HTTPException(status_code=400, detail="URL cannot be empty")
        
        # Validate Instagram URL
        if "instagram.com" not in url:
            raise HTTPException(status_code=400, detail="Invalid Instagram URL")
        
        ydl_opts = {
            "quiet": True,
            "no_warnings": True,
            "skip_download": True,
            "nocheckcertificate": True,
            "extract_flat": False,
        }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
        
        if not info:
            raise HTTPException(status_code=404, detail="Could not extract video information")
        
        formats_video, formats_audio = extract_formats(info)
        
        if not formats_video and not formats_audio:
            raise HTTPException(status_code=404, detail="No downloadable formats found for this video")
        
        return {
            "title": info.get("title") or info.get("description", "Instagram Video")[:100] or "Untitled Video",
            "thumbnail": info.get("thumbnail") or info.get("thumbnails", [{}])[0].get("url") if info.get("thumbnails") else None,
            "video_formats": formats_video,
            "audio_formats": formats_audio
        }
        
    except HTTPException:
        raise
    except yt_dlp.utils.DownloadError as e:
        error_msg = str(e)
        if "Private" in error_msg or "unavailable" in error_msg.lower():
            raise HTTPException(status_code=404, detail="Post is private or unavailable")
        else:
            raise HTTPException(status_code=400, detail=f"Failed to fetch video: {error_msg}")
    except Exception as e:
        error_trace = traceback.format_exc()
        print(f"Error in fetch_instagram: {error_trace}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@app.post("/twitter")
def fetch_twitter(data: VideoRequest):
    try:
        url = data.url.strip()
        
        if not url:
            raise HTTPException(status_code=400, detail="URL cannot be empty")
        
        # Validate Twitter/X URL
        if "twitter.com" not in url and "x.com" not in url:
            raise HTTPException(status_code=400, detail="Invalid Twitter/X URL")
        
        ydl_opts = {
            "quiet": True,
            "no_warnings": True,
            "skip_download": True,
            "nocheckcertificate": True,
            "extract_flat": False,
        }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
        
        if not info:
            raise HTTPException(status_code=404, detail="Could not extract video information")
        
        formats_video, formats_audio = extract_formats(info)
        
        if not formats_video and not formats_audio:
            raise HTTPException(status_code=404, detail="No downloadable formats found for this video")
        
        return {
            "title": info.get("title") or info.get("description", "Twitter Video")[:100] or "Untitled Video",
            "thumbnail": info.get("thumbnail") or info.get("thumbnails", [{}])[0].get("url") if info.get("thumbnails") else None,
            "video_formats": formats_video,
            "audio_formats": formats_audio
        }
        
    except HTTPException:
        raise
    except yt_dlp.utils.DownloadError as e:
        error_msg = str(e)
        if "Private" in error_msg or "unavailable" in error_msg.lower():
            raise HTTPException(status_code=404, detail="Tweet is private or unavailable")
        else:
            raise HTTPException(status_code=400, detail=f"Failed to fetch video: {error_msg}")
    except Exception as e:
        error_trace = traceback.format_exc()
        print(f"Error in fetch_twitter: {error_trace}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
