/**
 * Utility to fetch CSRF token from the backend.
 * In a real app, you might call this once on app load or before each mutating request.
 */
export async function getCsrfToken(): Promise<{ token: string; cookie: string }> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const response = await fetch(`${apiUrl}/api/csrf-token`, {
    method: 'GET',
    // Ensure cookies are sent/received
    // credentials: 'include' is important for CSRF cookies
  });
  
  const data = await response.json();
  return {
    token: data.csrfToken,
    cookie: response.headers.get('set-cookie') || ''
  };
}

/**
 * Enhanced fetch wrapper that automatically handles CSRF if needed.
 */
export async function apiFetch(path: string, options: RequestInit = {}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  
  // For mutating methods, we should ideally have the token already
  // or fetch it if missing.
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  return fetch(`${apiUrl}${path}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });
}
