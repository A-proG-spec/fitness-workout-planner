import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { registerRequest } from '../../services/authService';
import useAsyncAction from '../../hooks/useAsyncAction';
import AuthLayout from '../../layouts/AuthLayout';
import Button from '../../components/ui/Button';
import FormField from '../../components/ui/FormField';
import PasswordField from '../../components/ui/PasswordField';
import Alert from '../../components/ui/Alert';
import Divider from '../../components/ui/Divider';
import SocialButton, { GoogleIcon, FacebookIcon } from '../../components/ui/SocialButton';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { run, loading, error, setError } = useAsyncAction();

  const [form, setForm]     = useState({ name: '', email: '', password: '' });
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!agreed) { setError('Please agree to the Terms of Service and Privacy Policy.'); return; }
    run(async () => {
      const response = await registerRequest(form);
      const payload  = response?.data || {};
      login({ userData: payload.user || null, accessToken: payload.access_token || '', remember: true });
      navigate('/onboarding/1');
    }, 'Registration failed. Please review your details.');
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-3xl max-h-full flex rounded-2xl overflow-hidden shadow-lg bg-white">

        {/* Left panel */}
        <div
          className="hidden md:flex flex-col justify-between p-6 text-white shrink-0 w-[42%]"
          style={{ background: 'linear-gradient(160deg, #059669 0%, #065f46 100%)' }}
        >
          <div>
            <h2 className="text-xl font-bold leading-snug mb-2">
              The Art of<br />Intentional Vitality.
            </h2>
            <p className="text-xs text-white/75 leading-relaxed">
              Join a community dedicated to the science of movement and the luxury of recovery.
            </p>
          </div>

          <div className="rounded-xl bg-white/15 p-4">
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="h-4 w-4 text-emerald-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="italic text-white/90 text-xs leading-relaxed">
              "The most sophisticated fitness experience I've ever encountered. It's a digital wellness sanctuary."
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-white/30 flex items-center justify-center text-xs font-bold shrink-0">BG</div>
              <div>
                <p className="font-semibold text-xs uppercase tracking-wide">Biruk Getachew</p>
                <p className="text-white/60 text-xs">Fitness Coach, Addis Ababa</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 min-w-0 overflow-y-auto flex flex-col px-6 py-5 gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Create Account</h1>
            <p className="text-xs text-gray-500 mt-0.5">Start your journey toward intentional wellness today.</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <SocialButton label="Google"   icon={<GoogleIcon />} />
            <SocialButton label="Facebook" icon={<FacebookIcon />} />
          </div>

          <Divider label="or continue with email" />

          <Alert>{error}</Alert>

          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-2.5">
            <FormField
              id="reg-name" name="name" type="text" autoComplete="name"
              label="Full Name" placeholder="Jane Smith"
              value={form.name} onChange={handleChange} required
            />
            <FormField
              id="reg-email" name="email" type="email" autoComplete="email"
              label="Email Address" placeholder="you@example.com"
              value={form.email} onChange={handleChange} required
            />
            <PasswordField
              id="reg-password" name="password" autoComplete="new-password"
              label="Password" placeholder="••••••••"
              value={form.password} onChange={handleChange} minLength={8} required
            />

            <label className="flex items-start gap-2 text-xs text-gray-600 cursor-pointer">
              <input
                type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-3.5 w-3.5 rounded border-gray-300 accent-emerald-600 shrink-0"
              />
              <span>
                I agree to the{' '}
                <Link to="/terms" className="font-semibold text-emerald-600 hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="font-semibold text-emerald-600 hover:underline">Privacy Policy</Link>.
              </span>
            </label>

            <Button type="submit" disabled={loading} className="w-full justify-center py-2.5">
              {loading ? 'Creating account…' : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-xs text-gray-500 pb-2">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-gray-900 hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
