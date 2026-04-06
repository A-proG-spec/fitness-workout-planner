import { useParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
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
} from '../../components/icons';
import { trendingMovements } from './exerciseLibraryData';

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

// Exercise database with detailed information
const exerciseDatabase = {
  'kettlebell-swing': {
    name: 'Kettlebell Swing',
    category: 'Strength',
    level: 'Advanced',
    duration: '15 min',
    calories: '180 kcal',
    equipment: 'Kettlebell',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80',
    description: 'The kettlebell swing is a dynamic, total-body exercise that primarily targets the posterior chain including glutes, hamstrings, and lower back. This explosive movement builds power, strength, and cardiovascular endurance.',
    
    benefits: [
      'Builds explosive hip power and strength',
      'Improves cardiovascular endurance',
      'Strengthens posterior chain muscles',
      'Enhances core stability and control',
      'Burns high calories in short time',
      'Improves posture and athletic performance',
    ],

    instructions: [
      {
        step: 1,
        title: 'Starting Position',
        description: 'Stand with feet shoulder-width apart, kettlebell on the ground between your feet. Hinge at the hips, keeping your back straight, and grip the kettlebell with both hands.',
      },
      {
        step: 2,
        title: 'The Hike',
        description: 'Pull the kettlebell back between your legs like hiking a football, keeping your arms straight and core engaged. Your weight should be on your heels.',
      },
      {
        step: 3,
        title: 'The Swing',
        description: 'Explosively drive your hips forward, squeezing your glutes to propel the kettlebell up to chest height. Let the momentum carry the weight, not your arms.',
      },
      {
        step: 4,
        title: 'The Return',
        description: 'Allow the kettlebell to swing back down naturally. As it descends, hinge at the hips again and guide it back between your legs to repeat.',
      },
    ],

    tips: [
      'Keep your core tight throughout the entire movement',
      'The power comes from your hips, not your arms',
      'Maintain a neutral spine - avoid rounding your back',
      'Start with a lighter weight to master the form',
      'Breathe out forcefully during the upward swing',
    ],

    muscles: [
      { name: 'Glutes', primary: true },
      { name: 'Hamstrings', primary: true },
      { name: 'Lower Back', primary: true },
      { name: 'Core', primary: false },
      { name: 'Shoulders', primary: false },
      { name: 'Forearms', primary: false },
    ],
  },
  // Add a default exercise for other IDs
  'default': {
    name: 'Exercise',
    category: 'Strength',
    level: 'Intermediate',
    duration: '20 min',
    calories: '150 kcal',
    equipment: 'Various',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80',
    description: 'A comprehensive exercise that targets multiple muscle groups and improves overall fitness.',
    
    benefits: [
      'Builds strength and endurance',
      'Improves cardiovascular health',
      'Enhances muscle tone',
      'Increases flexibility',
      'Boosts metabolism',
      'Improves overall fitness',
    ],

    instructions: [
      {
        step: 1,
        title: 'Starting Position',
        description: 'Begin in the proper starting position with good form and posture.',
      },
      {
        step: 2,
        title: 'Execution',
        description: 'Perform the movement with controlled form, focusing on the target muscles.',
      },
      {
        step: 3,
        title: 'Peak Contraction',
        description: 'Hold the peak position briefly to maximize muscle engagement.',
      },
      {
        step: 4,
        title: 'Return',
        description: 'Return to the starting position in a controlled manner and repeat.',
      },
    ],

    tips: [
      'Focus on proper form over weight',
      'Breathe consistently throughout the movement',
      'Warm up properly before starting',
      'Listen to your body and rest when needed',
      'Progress gradually to avoid injury',
    ],

    muscles: [
      { name: 'Primary Muscle', primary: true },
      { name: 'Secondary Muscle', primary: false },
    ],
  },
};

