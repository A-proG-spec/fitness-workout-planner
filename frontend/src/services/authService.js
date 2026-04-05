import axios from '../config/axios';

export function loginRequest(payload) {
  return axios.post('/auth/login', payload);
}

export function registerRequest(payload) {
  return axios.post('/auth/register', payload);
}
