/**
 * Utility to fetch CSRF token from the backend.
 * In a real app, you might call this once on app load or before each mutating request.
 */
export async function getCsrfToken(): Promise<{ token: string; cookie: string }> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const response = await fetch(`${apiUrl}/api/csrf-token`, {
    method: 'GET',
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
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const url = path.startsWith('http') ? path : `${apiUrl}/api${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = new Error(`HTTP error! status: ${response.status}`);
    (error as any).status = response.status;
    (error as any).response = response;
    // Try to get error message from body
    try {
      const data = await response.json();
      (error as any).data = data;
      error.message = data.message || error.message;
    } catch (e) {
      // ignore
    }
    throw error;
  }

  const data = await response.json();
  return { data };
}
