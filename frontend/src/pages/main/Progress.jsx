import { useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import EquilibriumShell from '../../components/equilibrium/EquilibriumShell.jsx';

const GREEN = '#006D44';
const GREEN_DARK = '#0d4a3a';
const GREEN_MINT = '#5eead4';
const TRACK = '#e5e7eb';
const TRACK_BLUE = '#cbd5e1';

const EVOLUTION_6M = [
  { month: 'NOV', tip: 'NOV 8, 2023', weight: 176.2, lean: 141.5, bodyFat: 16.4 },
  { month: 'DEC', tip: 'DEC 10, 2023', weight: 177.8, lean: 142.8, bodyFat: 15.9 },
  { month: 'JAN', tip: 'JAN 14, 2024', weight: 179.1, lean: 144.2, bodyFat: 15.5 },
  { month: 'FEB', tip: 'FEB 11, 2024', weight: 180.4, lean: 145.6, bodyFat: 15.1 },
  { month: 'MAR', tip: 'MAR 9, 2024', weight: 181.6, lean: 147.0, bodyFat: 14.6 },
  { month: 'APR', tip: 'APR 12, 2024', weight: 182.4, lean: 148.2, bodyFat: 14.2 },
];

const EVOLUTION_1Y = [
  { month: 'MAY', tip: 'MAY 7, 2023', weight: 172.0, lean: 138.0, bodyFat: 17.2 },
  { month: 'JUN', tip: 'JUN 4, 2023', weight: 173.4, lean: 138.9, bodyFat: 17.0 },
  { month: 'JUL', tip: 'JUL 9, 2023', weight: 174.2, lean: 139.5, bodyFat: 16.8 },
  { month: 'AUG', tip: 'AUG 6, 2023', weight: 175.0, lean: 140.1, bodyFat: 16.6 },
  { month: 'SEP', tip: 'SEP 10, 2023', weight: 175.6, lean: 140.6, bodyFat: 16.5 },
  { month: 'OCT', tip: 'OCT 8, 2023', weight: 176.0, lean: 141.0, bodyFat: 16.45 },
  ...EVOLUTION_6M,
];

const EVOLUTION_ALL = [
  { month: 'JAN', tip: 'JAN 15, 2022', weight: 168.0, lean: 132.0, bodyFat: 18.5 },
  { month: 'APR', tip: 'APR 20, 2022', weight: 169.5, lean: 133.2, bodyFat: 18.1 },
  { month: 'JUL', tip: 'JUL 8, 2022', weight: 170.8, lean: 134.5, bodyFat: 17.8 },
  { month: 'OCT', tip: 'OCT 2, 2022', weight: 171.6, lean: 135.8, bodyFat: 17.5 },
  ...EVOLUTION_1Y,
];

const WEEK_FREQ = [
  { w: 'W1', sessions: 3 },
  { w: 'W2', sessions: 4 },
  { w: 'W3', sessions: 3 },
  { w: 'W4', sessions: 5 },
  { w: 'W5', sessions: 4 },
  { w: 'W6', sessions: 6 },
  { w: 'W7', sessions: 4 },
  { w: 'W8', sessions: 3 },
  { w: 'W9', sessions: 5 },
  { w: 'W10', sessions: 4 },
  { w: 'W11', sessions: 3 },
  { w: 'W12', sessions: 4 },
];

const SPARKLINE = [
  { i: 0, v: 186 },
  { i: 1, v: 185 },
  { i: 2, v: 184 },
  { i: 3, v: 183 },
  { i: 4, v: 182 },
  { i: 5, v: 181 },
  { i: 6, v: 180 },
  { i: 7, v: 179 },
];

function barColor(sessions, max) {
  const t = sessions / max;
  if (t >= 0.95) return GREEN_DARK;
  if (t >= 0.75) return GREEN;
  if (t >= 0.55) return '#0f766e';
  if (t >= 0.4) return '#14b8a6';
  return '#5eead4';
}

function DonutRing({ pct, caption, fill, track }) {
  const data = [
    { name: 'p', value: pct },
    { name: 'r', value: Math.max(0, 100 - pct) },
  ];
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[108px] w-[108px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={36}
              outerRadius={48}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              strokeWidth={0}
              isAnimationActive={false}
            >
              <Cell fill={fill} />
              <Cell fill={track} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-0.5">
          <span className="text-lg font-bold text-gray-900">{pct}%</span>
        </div>
      </div>
      <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-gray-500">{caption}</p>
    </div>
  );
}

function EvolutionTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload;
  if (!row) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2.5 text-xs shadow-xl">
      <p className="font-semibold text-white">{row.tip}</p>
      <p className="mt-1.5 text-white/90">
        Weight: <span className="font-semibold text-emerald-300">{row.weight} lbs</span>
      </p>
      <p className="text-white/80">
        Body fat: <span className="font-semibold text-white">{row.bodyFat}%</span>
      </p>
    </div>
  );
}

