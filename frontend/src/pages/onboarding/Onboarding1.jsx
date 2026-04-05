import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import FormField from '../../components/ui/FormField';
import { onboardingStorage } from '../../utils/fitness';

const STEPS = ['Body Metrics', 'Your Goals', 'All Set'];

function OnboardingShell({ step, children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Nav */}
      <header className="shrink-0 flex items-center justify-between px-8 py-3 bg-white border-b border-gray-100">
        <Link to="/" className="font-bold text-gray-900 text-lg tracking-tight">
          Hul<span className="text-emerald-600">Fit</span>
        </Link>
        <span className="text-xs text-gray-400 uppercase tracking-widest">Setup · Step {step} of {STEPS.length}</span>
      </header>

      {/* Progress bar */}
      <div className="h-1 bg-gray-200">
        <div
          className="h-1 bg-emerald-600 transition-all duration-500"
          style={{ width: `${(step / STEPS.length) * 100}%` }}
        />
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-56 shrink-0 bg-white border-r border-gray-100 px-5 py-8 gap-1 sticky top-0 h-screen">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Your Setup</p>
          {STEPS.map((label, i) => {
            const idx = i + 1;
            const active = idx === step;
            const done = idx < step;
            return (
              <div key={label} className={`flex items-center gap-3 w-full rounded-xl px-3 py-2.5 transition-colors
                ${active ? 'bg-emerald-50' : ''}`}>
                {/* circle */}
                <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-colors
                  ${done || active ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {done ? (
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : idx}
                </div>
                <span className={`text-sm font-medium transition-colors
                  ${active ? 'text-emerald-700 font-semibold' : done ? 'text-gray-500' : 'text-gray-400'}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </aside>

        {/* Main content */}
        <main className="flex-1 flex items-start justify-center px-6 py-8">
          <div className="w-full max-w-lg">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export { OnboardingShell, STEPS };

export default function Onboarding1() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [age, setAge] = useState(() => Number(localStorage.getItem('onboarding_age') || ''));
  const [height, setHeight] = useState(() => Number(localStorage.getItem('onboarding_height') || ''));
  const [weight, setWeight] = useState(() => Number(localStorage.getItem('onboarding_weight') || ''));
  const [unit, setUnit] = useState('metric');

  const toMetric = (val, type) => {
    if (unit === 'metric') return val;
    if (type === 'height') return Math.round(val * 2.54); // inches → cm
    if (type === 'weight') return Math.round(val * 0.453592); // lbs → kg
    return val;
  };

  const handleNext = () => {
    if (!age || !height || !weight) return;
    onboardingStorage.save({
      age,
      height: toMetric(height, 'height'),
      weight: toMetric(weight, 'weight'),
    });
    navigate('/onboarding/2');
  };

  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <OnboardingShell step={1}>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Step 1 of 3</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Hey {firstName}, let's start with your body metrics</h1>
        <p className="text-sm text-gray-500 mb-6">
          We use these to calculate your BMI and personalize your training plan.
        </p>

        {/* Unit toggle */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit mb-6">
          {['metric', 'imperial'].map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => setUnit(u)}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors capitalize
                ${unit === u ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {u}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Age',    unit: 'yrs', value: age,    setter: setAge,    min: 10, max: 100, placeholder: '25' },
            { label: 'Height', unit: unit === 'metric' ? 'cm' : 'in', value: height, setter: setHeight, min: 1, max: 999, placeholder: unit === 'metric' ? '175' : '69' },
            { label: 'Weight', unit: unit === 'metric' ? 'kg' : 'lbs', value: weight, setter: setWeight, min: 1, max: 999, placeholder: unit === 'metric' ? '70' : '154' },
          ].map(({ label, unit: u, value, setter, min, max, placeholder }) => (
            <FormField
              key={label}
              label={label}
              type="number" min={min} max={max}
              value={value || ''}
              placeholder={placeholder}
              onChange={(e) => setter(+e.target.value)}
              hint={u}
            />
          ))}
        </div>

        {/* Info note */}
        <div className="flex gap-3 bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-6">
          <div className="h-5 w-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Your data is encrypted and used only to personalize your fitness plan. We never share your health information with third parties.
          </p>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleNext} disabled={!age || !height || !weight}>
            Continue
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </OnboardingShell>
  );
}
