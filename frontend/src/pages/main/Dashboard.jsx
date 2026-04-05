import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import BarChart from '../../components/charts/BarChart';
import {
  GridIcon,
  WorkoutIcon,
  ChartIcon,
  UsersIcon,
  HelpIcon,
  LogoutIcon,
  ArrowRightIcon,
} from '../../components/icons';

const sidebarPrimaryLinks = [
  { label: 'Dashboard', active: true, icon: GridIcon, to: '/dashboard' },
  { label: 'Workouts', active: false, icon: WorkoutIcon, to: '/exercises' },
  { label: 'Progress', active: false, icon: ChartIcon, to: '/progress' },
  { label: 'Community', active: false, icon: UsersIcon, to: '/community' },
];

const sidebarSecondaryLinks = [
  { label: 'Support', icon: HelpIcon, to: '#' },
  { label: 'Sign Out', icon: LogoutIcon, to: '/login' },
];

const navLinks = [
  { label: 'Dashboard', to: '/dashboard', active: true },
  { label: 'Workouts', to: '/exercises', active: false },
  { label: 'Progress', to: '/progress', active: false },
  { label: 'Community', to: '/community', active: false },
];

const todayWorkouts = [
  { name: 'Upper Body Strength', time: '9:00 AM', duration: '45 min', type: 'Strength', completed: false },
  { name: 'Core Stability', time: '2:00 PM', duration: '20 min', type: 'Core', completed: false },
];

const recentActivity = [
  { name: 'Full Body HIIT', date: 'Yesterday', duration: '35 min', calories: 420 },
  { name: 'Yoga Flow', date: '2 days ago', duration: '30 min', calories: 180 },
  { name: 'Leg Day', date: '3 days ago', duration: '50 min', calories: 380 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f5f7f8] text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[240px_minmax(0,1fr)]">
        <Sidebar primaryLinks={sidebarPrimaryLinks} secondaryLinks={sidebarSecondaryLinks} />

        <div className="flex min-w-0 flex-col">
          <Navbar navLinks={navLinks} userInitials="AJ" searchPlaceholder="Search workouts..." />

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl space-y-6">
              
              {/* Welcome Header */}
              <section>
                <h1 className="text-3xl font-bold text-slate-900">Welcome back, AJ! 👋</h1>
                <p className="mt-1 text-sm text-slate-500">
                  You've completed 12 workouts this month. Keep up the momentum!
                </p>
              </section>

              {/* Quick Stats */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                  label="Workouts This Week"
                  value="5"
                  change="+2 from last week"
                  positive
                />
                <StatCard
                  label="Total Calories Burned"
                  value="2,840"
                  change="This week"
                />
                <StatCard
                  label="Current Streak"
                  value="14 days"
                  change="Personal best!"
                  positive
                />
                <StatCard
                  label="Avg Workout Time"
                  value="42 min"
                  change="+5 min from last week"
                  positive
                />
              </div>

              {/* Main Content Grid */}
              <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
                
                {/* Left Column */}
                <div className="space-y-5">
                  
                  {/* Today's Workouts */}
                  <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
                    <div className="mb-5 flex items-center justify-between">
                      <h2 className="text-xl font-bold text-slate-900">Today's Workouts</h2>
                      <Link to="/exercises" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                        View All
                      </Link>
                    </div>

                    {todayWorkouts.length > 0 ? (
                      <div className="space-y-3">
                        {todayWorkouts.map((workout, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-4 rounded-2xl border-2 border-slate-100 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/50"
                          >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-slate-900">{workout.name}</h3>
                              <p className="text-sm text-slate-500">
                                {workout.time} · {workout.duration} · {workout.type}
                              </p>
                            </div>
                            <button
                              type="button"
                              className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
                            >
                              Start
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center">
                        <p className="text-sm text-slate-500">No workouts scheduled for today</p>
                        <Link
                          to="/exercises"
                          className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                        >
                          Browse Exercises
                          <ArrowRightIcon className="h-4 w-4" />
                        </Link>
                      </div>
                    )}
                  </section>

                  {/* Weekly Activity Chart */}
                  <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Weekly Activity</h2>
                    
                    <div className="h-48">
                      <BarChart
                        data={{
                          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                          datasets: [
                            {
                              label: 'Activity %',
                              data: [85, 92, 78, 95, 88, 70, 60],
                              backgroundColor: (context) => {
                                const index = context.dataIndex;
                                return index === 4 ? '#10b981' : '#e2e8f0';
                              },
                              borderRadius: 8,
                              barThickness: 32,
                            },
                          ],
                        }}
                        options={{
                          scales: {
                            y: {
                              beginAtZero: true,
                              max: 100,
                            },
                          },
                        }}
                      />
                    </div>
                  </section>

                  {/* Recent Activity */}
                  <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
                    <h2 className="text-xl font-bold text-slate-900 mb-5">Recent Activity</h2>
                    
                    <div className="space-y-3">
                      {recentActivity.map((activity, i) => (
                        <div key={i} className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl">
                            ✓
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-slate-900">{activity.name}</h3>
                            <p className="text-sm text-slate-500">
                              {activity.date} · {activity.duration}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-emerald-600">{activity.calories}</p>
                            <p className="text-xs text-slate-400">kcal</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                </div>

                {/* Right Column */}
                <div className="space-y-5">
                  
                  {/* Quick Actions */}
                  <section className="rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 text-white shadow-lg">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-100 mb-4">
                      Quick Start
                    </h3>
                    <h2 className="text-2xl font-bold mb-2">Ready to train?</h2>
                    <p className="text-sm text-emerald-100 mb-6">
                      Start a workout or log your progress
                    </p>
                    
                    <div className="space-y-2">
                      <Link
                        to="/exercises"
                        className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                      >
                        <span>Browse Workouts</span>
                        <ArrowRightIcon className="h-4 w-4" />
                      </Link>
                      <Link
                        to="/progress"
                        className="flex items-center justify-between rounded-xl bg-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/30"
                      >
                        <span>Log Progress</span>
                        <ArrowRightIcon className="h-4 w-4" />
                      </Link>
                    </div>
                  </section>

                  {/* Goals */}
                  <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
                    <h2 className="text-xl font-bold text-slate-900 mb-5">Your Goals</h2>
                    
                    <div className="space-y-4">
                      <GoalItem
                        label="Weekly Workouts"
                        current={5}
                        target={6}
                        unit="workouts"
                      />
                      <GoalItem
                        label="Weight Goal"
                        current={182.4}
                        target={175}
                        unit="lbs"
                      />
                      <GoalItem
                        label="Consistency Streak"
                        current={14}
                        target={30}
                        unit="days"
                      />
                    </div>
                  </section>

                  {/* Motivational Quote */}
                  <section className="rounded-3xl bg-slate-900 p-6 text-white">
                    <div className="mb-4 text-4xl">💪</div>
                    <p className="text-lg font-semibold leading-relaxed mb-3">
                      "The only bad workout is the one that didn't happen."
                    </p>
                    <p className="text-sm text-slate-400">— Unknown</p>
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

function StatCard({ label, value, change, positive }) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200/80">
      <div className="mb-3 flex items-center justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100">
          <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        {positive && (
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
            ↑
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</p>
      {change && (
        <p className={`mt-2 text-xs ${positive ? 'text-emerald-600' : 'text-slate-500'}`}>
          {change}
        </p>
      )}
    </div>
  );
}

function GoalItem({ label, current, target, unit }) {
  const percentage = Math.min((current / target) * 100, 100);
  
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-semibold text-slate-900">{label}</span>
        <span className="text-slate-500">
          {current} / {target} {unit}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-emerald-600 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