function IconDumbbell({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 9.75h15m-15 0a1.5 1.5 0 01-1.5-1.5v-3a1.5 1.5 0 011.5-1.5m0 6h15m-15 0a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5m0-6V6m0 12v-1.5m0 1.5a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5m15 0a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5m0-6V6m0 12v-1.5"
      />
    </svg>
  );
}

function IconStopwatch({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function IconRun({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6.75a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5zM18.75 18.75l-2.39-2.39a.75.75 0 00-.53-.22H14.25l-1.5-3M9 21l2.25-6 2.25 3M6 9.75h3l1.5 4.5"
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

function IconCheck({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function OverviewPanels({ range, setRange }) {
  const evolutionData = useMemo(() => {
    if (range === '1y') return EVOLUTION_1Y;
    if (range === 'all') return EVOLUTION_ALL;
    return EVOLUTION_6M;
  }, [range]);

  const maxSessions = Math.max(...WEEK_FREQ.map((d) => d.sessions));

  const streakPattern = [1, 1, 1, 1, 1, 0, 0];

  return (
    <>
      <div className="mb-8 grid gap-4 lg:grid-cols-12">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:col-span-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-gray-900">Goal Progress</h2>
              <p className="mt-0.5 text-sm text-gray-500">Weekly transformation goal</p>
            </div>
            <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#006D44]">
              ⚡ Metric Pulse: +12%
            </span>
          </div>
          <div className="mt-6 flex justify-around gap-4">
            <DonutRing pct={70} caption="Activity" fill={GREEN} track={TRACK} />
            <DonutRing pct={60} caption="Diet" fill="#94a3b8" track={TRACK_BLUE} />
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:col-span-4">
          <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400">Consistency</h2>
          <p className="mt-2 text-3xl font-bold text-gray-900">14 Days</p>
          <div className="mt-4 flex justify-between gap-1">
            {streakPattern.map((on, i) => (
              <div
                key={i}
                className={`h-9 flex-1 rounded-full ${on ? 'shadow-sm' : ''}`}
                style={{ backgroundColor: on ? GREEN_DARK : GREEN_MINT }}
                title={on ? 'Workout logged' : 'Rest / light'}
              />
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            You&apos;re in the top 5% of athletes this month. Keep the streak alive!
          </p>
        </div>

        <div
          className="relative overflow-hidden rounded-2xl p-5 text-white shadow-sm lg:col-span-4"
          style={{ backgroundColor: GREEN_DARK }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SPARKLINE} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="wspark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fff" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#fff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#ffffff55" strokeWidth={1.5} fill="url(#wspark)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="relative">
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-white/70">Weight change</h2>
            <p className="mt-2 text-3xl font-bold">-4.2 lbs</p>
            <p className="mt-1 text-sm text-white/75">Since Feb 1st</p>
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#0d4a3a] shadow-sm">
              <IconCheck className="h-3.5 w-3.5 text-[#006D44]" />
              Target reached
            </div>
          </div>
        </div>
      </div>

      <div className="relative mb-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Weight &amp; Lean Mass Evolution</h2>
            <p className="mt-1 text-sm text-gray-500">Performance metrics for the last 6 months</p>
          </div>
          <div className="inline-flex rounded-full border border-gray-200 bg-gray-50 p-1">
            {[
              { id: '6m', label: '6 Months' },
              { id: '1y', label: '1 Year' },
              { id: 'all', label: 'All Time' },
            ].map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setRange(id)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors sm:px-4 sm:text-sm ${
                  range === id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[280px] w-full sm:h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={evolutionData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} dy={8} />
              <YAxis
                tick={{ fill: '#9ca3af', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                domain={['dataMin - 4', 'dataMax + 4']}
                width={44}
              />
              <Tooltip content={<EvolutionTooltip />} />
              <Line
                type="monotone"
                dataKey="weight"
                name="Weight"
                stroke={GREEN}
                strokeWidth={2.5}
                dot={{ fill: GREEN, r: 3 }}
                activeDot={{ r: 5 }}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="lean"
                name="Lean mass"
                stroke="#475569"
                strokeWidth={2}
                strokeDasharray="6 4"
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-6 text-xs text-gray-500">
          <span className="flex items-center gap-2">
            <span className="h-0.5 w-6 rounded-full" style={{ backgroundColor: GREEN }} />
            Weight (lbs)
          </span>
          <span className="flex items-center gap-2">
            <span className="h-0.5 w-6 rounded-full border border-dashed border-gray-500 bg-transparent" />
            Lean mass (lbs)
          </span>
        </div>

        <button
          type="button"
          className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105"
          style={{ backgroundColor: GREEN }}
          aria-label="Log measurement"
        >
          <IconPlus className="h-5 w-5" />
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:p-6">
          <h2 className="text-lg font-bold text-gray-900">Workout Frequency</h2>
          <p className="mt-1 text-sm text-gray-500">Sessions per week over the last 12 weeks</p>
          <div className="mt-6 h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEK_FREQ} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis dataKey="w" tick={{ fill: '#9ca3af', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide domain={[0, 8]} />
                <Bar dataKey="sessions" radius={[6, 6, 0, 0]} maxBarSize={28} isAnimationActive={false}>
                  {WEEK_FREQ.map((entry) => (
                    <Cell key={entry.w} fill={barColor(entry.sessions, maxSessions)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:p-6">
          <h2 className="text-lg font-bold text-gray-900">Recent PRs</h2>
          <p className="mt-1 text-sm text-gray-500">Personal records from your training log</p>
          <ul className="mt-5 space-y-4">
            <li className="flex items-center gap-3 border-b border-gray-50 pb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50 text-gray-600">
                <IconDumbbell className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-900">Deadlift</p>
                <p className="text-xs text-gray-500">Max effort volume</p>
              </div>
              <span className="shrink-0 rounded-lg px-2.5 py-1 text-xs font-bold" style={{ backgroundColor: `${GREEN}18`, color: GREEN_DARK }}>
                315 LBS
              </span>
            </li>
            <li className="flex items-center gap-3 border-b border-gray-50 pb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50 text-gray-600">
                <IconStopwatch className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-900">5K Run</p>
                <p className="text-xs text-gray-500">Pace improvement</p>
              </div>
              <span className="shrink-0 rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-700">22:15</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50 text-gray-600">
                <IconRun className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-900">VO₂ Max</p>
                <p className="text-xs text-gray-500">Calculated aerobic</p>
              </div>
              <span className="shrink-0 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800">52.4</span>
            </li>
          </ul>
          <button
            type="button"
            className="mt-6 w-full rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            View history
          </button>
        </div>
      </div>
    </>
  );
}

function BodyMetricsPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {[
        { title: 'Body fat %', value: '14.2%', sub: 'DEXA estimate · Apr 2024' },
        { title: 'Waist', value: '32 in', sub: 'Trend: -0.5 in vs Jan' },
        { title: 'Resting HR', value: '58 bpm', sub: '7-day average' },
        { title: 'Sleep score', value: '82', sub: 'Linked wearable (demo)' },
      ].map((c) => (
        <div key={c.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">{c.title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{c.value}</p>
          <p className="mt-2 text-sm text-gray-400">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}

function LiftTrackingPanel() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900">Lift tracking</h2>
      <p className="mt-1 text-sm text-gray-500">Log compound lifts and see e1RM trends — wiring to your workouts is next.</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {['Squat', 'Bench', 'Deadlift'].map((lift) => (
          <div key={lift} className="rounded-xl border border-dashed border-gray-200 bg-gray-50/80 px-4 py-8 text-center">
            <p className="text-sm font-semibold text-gray-700">{lift}</p>
            <p className="mt-1 text-xs text-gray-400">No entries yet</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Progress() {
  const [tab, setTab] = useState('overview');
  const [range, setRange] = useState('6m');

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'metrics', label: 'Body Metrics' },
    { id: 'lifts', label: 'Lift Tracking' },
  ];

  return (
    <EquilibriumShell searchPlaceholder="Search analytics…">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-[2rem]">Progress</h1>

        <div className="mt-6 border-b border-gray-200">
          <nav className="-mb-px flex gap-8 overflow-x-auto" aria-label="Progress sections">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`whitespace-nowrap border-b-2 pb-3 text-sm font-semibold transition-colors ${
                  tab === t.id ? 'border-[#006D44] text-[#0d4a3a]' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8">
          {tab === 'overview' && <OverviewPanels range={range} setRange={setRange} />}
          {tab === 'metrics' && <BodyMetricsPanel />}
          {tab === 'lifts' && <LiftTrackingPanel />}
        </div>
      </div>
    </EquilibriumShell>
  );
}
