import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingShell } from './Onboarding1';
import Button from '../../components/ui/Button';
import { calcBmi, bmiCategory, onboardingStorage } from '../../utils/fitness';

const GOALS = [
  {
    value: 'lose',
    title: 'Lose Weight',
    subtitle: 'Burn fat while maintaining energy levels',
    icon: '🔥',
  },
  {
    value: 'gain',
    title: 'Gain Muscle',
    subtitle: 'Build strength and increase lean mass',
    icon: '💪',
  },
  {
    value: 'maintain',
    title: 'Stay Fit',
    subtitle: 'Maintain weight and improve mobility',
    icon: '⚖️',
  },
];


export default function Onboarding2() {
  const navigate = useNavigate();
  const [selectedGoal, setSelectedGoal] = useState(localStorage.getItem('onboarding_goal') || '');

  const { height, weight } = onboardingStorage.load();

  const bmi = useMemo(() => calcBmi(weight, height), [height, weight]);
  const category = bmi ? bmiCategory(bmi) : null;

  const handleNext = () => {
    if (!selectedGoal) return;
    onboardingStorage.save({ goal: selectedGoal });
    navigate('/onboarding/3');
  };

  return (
    <OnboardingShell step={2}>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Step 2 of 3</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">What's your primary goal?</h1>
        <p className="text-sm text-gray-500 mb-6">
          This shapes your workout intensity, calorie targets, and weekly plan.
        </p>

        {/* BMI snapshot */}
        {bmi && (
          <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-gray-900">{bmi}</div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest">Your BMI</p>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${category.color}`}>
                  {category.label}
                </span>
              </div>
            </div>
            <div className="text-right text-xs text-gray-400">
              <p>{height} cm · {weight} kg</p>
              <button
                type="button"
                onClick={() => navigate('/onboarding/1')}
                className="text-emerald-600 hover:underline mt-0.5"
              >
                Edit
              </button>
            </div>
          </div>
        )}

        {/* Goal cards */}
        <div className="flex flex-col gap-3 mb-8">
          {GOALS.map((goal) => {
            const active = selectedGoal === goal.value;
            return (
              <button
                key={goal.value}
                type="button"
                onClick={() => setSelectedGoal(goal.value)}
                className={`flex items-center gap-4 w-full text-left rounded-xl border-2 px-4 py-3.5 transition-all
                  ${active
                    ? 'border-emerald-600 bg-emerald-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'}`}
              >
                <span className="text-2xl">{goal.icon}</span>
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${active ? 'text-emerald-700' : 'text-gray-900'}`}>
                    {goal.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{goal.subtitle}</p>
                </div>
                <div className={`h-4 w-4 rounded-full border-2 shrink-0 flex items-center justify-center
                  ${active ? 'border-emerald-600 bg-emerald-600' : 'border-gray-300'}`}>
                  {active && (
                    <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={() => navigate('/onboarding/1')}>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Button>
          <Button onClick={handleNext} disabled={!selectedGoal}>
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
