import axios from 'axios';

// 1. Point to your Backend Server
// FIXED CODE:
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';


// 2. Create an Axios Instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 3. Automatically add the Token to requests if logged in
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;