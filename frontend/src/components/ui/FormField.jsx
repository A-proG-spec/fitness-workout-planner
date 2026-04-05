/**
 * Labelled input field with consistent HulFit styling.
 * Supports all standard <input> props plus a label and optional hint.
 */
export default function FormField({
  id,
  label,
  hint,
  className = '',
  labelRight,
  ...inputProps
}) {
  return (
    <div className="flex flex-col gap-1">
      {(label || labelRight) && (
        <div className="flex items-center justify-between">
          {label && (
            <label
              htmlFor={id}
              className="text-xs font-semibold uppercase tracking-widest text-gray-500"
            >
              {label}
            </label>
          )}
          {labelRight}
        </div>
      )}
      <input
        id={id}
        className={`rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-400
          focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 transition
          ${className}`}
        {...inputProps}
      />
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}
