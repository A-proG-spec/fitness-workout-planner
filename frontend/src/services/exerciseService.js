import axios from '../config/axios';

export const exerciseService = {
  // Get all exercises with optional filters
  getAllExercises: async (params = {}) => {
    const response = await axios.get('/exercises', { params });
    return response.data;
  },

  // Get exercise by ID
  getExerciseById: async (id) => {
    const response = await axios.get(`/exercises/${id}`);
    return response.data;
  },

  // Get filter options
  getFilterOptions: async () => {
    const response = await axios.get('/exercises/filter-options');
    return response.data;
  },

  // Get exercises by muscle group
  getExercisesByMuscleGroup: async (muscleGroup) => {
    const response = await axios.get('/exercises/by-muscle-group', {
      params: { muscleGroup },
    });
    return response.data;
  },

  // Get library stats
  getLibraryStats: async () => {
    const response = await axios.get('/exercises/stats');
    return response.data;
  },

  // Create exercise (protected)
  createExercise: async (exerciseData) => {
    const response = await axios.post('/exercises', exerciseData);
    return response.data;
  },

  // Update exercise (protected)
  updateExercise: async (id, exerciseData) => {
    const response = await axios.put(`/exercises/${id}`, exerciseData);
    return response.data;
  },

  // Delete exercise (protected)
  deleteExercise: async (id) => {
    const response = await axios.delete(`/exercises/${id}`);
    return response.data;
  },
};
