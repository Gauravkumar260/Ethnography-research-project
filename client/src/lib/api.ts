let cachedCsrfToken: string | null = null;

/**
 * Utility to fetch CSRF token from the backend.
 * In a real app, you might call this once on app load or before each mutating request.
 */
export async function getCsrfToken(): Promise<string> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const response = await fetch(`${apiUrl}/api/csrf-token`, {
    method: 'GET',
    headers: { 'Accept': 'application/json' }
  });
  
  if (!response.ok) throw new Error('Failed to fetch CSRF token');
  
  const data = await response.json();
  cachedCsrfToken = data.csrfToken;
  return data.csrfToken;
}

/**
 * Enhanced fetch wrapper that automatically handles CSRF if needed.
 */
export async function apiFetch(path: string, options: RequestInit & { bodyData?: any } = {}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  
  const { bodyData, ...fetchOptions } = options;
  const method = fetchOptions.method?.toUpperCase() || 'GET';
  const isMutating = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(method);

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Automatically fetch and add CSRF token for mutating requests
  if (isMutating) {
    try {
      const token = cachedCsrfToken || await getCsrfToken();
      defaultHeaders['X-CSRF-Token'] = token;
    } catch (error) {
      console.error('CSRF Token error:', error);
    }
  }

  const url = path.startsWith('http') ? path : `${apiUrl}/api${path}`;

  const response = await fetch(url, {
    cache: 'no-store',
    ...fetchOptions,
    headers: {
      ...defaultHeaders,
      ...fetchOptions.headers,
    },
    body: bodyData ? JSON.stringify(bodyData) : fetchOptions.body,
    // Ensure credentials (cookies) are sent
    credentials: 'include',
  });

  if (!response.ok) {
    // If 403, might be expired CSRF, try to refresh once
    if (response.status === 403 && isMutating) {
       cachedCsrfToken = null;
       // We could retry here, but for now just let it fail and the next request will refresh
    }

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
