import React from 'react';

const AuthFooter = () => {
  return (
    <footer className="px-8 py-4 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest border-t border-slate-100 bg-white md:bg-transparent">
      <div className="text-center md:text-left">
        © 2024 hulfit Fitness. Elevating wellness through intentional design.
      </div>
      <div className="flex gap-6 mt-4 md:mt-0 underline decoration-slate-200 underline-offset-4">
        <a href="/privacy" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
        <a href="/terms" className="hover:text-slate-600 transition-colors">Terms of Service</a>
        <a href="/cookies" className="hover:text-slate-600 transition-colors">Cookie Policy</a>
        <a href="/accessibility" className="hover:text-slate-600 transition-colors">Accessibility</a>
      </div>
    </footer>
  );
};

export default AuthFooter;