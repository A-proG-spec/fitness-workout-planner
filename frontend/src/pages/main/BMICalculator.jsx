import { useState, useMemo } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import {
  GridIcon,
  WorkoutIcon,
  ChartIcon,
  UsersIcon,
  HelpIcon,
  LogoutIcon,
} from '../../components/icons';
import { calcBmi, bmiCategory } from '../../utils/fitness';

const sidebarPrimaryLinks = [
  { label: 'Dashboard', active: false, icon: GridIcon, to: '/dashboard' },
  { label: 'Workouts', active: false, icon: WorkoutIcon, to: '/exercises' },
  { label: 'Progress', active: false, icon: ChartIcon, to: '/progress' },
  { label: 'Community', active: false, icon: UsersIcon, to: '/community' },
];

const sidebarSecondaryLinks = [
  { label: 'Support', icon: HelpIcon, to: '#' },
  { label: 'Sign Out', icon: LogoutIcon, to: '/login' },
];

const navLinks = [
  { label: 'Dashboard', to: '/dashboard', active: false },
  { label: 'Workouts', to: '/exercises', active: false },
  { label: 'Progress', to: '/progress', active: false },
  { label: 'Community', to: '/community', active: false },
];

const bmiRanges = [
  { label: 'Underweight', range: '< 18.5', color: 'bg-blue-500', description: 'Below healthy weight range' },
  { label: 'Normal', range: '18.5 - 24.9', color: 'bg-emerald-500', description: 'Healthy weight range' },
  { label: 'Overweight', range: '25 - 29.9', color: 'bg-yellow-500', description: 'Above healthy weight range' },
  { label: 'Obese', range: '≥ 30', color: 'bg-red-500', description: 'Significantly above healthy range' },
];

