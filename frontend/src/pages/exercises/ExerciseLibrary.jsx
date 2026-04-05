import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import EquilibriumShell from '../../components/equilibrium/EquilibriumShell.jsx';
import { fetchExercises } from '../../services/exerciseService.js';

const GREEN = '#0d4a3a';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'strength', label: 'Strength' },
  { id: 'cardio', label: 'Cardio' },
  { id: 'flexibility', label: 'Flexibility' },
];

/** Fallback grid when API empty or unreachable */
const MOCK_EXERCISES = [
  { _id: 'mock-kb', name: 'Kettlebell Swing', description: 'Full-body power and conditioning with hip drive.', category: 'strength', difficulty: 'advanced', durationMin: 15 },
  { _id: 'mock-hiit', name: 'HIIT Sprints', description: 'Short bursts to spike heart rate and metabolism.', category: 'cardio', difficulty: 'advanced', durationMin: 20, difficultyLabel: 'Elite' },
  { _id: 'mock-vin', name: 'Vinyasa Flow', description: 'Breath-linked movement for mobility and calm.', category: 'flexibility', difficulty: 'beginner', durationMin: 45 },
  { _id: 'mock-pull', name: 'Wide Grip Pull-up', description: 'Vertical pull pattern for lats and upper back.', category: 'strength', difficulty: 'intermediate', durationMin: 12 },
  { _id: 'mock-plyo', name: 'Plyo Box Jumps', description: 'Explosive lower-body work for athletic power.', category: 'cardio', difficulty: 'advanced', durationMin: 15 },
  { _id: 'mock-squat', name: 'Barbell Back Squat', description: 'Foundational compound strength for legs and core.', category: 'strength', difficulty: 'intermediate', durationMin: 25 },
  { _id: 'mock-pigeon', name: 'Pigeon Pose', description: 'Deep hip opener for runners and desk athletes.', category: 'flexibility', difficulty: 'beginner', durationMin: 10 },
  { _id: 'mock-plank', name: 'Forearm Plank', description: 'Anti-extension core stability you can do anywhere.', category: 'strength', difficulty: 'beginner', durationMin: 8 },
];

function categoryStyles(cat) {
  switch (cat) {
    case 'cardio':
      return 'bg-sky-100 text-sky-800';
    case 'flexibility':
      return 'bg-emerald-100 text-emerald-800';
    case 'balance':
      return 'bg-violet-100 text-violet-800';
    default:
      return 'bg-rose-100 text-rose-800';
  }
}

function formatDifficulty(ex) {
  if (ex.difficultyLabel) return String(ex.difficultyLabel).toUpperCase();
  const d = (ex.difficulty || 'intermediate').toLowerCase();
  if (d === 'beginner') return 'BEGINNER';
  if (d === 'advanced') return 'ADVANCED';
  return 'INTERMEDIATE';
}

function exerciseImage(ex) {
  if (ex.imageUrl) return ex.imageUrl;
  const seed = encodeURIComponent(ex.name || ex._id || 'ex');
  return `https://picsum.photos/seed/${seed}/640/400`;
}

function durationLabel(ex) {
  if (ex.durationMin) return `${ex.durationMin} MIN`;
  if (ex.defaultDurationSeconds) return `${Math.max(1, Math.round(ex.defaultDurationSeconds / 60))} MIN`;
  const sets = ex.defaultSets ?? 3;
  return `${Math.min(45, sets * 5)} MIN`;
}

function IconClock({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function IconChart({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

function IconBolt({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  );
}

function TrendingCard({ ex }) {
  const cat = (ex.category || 'strength').toLowerCase();
  const tag = cat === 'cardio' ? 'CARDIO' : cat === 'flexibility' ? 'FLEXIBILITY' : 'STRENGTH';

  return (
    <Link
      to={`/exercise/${ex._id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-200">
        <img src={exerciseImage(ex)} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-80" />
        <span className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide ${categoryStyles(cat)}`}>
          {tag}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-bold text-gray-900">{ex.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-gray-500">{ex.description}</p>
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
          <span className="flex items-center gap-1.5">
            <IconClock className="h-4 w-4 text-gray-400" />
            {durationLabel(ex)}
          </span>
          <span className="flex items-center gap-1.5 text-gray-600">
            <IconChart className="h-4 w-4" />
            {formatDifficulty(ex)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ExerciseLibrary() {
  const [filter, setFilter] = useState('all');
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usedMock, setUsedMock] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const category = filter === 'all' ? undefined : filter;
      const exercises = await fetchExercises({ category, limit: 48 });
      if (exercises.length === 0) {
        const mock = MOCK_EXERCISES.filter((m) => category == null || m.category === category);
        setList(mock);
        setUsedMock(true);
      } else {
        setList(exercises);
        setUsedMock(false);
      }
    } catch {
      const category = filter === 'all' ? undefined : filter;
      const mock = MOCK_EXERCISES.filter((m) => category == null || m.category === category);
      setList(mock);
      setUsedMock(true);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  const trending = useMemo(() => list.slice(0, 8), [list]);

  return (
    <EquilibriumShell>
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Exercise Library</h1>
          <p className="mt-2 max-w-2xl text-gray-500">
            Curated movements designed for optimal biomechanics and peak performance.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  filter === f.id ? 'text-white shadow-sm' : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50'
                }`}
                style={filter === f.id ? { backgroundColor: GREEN } : undefined}
              >
                {f.label}
              </button>
            ))}
          </div>
          {usedMock && (
            <p className="mt-3 text-xs text-amber-700">
              Showing sample exercises — start the API and seed the database to load your team&apos;s library.
            </p>
          )}
        </header>

        {/* Featured + side cards */}
        <section className="mb-12 grid gap-4 lg:grid-cols-3">
          <div className="relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-2xl p-6 text-white lg:col-span-2 lg:min-h-[320px]">
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-300/90">Movement of the month</p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">The Conventional Deadlift</h2>
              <p className="mt-2 max-w-lg text-sm text-white/85">
                Master the hinge pattern for total-body strength. Progressive loading, bracing, and bar path — distilled into one
                essential lift.
              </p>
              <button
                type="button"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition-opacity hover:opacity-95"
              >
                Explore guide
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-1 flex-col rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-5 shadow-sm">
              <IconBolt className="h-8 w-8 text-sky-500" />
              <h3 className="mt-3 text-lg font-bold text-gray-900">Dynamic mobility flow</h3>
              <p className="mt-1 flex-1 text-sm text-gray-600">Open hips and T-spine in under 12 minutes — ideal before heavy sessions.</p>
              <button type="button" className="mt-4 text-left text-sm font-semibold text-sky-700 hover:underline">
                Start session →
              </button>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-5 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">Technique analysis</h3>
              <p className="mt-1 text-sm text-gray-600">Upload short clips for form cues and progression tips.</p>
              <div className="mt-4 flex -space-x-2">
                {['A', 'B', 'C'].map((x) => (
                  <div
                    key={x}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-300 text-xs font-bold text-gray-700"
                  >
                    {x}
                  </div>
                ))}
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-xs font-medium text-gray-600">
                  +42
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trending */}
        <section>
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-gray-900">Trending movements</h2>
            <span className="text-sm font-semibold text-gray-400">View all</span>
          </div>

          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-72 animate-pulse rounded-2xl bg-gray-200/80" />
              ))}
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {trending.map((ex) => (
                <TrendingCard key={ex._id} ex={ex} />
              ))}
            </div>
          )}
        </section>
      </div>
    </EquilibriumShell>
  );
}
