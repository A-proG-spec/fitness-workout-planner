/**
 * Inline alert banner.
 * variant: 'error' | 'success' | 'info'
 */
const styles = {
  error:   'bg-red-50 border-red-100 text-red-700',
  success: 'bg-emerald-50 border-emerald-100 text-emerald-700',
  info:    'bg-blue-50 border-blue-100 text-blue-700',
};

export default function Alert({ children, variant = 'error', className = '' }) {
  if (!children) return null;
  return (
    <p
      role="alert"
      className={`rounded-lg border px-3 py-2 text-xs leading-relaxed ${styles[variant]} ${className}`}
    >
      {children}
    </p>
  );
}
