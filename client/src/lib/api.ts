import axios from 'axios';

// 1. Dynamic Base URL
// This allows you to switch between Localhost and Production easily via .env
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  // ✅ CRITICAL FIX: Matches the "credentials: true" setting in your server.js
  // This ensures browser doesn't block requests due to CORS policy mismatches.
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor (Attach Token)
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Response Interceptor (Global Error Handling)
// The report flagged "Inadequate Error Handling" as a Medium/High priority[cite: 84].
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the server says "401 Unauthorized" (Token expired/invalid)
    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined') {
        console.warn('⚠️ Session expired. Redirecting to login...');
        // Optional: Uncomment to auto-logout user
        // localStorage.removeItem('token');
        // window.location.href = '/login'; 
      }
    }
    return Promise.reject(error);
  }
);

export default api;