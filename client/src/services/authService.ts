import api from '@/lib/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export const AuthService = {
  /**
   * Authenticate user and receive HTTP-Only cookie.
   */
  login: async (credentials: LoginCredentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  /**
   * Log out user and clear HTTP-Only cookie.
   */
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  /**
   * Get current user profile.
   */
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};
