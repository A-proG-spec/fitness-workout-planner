import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import useAsyncAction from '../../hooks/useAsyncAction';
import { registerRequest } from '../../services/authService';
import Alert from '../../components/ui/Alert';
import heroImg from '../../assets/hero.png';

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#1877F2"
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
  );
}

function EyeIcon({ open }) {
  if (open) {
    return (
      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
  }
  return (
    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );
}

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { run, loading, error, setError } = useAsyncAction();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!agreed) {
      setError('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }
    run(async () => {
      const response = await registerRequest(form);
      const payload = response?.data || {};
      const accessToken = payload.access_token || payload.token || '';
      login({
        userData: payload.user || null,
        accessToken,
        remember: true,
      });
      navigate('/onboarding/1');
    }, 'Registration failed. Please review your details.');
  };

  return (
    <div className="font-ui flex min-h-screen flex-col bg-[#F3F4F6] text-gray-900 antialiased">
      <header className="flex shrink-0 items-center justify-between px-6 py-5 md:px-10">
        <span className="font-brand text-xl font-semibold tracking-tight text-[#006D4E] md:text-2xl">
          Equilibrium Fitness
        </span>
        <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link to="/" className="transition-colors hover:text-gray-900">
            Back to site
          </Link>
          <a
            href="mailto:support@equilibrium.fitness"
            className="underline decoration-gray-400 underline-offset-4 transition-colors hover:text-gray-900"
          >
            Support
          </a>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 pb-8 pt-2 md:px-6">
        <div className="w-full max-w-[960px] overflow-hidden rounded-2xl bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12)] md:grid md:grid-cols-2 md:rounded-3xl">
          <aside className="relative flex min-h-[280px] flex-col justify-between bg-[#006D4E] p-8 text-white md:min-h-[620px] md:p-10 lg:p-12">
            <div className="relative z-10 space-y-4">
              <h1 className="font-ui text-2xl font-bold leading-tight tracking-tight md:text-3xl lg:text-[1.75rem]">
                The Art of Intentional Vitality.
              </h1>
              <p className="max-w-sm text-sm leading-relaxed text-white/85 md:text-base">
                Join a community dedicated to the science of movement and the luxury of recovery.
              </p>
            </div>

            <div className="relative z-10 my-6 flex flex-1 items-center justify-center md:my-8">
              <div className="relative w-full max-w-[280px] opacity-95 mix-blend-soft-light md:max-w-[320px]">
                <img src={heroImg} alt="" className="h-auto w-full object-contain drop-shadow-2xl" />
              </div>
            </div>

            <div className="relative z-10 rounded-xl bg-[#c8d9d0]/25 p-5 backdrop-blur-sm md:p-6">
              <div className="mb-3 flex gap-1" aria-hidden>
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="h-4 w-4 text-[#7dd3a0]" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 text-sm leading-relaxed text-white/95">
                &ldquo;The most sophisticated fitness experience I&apos;ve ever encountered. It&apos;s not just an app; it&apos;s a digital wellness
                sanctuary.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-xs font-semibold text-white">
                  EV
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-wide text-white">ELENA VANCE</p>
                  <p className="text-xs text-white/75">Editorial Director, Luxe Health</p>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 to-black/20" aria-hidden />
          </aside>

          <div className="flex flex-col justify-center px-6 py-10 md:px-10 md:py-12 lg:px-14">
            <div className="mx-auto w-full max-w-md">
              <h2 className="font-ui text-2xl font-bold text-gray-900">Create Account</h2>
              <p className="mt-2 text-sm text-gray-500">
                Start your journey toward The Living Equilibrium today.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-[#F3F4F6] py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                >
                  <GoogleIcon />
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-[#F3F4F6] py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                >
                  <FacebookIcon />
                  Facebook
                </button>
              </div>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center" aria-hidden>
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs font-semibold uppercase tracking-wider text-gray-400">
                  <span className="bg-white px-3">Or continue with email</span>
                </div>
              </div>

              <div className="mt-4">
                <Alert>{error}</Alert>
              </div>

              <form className="mt-4 space-y-5" onSubmit={onSubmit} noValidate>
                <label className="block">
                  <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                    Full name
                  </span>
                  <input
                    name="name"
                    className="w-full rounded-lg border-0 bg-[#F3F4F6] px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#006D4E]/30"
                    placeholder="Julianne Moore"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                    Email address
                  </span>
                  <input
                    name="email"
                    className="w-full rounded-lg border-0 bg-[#F3F4F6] px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#006D4E]/30"
                    type="email"
                    placeholder="julianne@equilibrium.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                    Password
                  </span>
                  <div className="relative">
                    <input
                      name="password"
                      className="w-full rounded-lg border-0 bg-[#F3F4F6] px-4 py-3 pr-12 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#006D4E]/30"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={form.password}
                      onChange={handleChange}
                      minLength={8}
                      autoComplete="new-password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 hover:bg-gray-200/80"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <EyeIcon open={showPassword} />
                    </button>
                  </div>
                </label>

                <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-[#006D4E] focus:ring-[#006D4E]"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <span>
                    I agree to the{' '}
                    <Link to="/terms" className="font-semibold text-[#006D4E] hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="font-semibold text-[#006D4E] hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>

                <button
                  className="w-full rounded-lg bg-[#006D4E] py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#005a40] disabled:opacity-60"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Creating account…' : 'Create Account'}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-[#006D4E] hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto flex flex-col gap-4 px-6 py-6 text-[10px] font-semibold uppercase tracking-wider text-gray-400 md:flex-row md:items-center md:justify-between md:px-10">
        <p>© 2026 Equilibrium Fitness. Elevating wellness through intentional design.</p>
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          <Link to="/privacy" className="hover:text-gray-600">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-gray-600">
            Terms of Service
          </Link>
          <a href="#" className="hover:text-gray-600">
            Cookie Policy
          </a>
          <a href="#" className="hover:text-gray-600">
            Accessibility
          </a>
        </nav>
      </footer>
    </div>
  );
}
