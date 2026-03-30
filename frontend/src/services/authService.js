import { apiFetch } from './api';

export function loginRequest(payload) {
    return apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}

export function registerRequest(payload) {
    return apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
}
