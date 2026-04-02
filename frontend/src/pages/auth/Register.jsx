import React, { useState } from 'react';
import { Eye, EyeOff, Star, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { registerUser, googleAuth } from '../../services/authApi';
import AuthTop from '../../components/AuthTop';
import AuthFooter from '../../components/AuthFooter';

const SignupPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', agree: false });

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!formData.agree) return;
    
    setError('');
    setIsLoading(true);
    
    try {
      const data = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      login(data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const signupWithGoogle = useGoogleLogin({
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
    onError: () => setError('Google Sign-Up failed')
  });

  return (
    <div className="min-h-screen w-full flex flex-col font-sans text-[#2d3748] bg-[#f8fafc]">
      <AuthTop />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[900px] overflow-hidden flex flex-col md:row min-h-[600px] md:flex-row">
          
          <div className="hidden md:flex md:w-[45%] bg-[#4a5d55] p-10 flex-col justify-between relative">
            <div className="relative z-10 text-white">
              <h2 className="text-[36px] font-bold leading-[1.1] mb-4">
                The Art of <br /> Intentional Vitality.
              </h2>
              <p className="text-slate-200 text-sm leading-relaxed max-w-[280px]">
                Join a community dedicated to the science of movement and the luxury of recovery.
              </p>
            </div>

            <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20">
              <div className="flex gap-1 mb-2 text-[#007f56]">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-white italic text-[12px] mb-4 leading-relaxed">
                "The most sophisticated fitness experience I've ever encountered. It's not just an app; it's a digital wellness sanctuary."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-400 overflow-hidden border border-white/50 text-center">
                  <img src="/avator.jpg" alt="Elena" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white font-bold text-[10px] uppercase tracking-widest">Elena Vance</p>
                  <p className="text-white/60 text-[8px] uppercase tracking-widest">Editorial Director, Luxe Health</p>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 opacity-30">
               <img src="/Home Gym_.jpg" alt="Fitness" className="w-full h-full object-cover grayscale" />
            </div>
          </div>

          <div className="w-full md:w-[55%] p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-2xl font-bold mb-1">Create Account</h1>
            <p className="text-slate-400 text-[13px] mb-6">Start your journey toward The Living Equilibrium today.</p>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 text-[11px] rounded-lg font-bold uppercase tracking-tight text-left border border-red-100 animate-in fade-in zoom-in duration-200">
                {error}
              </div>
            )}

            <div className="flex gap-3 mb-6">
              <button 
                type="button" 
                onClick={() => signupWithGoogle()}
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 bg-[#f1f3f5] py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-200 transition-colors"
              >
                <img src="/google_icon.jpg" className="w-6 h-6" alt="Google" />
                Google
              </button>
            </div>

            <div className="relative mb-6 text-center">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
              <span className="relative bg-white px-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Or continue with email</span>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  disabled={isLoading}
                  placeholder="Julianne Moore"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#f3f6f8] border-none rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-[#007f56] outline-none transition-shadow" 
                  required
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  disabled={isLoading}
                  placeholder="julianne@equilibrium.com"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-[#f3f6f8] border-none rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-[#007f56] outline-none transition-shadow" 
                  required
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    disabled={isLoading}
                    placeholder="••••••••"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-[#f3f6f8] border-none rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-[#007f56] outline-none transition-shadow" 
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2 py-1">
                <input 
                  type="checkbox" 
                  id="agree"
                  disabled={isLoading}
                  onChange={(e) => setFormData({...formData, agree: e.target.checked})}
                  className="mt-0.5 accent-[#007f56]" 
                  required
                />
                <label htmlFor="agree" className="text-[10px] text-slate-500 font-medium leading-tight cursor-pointer">
                  I agree to the <span className="font-bold text-slate-800 underline">Terms of Service</span> and <span className="font-bold text-slate-800 underline">Privacy Policy</span>.
                </label>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#007f56] hover:bg-[#006645] disabled:bg-slate-300 text-white font-bold py-3.5 rounded-lg transition-all active:scale-[0.98] mt-2 text-sm shadow-lg shadow-green-900/10 flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="animate-spin" size={18} /> : 'Create Account'}
              </button>
            </form>

            <p className="mt-6 text-[12px] text-slate-500 text-center font-medium">
              Already have an account? <a href="/login" className="text-[#007f56] font-bold hover:underline">Sign In</a>
            </p>
          </div>
        </div>
      </main>
      
      <AuthFooter />
    </div>
  );
};

export default SignupPage;