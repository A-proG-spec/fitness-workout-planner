import { useState } from 'react';

/**
 * Wraps an async function with loading + error state.
 *
 * Usage:
 *   const { run, loading, error } = useAsyncAction();
 *   await run(async () => { ... });
 */
export default function useAsyncAction() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const run = async (fn, errorMessage = 'Something went wrong. Please try again.') => {
    setError('');
    setLoading(true);
    try {
      return await fn();
    } catch (err) {
      const msg = err?.message || errorMessage;
      setError(msg.length < 120 ? msg : errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { run, loading, error, setError };
}
