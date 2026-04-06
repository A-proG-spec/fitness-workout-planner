import { Link } from 'react-router-dom';

/**
 * Advanced reusable exercise/movement card with hover effects and detailed info.
 * Props: { name, category, duration, level, description, image, to, calories, equipment }
 */
export default function ExerciseCard({ exercise }) {
  const { name, category, duration, level, description, image, to = '#', calories, equipment } = exercise;

  return (
    <Link
      to={to}
      className="group block overflow-hidden rounded-[24px] bg-white shadow-sm ring-1 ring-slate-200/80 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-2 hover:ring-emerald-500/20"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent" />
        
        {/* Category Badge */}
        {category && (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-700 shadow-lg">
            {category}
          </span>
        )}

        {/* Level Badge */}
        {level && (
          <span className="absolute right-4 top-4 rounded-full bg-emerald-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
            {level}
          </span>
        )}

        {/* Quick Stats Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex items-center gap-3">
            {duration && (
              <div className="flex items-center gap-1.5 rounded-lg bg-white/95 backdrop-blur-sm px-2.5 py-1.5 shadow-lg">
                <svg className="h-3.5 w-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-semibold text-slate-700">{duration}</span>
              </div>
            )}
            {calories && (
              <div className="flex items-center gap-1.5 rounded-lg bg-white/95 backdrop-blur-sm px-2.5 py-1.5 shadow-lg">
                <svg className="h-3.5 w-3.5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                </svg>
                <span className="text-xs font-semibold text-slate-700">{calories}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-600 transition-colors">
          {name}
        </h3>
        
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-slate-500 line-clamp-2">
            {description}
          </p>
        )}

        {/* Equipment Tag */}
        {equipment && (
          <div className="mt-3 flex items-center gap-2">
            <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            <span className="text-xs font-medium text-slate-500">{equipment}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            View Details
          </span>
          <div className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-600 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
