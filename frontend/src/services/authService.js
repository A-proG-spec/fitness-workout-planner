import axios from '../config/axios';

export const authService = {
  // Register a new user
  register: async (userData) => {
    const response = await axios.post('/auth/register', userData);
    if (response.data.success && response.data.data.user) {
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await axios.post('/auth/login', credentials);
    if (response.data.success && response.data.data.user) {
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  // Logout user
  logout: async () => {
    const response = await axios.post('/auth/logout');
    // Clear user data from localStorage
    localStorage.removeItem('user');
    return response.data;
  },

  // Get current user
  getMe: async () => {
    const response = await axios.get('/auth/me');
    if (response.data.success && response.data.data.user) {
      // Update user data in localStorage
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  // Refresh token
  refreshToken: async () => {
    const response = await axios.post('/auth/refresh');
    return response.data;
  },

  // Get stored user
  getStoredUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// Legacy exports for backward compatibility
export function loginRequest(payload) {
  return authService.login(payload);
}

export function registerRequest(payload) {
  return authService.register(payload);
}
