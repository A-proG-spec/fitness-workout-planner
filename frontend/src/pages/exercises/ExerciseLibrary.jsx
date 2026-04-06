import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import ExerciseCard from '../../components/ExerciseCard';
import {
  GridIcon,
  WorkoutIcon,
  ChartIcon,
  UsersIcon,
  HelpIcon,
  LogoutIcon,
  ArrowRightIcon,
  LightningIcon,
} from '../../components/icons';
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
  { label: 'Progress', active: false, icon: ChartIcon, to: '/progress' },
  { label: 'Community', active: false, icon: UsersIcon, to: '/community' },
];

const sidebarSecondaryLinks = [
  { label: 'Support', icon: HelpIcon, to: '#' },
  { label: 'Sign Out', icon: LogoutIcon, to: '/login' },
];

const navLinks = [
  { label: 'Dashboard', to: '/dashboard', active: false },
  { label: 'Workouts', to: '/exercises', active: true },
  { label: 'Progress', to: '/progress', active: false },
  { label: 'Community', to: '/community', active: false },
];

export default function ExerciseLibrary() {
  return (
    <div className="min-h-screen bg-[#f5f7f8] text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[240px_minmax(0,1fr)]">
        <Sidebar primaryLinks={sidebarPrimaryLinks} secondaryLinks={sidebarSecondaryLinks} />

        <div className="flex min-w-0 flex-col">
          <Navbar navLinks={navLinks} userInitials="AJ" searchPlaceholder="Search movements..." />

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
          <ExerciseCard key={movement.name} exercise={movement} />
        ))}
      </div>
    </section>
  );
}
