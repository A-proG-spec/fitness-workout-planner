import { Link } from 'react-router-dom';

/**
 * Reusable exercise/movement card.
 * Props: { name, category, duration, level, description, image, to }
 */
export default function ExerciseCard({ exercise }) {
  const { name, category, duration, level, description, image, to = '#' } = exercise;

  return (
    <Link
      to={to}
      className="block overflow-hidden rounded-[20px] bg-white shadow-sm ring-1 ring-slate-200/80 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-40 overflow-hidden">
        <img src={image} alt={name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.05),rgba(15,23,42,0.32))]" />
        {category && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.24em] text-slate-700">
            {category}
          </span>
        )}
      </div>

      <div className="p-3">
        <h3 className="text-base font-semibold text-slate-900 line-clamp-1">{name}</h3>
        {description && <p className="mt-1.5 text-xs leading-5 text-slate-500 line-clamp-2">{description}</p>}

        <div className="mt-3 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          {duration && <span>{duration}</span>}
          {level && <span className="text-emerald-600">{level}</span>}
        </div>
      </div>
    </Link>
  );
}
