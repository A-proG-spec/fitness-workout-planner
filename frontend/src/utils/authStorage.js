const ACCESS_TOKEN_KEY = 'access_token';
const USER_KEY = 'auth_user';

const readFromStorage = (key) => {
    try {
        return localStorage.getItem(key) || sessionStorage.getItem(key);
    } catch {
        return null;
    }
};

export const getStoredAccessToken = () => readFromStorage(ACCESS_TOKEN_KEY);

export const getStoredUser = () => {
    const raw = readFromStorage(USER_KEY);
    if (!raw) return null;

    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
};

export const persistAuth = ({ accessToken, user, remember = true }) => {
    const primary = remember ? localStorage : sessionStorage;
    const secondary = remember ? sessionStorage : localStorage;

    secondary.removeItem(ACCESS_TOKEN_KEY);
    secondary.removeItem(USER_KEY);

    if (accessToken) {
        primary.setItem(ACCESS_TOKEN_KEY, accessToken);
    }

    if (user) {
        primary.setItem(USER_KEY, JSON.stringify(user));
    }
};

export const clearAuth = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
};
