import axios from '../config/axios';

export function getProfile() {
  return axios.get('/users/profile');
}

export function updateProfile(payload) {
  return axios.put('/users/profile', payload);
}
