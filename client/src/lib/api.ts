let cachedCsrfToken: string | null = null;

// Always base URL only — no trailing /api
// e.g. https://unheard-india-api.onrender.com
const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function getCsrfToken(): Promise<string> {
  const response = await fetch(`${getApiUrl()}/api/csrf-token`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) throw new Error('Failed to fetch CSRF token');

  const data = await response.json();
  cachedCsrfToken = data.csrfToken;
  return data.csrfToken;
}

export async function apiFetch(
  path: string,
  options: RequestInit & { bodyData?: any } = {}
) {
  const { bodyData, ...fetchOptions } = options;
  const method = fetchOptions.method?.toUpperCase() || 'GET';
  const isMutating = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(method);

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (isMutating) {
    try {
      const token = cachedCsrfToken || (await getCsrfToken());
      defaultHeaders['X-CSRF-Token'] = token;
    } catch (error) {
      console.error('CSRF Token error:', error);
    }
  }

  // Build URL — getApiUrl() has no /api suffix, so we always add it here
  const url = path.startsWith('http')
    ? path
    : `${getApiUrl()}/api${path.startsWith('/') ? path : `/${path}`}`;

  const response = await fetch(url, {
    cache: 'no-store',
    ...fetchOptions,
    headers: { ...defaultHeaders, ...fetchOptions.headers },
    body: bodyData ? JSON.stringify(bodyData) : fetchOptions.body,
    credentials: 'include',
  });

  if (!response.ok) {
    if (response.status === 403 && isMutating) {
      cachedCsrfToken = null;
    }

    const error = new Error(`HTTP error! status: ${response.status}`);
    (error as any).status = response.status;
    (error as any).response = response;

    try {
      const data = await response.json();
      (error as any).data = data;
      error.message = data.message || error.message;
    } catch {
      // ignore parse failure
    }

    throw error;
  }

  return { data: await response.json() };
}