import axios from '../config/axios';

export const progressService = {
  // Add progress entry
  addProgress: async (progressData) => {
    const response = await axios.post('/progress', progressData);
    return response.data;
  },

  // Get progress history
  getProgress: async () => {
    const response = await axios.get('/progress');
    return response.data;
  },

  // Get progress statistics
  getProgressStats: async () => {
    const response = await axios.get('/progress/stats');
    return response.data;
  },
};
