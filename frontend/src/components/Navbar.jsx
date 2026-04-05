import { Link } from 'react-router-dom';

function SearchIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

function BellIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M15 17H5.5a1 1 0 0 1-.8-1.6l1.3-1.7V10a6 6 0 1 1 12 0v3.7l1.3 1.7a1 1 0 0 1-.8 1.6H15" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  );
}

function GearIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 1 1-4 0v-.2a1 1 0 0 0-.7-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 1 1 0-4h.2a1 1 0 0 0 .9-.7 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2H9a1 1 0 0 0 .6-.9V4a2 2 0 1 1 4 0v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1v.1a1 1 0 0 0 .9.6H20a2 2 0 1 1 0 4h-.2a1 1 0 0 0-.9.6Z" />
    </svg>
  );
}

/**
 * Reusable top navigation bar with search, notifications, settings, and user avatar.
 * Pass `navLinks` array to customize the horizontal nav items.
 * Pass `userInitials` and `searchPlaceholder` to customize.
 */
export default function Navbar({
  navLinks = [],
  userInitials = 'U',
  searchPlaceholder = 'Search...',
  onSearch,
}) {
  return (
    <header className="border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4">
        {/* Horizontal nav links (hidden on small screens) */}
        {navLinks.length > 0 && (
          <div className="hidden min-[900px]:flex items-center gap-8 text-sm font-medium text-slate-400">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={link.active ? 'text-emerald-600' : 'transition hover:text-slate-900'}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* Search + actions */}
        <div className="ml-auto flex min-w-0 items-center gap-3">
          <label className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 shadow-sm sm:max-w-md">
            <SearchIcon className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              onChange={onSearch}
              className="w-full min-w-0 bg-transparent text-sm text-slate-600 outline-none placeholder:text-slate-400"
            />
          </label>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50 transition-colors"
            aria-label="Notifications"
          >
            <BellIcon />
          </button>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50 transition-colors"
            aria-label="Settings"
          >
            <GearIcon />
          </button>

          <Link
            to="/profile"
            className="grid h-10 w-10 place-items-center rounded-full bg-[radial-gradient(circle_at_top,_#fde68a,_#f97316_62%,_#7c2d12)] text-sm font-bold text-white shadow-sm hover:opacity-90 transition-opacity"
            aria-label="Profile"
          >
            {userInitials}
          </Link>
        </div>
      </div>
    </header>
  );
}
