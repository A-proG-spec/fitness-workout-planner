import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { loginRequest } from '../../services/authService';
import useAsyncAction from '../../hooks/useAsyncAction';
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
  const { run, loading, error } = useAsyncAction();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();
    run(async () => {
      const response = await loginRequest({ email, password });
      const payload  = response?.data || {};
      login({ userData: payload.user || null, accessToken: payload.access_token || '', remember });
      navigate('/dashboard');
    }, 'Login failed. Please check your credentials.');
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-lg px-8 py-7 flex flex-col gap-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-0.5 text-xs text-gray-500">Continue your journey to intentional wellness.</p>
        </div>

        <Alert>{error}</Alert>

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
