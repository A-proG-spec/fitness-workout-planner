import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useAuth } from '../../hooks/useAuth';
import EquilibriumShell from '../../components/equilibrium/EquilibriumShell.jsx';
import { calcBmi, bmiCategory, onboardingStorage } from '../../utils/fitness';

const GREEN = '#0d4a3a';

const GOAL_COPY = {
  lose: { title: 'Lose weight', sub: 'Calorie deficit & cardio emphasis', emoji: '🔥' },
  gain: { title: 'Gain muscle', sub: 'Strength-focused training & fuel', emoji: '💪' },
  maintain: { title: 'Stay fit', sub: 'Balance & mobility', emoji: '⚖️' },
};

function IconUser({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.118a7.5 7.5 0 0115 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );
}

function IconBook({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v15.128A9 9 0 009 18c0 1.857.627 3.568 1.68 4.938M12 6.042a8.967 8.967 0 014.5 2.292v15.128A9 9 0 0018 18a9 9 0 00-6-2.25" />
    </svg>
  );
}

function IconChart({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75z" />
    </svg>
  );
}

function IconCalendar({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5" />
    </svg>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'Athlete';

  const onboard = useMemo(() => onboardingStorage.load(), []);
  const goalKey = onboard.goal && GOAL_COPY[onboard.goal] ? onboard.goal : 'maintain';
  const goal = GOAL_COPY[goalKey];

  const bmi = onboard.height && onboard.weight ? calcBmi(onboard.weight, onboard.height) : null;
  const bmiBand = bmi != null ? bmiCategory(bmi) : null;

  const hasProfile = onboard.age > 0 && onboard.height > 0 && onboard.weight > 0;
  const setupDone = onboard.complete && hasProfile;

  return (
    <EquilibriumShell>
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Welcome back, {firstName}
          </h1>
          <p className="mt-2 max-w-2xl text-gray-500">
            {setupDone
              ? 'Here’s your training snapshot. Pick up where you left off or explore your library.'
              : 'Finish a quick setup so we can personalize your plan, or jump in and explore.'}
          </p>
        </header>

        {!setupDone && (
          <div
            className="mb-8 flex flex-col gap-4 rounded-2xl border border-amber-200 bg-amber-50/80 p-5 sm:flex-row sm:items-center sm:justify-between"
            role="status"
          >
            <div>
              <p className="font-semibold text-amber-900">Complete your profile</p>
              <p className="mt-1 text-sm text-amber-800/90">
                Add body metrics and a goal so calorie and workout hints match you.
              </p>
            </div>
            <Link
              to="/onboarding/1"
              className="inline-flex shrink-0 items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm"
              style={{ backgroundColor: GREEN }}
            >
              Continue setup
            </Link>
          </div>
        )}

        {/* Stats */}
        <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Body weight</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              {hasProfile ? `${onboard.weight} kg` : '—'}
            </p>
            <p className="mt-1 text-xs text-gray-500">From onboarding</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">BMI</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{bmi ?? '—'}</p>
            {bmiBand && (
              <span className={`mt-2 inline-block rounded-full border px-2 py-0.5 text-xs font-semibold ${bmiBand.color}`}>
                {bmiBand.label}
              </span>
            )}
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Primary goal</p>
            <p className="mt-2 flex items-center gap-2 text-lg font-bold text-gray-900">
              <span aria-hidden>{goal.emoji}</span>
              {goal.title}
            </p>
            <p className="mt-1 text-xs text-gray-500">{goal.sub}</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Height</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{hasProfile ? `${onboard.height} cm` : '—'}</p>
            <p className="mt-1 text-xs text-gray-500">Age {hasProfile ? onboard.age : '—'}</p>
          </div>
        </section>

        {/* Quick actions */}
        <section>
          <h2 className="mb-4 text-lg font-bold text-gray-900">What&apos;s next</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              to="/exercises"
              className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-[#0d4a3a]">
                <IconBook className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">Exercise library</h3>
              <p className="mt-1 text-sm text-gray-500">Browse movements and build sessions.</p>
              <span className="mt-3 text-sm font-semibold text-[#0d4a3a] group-hover:underline">Open →</span>
            </Link>

            <Link
              to="/workout-planner"
              className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-[#0d4a3a]">
                <IconCalendar className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">Workout planner</h3>
              <p className="mt-1 text-sm text-gray-500">Schedule and organize your week.</p>
              <span className="mt-3 text-sm font-semibold text-[#0d4a3a] group-hover:underline">Open →</span>
            </Link>

            <Link
              to="/progress"
              className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-[#0d4a3a]">
                <IconChart className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">Progress</h3>
              <p className="mt-1 text-sm text-gray-500">Track trends and milestones.</p>
              <span className="mt-3 text-sm font-semibold text-[#0d4a3a] group-hover:underline">Open →</span>
            </Link>

            <Link
              to="/profile"
              className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-[#0d4a3a]">
                <IconUser className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">Profile</h3>
              <p className="mt-1 text-sm text-gray-500">Update metrics and preferences.</p>
              <span className="mt-3 text-sm font-semibold text-[#0d4a3a] group-hover:underline">Open →</span>
            </Link>
          </div>
        </section>
      </div>
    </EquilibriumShell>
  );
}
