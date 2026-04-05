import { useMemo, useState } from 'react';
import EquilibriumShell from '../../components/equilibrium/EquilibriumShell.jsx';

const GREEN = '#006D44';
const GREEN_DARK = '#0d4a3a';

function startOfWeekMonday(ref = new Date()) {
  const d = new Date(ref);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

/** e.g. "Mon" + "12 Oct" */
function fmtWeekdayShort(d) {
  return d.toLocaleDateString('en-US', { weekday: 'short' });
}

function fmtDayMonth(d) {
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
}

/** Demo schedule keyed by weekday index 0=Mon … 6=Sun */
const DEMO_BY_DOW = {
  0: {
    type: 'completed',
    title: 'Power Lifting',
    meta: 'Strength · 45 min',
    foot: ['5 Sets', '80kg Avg'],
  },
  1: {
    type: 'upcoming',
    title: 'HIIT Cardio',
    meta: 'Endurance · 30 min',
    foot: ['12 Reps'],
  },
  2: { type: 'rest' },
  3: {
    type: 'upcoming',
    title: 'Upper Body',
    meta: 'Hypertrophy · 60 min',
    foot: ['4 Sets'],
  },
  4: {
    type: 'upcoming',
    title: 'Yoga Flow',
    meta: 'Mobility · 40 min',
    foot: [],
  },
  5: { type: 'empty' },
  6: { type: 'rest' },
};

function IconCheck({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function IconClock({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function IconBed({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12h19.5m0 0A2.251 2.251 0 0021.75 9.75v-1.5H2.25v1.5a2.251 2.251 0 002.25 2.25h15a2.251 2.251 0 002.25-2.25zM2.25 12v3.75A2.251 2.251 0 004.5 18h15a2.251 2.251 0 002.25-2.25V12M5.25 8.25h13.5a1.5 1.5 0 001.5-1.5v-3A1.5 1.5 0 0018.75 3H5.25a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5z"
      />
    </svg>
  );
}

function IconPlus({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

function IconPlusCheckFab() {
  return (
    <span className="relative flex h-6 w-6 items-center justify-center" aria-hidden>
      <IconPlus className="absolute h-4 w-4 text-white" />
      <svg
        className="absolute h-3 w-3 translate-x-1 translate-y-1 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

function DayCard({ date, demo }) {
  const dateLine = (
    <p className="text-[11px] font-medium text-gray-500">
      <span className="uppercase">{fmtWeekdayShort(date)}</span>{' '}
      <span className="text-gray-400">{fmtDayMonth(date)}</span>
    </p>
  );

  if (demo.type === 'rest') {
    return (
      <div className="flex h-[228px] w-[152px] shrink-0 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-3 text-center shadow-sm">
        <IconBed className="mb-3 h-9 w-9 text-gray-300" />
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400">Rest day</p>
      </div>
    );
  }

  if (demo.type === 'empty') {
    return (
      <button
        type="button"
        className="flex h-[228px] w-[152px] shrink-0 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-3 text-center shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-100/80"
      >
        <IconPlus className="mb-3 h-9 w-9 text-gray-300" />
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400">Plan workout</p>
      </button>
    );
  }

  if (demo.type === 'completed') {
    return (
      <div
        className="flex h-[228px] w-[164px] shrink-0 flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
        style={{ borderLeftWidth: 5, borderLeftColor: GREEN }}
      >
        <div className="flex w-fit items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#006D44]">
          <IconCheck className="h-3 w-3 shrink-0" />
          Completed
        </div>
        <div className="mt-3">{dateLine}</div>
        <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-snug text-gray-900">{demo.title}</h3>
        <p className="mt-1 text-xs text-gray-500">{demo.meta}</p>
        <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1 border-t border-gray-100 pt-3 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
          {demo.foot?.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[228px] w-[164px] shrink-0 flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex w-fit items-center gap-1 rounded-full bg-sky-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-sky-700">
        <IconClock className="h-3 w-3 shrink-0" />
        Upcoming
      </div>
      <div className="mt-3">{dateLine}</div>
      <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-snug text-gray-900">{demo.title}</h3>
      <p className="mt-1 text-xs text-gray-500">{demo.meta}</p>
      {demo.foot?.length > 0 && (
        <div className="mt-auto border-t border-gray-100 pt-3 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
          {demo.foot[0]}
        </div>
      )}
    </div>
  );
}

export default function WorkoutPlanner() {
  const [view, setView] = useState('weekly');

  const weekDays = useMemo(() => {
    const start = startOfWeekMonday();
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, []);

  return (
    <EquilibriumShell searchPlaceholder="Search exercises…">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-[2rem]">Workout Planner</h1>
            <p className="mt-2 text-sm text-gray-500 md:text-base">Manage your weekly routine and track your vitality.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-full border border-gray-200 bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setView('weekly')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  view === 'weekly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Weekly
              </button>
              <button
                type="button"
                onClick={() => setView('monthly')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  view === 'monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Monthly
              </button>
            </div>
            <button
              type="button"
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-95"
              style={{ backgroundColor: GREEN }}
            >
              + Add Workout
            </button>
          </div>
        </div>

        {view === 'weekly' ? (
          <section className="mb-10">
            <div className="-mx-1 flex gap-3 overflow-x-auto pb-4 pt-1 sm:gap-4">
              {weekDays.map((date, i) => (
                <DayCard key={date.toISOString()} date={date} demo={DEMO_BY_DOW[i]} />
              ))}
            </div>
          </section>
        ) : (
          <section className="mb-10 rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <p className="text-sm font-semibold text-gray-700">Monthly overview</p>
            <p className="mt-2 text-sm text-gray-400">Plan across weeks — coming soon.</p>
          </section>
        )}

        <section className="grid gap-5 lg:grid-cols-5 lg:items-stretch">
          <div className="flex flex-col rounded-2xl border border-gray-100 bg-gray-50/90 p-6 shadow-sm lg:col-span-3">
            <h2 className="text-lg font-bold text-gray-900">Weekly Intensity Pulse</h2>
            <p className="mt-1 text-sm text-gray-500">Your training load will appear here as you log sessions.</p>

            <div className="mt-6 flex min-h-[200px] flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white/60 px-4 py-10 text-center">
              <p className="max-w-xs text-sm text-gray-400">Chart preview — intensity trend by day loads when workout data is available.</p>
            </div>

            <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-gray-200/80 pt-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Total volume</p>
                <p className="mt-1 text-lg font-bold text-gray-900">12,450 kg</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Calories burnt</p>
                <p className="mt-1 text-lg font-bold text-gray-900">2,840 kcal</p>
              </div>
              <button type="button" className="text-sm font-semibold hover:underline" style={{ color: GREEN_DARK }}>
                Full Analysis →
              </button>
            </div>
          </div>

          <div className="relative flex min-h-[320px] flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-slate-800 to-slate-950 p-6 pb-16 text-white shadow-lg lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" aria-hidden />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-300/95">Expert tip</span>
            </div>
            <h3 className="mt-5 text-lg font-bold leading-snug">Optimize your leg recovery day.</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              Coach Sarah recommends adding 15 minutes of foam rolling and dynamic stretching to improve range of motion for
              Friday&apos;s Yoga.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-white ring-2 ring-white/10">
                SJ
              </div>
              <div>
                <p className="text-sm font-semibold">Sarah Jenkins</p>
                <p className="text-xs text-white/55">Elite Performance Coach</p>
              </div>
            </div>
            <button
              type="button"
              className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105"
              style={{ backgroundColor: GREEN }}
              aria-label="Add or save tip"
            >
              <IconPlusCheckFab />
            </button>
          </div>
        </section>
      </div>
    </EquilibriumShell>
  );
}
