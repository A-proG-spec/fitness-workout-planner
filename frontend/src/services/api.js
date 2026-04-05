const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function apiFetch(endpoint, options = {}) {
  const { headers = {}, ...restOptions } = options;

  let res;
  try {
    res = await fetch(`${BASE_URL}${endpoint}`, {
      ...restOptions,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });
  } catch (err) {
    const hint =
      'Cannot reach the API. Start the backend (cd backend && npm run dev) and use the same host as the app (localhost vs 127.0.0.1).';
    throw new Error(err?.message === 'Failed to fetch' ? hint : err?.message || hint);
  }

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
