import yt_dlp
import traceback
import json

def extract_formats(info):
    """Extract video and audio formats from yt-dlp info"""
    formats_video = []
    formats_audio = []
    seen_urls = set()
    
    formats_list = info.get("formats", [])
    
    if not formats_list:
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
        
        if vcodec != "none" and acodec != "none":
            formats_video.append({
                "quality": str(format_note),
                "ext": str(ext),
                "url": str(url)
            })
            seen_urls.add(url)
        elif vcodec != "none" and acodec == "none":
            formats_video.append({
                "quality": str(format_note),
                "ext": str(ext),
                "url": str(url)
            })
            seen_urls.add(url)
        elif acodec != "none" and vcodec == "none":
            formats_audio.append({
                "quality": str(format_note),
                "ext": str(ext),
                "url": str(url)
            })
            seen_urls.add(url)
    
    if not formats_video and not formats_audio:
        best_format = info.get("bestformat") or info
        if best_format and best_format.get("url"):
            formats_video.append({
                "quality": best_format.get("format_note") or "best",
                "ext": best_format.get("ext") or "mp4",
                "url": best_format.get("url")
            })
    
    formats_video.sort(key=lambda x: (
        int(x["quality"].replace("p", "").replace("k", "").split()[0]) if x["quality"].replace("p", "").replace("k", "").split()[0].isdigit() else 0
    ), reverse=True)
    
    return formats_video[:10], formats_audio[:10]


def handler(request):
    """Vercel serverless function handler"""
    try:
        # Get request method
        method = getattr(request, 'method', 'POST')
        if hasattr(request, 'httpMethod'):
            method = request.httpMethod
        
        # Handle CORS preflight
        if method == "OPTIONS":
            return {
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type",
                },
                "body": ""
            }
        
        # Get request body
        body = b''
        if hasattr(request, 'body'):
            body = request.body
        elif hasattr(request, 'get_body'):
            body = request.get_body()
        
        if isinstance(body, str):
            body = body.encode('utf-8')
        
        # Parse JSON body
        data = {}
        if body:
            try:
                data = json.loads(body.decode('utf-8'))
            except:
                pass
        
        url = data.get("url", "").strip()
        
        if not url:
            return {
                "statusCode": 400,
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                "body": json.dumps({"detail": "URL cannot be empty"})
            }
        
        if "instagram.com" not in url:
            return {
                "statusCode": 400,
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                "body": json.dumps({"detail": "Invalid Instagram URL"})
            }
        
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
            return {
                "statusCode": 404,
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                "body": json.dumps({"detail": "Could not extract video information"})
            }
        
        formats_video, formats_audio = extract_formats(info)
        
        if not formats_video and not formats_audio:
            return {
                "statusCode": 404,
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                "body": json.dumps({"detail": "No downloadable formats found for this video"})
            }
        
        response = {
            "title": info.get("title") or info.get("description", "Instagram Video")[:100] or "Untitled Video",
            "thumbnail": info.get("thumbnail") or (info.get("thumbnails", [{}])[0].get("url") if info.get("thumbnails") else None),
            "video_formats": formats_video,
            "audio_formats": formats_audio
        }
        
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            "body": json.dumps(response)
        }
        
    except yt_dlp.utils.DownloadError as e:
        error_msg = str(e)
        status_code = 400
        message = f"Failed to fetch video: {error_msg}"
        
        if "Private" in error_msg or "unavailable" in error_msg.lower():
            status_code = 404
            message = "Post is private or unavailable"
        
        return {
            "statusCode": status_code,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            "body": json.dumps({"detail": message})
        }
    except Exception as e:
        error_trace = traceback.format_exc()
        print(f"Error in fetch_instagram: {error_trace}")
        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            "body": json.dumps({"detail": f"An error occurred: {str(e)}"})
        }
