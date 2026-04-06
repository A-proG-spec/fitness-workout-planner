import { Link } from 'react-router-dom';

function AuthHeader() {
  return (
    <header className="shrink-0 flex items-center justify-between px-8 py-3 border-b border-gray-100 bg-white">
      <Link to="/" className="font-bold text-gray-900 text-lg tracking-tight">
        Hul<span className="text-emerald-600">Fit</span>
      </Link>
      <nav className="flex items-center gap-6 text-sm text-gray-600">
        <Link to="/" className="hover:text-gray-900 transition-colors">Back to site</Link>
        <Link to="/support" className="text-emerald-600 font-medium hover:underline transition-colors">
          Support
        </Link>
      </nav>
    </header>
  );
}

function AuthFooter() {
  return (
    <footer className="shrink-0 flex flex-col sm:flex-row items-center justify-between px-8 py-3 text-xs text-gray-400 uppercase tracking-wide gap-2 border-t border-gray-100 bg-white">
      <span>© {new Date().getFullYear()} HulFit. All rights reserved.</span>
      <nav className="flex gap-5">
        <Link to="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
        <Link to="/cookies" className="hover:text-gray-600 transition-colors">Cookie Policy</Link>
        <Link to="/accessibility" className="hover:text-gray-600 transition-colors">Accessibility</Link>
      </nav>
    </footer>
  );
}

export default function AuthLayout({ children }) {
  return (
    <div style={{ height: '100dvh' }} className="flex flex-col bg-gray-50">
      <AuthHeader />
      {/* main fills remaining space; children must not exceed it */}
      <main className="flex-1 overflow-hidden flex items-center justify-center p-4">
        {children}
      </main>
      <AuthFooter />
    </div>
  );
}
