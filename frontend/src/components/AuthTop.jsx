import React from 'react';
const AuthTop = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-2 bg-transparent w-full">
      <div className="text-[#005a3c] font-bold text-2xl tracking-tight cursor-pointer">
        HulFit
      </div>
      <div className="flex gap-8 text-sm font-medium text-slate-600">
        <a href="/" className="hover:text-black transition-colors">Back to site</a>
        <a href="/support" className="hover:text-black transition-colors">Support</a>
      </div>
    </nav>
  );
};

export default AuthTop;