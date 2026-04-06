import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
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
  { label: 'Progress', active: false, icon: ChartIcon, to: '/progress' },
  { label: 'Community', active: true, icon: UsersIcon, to: '/community' },
];

const sidebarSecondaryLinks = [
  { label: 'Support', icon: HelpIcon, to: '#' },
  { label: 'Sign Out', icon: LogoutIcon, to: '/login' },
];

const navLinks = [
  { label: 'Dashboard', to: '/dashboard', active: false },
  { label: 'Workouts', to: '/exercises', active: false },
  { label: 'Progress', to: '/progress', active: false },
  { label: 'Community', to: '/community', active: true },
];

const posts = [
  {
    id: 1,
    author: 'Abebe Girma',
    initials: 'AG',
    avatar: 'bg-slate-700',
    time: '2 hours ago',
    content: 'Just completed my first marathon! 🏃‍♂️ The training plan from HulFit was incredible. Finished in 3:45:22. Feeling amazing!',
    image: null,
    workout: {
      type: 'Marathon Run',
      duration: '3h 45m',
      distance: '42.2 km',
      calories: 2840,
    },
    likes: 124,
    comments: 18,
    liked: false,
  },
  {
    id: 2,
    author: 'Tigist Haile',
    initials: 'TH',
    avatar: 'bg-slate-600',
    time: '5 hours ago',
    content: 'New PR on deadlifts today! 💪 Finally hit 140kg for 5 reps. Consistency is key!',
    image: null,
    workout: {
      type: 'Strength Training',
      duration: '1h 15m',
      exercises: 8,
      calories: 420,
    },
    likes: 89,
    comments: 12,
    liked: true,
  },
  {
    id: 3,
    author: 'Dawit Bekele',
    initials: 'DB',
    avatar: 'bg-emerald-600',
    time: '1 day ago',
    content: 'Morning yoga session by the lake. Nothing beats starting the day with mindful movement. 🧘‍♂️',
    image: null,
    workout: {
      type: 'Yoga Flow',
      duration: '45m',
      poses: 12,
      calories: 180,
    },
    likes: 156,
    comments: 24,
    liked: false,
  },
];

const leaderboard = [
  { rank: 1, name: 'Abebe Girma', initials: 'AG', avatar: 'bg-slate-700', points: 2840, workouts: 24, badge: '🥇' },
  { rank: 2, name: 'Tigist Haile', initials: 'TH', avatar: 'bg-slate-600', points: 2650, workouts: 22, badge: '🥈' },
  { rank: 3, name: 'Dawit Bekele', initials: 'DB', avatar: 'bg-emerald-600', points: 2420, workouts: 21, badge: '🥉' },
  { rank: 4, name: 'Sara Tesfaye', initials: 'ST', avatar: 'bg-slate-500', points: 2180, workouts: 19 },
  { rank: 5, name: 'Yonas Kebede', initials: 'YK', avatar: 'bg-slate-700', points: 2050, workouts: 18 },
];

const challenges = [
  {
    id: 1,
    title: '30-Day Consistency Challenge',
    description: 'Complete at least one workout every day for 30 days',
    participants: 1247,
    daysLeft: 12,
    progress: 60,
    icon: '🔥',
    color: 'bg-emerald-600',
  },
  {
    id: 2,
    title: '100K Steps This Week',
    description: 'Walk or run 100,000 steps in 7 days',
    participants: 892,
    daysLeft: 4,
    progress: 75,
    icon: '👟',
    color: 'bg-emerald-700',
  },
  {
    id: 3,
    title: 'Strength Builder',
    description: 'Complete 20 strength training sessions this month',
    participants: 654,
    daysLeft: 18,
    progress: 45,
    icon: '💪',
    color: 'bg-emerald-600',
  },
];

