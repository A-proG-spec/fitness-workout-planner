import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthLayout from '../../layouts/AuthLayout';
import Button from '../../components/ui/Button';
import FormField from '../../components/ui/FormField';
import PasswordField from '../../components/ui/PasswordField';
import Alert from '../../components/ui/Alert';
import Divider from '../../components/ui/Divider';
import SocialButton, { GoogleIcon, AppleIcon } from '../../components/ui/SocialButton';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login({ email, password });
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-lg px-8 py-7 flex flex-col gap-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-0.5 text-xs text-gray-500">Continue your journey to intentional wellness.</p>
        </div>

        {error && <Alert>{error}</Alert>}

        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
          <FormField
            id="login-email"
            label="Email Address"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <PasswordField
            id="login-password"
            label="Password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            labelRight={
              <Link to="/forgot-password" className="text-xs font-semibold uppercase tracking-widest text-emerald-600 hover:underline">
                Forgot Password?
              </Link>
            }
          />

          <Button type="submit" disabled={loading} className="w-full justify-center py-2.5">
            {loading ? 'Signing in…' : 'Sign In'}
          </Button>
        </form>

        <Divider label="or continue with" />

        <div className="grid grid-cols-2 gap-2">
          <SocialButton label="Google" icon={<GoogleIcon />} />
          <SocialButton label="Apple"  icon={<AppleIcon />} />
        </div>

        <p className="text-center text-xs text-gray-500">
          New to HulFit?{' '}
          <Link to="/register" className="font-semibold text-emerald-600 hover:underline">Create an account</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
