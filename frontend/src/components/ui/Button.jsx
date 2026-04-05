/**
 * Primary action button with consistent HulFit styling.
 * variant: 'primary' | 'ghost'
 * size: 'sm' | 'md' | 'lg'
 */
export default function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  onClick,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    ghost: 'bg-transparent text-emerald-600 hover:text-emerald-700',
    outline: 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
  };

  const sizes = {
    sm: 'px-4 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-sm',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
