// src/services/authService.js
import api from './api';

const authService = {
  // Register user - FIX: Don't pass token here
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Get current user - FIX: Don't accept token parameter
  getCurrentUser: async () => {
    const response = await api.get('/user/me');
    return response.data;
  },

  // Logout (client-side only)
  logout: () => {
    localStorage.removeItem('token');
  }
};

export default authService;