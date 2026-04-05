import { Link } from 'react-router-dom';
import { IconHelp } from './OnboardingIcons.jsx';

const GREEN = '#006D4E';

export default function OnboardingHeader() {
  return (
    <header className="flex items-center justify-between border-b border-gray-100/80 bg-white/60 px-4 py-4 backdrop-blur-sm md:px-8 lg:px-12">
      <span className="font-brand text-xl font-semibold tracking-tight text-[#006D4E] md:text-2xl">
        Equilibrium Fitness
      </span>
      <div className="flex items-center gap-3 md:gap-6">
        <a href="mailto:support@equilibrium.fitness" className="hidden text-sm text-gray-500 hover:text-gray-800 sm:inline">
          Support
        </a>
        <span className="hidden text-gray-300 sm:inline" aria-hidden>
          |
        </span>
        <a href="#" className="hidden text-sm text-gray-500 hover:text-gray-800 sm:inline">
          FAQ
        </a>
        <Link to="/dashboard" className="text-sm font-medium hover:opacity-80" style={{ color: GREEN }}>
          Save &amp; Exit
        </Link>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#006D4E]/25 bg-white text-gray-500 transition-colors hover:border-[#006D4E]/40 hover:text-gray-700"
          aria-label="Help"
        >
          <IconHelp className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