export default function BMICalculator() {
  const [unit, setUnit] = useState('metric');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const heightInCm = useMemo(() => {
    if (!height) return 0;
    return unit === 'metric' ? Number(height) : Math.round(Number(height) * 2.54);
  }, [height, unit]);

  const weightInKg = useMemo(() => {
    if (!weight) return 0;
    return unit === 'metric' ? Number(weight) : Math.round(Number(weight) * 0.453592);
  }, [weight, unit]);

  const bmi = useMemo(() => {
    if (!heightInCm || !weightInKg) return null;
    return calcBmi(weightInKg, heightInCm);
  }, [heightInCm, weightInKg]);

  const category = bmi ? bmiCategory(bmi) : null;

  const getBMIPosition = (bmiValue) => {
    if (!bmiValue) return 0;
    if (bmiValue < 18.5) return (bmiValue / 18.5) * 25;
    if (bmiValue < 25) return 25 + ((bmiValue - 18.5) / 6.5) * 25;
    if (bmiValue < 30) return 50 + ((bmiValue - 25) / 5) * 25;
    return Math.min(75 + ((bmiValue - 30) / 10) * 25, 100);
  };

  return (
    <div className="min-h-screen bg-[#f5f7f8] text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[240px_minmax(0,1fr)]">
        <Sidebar primaryLinks={sidebarPrimaryLinks} secondaryLinks={sidebarSecondaryLinks} />

        <div className="flex min-w-0 flex-col">
          <Navbar navLinks={navLinks} userInitials="AJ" searchPlaceholder="Search..." />

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-5xl space-y-6">
              
              {/* Header */}
              <section>
                <h1 className="text-3xl font-bold text-slate-900">BMI Calculator</h1>
                <p className="mt-1 text-sm text-slate-500">
                  Calculate your Body Mass Index and understand your health metrics
                </p>
              </section>

              <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
                
                {/* Calculator Card */}
                <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200/80">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Calculate Your BMI</h2>

                  {/* Unit Toggle */}
                  <div className="mb-6 flex gap-2 bg-slate-100 rounded-xl p-1 w-fit">
                    {['metric', 'imperial'].map((u) => (
                      <button
                        key={u}
                        type="button"
                        onClick={() => setUnit(u)}
                        className={`px-6 py-2 rounded-lg text-sm font-semibold transition-colors capitalize ${
                          unit === u ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>

                  {/* Input Fields */}
                  <div className="grid gap-6 sm:grid-cols-2 mb-8">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Height {unit === 'metric' ? '(cm)' : '(inches)'}
                      </label>
                      <input
                        type="number"
                        min="1"
                        step="0.1"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder={unit === 'metric' ? '175' : '69'}
                        className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-lg font-semibold text-slate-900 transition focus:border-emerald-500 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">
                        Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
                      </label>
                      <input
                        type="number"
                        min="1"
                        step="0.1"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder={unit === 'metric' ? '70' : '154'}
                        className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-lg font-semibold text-slate-900 transition focus:border-emerald-500 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Result */}
                  {bmi && category ? (
                    <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm font-medium text-emerald-700 mb-1">Your BMI</p>
                          <p className="text-5xl font-bold text-slate-900">{bmi}</p>
                        </div>
                        <div className={`rounded-2xl px-4 py-2 text-sm font-semibold border-2 ${category.color}`}>
                          {category.label}
                        </div>
                      </div>

                      {/* BMI Scale Indicator */}
                      <div className="relative mt-6">
                        <div className="h-3 w-full overflow-hidden rounded-full bg-gradient-to-r from-blue-500 via-emerald-500 via-yellow-500 to-red-500" />
                        <div
                          className="absolute top-0 h-3 w-1 bg-slate-900 rounded-full"
                          style={{ left: `${getBMIPosition(bmi)}%`, transform: 'translateX(-50%)' }}
                        />
                        <div
                          className="absolute -top-8 bg-slate-900 text-white px-2 py-1 rounded-lg text-xs font-bold"
                          style={{ left: `${getBMIPosition(bmi)}%`, transform: 'translateX(-50%)' }}
                        >
                          {bmi}
                        </div>
                      </div>

                      <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                        {category.label === 'Normal' 
                          ? 'Great! You are within the healthy weight range. Keep maintaining your current lifestyle.'
                          : category.label === 'Underweight'
                          ? 'You may be underweight. Consider consulting with a healthcare professional for personalized advice.'
                          : category.label === 'Overweight'
                          ? 'You are slightly above the healthy weight range. A balanced diet and regular exercise can help.'
                          : 'You are significantly above the healthy weight range. We recommend consulting with a healthcare professional.'}
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                      <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-full bg-slate-200 text-slate-400">
                        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-slate-600">
                        Enter your height and weight to calculate your BMI
                      </p>
                    </div>
                  )}
                </section>

                {/* Info Sidebar */}
                <div className="space-y-6">
                  
                  {/* BMI Ranges */}
                  <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">BMI Ranges</h3>
                    <div className="space-y-3">
                      {bmiRanges.map((range) => (
                        <div key={range.label} className="flex items-start gap-3">
                          <div className={`mt-1 h-3 w-3 shrink-0 rounded-full ${range.color}`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="text-sm font-semibold text-slate-900">{range.label}</span>
                              <span className="text-xs font-medium text-slate-500">{range.range}</span>
                            </div>
                            <p className="text-xs text-slate-500">{range.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* About BMI */}
                  <section className="rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 text-white shadow-lg">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-100 mb-3">
                      About BMI
                    </h3>
                    <p className="text-sm leading-relaxed text-emerald-50 mb-4">
                      Body Mass Index (BMI) is a measure of body fat based on height and weight. It's a useful screening tool but doesn't directly measure body fat percentage.
                    </p>
                    <div className="rounded-xl bg-white/20 p-3 text-xs leading-relaxed">
                      <strong className="block mb-1">Important Note:</strong>
                      BMI doesn't account for muscle mass, bone density, or body composition. Athletes may have high BMI due to muscle mass.
                    </div>
                  </section>

                  {/* Quick Tips */}
                  <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Health Tips</h3>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <span className="text-xl shrink-0">🥗</span>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Balanced Diet</p>
                          <p className="text-xs text-slate-500">Focus on whole foods and proper portions</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-xl shrink-0">🏃</span>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Regular Exercise</p>
                          <p className="text-xs text-slate-500">Aim for 150 minutes of activity per week</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-xl shrink-0">💧</span>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Stay Hydrated</p>
                          <p className="text-xs text-slate-500">Drink plenty of water throughout the day</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-xl shrink-0">😴</span>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">Quality Sleep</p>
                          <p className="text-xs text-slate-500">Get 7-9 hours of sleep each night</p>
                        </div>
                      </div>
                    </div>
                  </section>

                </div>

              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
