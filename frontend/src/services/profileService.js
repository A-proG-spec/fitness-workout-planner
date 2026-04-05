import { apiFetch } from './api';
import { getStoredAccessToken } from '../utils/authStorage';

const buildAuthHeaders = (token) => {
    if (!token) return {};
    return { Authorization: `Bearer ${token}` };
};

export function getProfile(token = getStoredAccessToken()) {
    return apiFetch('/profile', {
        method: 'GET',
        headers: buildAuthHeaders(token),
    });
}

export function updateProfile(payload, token = getStoredAccessToken()) {
    return apiFetch('/profile', {
        method: 'PUT',
        headers: buildAuthHeaders(token),
        body: JSON.stringify(payload),
    });
}
