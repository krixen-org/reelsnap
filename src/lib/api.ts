/**
 * Get the API base URL based on the environment
 * - In development: uses FastAPI server (localhost:8000) - started automatically with npm run dev
 * - In production (Vercel): uses serverless functions (/api) - deployed automatically
 */
export function getApiUrl(endpoint: string): string {
  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Check if we're running locally (localhost or 127.0.0.1)
  const isLocalhost = 
    typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || 
     window.location.hostname === '127.0.0.1');
  
  // Check if we should force API routes (for Vercel CLI or production)
  const useApiRoutes = process.env.NEXT_PUBLIC_USE_API_ROUTES === 'true';
  
  // In production (Vercel), always use API routes
  if (!isDevelopment) {
    return `/api${endpoint}`;
  }
  
  // In development on localhost, use FastAPI server (runs automatically with npm run dev)
  // Unless explicitly told to use API routes
  if (isDevelopment && isLocalhost && !useApiRoutes) {
    return `http://127.0.0.1:8000${endpoint}`;
  }
  
  // Default: Use API routes (for Vercel CLI or when explicitly set)
  return `/api${endpoint}`;
}
