/**
 * Horizontal rule with an optional centred label.
 */
export default function Divider({ label, className = '' }) {
  return (
    <div className={`flex items-center gap-2 text-xs text-gray-400 uppercase tracking-widest ${className}`}>
      <span className="flex-1 border-t border-gray-200" />
      {label}
      <span className="flex-1 border-t border-gray-200" />
    </div>
  );
}
