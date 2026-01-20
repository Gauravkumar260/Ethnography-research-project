import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// 1. Extend the Axios config to include our custom 'retryCount' property
interface RetryConfig extends InternalAxiosRequestConfig {
  retryCount?: number;
}

// 2. Dynamic Base URL & Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds timeout (Good practice from Snippet 2)
  headers: {
    'Content-Type': 'application/json',
  },
});

// =================================================================
// 3. REQUEST INTERCEPTOR (Attach Token Securely)
// =================================================================
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Check if running in browser to avoid SSR errors (Snippet 2 Logic)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// =================================================================
// 4. RESPONSE INTERCEPTOR (Retry Logic + Error Handling)
// =================================================================
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const config = error.config as RetryConfig;

    // A. RETRY LOGIC (Snippet 1 Feature)
    // Only retry if config exists, we haven't hit the limit, and it's a Network Error
    if (config && config.retryCount === undefined) {
      config.retryCount = 0;
    }

    const MAX_RETRIES = 2;

    if (config && config.retryCount! < MAX_RETRIES && error.message === 'Network Error') {
      config.retryCount! += 1;

      // Calculate delay: 1s, 2s... (Backoff strategy)
      const delay = 1000 * config.retryCount!;

      console.log(`Network error. Retrying attempt ${config.retryCount}...`);

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay));

      // Retry the request
      return api(config);
    }

    // B. GLOBAL ERROR LOGGING
    console.error('API Error:', error.response?.data || error.message);

    // C. AUTHENTICATION HANDLING (Snippet 2 Feature - Safer)
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');

        // Only redirect if we aren't already on the login page to avoid loops
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/admin-panel/security/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;