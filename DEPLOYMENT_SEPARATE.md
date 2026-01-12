# 🚀 Separate Deployment Guide

## Backend (FastAPI) on AWS + Frontend (Next.js) on Vercel

This guide shows you how to deploy the backend and frontend separately.

## 📋 Architecture

```
┌─────────────────┐         ┌─────────────────┐
│   Frontend      │         │    Backend       │
│   (Next.js)     │────────▶│   (FastAPI)      │
│   Vercel        │  HTTP   │   AWS            │
└─────────────────┘         └─────────────────┘
```

## 🔧 Backend Setup (FastAPI on AWS)

### Option 1: AWS Elastic Beanstalk (Easiest)

1. **Install AWS CLI**
   ```bash
   pip install awscli
   ```

2. **Create requirements.txt** (already exists in `server/requirements.txt`)
   ```
   fastapi
   uvicorn[standard]
   yt-dlp
   python-multipart
   ```

3. **Create `.ebextensions/python.config`**
   ```yaml
   option_settings:
     aws:elasticbeanstalk:container:python:
       WSGIPath: server.main:app
   ```

4. **Deploy to Elastic Beanstalk**
   ```bash
   cd server
   eb init -p python-3.9
   eb create reelsnap-backend
   eb deploy
   ```

5. **Get your backend URL**
   - After deployment, you'll get a URL like: `https://reelsnap-backend.elasticbeanstalk.com`
   - Save this URL for frontend configuration

### Option 2: AWS EC2 (More Control)

1. **Launch EC2 Instance**
   - Choose Ubuntu 22.04 LTS
   - Security Group: Allow HTTP (80) and HTTPS (443)

2. **SSH into EC2**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

3. **Install Dependencies**
   ```bash
   sudo apt update
   sudo apt install python3-pip python3-venv nginx
   ```

4. **Setup Application**
   ```bash
   cd /var/www
   git clone your-repo-url reelsnap
   cd reelsnap/server
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

5. **Create Systemd Service** (`/etc/systemd/system/reelsnap.service`)
   ```ini
   [Unit]
   Description=ReelSnap FastAPI Backend
   After=network.target

   [Service]
   User=ubuntu
   WorkingDirectory=/var/www/reelsnap/server
   Environment="PATH=/var/www/reelsnap/server/venv/bin"
   ExecStart=/var/www/reelsnap/server/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```

6. **Start Service**
   ```bash
   sudo systemctl start reelsnap
   sudo systemctl enable reelsnap
   ```

7. **Setup Nginx** (`/etc/nginx/sites-available/reelsnap`)
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://127.0.0.1:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

8. **Enable Nginx**
   ```bash
   sudo ln -s /etc/nginx/sites-available/reelsnap /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### Option 3: AWS Lambda + API Gateway (Serverless)

1. **Install Serverless Framework**
   ```bash
   npm install -g serverless
   ```

2. **Create `serverless.yml`** in `server/` directory
   ```yaml
   service: reelsnap-backend

   provider:
     name: aws
     runtime: python3.9
     region: us-east-1
     environment:
       ALLOWED_ORIGINS: ${env:FRONTEND_URL}

   functions:
     api:
       handler: main.handler
       events:
         - http:
             path: /{proxy+}
             method: ANY
             cors: true
   ```

3. **Update `server/main.py`** to work with Lambda (add handler function)
   ```python
   # Add at the end of main.py
   def handler(event, context):
       from mangum import Mangum
       asgi_handler = Mangum(app)
       return asgi_handler(event, context)
   ```

4. **Install Mangum**
   ```bash
   pip install mangum
   ```

5. **Deploy**
   ```bash
   cd server
   serverless deploy
   ```

## 🌐 Frontend Setup (Next.js on Vercel)

### 1. Push to GitHub
```bash
git add .
git commit -m "Separate backend and frontend"
git push origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. **Set Environment Variable:**
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: Your AWS backend URL (e.g., `https://reelsnap-backend.elasticbeanstalk.com`)
5. Click "Deploy"

### 3. Update Backend CORS

After getting your Vercel frontend URL, update backend CORS:

**For Elastic Beanstalk:**
```bash
eb setenv FRONTEND_URL=https://your-app.vercel.app
```

**For EC2:**
Update `/var/www/reelsnap/server/main.py`:
```python
allowed_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://your-app.vercel.app"  # Add your Vercel URL
]
```

**For Lambda:**
```bash
serverless env set FRONTEND_URL https://your-app.vercel.app
```

## 🔧 Local Development

### Start Backend
```bash
cd server
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

### Start Frontend
```bash
npm run dev
```

Frontend will automatically connect to `http://127.0.0.1:8000` in development.

## ✅ Testing

### Test Backend
```bash
curl http://your-backend-url/health
# Should return: {"status":"healthy"}
```

### Test Frontend
Visit your Vercel URL and test video downloads.

## 🔒 Security Notes

1. **CORS**: Only allow your Vercel frontend URL in production
2. **Rate Limiting**: Consider adding rate limiting to backend
3. **HTTPS**: Always use HTTPS in production
4. **Environment Variables**: Never commit secrets to Git

## 📝 Environment Variables

### Backend (AWS)
- `ALLOWED_ORIGINS`: Comma-separated list of allowed origins
- `FRONTEND_URL`: Your Vercel frontend URL

### Frontend (Vercel)
- `NEXT_PUBLIC_API_URL`: Your AWS backend URL

## 🎉 You're Done!

Your backend and frontend are now deployed separately:
- ✅ Backend on AWS
- ✅ Frontend on Vercel
- ✅ They communicate via HTTP API
