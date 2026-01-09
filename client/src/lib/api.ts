import axios from 'axios';

// 1. Dynamic Base URL
// Picks up localhost for dev, or your production URL if set in Vercel/Netlify
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 10 seconds timeout
  // "withCredentials" is mostly for cookies. 
  // If you use it, ensure your Backend CORS allows your specific frontend origin.
  // withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// =================================================================
// 2. REQUEST INTERCEPTOR (Attach Token)
// =================================================================
api.interceptors.request.use(
  (config) => {
    // Check if we are running in the browser (Client-Side)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      
      // If token exists, attach it to every request
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// =================================================================
// 3. RESPONSE INTERCEPTOR (Global Error Handling)
// =================================================================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);

    // Check for 401 Unauthorized (Token Expired or Invalid)
    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined') {
        // 1. Clear the invalid token
        localStorage.removeItem('token');
        
        // 2. Redirect to Login (unless we are already there)
        if (!window.location.pathname.includes('/login')) {
           window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;