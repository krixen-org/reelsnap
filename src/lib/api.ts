/**
 * Get the API base URL for separate FastAPI backend
 * - Development: Uses local FastAPI server (http://127.0.0.1:8000)
 * - Production: Uses environment variable NEXT_PUBLIC_API_URL (your AWS backend URL)
 */
export function getApiUrl(endpoint: string): string {
  // Use environment variable for backend URL (set in Vercel for production)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  // If API URL is set (production), use it
  if (apiUrl) {
    // Remove trailing slash if present
    const baseUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
    return `${baseUrl}${endpoint}`;
  }
  
  // Development: Use local FastAPI server
  // Make sure to start it with: cd server && python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
  return `http://43.204.110.208:8000${endpoint}`;
}