export default function ExerciseDetail() {
  const { id } = useParams();
  
  // Get exercise data based on ID, fallback to default
  const exerciseData = useMemo(() => {
    return exerciseDatabase[id] || exerciseDatabase['default'];
  }, [id]);

  // Get related exercises (exclude current exercise)
  const relatedExercises = useMemo(() => {
    return trendingMovements
      .filter(ex => ex.to !== `/exercise/${id}`)
      .slice(0, 3);
  }, [id]);

  return (
    <div className="min-h-screen bg-[#f5f7f8] text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[240px_minmax(0,1fr)]">
        <Sidebar primaryLinks={sidebarPrimaryLinks} secondaryLinks={sidebarSecondaryLinks} />

        <div className="flex min-w-0 flex-col">
          <Navbar navLinks={navLinks} userInitials="AJ" searchPlaceholder="Search exercises..." />

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl space-y-6">
              
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm">
                <Link to="/exercises" className="text-slate-500 hover:text-slate-900 transition-colors">
                  Exercises
                </Link>
                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="font-semibold text-slate-900">{exerciseData.name}</span>
              </nav>

              {/* Hero Section */}
              <section className="rounded-3xl bg-white shadow-sm ring-1 ring-slate-200/80 overflow-hidden">
                <div className="grid lg:grid-cols-[1fr_400px]">
                  {/* Image */}
                  <div className="relative h-96 lg:h-auto">
                    <img 
                      src={exerciseData.image} 
                      alt={exerciseData.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent" />
                    
                    {/* Badges on image */}
                    <div className="absolute top-6 left-6 flex gap-2">
                      <span className="rounded-full bg-white/95 backdrop-blur-sm px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-lg">
                        {exerciseData.category}
                      </span>
                      <span className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                        {exerciseData.level}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-8 flex flex-col">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">{exerciseData.name}</h1>
                    <p className="text-slate-600 leading-relaxed mb-6">{exerciseData.description}</p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="rounded-xl border-2 border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Duration</span>
                        </div>
                        <p className="text-xl font-bold text-slate-900">{exerciseData.duration}</p>
                      </div>

                      <div className="rounded-xl border-2 border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <svg className="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                          </svg>
                          <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Calories</span>
                        </div>
                        <p className="text-xl font-bold text-slate-900">{exerciseData.calories}</p>
                      </div>

                      <div className="rounded-xl border-2 border-slate-200 bg-slate-50 p-4 col-span-2">
                        <div className="flex items-center gap-2 mb-1">
                          <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                          </svg>
                          <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Equipment</span>
                        </div>
                        <p className="text-lg font-bold text-slate-900">{exerciseData.equipment}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-auto space-y-3">
                      <button
                        type="button"
                        className="w-full rounded-xl bg-emerald-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-100 transition hover:bg-emerald-700"
                      >
                        Start Workout
                      </button>
                      <button
                        type="button"
                        className="w-full rounded-xl border-2 border-slate-200 bg-white py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        Add to Plan
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Content Grid */}
              <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
                
                {/* Main Content */}
                <div className="space-y-6">
                  
                  {/* Instructions */}
                  <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200/80">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">How to Perform</h2>
                    <div className="space-y-6">
                      {exerciseData.instructions.map((instruction) => (
                        <div key={instruction.step} className="flex gap-4">
                          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-lg font-bold text-emerald-700">
                            {instruction.step}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">{instruction.title}</h3>
                            <p className="text-sm leading-relaxed text-slate-600">{instruction.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Benefits */}
                  <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200/80">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Benefits</h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {exerciseData.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3 rounded-xl border-2 border-slate-200 bg-slate-50 p-4">
                          <svg className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm font-medium text-slate-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Pro Tips */}
                  <section className="rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-700 p-8 text-white shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">Pro Tips</h2>
                    <div className="space-y-3">
                      {exerciseData.tips.map((tip, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <svg className="h-5 w-5 shrink-0 text-emerald-200 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          <span className="text-sm leading-relaxed text-emerald-50">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  
                  {/* Muscles Worked */}
                  <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Muscles Worked</h3>
                    <div className="space-y-2">
                      {exerciseData.muscles.map((muscle) => (
                        <div key={muscle.name} className="flex items-center justify-between rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3">
                          <span className="text-sm font-semibold text-slate-900">{muscle.name}</span>
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${
                            muscle.primary 
                              ? 'bg-emerald-100 text-emerald-700' 
                              : 'bg-slate-200 text-slate-600'
                          }`}>
                            {muscle.primary ? 'Primary' : 'Secondary'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Video Tutorial */}
                  <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Video Tutorial</h3>
                    <div className="aspect-video rounded-xl bg-slate-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-full bg-emerald-600 text-white">
                          <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium text-slate-600">Video coming soon</p>
                      </div>
                    </div>
                  </section>

                </div>

              </div>

              {/* Related Exercises */}
              <section>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900">Related Exercises</h2>
                  <Link to="/exercises" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                    View All
                  </Link>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedExercises.map((exercise, index) => (
                    <ExerciseCard key={index} exercise={exercise} />
                  ))}
                </div>
              </section>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
