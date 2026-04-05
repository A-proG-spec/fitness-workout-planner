import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import { calcBmi, calcBmr, onboardingStorage } from '../../utils/fitness';

const GOAL_META = {
  lose:     { label: 'Lose Weight',  kcal: 1900, emoji: '🔥', tip: 'Calorie deficit with cardio focus' },
  gain:     { label: 'Gain Muscle',  kcal: 2800, emoji: '💪', tip: 'Calorie surplus with strength training' },
  maintain: { label: 'Stay Fit',     kcal: 2300, emoji: '⚖️', tip: 'Balanced diet with mixed training' },
};

export default function Onboarding3() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const firstName = user?.name?.split(' ')[0] || 'there';
  const { age, height, weight, goal: goalKey } = onboardingStorage.load();
  const meta = GOAL_META[goalKey] ?? GOAL_META.maintain;

  const bmi = calcBmi(weight, height) ?? '—';
  const bmr = calcBmr(weight, height, age);

  useEffect(() => { onboardingStorage.markComplete(); }, []);

  const stats = [
    { label: 'Daily Calories', value: `${meta.kcal.toLocaleString()} kcal`, sub: meta.tip },
    { label: 'Starting Weight', value: `${weight} kg`, sub: `BMI · ${bmi}` },
    { label: 'Base Metabolic Rate', value: `${bmr.toLocaleString()} kcal`, sub: 'Calories at rest' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Nav */}
      <header className="shrink-0 flex items-center justify-between px-8 py-3 bg-white border-b border-gray-100">
        <Link to="/" className="font-bold text-gray-900 text-lg tracking-tight">
          Hul<span className="text-emerald-600">Fit</span>
        </Link>
      </header>

      {/* Full progress bar */}
      <div className="h-1 bg-emerald-600" />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-56 shrink-0 bg-white border-r border-gray-100 px-5 py-8 gap-1 sticky top-0 h-screen">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Your Setup</p>
          {['Body Metrics', 'Your Goals', 'All Set'].map((label, i) => (
            <div key={label} className={`flex items-center gap-3 w-full rounded-xl px-3 py-2.5 transition-colors
              ${i === 2 ? 'bg-emerald-50' : ''}`}>
              <div className="h-7 w-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 text-xs font-bold">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className={`text-sm font-medium ${i === 2 ? 'text-emerald-700 font-semibold' : 'text-gray-500'}`}>
                {label}
              </span>
            </div>
          ))}
        </aside>

        <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg text-center">

          {/* Success icon */}
          <div className="h-16 w-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-200">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            You're all set, {firstName}! {meta.emoji}
          </h1>
          <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto">
            Your personalized HulFit plan is ready. Here's a snapshot of your targets based on your profile.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {stats.map(({ label, value, sub }) => (
              <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-left">
                <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-2">{label}</p>
                <p className="text-lg font-bold text-gray-900 leading-tight">{value}</p>
                <p className="text-xs text-gray-400 mt-1">{sub}</p>
              </div>
            ))}
          </div>

          {/* Goal badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold px-4 py-2 rounded-full mb-8">
            <span>{meta.emoji}</span>
            Primary Goal: {meta.label}
          </div>

          <div className="flex flex-col items-center gap-3">
            <Button size="lg" onClick={() => navigate('/dashboard')}>
              Go to Dashboard
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Button>
            <p className="text-xs text-gray-400">You can update these preferences anytime in your profile settings.</p>
          </div>
        </div>
        </main>
      </div>
    </div>
  );
}
