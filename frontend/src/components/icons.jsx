// Shared icon components for sidebar and other UI elements

function IconBase({ children, className = 'h-5 w-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function GridIcon({ className }) {
  return (
    <IconBase className={className}>
      <rect x="4" y="4" width="6" height="6" rx="1.2" />
      <rect x="14" y="4" width="6" height="6" rx="1.2" />
      <rect x="4" y="14" width="6" height="6" rx="1.2" />
      <rect x="14" y="14" width="6" height="6" rx="1.2" />
    </IconBase>
  );
}

export function WorkoutIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M4 10v4" />
      <path d="M20 10v4" />
      <path d="M7 7v10" />
      <path d="M17 7v10" />
      <path d="M7 12h10" />
    </IconBase>
  );
}

export function ForkIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M8 4v16" />
      <path d="M6 4v5a2 2 0 0 0 4 0V4" />
      <path d="M16 4v16" />
      <path d="M16 10c2 0 4-2.2 4-6" />
    </IconBase>
  );
}

export function ChartIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M5 18V9" />
      <path d="M12 18V5" />
      <path d="M19 18v-7" />
    </IconBase>
  );
}

export function UsersIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="9.5" cy="7" r="3" />
      <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 4.13a4 4 0 0 1 0 7.75" />
    </IconBase>
  );
}

export function HelpIcon({ className }) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.1 9a3 3 0 1 1 5.8 1c0 2-3 2-3 4" />
      <path d="M12 17h.01" />
    </IconBase>
  );
}

export function LogoutIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </IconBase>
  );
}

export function ArrowRightIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </IconBase>
  );
}

export function LightningIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M13 2 5 14h5l-1 8 8-12h-5l1-8Z" />
    </IconBase>
  );
}
