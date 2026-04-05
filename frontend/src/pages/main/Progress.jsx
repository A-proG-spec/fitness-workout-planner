import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import LineChart from '../../components/charts/LineChart';
import BarChart from '../../components/charts/BarChart';
import {
  GridIcon,
  WorkoutIcon,
  ChartIcon,
  UsersIcon,
  HelpIcon,
  LogoutIcon,
} from '../../components/icons';

const sidebarPrimaryLinks = [
  { label: 'Dashboard', active: false, icon: GridIcon, to: '/dashboard' },
  { label: 'Workouts', active: false, icon: WorkoutIcon, to: '/exercises' },
  { label: 'Progress', active: true, icon: ChartIcon, to: '/progress' },
  { label: 'Community', active: false, icon: UsersIcon, to: '/community' },
];

const sidebarSecondaryLinks = [
  { label: 'Support', icon: HelpIcon, to: '#' },
  { label: 'Sign Out', icon: LogoutIcon, to: '/login' },
];

const navLinks = [
  { label: 'Dashboard', to: '/dashboard', active: false },
  { label: 'Workouts', to: '/exercises', active: false },
  { label: 'Progress', to: '/progress', active: true },
  { label: 'Community', to: '/community', active: false },
];

const recentPRs = [
  { name: 'Deadlift', subtitle: 'Max effort volume', value: '315 LBS', icon: '🏋️', color: 'bg-emerald-50 text-emerald-600' },
  { name: '5K Run', subtitle: 'Pace improvement', value: '22:15', icon: '🏃', color: 'bg-blue-50 text-blue-600' },
  { name: 'VO2 Max', subtitle: 'Calculated aerobic', value: '52.4', icon: '🫁', color: 'bg-emerald-50 text-emerald-600' },
];

