import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { registerRequest } from '../../services/authService';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      setLoading(true);
      const response = await registerRequest({ name, email, password });
      const payload = response?.data || {};

      login({
        userData: payload.user || null,
        accessToken: payload.access_token || '',
        remember,
      });

      navigate('/onboarding/1');
    } catch {
      setError('Registration failed. Please review your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-md space-y-4 p-6">
      <h1 className="text-2xl font-semibold">Register</h1>

      {error && <p className="rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <form className="space-y-4 rounded border p-4" onSubmit={onSubmit}>
        <label className="grid gap-1">
          <span className="text-sm">Name</span>
          <input
            className="rounded border px-3 py-2"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm">Email</span>
          <input
            className="rounded border px-3 py-2"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm">Password</span>
          <input
            className="rounded border px-3 py-2"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={8}
            required
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
          Remember me
        </label>

        <button className="w-full rounded bg-black px-4 py-2 text-white disabled:opacity-60" type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <p className="text-sm text-gray-600">
        Already have an account? <Link className="underline" to="/login">Login</Link>
      </p>
    </section>
  );
}
