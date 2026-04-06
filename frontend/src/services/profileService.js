import axios from '../config/axios';

export const profileService = {
  // Get user profile
  getProfile: async () => {
    const response = await axios.get('/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await axios.put('/profile', profileData);
    return response.data;
  },
};