export default function Progress() {
  const [timeRange, setTimeRange] = useState('6months');

  return (
    <div className="min-h-screen bg-[#f5f7f8] text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[240px_minmax(0,1fr)]">
        <Sidebar primaryLinks={sidebarPrimaryLinks} secondaryLinks={sidebarSecondaryLinks} />

        <div className="flex min-w-0 flex-col">
          <Navbar navLinks={navLinks} userInitials="AJ" searchPlaceholder="Search analytics..." />

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl space-y-6">
              
              {/* Top Stats Row */}
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-[1fr_280px_320px]">
                {/* Goal Progress */}
                <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
                  <div className="mb-5 flex items-start justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">Goal Progress</h2>
                      <p className="text-xs text-slate-500 mt-0.5">Weekly transformation goal</p>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                      Metric Pulse: +12%
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col items-center">
                      <div className="relative h-32 w-32">
                        <svg className="h-full w-full -rotate-90 transform">
                          <circle cx="64" cy="64" r="56" stroke="#e2e8f0" strokeWidth="12" fill="none" />
                          <circle
                            cx="64" cy="64" r="56"
                            stroke="#10b981"
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 56}`}
                            strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.7)}`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-bold text-slate-900">70%</span>
                          <span className="text-xs text-slate-400 uppercase tracking-wider">Activity</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="relative h-32 w-32">
                        <svg className="h-full w-full -rotate-90 transform">
                          <circle cx="64" cy="64" r="56" stroke="#e2e8f0" strokeWidth="12" fill="none" />
                          <circle
                            cx="64" cy="64" r="56"
                            stroke="#64748b"
                            strokeWidth="12"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 56}`}
                            strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.6)}`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-bold text-slate-900">60%</span>
                          <span className="text-xs text-slate-400 uppercase tracking-wider">Diet</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Consistency */}
                <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Consistency</h3>
                  <div className="text-5xl font-bold text-slate-900 mb-2">14 <span className="text-lg text-slate-400">Days</span></div>
                  
                  <div className="flex gap-1.5 mb-4">
                    {[1,1,1,1,0,1,1].map((active, i) => (
                      <div key={i} className={`h-10 w-10 rounded-xl ${active ? 'bg-emerald-600' : 'bg-slate-200'}`} />
                    ))}
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    You're in the top 5% of athletes this month. Keep the streak alive!
                  </p>
                </section>

                {/* Weight Change */}
                <section className="rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 text-white shadow-lg">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-100 mb-4">Weight Change</h3>
                  <div className="text-5xl font-bold mb-1">-4.2 <span className="text-lg">lbs</span></div>
                  <p className="text-sm text-emerald-100 mb-6">Since Feb 1st</p>
                  
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold">
                    <span className="flex h-2 w-2 rounded-full bg-white" />
                    Target Reached
                  </div>
                </section>
              </div>

              {/* Weight & Lean Mass Evolution */}
              <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Weight & Lean Mass Evolution</h2>
                    <p className="text-sm text-slate-500 mt-1">Performance metrics for the last 6 months</p>
                  </div>
                  <div className="flex gap-2">
                    {['6 Months', '1 Year', 'All Time'].map((range) => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range.toLowerCase().replace(' ', ''))}
                        className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                          timeRange === range.toLowerCase().replace(' ', '')
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chart */}
                <div className="h-80">
                  <LineChart
                    data={{
                      labels: ['NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR'],
                      datasets: [
                        {
                          label: 'Weight (lbs)',
                          data: [190, 188, 186, 184, 183, 182.4],
                          borderColor: '#10b981',
                          backgroundColor: 'rgba(16, 185, 129, 0.1)',
                          borderWidth: 3,
                          tension: 0.4,
                          fill: true,
                          pointRadius: 4,
                          pointHoverRadius: 6,
                          pointBackgroundColor: '#10b981',
                          pointBorderColor: '#fff',
                          pointBorderWidth: 2,
                        },
                        {
                          label: 'Body Fat %',
                          data: [18, 17.5, 17, 16.5, 16, 14.2],
                          borderColor: '#cbd5e1',
                          backgroundColor: 'transparent',
                          borderWidth: 2,
                          borderDash: [8, 4],
                          tension: 0.4,
                          pointRadius: 3,
                          pointHoverRadius: 5,
                          pointBackgroundColor: '#cbd5e1',
                          pointBorderColor: '#fff',
                          pointBorderWidth: 2,
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        legend: {
                          display: true,
                          position: 'bottom',
                          labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                              size: 12,
                            },
                          },
                        },
                      },
                    }}
                  />
                </div>

                {/* Add entry button */}
                <button
                  type="button"
                  className="absolute bottom-10 right-10 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 transition-colors"
                  aria-label="Add entry"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </section>

              {/* Bottom Row */}
              <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
                {/* Workout Frequency */}
                <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Workout Frequency</h2>
                  
                  <div className="h-64">
                    <BarChart
                      data={{
                        labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'],
                        datasets: [
                          {
                            label: 'Workouts',
                            data: [3, 4, 5, 2, 4, 6, 3, 5, 4, 6, 3, 4],
                            backgroundColor: '#10b981',
                            borderRadius: 8,
                            barThickness: 24,
                          },
                        ],
                      }}
                    />
                  </div>
                </section>

                {/* Recent PRs */}
                <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
                  <h2 className="text-xl font-bold text-slate-900 mb-5">Recent PRs</h2>
                  
                  <div className="space-y-3 mb-5">
                    {recentPRs.map((pr) => (
                      <div key={pr.name} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg ${pr.color}`}>
                          {pr.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900">{pr.name}</p>
                          <p className="text-xs text-slate-500">{pr.subtitle}</p>
                        </div>
                        <span className="rounded-lg bg-emerald-100 px-2.5 py-1 text-sm font-bold text-emerald-700">
                          {pr.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="w-full rounded-xl border-2 border-slate-200 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                  >
                    View History
                  </button>
                </section>
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
