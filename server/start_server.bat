@echo off
echo ========================================
echo  Starting ReelSnap Backend Server...
echo ========================================
echo.
echo Make sure you're in the server directory!
echo.
cd /d "%~dp0"
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
if errorlevel 1 (
    echo.
    echo ERROR: Failed to start server!
    echo.
    echo Make sure:
    echo 1. Python is installed
    echo 2. Dependencies are installed: python -m pip install -r requirements.txt
    echo 3. You're in the server directory
    echo.
    pause
)
