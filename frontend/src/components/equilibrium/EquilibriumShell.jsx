import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const GREEN = '#0d4a3a';
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

const navClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${isActive ? 'text-[#0d4a3a]' : 'text-gray-500 hover:text-gray-800'}`;

function sideItemClass(active) {
  return `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
    active ? 'bg-emerald-50 text-[#0d4a3a]' : 'text-gray-600 hover:bg-gray-50'
  }`;
}

/**
 * @param {{ children: import('react').ReactNode }} props
 */
export default function EquilibriumShell({ children }) {
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
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-gray-200/80 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-6 px-4 lg:px-8">
          <Link to="/dashboard" className="shrink-0 font-brand text-xl font-semibold tracking-tight" style={{ color: GREEN }}>
            Equilibrium
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <NavLink to="/dashboard" className={navClass}>
              Dashboard
            </NavLink>
            <NavLink to="/exercises" className={navClass}>
              Workouts
            </NavLink>
            <NavLink to="/nutrition" className={navClass} onClick={(e) => e.preventDefault()}>
              Nutrition
            </NavLink>
            <NavLink to="/community" className={navClass} onClick={(e) => e.preventDefault()}>
              Community
            </NavLink>
          </nav>

          <div className="ml-auto flex flex-1 items-center justify-end gap-3 md:max-w-md md:flex-initial lg:max-w-lg">
            <label className="relative hidden min-w-0 flex-1 sm:block">
              <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search movements…"
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none ring-[#0d4a3a] transition-shadow focus:bg-white focus:ring-2"
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
        {/* Sidebar */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-56 shrink-0 flex-col border-r border-gray-200/80 bg-white py-6 md:flex xl:w-64">
          <nav className="flex flex-col gap-0.5 px-3">
            <NavLink to="/dashboard" end className={({ isActive }) => sideItemClass(isActive)}>
              {({ isActive }) => (
                <>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: isActive ? GREEN : 'transparent' }} />
                  Dashboard
                </>
              )}
            </NavLink>
            <NavLink to="/exercises" className={({ isActive }) => sideItemClass(isActive || pathname.startsWith('/exercise/'))}>
              {({ isActive }) => (
                <>
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: isActive || pathname.startsWith('/exercise/') ? GREEN : 'transparent' }}
                  />
                  Workouts
                </>
              )}
            </NavLink>
            <button type="button" className={sideItemClass(false)} onClick={(e) => e.preventDefault()}>
              <span className="h-1.5 w-1.5 rounded-full bg-transparent" />
              Nutrition
            </button>
            <NavLink to="/progress" className={({ isActive }) => sideItemClass(isActive)}>
              {({ isActive }) => (
                <>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: isActive ? GREEN : 'transparent' }} />
                  Progress
                </>
              )}
            </NavLink>
            <button type="button" className={sideItemClass(false)} onClick={(e) => e.preventDefault()}>
              <span className="h-1.5 w-1.5 rounded-full bg-transparent" />
              Community
            </button>
          </nav>

          <div className="mx-3 mt-8 rounded-2xl p-4 text-white" style={{ background: `linear-gradient(145deg, ${GREEN} 0%, #063d32 100%)` }}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">Pro plan</p>
            <p className="mt-2 text-sm font-semibold leading-snug">Unlock advanced analytics &amp; coaching</p>
            <button
              type="button"
              className="mt-4 w-full rounded-xl bg-white py-2.5 text-sm font-semibold text-[#0d4a3a] transition-opacity hover:opacity-95"
            >
              Upgrade to Pro
            </button>
          </div>

          <div className="mt-auto flex flex-col gap-1 border-t border-gray-100 px-3 pt-6">
            <a href="mailto:support@equilibrium.fitness" className="rounded-xl px-3 py-2 text-sm text-gray-500 hover:bg-gray-50">
              Support
            </a>
            <button type="button" onClick={handleSignOut} className="rounded-xl px-3 py-2 text-left text-sm text-gray-500 hover:bg-gray-50">
              Sign out
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
