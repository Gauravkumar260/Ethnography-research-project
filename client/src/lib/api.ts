import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// 1. Extend the Axios config to include our custom 'retryCount' property
interface RetryConfig extends InternalAxiosRequestConfig {
  retryCount?: number;
}

// 2. Dynamic Base URL & Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // ✅ CRITICAL: Required for sending/receiving HTTP-Only cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// =================================================================
// 3. RESPONSE INTERCEPTOR (Retry Logic + Error Handling)
// =================================================================
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const config = error.config as RetryConfig;

    // A. RETRY LOGIC
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

    // C. AUTHENTICATION HANDLING (Redirect on 401)
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        // Clear user metadata since cookie is dead/invalid
        localStorage.removeItem('user'); 

        // Only redirect if we aren't already on the login page to avoid loops
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;