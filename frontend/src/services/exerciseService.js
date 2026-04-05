import { apiFetch } from './api';

/**
 * @param {{ category?: string; search?: string; limit?: number }} params
 */
export async function fetchExercises(params = {}) {
  const q = new URLSearchParams();
  if (params.category) q.set('category', params.category);
  q.set('limit', String(params.limit ?? 48));
  if (params.search?.trim()) q.set('search', params.search.trim());
  const query = q.toString();
  const res = await apiFetch(`/exercises${query ? `?${query}` : ''}`);
  return Array.isArray(res.exercises) ? res.exercises : [];
}
