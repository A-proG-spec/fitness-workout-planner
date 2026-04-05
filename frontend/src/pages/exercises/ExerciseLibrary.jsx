import { Link } from 'react-router-dom';
import {
  analysisCard,
  exerciseCategories,
  featuredExercise,
  spotlightCard,
  trendingMovements,
} from './exerciseLibraryData';

const sidebarPrimaryLinks = [
  { label: 'Dashboard', active: false, icon: GridIcon, to: '/dashboard' },
  { label: 'Workouts', active: true, icon: WorkoutIcon, to: '/exercises' },
  { label: 'Nutrition', active: false, icon: ForkIcon, to: '/workout-planner' },
  { label: 'Progress', active: false, icon: ChartIcon, to: '/progress' },
  { label: 'Community', active: false, icon: UsersIcon, to: '/profile' },
];

const sidebarSecondaryLinks = [
  { label: 'Support', icon: HelpIcon, to: '/profile' },
  { label: 'Sign Out', icon: LogoutIcon, to: '/login' },
];

export default function ExerciseLibrary() {
  return (
    <div className="min-h-screen bg-[#f5f7f8] text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[240px_minmax(0,1fr)]">
        <ExerciseSidebar />
        <div className="flex min-w-0 flex-col">
          <ExerciseTopbar />
          <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
              <ExerciseHeader />
              <FeatureSection />
              <TrendingSection />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function ExerciseSidebar() {
  return (
    <aside className="hidden border-r border-slate-200 bg-white px-5 py-6 lg:flex lg:flex-col">
      <div className="mb-8">
        <Link to="/" className="text-xl font-bold tracking-tight text-emerald-600">
          Equilibrium
        </Link>
      </div>

      <nav className="space-y-1.5">
        {sidebarPrimaryLinks.map((item) => {
          const IconComponent = item.icon;

          return (
            <Link
              key={item.label}
              to={item.to}
              className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold transition ${
                item.active
                  ? 'bg-emerald-50 text-emerald-700 shadow-[inset_3px_0_0_0_#10b981]'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <IconComponent className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-700 to-teal-500 p-4 text-white shadow-lg">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-100">
          Pro Plan
        </p>
        <h3 className="mt-3 text-base font-semibold">Unlock AI Form Coach & Pro Routines.</h3>
        <button
          type="button"
          className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold text-emerald-700"
        >
          Upgrade to Pro
        </button>
      </div>

      <div className="mt-auto space-y-1.5 pt-8">
        {sidebarSecondaryLinks.map((item) => {
          const IconComponent = item.icon;

          return (
            <Link
              key={item.label}
              to={item.to}
              className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
            >
              <IconComponent className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

function ExerciseTopbar() {
  return (
    <header className="border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4">
        <div className="hidden min-[900px]:flex items-center gap-8 text-sm font-medium text-slate-400">
          <Link to="/dashboard" className="transition hover:text-slate-900">
            Dashboard
          </Link>
          <Link to="/exercises" className="text-emerald-600">
            Workouts
          </Link>
          <Link to="/workout-planner" className="transition hover:text-slate-900">
            Nutrition
          </Link>
          <Link to="/profile" className="transition hover:text-slate-900">
            Community
          </Link>
        </div>

        <div className="ml-auto flex min-w-0 items-center gap-3">
          <label className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 shadow-sm sm:max-w-md">
            <SearchIcon className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search movements..."
              className="w-full min-w-0 bg-transparent text-sm text-slate-600 outline-none placeholder:text-slate-400"
            />
          </label>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm"
            aria-label="Notifications"
          >
            <BellIcon className="h-4 w-4" />
          </button>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm"
            aria-label="Settings"
          >
            <GearIcon className="h-4 w-4" />
          </button>

          <div className="grid h-10 w-10 place-items-center rounded-full bg-[radial-gradient(circle_at_top,_#fde68a,_#f97316_62%,_#7c2d12)] text-sm font-bold text-white shadow-sm">
            AJ
          </div>
        </div>
      </div>
    </header>
  );
}

function ExerciseHeader() {
  return (
    <section className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Exercise Library
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          Curated movements designed for optimal biomechanics and peak performance.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {exerciseCategories.map((category, index) => (
          <button
            key={category}
            type="button"
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              index === 0
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100'
                : 'bg-white text-slate-500 ring-1 ring-slate-200 hover:text-slate-900'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}

function FeatureSection() {
  return (
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1.75fr)_320px]">
      <article className="relative overflow-hidden rounded-[32px] bg-slate-950 px-6 py-6 shadow-[0_26px_50px_rgba(15,23,42,0.18)] sm:px-8 sm:py-8">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-75"
          style={{ backgroundImage: `url(${featuredExercise.image})` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(2,6,23,0.92),rgba(15,23,42,0.62),rgba(15,23,42,0.18))]" />

        <div className="relative flex min-h-[340px] flex-col justify-end">
          <span className="mb-4 inline-flex w-fit rounded-full bg-emerald-400 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.26em] text-emerald-950">
            {featuredExercise.eyebrow}
          </span>
          <h2 className="max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {featuredExercise.title}
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-slate-200 sm:text-base">
            {featuredExercise.description}
          </p>
          <button
            type="button"
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:translate-x-0.5"
          >
            <span>{featuredExercise.cta}</span>
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </article>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
        <SpotlightCard />
        <AnalysisCard />
      </div>
    </section>
  );
}

function SpotlightCard() {
  return (
    <article className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(160deg,#dfe7ff,#c3d3ff_48%,#d9ecff)] p-6 shadow-sm">
      <div className="absolute right-0 top-0 h-24 w-24 -translate-y-3 translate-x-3 rounded-full bg-white/40 blur-2xl" />
      <div className="relative">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/70 text-emerald-500">
          <LightningIcon className="h-5 w-5" />
        </div>
        <h3 className="max-w-[14rem] text-2xl font-semibold leading-tight text-slate-800">
          {spotlightCard.title}
        </h3>
        <p className="mt-3 max-w-[16rem] text-sm leading-6 text-slate-500">
          {spotlightCard.description}
        </p>
        <button type="button" className="mt-5 text-sm font-semibold text-slate-900">
          {spotlightCard.action}
        </button>
      </div>
    </article>
  );
}

function AnalysisCard() {
  return (
    <article className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
      <h3 className="text-2xl font-semibold text-slate-900">{analysisCard.title}</h3>
      <p className="mt-3 max-w-[16rem] text-sm leading-6 text-slate-500">
        {analysisCard.description}
      </p>

      <div className="mt-8 flex items-center gap-2">
        <div className="flex -space-x-2">
          {analysisCard.reviewers.map((reviewer) => (
            <div
              key={reviewer.name}
              className={`grid h-8 w-8 place-items-center rounded-full border-2 border-white text-[11px] font-semibold text-white ${reviewer.color}`}
            >
              {reviewer.name.slice(0, 1)}
            </div>
          ))}
        </div>
        <span className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
          Coaches Online
        </span>
      </div>
    </article>
  );
}

function TrendingSection() {
  return (
    <section className="pb-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Trending Movements</h2>
          <p className="mt-1 text-sm text-slate-500">
            Explore the most saved technique flows in your training circle.
          </p>
        </div>
        <button type="button" className="text-sm font-semibold text-emerald-600">
          View all
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 2xl:grid-cols-4">
        {trendingMovements.map((movement) => (
          <MovementCard key={movement.name} movement={movement} />
        ))}
      </div>
    </section>
  );
}

function MovementCard({ movement }) {
  return (
    <article className="overflow-hidden rounded-[26px] bg-white shadow-sm ring-1 ring-slate-200/80 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-56 overflow-hidden">
        <img src={movement.image} alt={movement.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.05),rgba(15,23,42,0.32))]" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-700">
          {movement.category}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-slate-900">{movement.name}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">{movement.description}</p>

        <div className="mt-4 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          <span>{movement.duration}</span>
          <span className="text-emerald-600">{movement.level}</span>
        </div>
      </div>
    </article>
  );
}

function IconBase({ children, className = 'h-5 w-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function GridIcon({ className }) {
  return (
    <IconBase className={className}>
      <rect x="4" y="4" width="6" height="6" rx="1.2" />
      <rect x="14" y="4" width="6" height="6" rx="1.2" />
      <rect x="4" y="14" width="6" height="6" rx="1.2" />
      <rect x="14" y="14" width="6" height="6" rx="1.2" />
    </IconBase>
  );
}

function WorkoutIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M4 10v4" />
      <path d="M20 10v4" />
      <path d="M7 7v10" />
      <path d="M17 7v10" />
      <path d="M7 12h10" />
    </IconBase>
  );
}

function ForkIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M8 4v16" />
      <path d="M6 4v5a2 2 0 0 0 4 0V4" />
      <path d="M16 4v16" />
      <path d="M16 10c2 0 4-2.2 4-6" />
    </IconBase>
  );
}

function ChartIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M5 18V9" />
      <path d="M12 18V5" />
      <path d="M19 18v-7" />
    </IconBase>
  );
}

function UsersIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="9.5" cy="7" r="3" />
      <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 4.13a4 4 0 0 1 0 7.75" />
    </IconBase>
  );
}

function HelpIcon({ className }) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.1 9a3 3 0 1 1 5.8 1c0 2-3 2-3 4" />
      <path d="M12 17h.01" />
    </IconBase>
  );
}

function LogoutIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </IconBase>
  );
}

function SearchIcon({ className }) {
  return (
    <IconBase className={className}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-3.5-3.5" />
    </IconBase>
  );
}

function BellIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M15 17H5.5a1 1 0 0 1-.8-1.6l1.3-1.7V10a6 6 0 1 1 12 0v3.7l1.3 1.7a1 1 0 0 1-.8 1.6H15" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </IconBase>
  );
}

function GearIcon({ className }) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 1 1-4 0v-.2a1 1 0 0 0-.7-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 1 1 0-4h.2a1 1 0 0 0 .9-.7 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2H9a1 1 0 0 0 .6-.9V4a2 2 0 1 1 4 0v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1v.1a1 1 0 0 0 .9.6H20a2 2 0 1 1 0 4h-.2a1 1 0 0 0-.9.6Z" />
    </IconBase>
  );
}

function ArrowRightIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </IconBase>
  );
}

function LightningIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M13 2 5 14h5l-1 8 8-12h-5l1-8Z" />
    </IconBase>
  );
}