export default function Community() {
  const [activeTab, setActiveTab] = useState('feed');

  return (
    <div className="min-h-screen bg-[#f5f7f8] text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[240px_minmax(0,1fr)]">
        <Sidebar primaryLinks={sidebarPrimaryLinks} secondaryLinks={sidebarSecondaryLinks} />

        <div className="flex min-w-0 flex-col">
          <Navbar navLinks={navLinks} userInitials="AJ" searchPlaceholder="Search community..." />

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl">
              
              {/* Tab Navigation */}
              <div className="mb-6 flex gap-3 overflow-x-auto">
                {[
                  { id: 'feed', label: 'Feed' },
                  { id: 'leaderboard', label: 'Leaderboard' },
                  { id: 'challenges', label: 'Challenges' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-xl px-6 py-2.5 text-sm font-semibold transition whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content Grid */}
              <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
                
                {/* Main Content */}
                <div className="space-y-5">
                  {activeTab === 'feed' && <FeedContent posts={posts} />}
                  {activeTab === 'leaderboard' && <LeaderboardContent leaderboard={leaderboard} />}
                  {activeTab === 'challenges' && <ChallengesContent challenges={challenges} />}
                </div>

                {/* Right Sidebar */}
                <div className="space-y-5">
                  {activeTab === 'feed' && (
                    <>
                      <QuickStatsCard />
                      <TopAthletesCard leaderboard={leaderboard.slice(0, 3)} />
                    </>
                  )}
                  {activeTab === 'leaderboard' && (
                    <>
                      <YourRankCard />
                      <WeeklyStatsCard />
                    </>
                  )}
                  {activeTab === 'challenges' && (
                    <>
                      <ActiveChallengesCard />
                      <RewardsCard />
                    </>
                  )}
                </div>

              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function FeedContent({ posts }) {
  const [postList, setPostList] = useState(posts);

  const toggleLike = (postId) => {
    setPostList(postList.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  return (
    <>
      {/* Create Post */}
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
        <div className="flex gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[radial-gradient(circle_at_top,_#fde68a,_#f97316_62%,_#7c2d12)] text-sm font-bold text-white">
            AJ
          </div>
          <div className="flex-1">
            <textarea
              placeholder="Share your fitness journey..."
              className="w-full resize-none rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition focus:border-emerald-500 focus:bg-white focus:outline-none"
              rows={3}
            />
            <div className="mt-3 flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Photo
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Workout
                </button>
              </div>
              <button
                type="button"
                className="rounded-xl bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      {postList.map((post) => (
        <PostCard key={post.id} post={post} onToggleLike={toggleLike} />
      ))}
    </>
  );
}

function PostCard({ post, onToggleLike }) {
  return (
    <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
      {/* Author Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-full text-sm font-bold text-white ${post.avatar}`}>
            {post.initials}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">{post.author}</h3>
            <p className="text-xs text-slate-500">{post.time}</p>
          </div>
        </div>
        <button
          type="button"
          className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <p className="mb-4 text-sm leading-relaxed text-slate-700">{post.content}</p>

      {/* Workout Stats */}
      {post.workout && (
        <div className="mb-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-600 text-white">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-slate-900">{post.workout.type}</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(post.workout).filter(([key]) => key !== 'type').map(([key, value]) => (
              <div key={key}>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  {key}
                </p>
                <p className="mt-0.5 text-sm font-bold text-slate-900">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={() => onToggleLike(post.id)}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
            post.liked
              ? 'bg-emerald-50 text-emerald-600'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <svg className={`h-5 w-5 ${post.liked ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {post.likes}
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {post.comments}
        </button>
        <button
          type="button"
          className="ml-auto flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </button>
      </div>
    </article>
  );
}

function LeaderboardContent({ leaderboard }) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">This Month's Leaders</h2>
        <p className="mt-1 text-sm text-slate-500">Top performers based on workout points and consistency</p>
      </div>

      <div className="space-y-3">
        {leaderboard.map((user) => (
          <div
            key={user.rank}
            className={`flex items-center gap-4 rounded-2xl p-4 transition ${
              user.rank <= 3
                ? 'bg-emerald-50 border-2 border-emerald-200'
                : 'bg-slate-50 border-2 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-slate-400 w-8 text-center">
                {user.badge || `#${user.rank}`}
              </span>
              <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-full text-base font-bold text-white ${user.avatar}`}>
                {user.initials}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-slate-900">{user.name}</h3>
              <p className="text-xs text-slate-500">{user.workouts} workouts completed</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-emerald-600">{user.points.toLocaleString()}</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Points</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ChallengesContent({ challenges }) {
  return (
    <>
      {challenges.map((challenge) => (
        <article key={challenge.id} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
          <div className="mb-4 flex items-start gap-4">
            <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${challenge.color} text-3xl`}>
              {challenge.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900">{challenge.title}</h3>
              <p className="mt-0.5 text-sm text-slate-500">{challenge.description}</p>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="text-slate-600">
              <span className="font-semibold text-slate-900">{challenge.participants.toLocaleString()}</span> participants
            </span>
            <span className="font-semibold text-emerald-600">{challenge.daysLeft} days left</span>
          </div>

          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-medium text-slate-600">Your Progress</span>
              <span className="font-bold text-slate-900">{challenge.progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-emerald-600 transition-all"
                style={{ width: `${challenge.progress}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            View Details
          </button>
        </article>
      ))}
    </>
  );
}

// Sidebar Cards
function QuickStatsCard() {
  return (
    <section className="rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 text-white shadow-lg">
      <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-100 mb-4">
        Your Activity
      </h3>
      <div className="space-y-4">
        <div>
          <p className="text-3xl font-bold">156</p>
          <p className="text-sm text-emerald-100">Total Workouts</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xl font-bold">24</p>
            <p className="text-xs text-emerald-100">This Month</p>
          </div>
          <div>
            <p className="text-xl font-bold">14</p>
            <p className="text-xs text-emerald-100">Day Streak</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TopAthletesCard({ leaderboard }) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Top Athletes</h3>
      <div className="space-y-3">
        {leaderboard.map((user) => (
          <div key={user.rank} className="flex items-center gap-3">
            <span className="text-xl">{user.badge}</span>
            <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-bold text-white ${user.avatar}`}>
              {user.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900">{user.name}</p>
              <p className="text-xs text-slate-500">{user.points.toLocaleString()} pts</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function YourRankCard() {
  return (
    <section className="rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 text-white shadow-lg">
      <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-100 mb-4">
        Your Rank
      </h3>
      <div className="text-center">
        <p className="text-5xl font-bold mb-2">#12</p>
        <p className="text-sm text-emerald-100 mb-4">Out of 1,247 athletes</p>
        <div className="rounded-xl bg-white/20 px-4 py-2 text-xs font-semibold">
          Top 1% this month 🔥
        </div>
      </div>
    </section>
  );
}

function WeeklyStatsCard() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
      <h3 className="text-lg font-bold text-slate-900 mb-4">This Week</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Workouts</span>
          <span className="text-lg font-bold text-slate-900">5</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Points Earned</span>
          <span className="text-lg font-bold text-emerald-600">+420</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Rank Change</span>
          <span className="text-lg font-bold text-emerald-600">↑ 3</span>
        </div>
      </div>
    </section>
  );
}

function ActiveChallengesCard() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200/80">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Active Challenges</h3>
      <div className="space-y-3">
        <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🔥</span>
            <span className="text-sm font-semibold text-slate-900">30-Day Streak</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-emerald-200">
            <div className="h-full w-[60%] rounded-full bg-emerald-600" />
          </div>
          <p className="mt-2 text-xs text-slate-600">18/30 days complete</p>
        </div>
        <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">👟</span>
            <span className="text-sm font-semibold text-slate-900">100K Steps</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-emerald-200">
            <div className="h-full w-[75%] rounded-full bg-emerald-600" />
          </div>
          <p className="mt-2 text-xs text-slate-600">75,240/100,000 steps</p>
        </div>
      </div>
    </section>
  );
}

function RewardsCard() {
  return (
    <section className="rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-700 p-6 text-white shadow-lg">
      <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-100 mb-4">
        Rewards
      </h3>
      <div className="text-center">
        <p className="text-4xl mb-2">🏆</p>
        <p className="text-2xl font-bold mb-1">12 Badges</p>
        <p className="text-sm text-emerald-100 mb-4">Earned this month</p>
        <button
          type="button"
          className="w-full rounded-xl bg-white/20 py-2 text-sm font-semibold transition hover:bg-white/30"
        >
          View All Badges
        </button>
      </div>
    </section>
  );
}
