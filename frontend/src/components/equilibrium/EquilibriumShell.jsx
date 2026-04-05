import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const GREEN = '#0d4a3a';
const GREEN_ACCENT = '#006D44';
const GREEN_LIGHT = '#0f766e';

function IconBell({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
  );
}

function IconCog({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.37.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.213-1.281z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function IconSearch({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function IconQuestionMark({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12V17.25z" />
    </svg>
  );
}

function IconArrowRightOn({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    </svg>
  );
}

function topNavWorkoutsClass({ isActive }, pathname) {
  const on =
    isActive || pathname.startsWith('/exercise/') || pathname.startsWith('/workout-planner');
  return `text-sm font-medium transition-colors ${on ? 'text-[#0d4a3a]' : 'text-gray-500 hover:text-gray-800'}`;
}

const navClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${isActive ? 'text-[#0d4a3a]' : 'text-gray-500 hover:text-gray-800'}`;

function sideRow(active) {
  return `flex w-full items-center rounded-l-xl border-r-4 px-3 py-2.5 text-left text-sm font-medium transition-colors ${
    active
      ? 'border-[#006D44] bg-gray-100 text-[#0d4a3a]'
      : 'border-transparent text-gray-600 hover:bg-gray-50'
  }`;
}

/**
 * @param {{
 *   children: import('react').ReactNode;
 *   searchPlaceholder?: string;
 * }} props
 */
export default function EquilibriumShell({ children, searchPlaceholder = 'Search movements…' }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const initial = (user?.name || user?.email || 'U').charAt(0).toUpperCase();

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="font-ui min-h-screen bg-[#f6f7f8] text-gray-900">
      <header className="sticky top-0 z-40 border-b border-gray-200/80 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-6 px-4 lg:px-8">
          <Link to="/dashboard" className="shrink-0 font-brand text-xl font-semibold tracking-tight" style={{ color: GREEN }}>
            Equilibrium
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <NavLink to="/dashboard" className={navClass}>
              Dashboard
            </NavLink>
            <NavLink to="/exercises" className={(props) => topNavWorkoutsClass(props, pathname)}>
              Workouts
            </NavLink>
            <NavLink to="/nutrition" className={navClass} onClick={(e) => e.preventDefault()}>
              Nutrition
            </NavLink>
            <NavLink to="/community" className={navClass} onClick={(e) => e.preventDefault()}>
              Community
            </NavLink>
          </nav>

          <div className="mx-auto hidden max-w-xl flex-1 px-4 md:block lg:max-w-2xl">
            <label className="relative block w-full">
              <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder={searchPlaceholder}
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none ring-[#006D44] transition-shadow focus:bg-white focus:ring-2"
              />
            </label>
          </div>

          <div className="ml-auto flex shrink-0 items-center justify-end gap-2 sm:gap-3">
            <label className="relative min-w-0 flex-1 sm:max-w-[200px] md:hidden">
              <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder={searchPlaceholder}
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#006D44]/30"
              />
            </label>
            <button type="button" className="rounded-full p-2 text-gray-500 hover:bg-gray-100" aria-label="Notifications">
              <IconBell className="h-5 w-5" />
            </button>
            <button type="button" className="rounded-full p-2 text-gray-500 hover:bg-gray-100" aria-label="Settings">
              <IconCog className="h-5 w-5" />
            </button>
            <Link
              to="/profile"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
              style={{ background: GREEN_LIGHT }}
            >
              {initial}
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1600px]">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-56 shrink-0 flex-col border-r border-gray-200/80 bg-white py-6 md:flex xl:w-64">
          <div className="mb-6 px-4">
            <p className="font-brand text-lg font-semibold leading-tight" style={{ color: GREEN }}>
              Equilibrium
            </p>
            <p className="mt-0.5 text-[11px] font-medium tracking-wide text-gray-400">Premium Wellness</p>
          </div>

          <nav className="flex flex-col gap-0.5 pr-0 pl-0">
            <NavLink to="/dashboard" end className={({ isActive }) => sideRow(isActive)}>
              Dashboard
            </NavLink>
            <NavLink
              to="/exercises"
              className={({ isActive }) =>
                sideRow(isActive || pathname.startsWith('/exercise/') || pathname.startsWith('/workout-planner'))
              }
            >
              Workouts
            </NavLink>
            <button type="button" className={sideRow(false)} onClick={(e) => e.preventDefault()}>
              Nutrition
            </button>
            <NavLink to="/progress" className={({ isActive }) => sideRow(isActive)}>
              Progress
            </NavLink>
            <button type="button" className={sideRow(false)} onClick={(e) => e.preventDefault()}>
              Community
            </button>
          </nav>

          <button
            type="button"
            className="mx-3 mt-8 rounded-xl py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-95"
            style={{ backgroundColor: GREEN_ACCENT }}
          >
            Upgrade to Pro
          </button>

          <div className="mt-auto flex flex-col gap-0.5 border-t border-gray-100 px-3 pt-6">
            <a
              href="mailto:support@equilibrium.fitness"
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-gray-500 hover:bg-gray-50"
            >
              <IconQuestionMark className="h-4 w-4 shrink-0 opacity-60" />
              Support
            </a>
            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-gray-500 hover:bg-gray-50"
            >
              <IconArrowRightOn className="h-4 w-4 shrink-0 opacity-60" />
              Sign out
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
