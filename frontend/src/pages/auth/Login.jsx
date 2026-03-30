import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { loginUser, googleAuth } from '../../services/authApi';
import AuthTop from '../../components/AuthTop';
import AuthFooter from '../../components/AuthFooter';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const data = await loginUser({ email, password });
      login(data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setError('');
      setIsLoading(true);
      try {
        const data = await googleAuth(tokenResponse.access_token);
        login(data.user);
        navigate('/dashboard');
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => setError('Google Sign-In failed')
  });

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-[#2d3748]">
      <AuthTop />
      
      <main className="flex-grow flex items-center justify-center bg-[radial-gradient(circle_at_center,_#f0f4f2_0%,_#e2e8e5_100%)] p-6">
        <div className="bg-white rounded-[20px] shadow-sm w-full max-w-[400px] p-10 text-center">
          <h1 className="text-[32px] font-bold mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 text-sm mb-8">Continue your journey to intentional wellness.</p>

          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs rounded-lg font-bold uppercase tracking-tight text-left">{error}</div>}
          
          <form onSubmit={handleSignIn} className="space-y-5 text-left">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-[#e8ecef] border-none rounded-lg px-4 py-3.5 text-sm text-slate-700 focus:ring-2 focus:ring-[#007f56] outline-none transition-shadow"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Password
                </label>
                <a href="#" className="text-[10px] font-bold text-[#007f56] uppercase tracking-widest hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#e8ecef] border-none rounded-lg px-4 py-3.5 text-sm text-slate-700 focus:ring-2 focus:ring-[#007f56] outline-none transition-shadow"
                  required
                  disabled={isLoading}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#007f56] hover:bg-[#006645] text-white font-bold py-3.5 rounded-lg transition-all active:scale-[0.98] text-base mt-2 shadow-lg shadow-green-900/10 flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-100"></span>
            </div>
            <div className="relative flex justify-center text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white px-3">
              Or continue with
            </div>
          </div>

          <button 
            type="button" 
            onClick={() => loginWithGoogle()}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-[#f1f3f5] hover:bg-[#e9ecef] py-3 rounded-lg transition-colors"
          >
            <img src="/google_icon.jpg" className="w-4 h-4" alt="Google" />
            <span className="text-sm font-semibold text-slate-700">Google</span>
          </button>

          <p className="mt-8 text-sm text-slate-500 font-medium text-center">
            New to hulfit? <a href="/register" className="text-[#007f56] font-bold hover:underline">Create an account</a>
          </p>
        </div>
      </main>
      
      <AuthFooter />
    </div>
  );
};

export default LoginPage;