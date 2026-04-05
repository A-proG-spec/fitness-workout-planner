import { Link } from 'react-router-dom';

/**
 * Reusable sidebar with primary nav, pro upgrade card, and secondary links.
 * Pass `primaryLinks` and `secondaryLinks` arrays to customize.
 * Each link: { label, to, active?, icon: Component }
 */
export default function Sidebar({ primaryLinks = [], secondaryLinks = [], showProCard = true }) {
  return (
    <aside className="hidden border-r border-slate-200 bg-white px-5 py-6 lg:flex lg:flex-col sticky top-0 h-screen overflow-y-auto">
      {/* Brand */}
      <div className="mb-8 shrink-0">
        <Link to="/" className="text-xl font-bold tracking-tight text-gray-900">
          Hul<span className="text-emerald-600">Fit</span>
        </Link>
      </div>

      {/* Primary nav */}
      <nav className="space-y-1.5 shrink-0">
        {primaryLinks.map((item) => {
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
              {IconComponent && <IconComponent className="h-4 w-4" />}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Pro upgrade card */}
      {showProCard && (
        <div className="mt-8 shrink-0 rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-700 to-teal-500 p-4 text-white shadow-lg">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-100">
            Pro Plan
          </p>
          <h3 className="mt-3 text-base font-semibold">Unlock AI Form Coach & Pro Routines.</h3>
          <button
            type="button"
            className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors"
          >
            Upgrade to Pro
          </button>
        </div>
      )}

      {/* Secondary nav */}
      {secondaryLinks.length > 0 && (
        <div className="mt-auto space-y-1.5 pt-8 shrink-0">
          {secondaryLinks.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.label}
                to={item.to}
                className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
              >
                {IconComponent && <IconComponent className="h-4 w-4" />}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </aside>
  );
}
