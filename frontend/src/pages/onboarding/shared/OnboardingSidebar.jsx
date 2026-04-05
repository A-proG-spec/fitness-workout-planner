import { IconUser, IconDumbbell, IconTarget, IconCard } from './OnboardingIcons.jsx';

const MINT_BG = 'rgba(167, 227, 209, 0.35)';
const MINT_ICON = '#2d8a6e';

const STEPS = [
  { id: 'account', label: 'Account', Icon: IconUser },
  { id: 'physicality', label: 'Physicality', Icon: IconDumbbell },
  { id: 'goals', label: 'Goals', Icon: IconTarget },
  { id: 'payment', label: 'Payment', Icon: IconCard },
];

/** @param {{ stepLabel: string, states: ('complete' | 'active' | 'upcoming')[] }} props */
export default function OnboardingSidebar({ stepLabel, states }) {
  return (
    <aside className="w-full shrink-0 md:w-56 lg:w-64">
      <p className="text-sm font-semibold text-gray-900">Onboarding</p>
      <p className="mt-0.5 text-xs text-gray-500">{stepLabel}</p>
      <nav className="mt-6 flex flex-row gap-2 overflow-x-auto pb-2 md:flex-col md:gap-1 md:overflow-visible md:pb-0">
        {STEPS.map((step, i) => {
          const state = states[i] || 'upcoming';
          const active = state === 'active';
          const complete = state === 'complete';
          const Icon = step.Icon;
          return (
            <div
              key={step.id}
              className={`flex min-w-[140px] items-center gap-3 rounded-xl px-3 py-3 md:min-w-0 ${
                active ? 'ring-1 ring-emerald-200/60' : ''
              }`}
              style={active ? { backgroundColor: MINT_BG } : { backgroundColor: 'transparent' }}
            >
              <Icon
                className="h-5 w-5 shrink-0"
                style={{ color: active ? MINT_ICON : complete ? '#9ca3af' : '#d1d5db' }}
              />
              <span
                className={`text-sm font-medium ${
                  active ? 'text-gray-900' : complete ? 'text-gray-400' : 'text-gray-300'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
